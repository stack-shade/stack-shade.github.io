"use client";

import type { ExcalidrawSketchProps } from "./excalidraw-client";
import ExcalidrawClient from "./excalidraw-client";

export default function ExcalidrawSketch(props: ExcalidrawSketchProps) {
  return <ExcalidrawClient {...props} />;
}
