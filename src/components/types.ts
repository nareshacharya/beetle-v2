export type CanvasComponent = {
  id: string;
  type: "input" | "button" | "text";
  props: {
    text?: string;
  };
};
