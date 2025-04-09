
const components = [
  { type: "input", label: "Input" },
  { type: "button", label: "Button" },
  { type: "text", label: "Text" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-4">
      <h2 className="text-sm font-semibold text-gray-600 uppercase">Components</h2>
      {components.map((comp) => (
        <div
          key={comp.type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("component", comp.type)}
          className="p-3 bg-gray-50 border rounded-md shadow-sm cursor-move hover:bg-gray-100"
        >
          {comp.label}
        </div>
      ))}
    </aside>
  );
}
