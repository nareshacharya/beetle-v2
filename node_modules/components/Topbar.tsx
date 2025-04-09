type Props = {
  onExport: () => void;
  onImport: (json: any) => void;
};

export default function Topbar({ onExport, onImport }: Props) {
  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          onImport(parsed);
        } catch (err) {
          alert("Invalid JSON file!");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow border-b">
      <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
        🪲 Beetle
      </h1>
      <div className="flex gap-2">
        <button
          onClick={onExport}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          📤 Export
        </button>
        <button
          onClick={handleImportClick}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200"
        >
          📂 Import
        </button>
      </div>
    </div>
  );
}
