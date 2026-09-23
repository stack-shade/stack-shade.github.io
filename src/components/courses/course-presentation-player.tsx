
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Grid2X2,
  Info,
  Maximize2,
  Pause,
  Play,
  Presentation,
  TimerReset,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CoursePresentation, PresentationSlide } from "@/lib/course-presentation";
import { PRESENTATION_ACCENTS, PRESENTATION_AUTOPLAY_MS, PRESENTATION_SHORTCUTS } from "@/lib/presentation-design-system";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return mins + ":" + secs;
}

function SlideContent({ slide, index, total }: { slide: PresentationSlide; index: number; total: number }) {
  const accent = PRESENTATION_ACCENTS[index % PRESENTATION_ACCENTS.length];

  return (
    <div className="relative h-full min-h-[55svh] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#08090b] p-4 sm:min-h-[60svh] sm:rounded-[1.5rem] sm:p-8 lg:min-h-[67svh] lg:rounded-[2rem] lg:p-14">
      <div className={"pointer-events-none absolute inset-0 bg-gradient-to-br " + accent + " opacity-60"} />
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full border border-white/10 bg-white/[0.03] blur-2xl sm:-right-24 sm:h-72 sm:w-72" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate text-[9px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-[10px]">{slide.eyebrow}</div>
          <div className="font-mono text-[9px] text-white/30 sm:text-[10px]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-5 sm:py-10">
          <h1 className="max-w-5xl text-[clamp(2rem,9vw,5.9rem)] font-black leading-[.96] tracking-[-0.045em] text-white">{slide.title}</h1>

          {slide.body && (
            <p className="mt-5 max-w-3xl text-[clamp(.9rem,2.3vw,1.2rem)] leading-[1.7] text-white/65">{slide.body}</p>
          )}

          {slide.bullets && (
            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              {slide.bullets.map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 text-sm leading-6 text-white/75 sm:p-5 sm:text-base">
                  <div className="mb-2 h-1.5 w-8 rounded-full bg-white/30" />
                  {bullet}
                </div>
              ))}
            </div>
          )}

          {slide.flow && (
            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3">
              {slide.flow.map((step, stepIndex) => (
                <div key={step.label} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:gap-4 sm:p-5">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 font-mono text-[10px] text-white/50 sm:h-9 sm:w-9">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white">{step.label}</div>
                    <p className="mt-1 text-xs leading-6 text-white/60 sm:text-sm">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {slide.code && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/50 sm:mt-8">
              <div className="border-b border-white/10 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white/35">{slide.code.language}</div>
              <pre className="max-h-[34svh] overflow-auto p-3.5 text-[11px] leading-6 text-white/80 sm:p-5 sm:text-sm sm:leading-7">
                <code>{slide.code.value}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] uppercase tracking-[0.16em] text-white/25">
          <span className="inline-flex items-center gap-2"><Presentation className="h-3.5 w-3.5" /> StackShade teaching deck</span>
          <span className="hidden sm:inline">Predict → explain → retrieve</span>
        </div>
      </div>
    </div>
  );
}

export function CoursePresentationPlayer({ presentation }: { presentation: CoursePresentation }) {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [pointer, setPointer] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ x: 28, y: 28 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const slide = presentation.slides[index];
  const progress = ((index + 1) / presentation.slides.length) * 100;

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(presentation.slides.length - 1, next)));
  }, [presentation.slides.length]);

  const toggleFullscreen = async () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) await stageRef.current.requestFullscreen();
    else await document.exitFullscreen();
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((event.target as HTMLElement)?.tagName)) return;
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void toggleFullscreen();
      } else if (event.key.toLowerCase() === "o") {
        event.preventDefault();
        setOverview((value) => !value);
      } else if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        setNotes((value) => !value);
      } else if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        setPointer((value) => !value);
      } else if (event.key === "Escape") {
        setOverview(false);
        setNotes(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  useEffect(() => {
    const tick = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!autoplay) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setIndex((value) => {
        if (value >= presentation.slides.length - 1) {
          setAutoplay(false);
          return value;
        }
        return value + 1;
      });
    }, PRESENTATION_AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoplay, presentation.slides.length]);

  return (
    <section
      ref={stageRef}
      className="presentation-stage relative flex min-h-[calc(100svh-5.25rem)] flex-col overflow-hidden rounded-2xl bg-[#050608] text-white sm:min-h-[calc(100svh-6rem)] lg:min-h-[calc(100svh-7rem)] lg:rounded-[1.5rem]"
      onPointerMove={(event) => {
        if (!pointer || !stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        setPointerPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
      onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart;
        const delta = end - touchStart;
        if (Math.abs(delta) > 48) go(delta > 0 ? index - 1 : index + 1);
        setTouchStart(null);
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="min-w-0">
          <div className="truncate text-[8px] uppercase tracking-[0.18em] text-white/30 sm:text-[9px]">{presentation.course.title}</div>
          <div className="truncate text-[11px] font-semibold text-white/80 sm:text-xs">{presentation.lesson.title}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline" className="hidden border-white/10 bg-white/[0.03] font-mono text-[8px] text-white/50 sm:inline-flex">{presentation.module.phase}</Badge>
          <span className="font-mono text-[9px] text-white/30 sm:text-[10px]">{formatTime(elapsed)}</span>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 p-2.5 sm:p-4 lg:p-6">
        <div key={index} className="stackshade-slide-in h-full">
          <SlideContent slide={slide} index={index} total={presentation.slides.length} />
        </div>

        {pointer && (
          <div
            className="pointer-events-none absolute z-30 h-4 w-4 rounded-full border-2 border-red-300 bg-red-500 shadow-[0_0_0_7px_rgba(239,68,68,.15)]"
            style={{ left: pointerPosition.x, top: pointerPosition.y, transform: "translate(-50%, -50%)" }}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1 bg-white/5">
          <div className="h-full bg-white/60 transition-all duration-300" style={{ width: progress + "%" }} />
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/10 px-2 py-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] sm:px-4 sm:py-3">
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => go(index + 1)} disabled={index === presentation.slides.length - 1} aria-label="Next slide">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setAutoplay((value) => !value)} aria-label="Toggle autoplay">
            {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setOverview(true)} aria-label="Slide overview">
            <Grid2X2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white sm:w-auto sm:px-2.5" onClick={() => setPointer((value) => !value)} aria-label="Toggle pointer">
            <Maximize2 className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Pointer</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white sm:w-auto sm:px-2.5" onClick={() => setNotes((value) => !value)} aria-label="Toggle presenter notes">
            <Info className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Notes</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white sm:w-auto sm:px-2.5" onClick={() => setElapsed(0)} aria-label="Reset timer">
            <TimerReset className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button size="sm" className="h-9 bg-white px-3 text-black hover:bg-white/90" onClick={() => void toggleFullscreen()}>
            <Expand className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </Button>
        </div>
      </div>

      {notes && (
        <div className="border-t border-white/10 bg-[#0a0c10] px-4 py-3 text-xs leading-6 text-white/60 sm:px-5 sm:py-4 sm:text-sm">
          <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/30">Presenter notes</div>
          {slide.notes ?? "Speak to the visual. Ask a prediction question before revealing the next part."}
        </div>
      )}

      {overview && (
        <div className="absolute inset-0 z-40 overflow-auto bg-[#050608]/95 p-3 backdrop-blur-md sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/35">Slide overview</div>
              <div className="text-lg font-bold text-white">{presentation.slides.length} slides</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setOverview(false)} className="text-white/70 hover:bg-white/10 hover:text-white">
              <X className="mr-1.5 h-4 w-4" /> Close
            </Button>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {presentation.slides.map((item, itemIndex) => (
              <button
                key={item.title + itemIndex}
                onClick={() => { setIndex(itemIndex); setOverview(false); }}
                className={"rounded-2xl border p-3 text-left transition-colors sm:p-4 " + (itemIndex === index ? "border-white/40 bg-white/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]")}
              >
                <div className="mb-2 font-mono text-[9px] text-white/30">{String(itemIndex + 1).padStart(2, "0")}</div>
                <div className="text-sm font-bold text-white/85">{item.title}</div>
                <div className="mt-1.5 text-[10px] leading-5 text-white/45">{item.eyebrow}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="hidden items-center justify-center gap-3 border-t border-white/5 py-2 text-[8px] uppercase tracking-[0.17em] text-white/20 sm:flex">
        {PRESENTATION_SHORTCUTS.map(([shortcut, label], i) => (i ? " • " : "") + shortcut + " " + label).join("")}
      </div>
    </section>
  );
}
