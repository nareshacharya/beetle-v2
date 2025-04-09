import { useEffect, useState } from "react";
import { CanvasComponent } from "./types";

type Props = {
  selectedComponent: CanvasComponent | undefined;
  onUpdate: (id: string, newProps: any) => void;
};

export function SettingsDrawer({ selectedComponent, onUpdate }: Props) {
  const [localProps, setLocalProps] = useState({ text: "" });

  useEffect(() => {
    if (selectedComponent) {
      setLocalProps(selectedComponent.props ?? { text: "" });
    }
  }, [selectedComponent]);

  if (!selectedComponent) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalProps((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(selectedComponent.id, localProps);
  };

  return (
    <aside className="w-80 bg-white border-l p-4 shadow-inner">
      <h3 className="text-md font-semibold text-gray-700 mb-4">
        ⚙️ Component Settings
      </h3>

      <div className="space-y-4">
        {selectedComponent.type === "input" && (
          <>
            <label className="block text-sm font-medium text-gray-600">
              Placeholder
            </label>
            <input
              type="text"
              name="text"
              value={localProps.text}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
              placeholder="Enter placeholder"
            />
          </>
        )}

        {selectedComponent.type === "button" && (
          <>
            <label className="block text-sm font-medium text-gray-600">
              Button Text
            </label>
            <input
              type="text"
              name="text"
              value={localProps.text}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
              placeholder="Button label"
            />
          </>
        )}

        {selectedComponent.type === "text" && (
          <>
            <label className="block text-sm font-medium text-gray-600">
              Text Content
            </label>
            <input
              type="text"
              name="text"
              value={localProps.text}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
              placeholder="Paragraph text"
            />
          </>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white rounded px-4 py-2 mt-6 hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </aside>
  );
}
