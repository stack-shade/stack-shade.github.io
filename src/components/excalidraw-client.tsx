"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Maximize2, Minimize2, RotateCcw, Sparkles } from "lucide-react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false },
);

export interface ExcalidrawSketchProps {
  title: string;
  subtitle?: string;
  labels: string[];
  height?: number;
}

const marker = "stackshade-generated-sketch";

export default function ExcalidrawClient({
  title,
  subtitle,
  labels,
  height = 420,
}: ExcalidrawSketchProps) {
  const [dark, setDark] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const seededKey = useRef("");

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    if (!api) return;

    const key = labels.join("||");
    if (!labels.length || seededKey.current === key) return;
    seededKey.current = key;

    void (async () => {
      await document.fonts.ready;
      const { convertToExcalidrawElements } = await import("@excalidraw/excalidraw");

      const gap = 68;
      const startX = 90;
      const y = 150;
      const width = 240;
      const boxHeight = 110;
      const strokeColor = dark ? "#d7d0c7" : "#474039";
      const backgroundColor = dark ? "#15181d" : "#f1ede7";
      const textColor = dark ? "#f5f2ed" : "#29251f";
      const arrowColor = dark ? "#a78bfa" : "#6d4db1";
      const skeletons: Parameters<typeof convertToExcalidrawElements>[0] = [];

      labels.forEach((label, index) => {
        const x = startX + index * (width + gap);
        skeletons.push(
          {
            type: "rectangle",
            x,
            y,
            width,
            height: boxHeight,
            strokeColor,
            backgroundColor,
            roughness: 1,
            customData: { sketchMarker: marker },
          } as never,
          {
            type: "text",
            x: x + 22,
            y: y + 38,
            text: label,
            fontSize: 21,
            strokeColor: textColor,
            roughness: 0,
            customData: { sketchMarker: marker },
          } as never,
        );

        if (index < labels.length - 1) {
          skeletons.push(
            {
              type: "arrow",
              x: x + width,
              y: y + boxHeight / 2,
              points: [[0, 0], [gap, 0]],
              startArrowhead: null,
              endArrowhead: "arrow",
              strokeColor: arrowColor,
              roughness: 1,
              customData: { sketchMarker: marker },
            } as never,
          );
        }
      });

      const elements = convertToExcalidrawElements(skeletons);
      api.updateScene({ elements });
      api.scrollToContent(elements, { fitToContent: true, animate: false });
    })();
  }, [api, labels, dark]);

  useEffect(() => {
    if (!api || !seededKey.current) return;

    const strokeColor = dark ? "#d7d0c7" : "#474039";
    const backgroundColor = dark ? "#15181d" : "#f1ede7";
    const textColor = dark ? "#f5f2ed" : "#29251f";
    const arrowColor = dark ? "#a78bfa" : "#6d4db1";

    const nextElements = api.getSceneElements().map((element) => {
      const customData = (element as { customData?: { sketchMarker?: string } }).customData;
      if (customData?.sketchMarker !== marker) return element;

      if (element.type === "rectangle") {
        return { ...element, strokeColor, backgroundColor };
      }
      if (element.type === "arrow") {
        return { ...element, strokeColor: arrowColor };
      }
      if (element.type === "text") {
        return { ...element, strokeColor: textColor };
      }
      return element;
    });

    api.updateScene({ elements: nextElements });
  }, [api, dark]);

  const toggleFullscreen = async () => {
    if (!shellRef.current) return;
    if (!document.fullscreenElement) {
      await shellRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card/30 p-3 sm:p-4" aria-label={title}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Sketch
          </div>
          <h2 className="mt-1 text-base font-bold sm:text-lg">{title}</h2>
          {subtitle && <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 gap-1">
          <button type="button" onClick={() => api?.resetScene()} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/40 text-muted-foreground hover:text-foreground" aria-label="Reset sketch">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => void toggleFullscreen()} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/40 text-muted-foreground hover:text-foreground" aria-label={fullscreen ? "Exit fullscreen" : "Open sketch fullscreen"}>
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        ref={shellRef}
        className="overflow-hidden rounded-xl border border-border bg-background"
        style={{ height: fullscreen ? "100vh" : height, width: fullscreen ? "100vw" : "100%" }}
      >
        <Excalidraw
          theme={dark ? "dark" : "light"}
          initialData={{
            elements: [],
            appState: {
              viewBackgroundColor: dark ? "#090a0c" : "#fcfbf8",
              theme: dark ? "dark" : "light",
            },
          }}
          excalidrawAPI={setApi}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              clearCanvas: false,
            },
          }}
        />
      </div>
    </section>
  );
}
