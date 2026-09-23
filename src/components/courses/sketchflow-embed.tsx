"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minimize2, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const SKETCHFLOW_URL = "https://sketchflow.space/try";

export function SketchFlowEmbed({
  title,
  prompt,
  src = SKETCHFLOW_URL,
}: {
  title: string;
  prompt: string;
  src?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const target = frameRef.current;
    if (!target) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onFullscreen = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    const node = frameRef.current;
    if (!node) return;

    if (document.fullscreenElement === node) {
      await document.exitFullscreen();
      return;
    }

    await node.requestFullscreen();
  };

  return (
    <section className="sketchflow-embed-card">
      <div className="sketchflow-embed-head">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <PencilLine className="h-4 w-4 shrink-0" />
            <span className="lesson-kicker">SKETCHFLOW</span>
          </div>
          <h3 className="mt-1 truncate text-base font-black sm:text-lg">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">{prompt}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <a href={src} target="_blank" rel="noreferrer" className="sketchflow-embed-action">
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New tab</span>
          </a>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void toggleFullscreen()}
            className="h-8 px-2.5 text-[10px]"
            aria-label={fullscreen ? "Exit SketchFlow fullscreen" : "Open SketchFlow fullscreen"}
          >
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span className="ml-1.5 hidden sm:inline">{fullscreen ? "Exit" : "Fullscreen"}</span>
          </Button>
        </div>
      </div>

      <div ref={frameRef} className={"sketchflow-embed-frame" + (fullscreen ? " is-fullscreen" : "")}>
        {!shouldLoad ? (
          <div className="sketchflow-embed-placeholder">
            <PencilLine className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-bold">Practice canvas ready</p>
              <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
                The canvas loads when you reach this section.
              </p>
            </div>
          </div>
        ) : (
          <iframe
            src={src}
            title={title}
            className="h-full w-full border-0"
            loading="lazy"
            allow="fullscreen; clipboard-read; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      <div className="sketchflow-embed-foot">
        <span>Draw first. Compare second.</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          Touch + mouse friendly
        </span>
      </div>
    </section>
  );
}
