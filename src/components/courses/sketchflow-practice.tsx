"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Maximize2, PencilLine } from "lucide-react";
import ExcalidrawSketch from "@/components/excalidraw-sketch";

const DEFAULT_PROMPT =
  "Rebuild the core mechanism from memory. Label the input, transformation, observation, and transfer.";

function readParam(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = new URLSearchParams(window.location.search).get(name);
  return value?.trim() || fallback;
}

export default function SketchFlowPracticeClient() {
  const [topic, setTopic] = useState("Core concept");
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTopic(readParam("topic", "Core concept"));
    setPrompt(readParam("prompt", DEFAULT_PROMPT));
    setReady(true);
  }, []);

  const labels = useMemo(
    () => ["Input", "Transform", "Observe", "Transfer"],
    [],
  );

  if (!ready) {
    return (
      <main className="sketchflow-page">
        <div className="sketchflow-page-loading">Loading practice canvas…</div>
      </main>
    );
  }

  return (
    <main className="sketchflow-page">
      <div className="sketchflow-page-shell">
        <header className="sketchflow-page-header">
          <div className="min-w-0">
            <Link href="/courses" className="sketchflow-page-back">
              <ArrowLeft className="h-3.5 w-3.5" />
              Courses
            </Link>
            <div className="mt-4 flex items-center gap-2">
              <PencilLine className="h-4 w-4" />
              <span className="lesson-kicker">STACKSHADE PRACTICE</span>
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-4xl">
              {topic}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {prompt}
            </p>
          </div>

          <div className="hidden rounded-xl border border-border bg-card/30 px-3 py-2 text-right sm:block">
            <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
              Active reconstruction
            </div>
            <div className="mt-1 text-xs font-semibold">Draw → label → explain</div>
          </div>
        </header>

        <section className="sketchflow-page-canvas">
          <div className="sketchflow-page-canvas-bar">
            <div>
              <span className="lesson-kicker">PRACTICE CANVAS</span>
              <p className="mt-1 text-xs text-muted-foreground">
                The starter flow is only a scaffold. Edit it, erase it, or replace it entirely.
              </p>
            </div>
            <span className="hidden items-center gap-1.5 text-[9px] text-muted-foreground sm:inline-flex">
              <Maximize2 className="h-3 w-3" />
              Fullscreen is available inside the canvas
            </span>
          </div>

          <ExcalidrawSketch
            title={topic + " — reconstruction"}
            subtitle="Use the scaffold as a prompt, then rebuild the mechanism in your own structure."
            labels={labels}
            height={620}
          />
        </section>
      </div>
    </main>
  );
}
