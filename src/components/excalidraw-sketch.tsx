import dynamic from "next/dynamic";
import type { ExcalidrawSketchProps } from "./excalidraw-client";

const ExcalidrawClient = dynamic(() => import("./excalidraw-client"), { ssr: false });

export default function ExcalidrawSketch(props: ExcalidrawSketchProps) {
  return <ExcalidrawClient {...props} />;
}
