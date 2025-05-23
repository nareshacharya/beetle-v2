import { useEffect, useRef, useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import type { CanvasComponent } from "./components/types";

export default function App() {
  const componentsRef = useRef<CanvasComponent[]>([]);
  const [importedData, setImportedData] = useState<CanvasComponent[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const setCanvasComponents = (newList: CanvasComponent[]) => {
    componentsRef.current = newList;
  };

  const handleExport = () => {
    const json = JSON.stringify(componentsRef.current, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "beetle-ui-config.json";
    link.click();
  };

  const handleImport = (json: any) => {
    setImportedData(json);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        canvasAreaRef.current &&
        !canvasAreaRef.current.contains(target) &&
        drawerRef.current &&
        !drawerRef.current.contains(target)
      ) {
        setSelectedId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Topbar onExport={handleExport} onImport={handleImport} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas
          setComponentsRef={setCanvasComponents}
          importedData={importedData}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          canvasRef={canvasAreaRef}
          drawerRef={drawerRef}
        />
      </div>
    </div>
  );
}