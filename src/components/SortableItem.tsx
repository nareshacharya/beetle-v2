import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  type: "input" | "button" | "text";
  props: {
    text?: string;
  };
  selected: boolean;
  onDelete: (id: string) => void;
};

export function SortableItem({ id, type, props, selected, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: selected ? "2px solid #6366f1" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative p-4 bg-white rounded shadow-sm mb-2"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-6 left-1 cursor-grab text-gray-400 hover:text-gray-600"
        title="Drag"
      >
        ⠿
      </div>
      <div
        onClick={() => onDelete(id)}
        className="absolute top-6 right-0 cursor-pointer text-red-400 hover:text-red-600"
        title="Delete"
      >
        ✖
      </div>

      {type === "input" && (
        <input className="w-full border p-2 rounded" placeholder={props.text} />
      )}
      {type === "button" && (
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          {props.text}
        </button>
      )}
      {type === "text" && <p className="text-gray-700">{props.text}</p>}
    </div>
  );
}
