import { useEffect, useState } from "react";
import { CanvasComponent } from "./types";
import { SettingsDrawer } from "./SettingsDrawer";
import { SortableItem } from "./SortableItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
  setComponentsRef: (components: CanvasComponent[]) => void;
  importedData?: CanvasComponent[] | null;
};

export default function Canvas({ setComponentsRef, importedData }: Props) {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (importedData && importedData.length > 0) {
      setComponents(importedData);
    }
  }, [importedData]);

  useEffect(() => {
    setComponentsRef(components);
  }, [components]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("component");
    if (!type) return;

    const defaultText =
      type === "input"
        ? "Placeholder..."
        : type === "button"
        ? "Click me"
        : "Text block";

    const newComponent: CanvasComponent = {
      id: Date.now().toString(),
      type: type as CanvasComponent["type"],
      props: { text: defaultText },
    };

    setComponents((prev) => [...prev, newComponent]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over.id);
      setComponents((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const updateComponent = (id: string, newProps: any) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, props: newProps } : c))
    );
  };

  const handleDelete = (id: string) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="flex-1 flex bg-gray-50 overflow-hidden">
      <main
        className="flex-1 p-8 overflow-auto"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-lg font-medium text-gray-700">🎨 Canvas</h2>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {components.map((comp) => (
                <div key={comp.id} onClick={() => setSelectedId(comp.id)}>
                  <SortableItem
                    id={comp.id}
                    type={comp.type}
                    props={comp.props}
                    selected={comp.id === selectedId}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </main>

      <SettingsDrawer
        selectedComponent={components.find((c) => c.id === selectedId)}
        onUpdate={updateComponent}
      />
    </div>
  );
}
