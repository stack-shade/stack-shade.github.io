'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Expand,
  Grid2X2,
  Info,
  Maximize2,
  Pause,
  Play,
  Presentation,
  RotateCcw,
  TimerReset,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CoursePresentation, PresentationSlide } from "@/lib/course-presentation";

const ACCENTS = [
  "from-cyan-500/20 via-transparent to-transparent",
  "from-violet-500/20 via-transparent to-transparent",
  "from-emerald-500/20 via-transparent to-transparent",
  "from-amber-500/20 via-transparent to-transparent",
];

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function SlideContent({ slide, index, total }: { slide: PresentationSlide; index: number; total: number }) {
  const accent = ACCENTS[index % ACCENTS.length];

  if (slide.kind === "title") {
    return (
      <div className={`relative min-h-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${accent} p-8 sm:p-14 lg:p-20`}>
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10 bg-white/[0.03] blur-2xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/10 bg-white/[0.03] blur-2xl" />
        <div className="relative z-10 flex min-h-[62vh] flex-col justify-between gap-10">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/60">
              {slide.eyebrow}
            </div>
            <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">{slide.title}</h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-xl">{slide.body}</p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/40">
            <Presentation className="h-4 w-4" /> StackShade Teaching Deck
            <span className="text-white/20">•</span>
            <span>Slide {index + 1} / {total}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090b] p-7 sm:p-10 lg:p-14">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
      <div className="relative z-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">{slide.eyebrow}</div>
          <div className="font-mono text-[10px] text-white/30">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
        </div>

        <h2 className="max-w-5xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{slide.title}</h2>

        {slide.body && (
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/65 sm:text-lg">{slide.body}</p>
        )}

        {slide.bullets && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {slide.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-white/75 sm:text-base">
                <div className="mb-2 h-1.5 w-10 rounded-full bg-white/30" />
                {bullet}
              </div>
            ))}
          </div>
        )}

        {slide.flow && (
          <div className="mt-9 grid gap-3">
            {slide.flow.map((step, stepIndex) => (
              <div key={step.label} className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:bg-white/[0.05]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-xs text-white/50">{String(stepIndex + 1).padStart(2, "0")}</div>
                <div>
                  <div className="text-sm font-bold text-white">{step.label}</div>
                  <p className="mt-1 text-sm leading-6 text-white/60">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {slide.code && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/50">
            <div className="border-b border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/35">{slide.code.language}</div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-white/80"><code>{slide.code.value}</code></pre>
          </div>
        )}
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
    }, 9000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoplay, presentation.slides.length]);

  const resetTimer = () => setElapsed(0);

  const deckClass = useMemo(() => (
    "relative flex min-h-[72vh] flex-col bg-[#050608] text-white"
  ), []);

  return (
    <section ref={stageRef} className={deckClass}>
      <style jsx global>{`
        @keyframes stackshade-slide-in {
          0% { opacity: 0; transform: translateX(28px) scale(.985); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .stackshade-slide-in { animation: stackshade-slide-in .42s cubic-bezier(.22,.9,.28,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .stackshade-slide-in { animation: none !important; }
        }
      `}</style>

      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <div className="truncate text-[10px] uppercase tracking-[0.2em] text-white/35">{presentation.course.title}</div>
          <div className="truncate text-xs font-semibold text-white/80">{presentation.lesson.title}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden border-white/10 bg-white/[0.03] font-mono text-[9px] text-white/50 sm:inline-flex">
            {presentation.module.phase}
          </Badge>
          <span className="font-mono text-[10px] text-white/35">{formatTime(elapsed)}</span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 p-3 sm:p-5 lg:p-8">
          <div key={index} className="stackshade-slide-in h-full">
            <SlideContent slide={slide} index={index} total={presentation.slides.length} />
          </div>
        </div>

        {pointer && (
          <div className="pointer-events-none absolute left-6 top-6 z-30 h-4 w-4 rounded-full border-2 border-red-300 bg-red-500 shadow-[0_0_0_7px_rgba(239,68,68,.15)]" />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1 bg-white/5">
          <div className="h-full bg-white/60 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-3 py-3 sm:px-5">
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={() => go(index + 1)} disabled={index === presentation.slides.length - 1} aria-label="Next slide">
            <ChevronRight />
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setAutoplay((value) => !value)} aria-label="Toggle autoplay">
            {autoplay ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setOverview(true)} aria-label="Slide overview">
            <Grid2X2 />
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setPointer((value) => !value)}>
            <Maximize2 className="mr-1.5 h-4 w-4" /> Pointer
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setNotes((value) => !value)}>
            <Info className="mr-1.5 h-4 w-4" /> Notes
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 hover:text-white" onClick={resetTimer}>
            <TimerReset className="mr-1.5 h-4 w-4" /> Reset timer
          </Button>
          <Button size="sm" className="bg-white text-black hover:bg-white/90" onClick={() => void toggleFullscreen()}>
            <Expand className="mr-1.5 h-4 w-4" /> Fullscreen
          </Button>
        </div>
      </div>

      {notes && (
        <div className="border-t border-white/10 bg-[#0a0c10] px-5 py-4 text-sm leading-7 text-white/60">
          <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/30">Presenter notes</div>
          {slide.notes ?? "Speak to the visual. Ask a prediction question before revealing the next part."}
        </div>
      )}

      {overview && (
        <div className="absolute inset-0 z-40 overflow-auto bg-[#050608]/95 p-4 backdrop-blur-md sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/35">Slide overview</div>
              <div className="text-lg font-bold text-white">{presentation.slides.length} slides</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setOverview(false)} className="text-white/70 hover:bg-white/10 hover:text-white">
              <X className="mr-1.5 h-4 w-4" /> Close
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {presentation.slides.map((item, itemIndex) => (
              <button
                key={item.title + itemIndex}
                onClick={() => { setIndex(itemIndex); setOverview(false); }}
                className={`rounded-2xl border p-4 text-left transition-all ${itemIndex === index ? "border-white/40 bg-white/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}
              >
                <div className="mb-2 font-mono text-[10px] text-white/30">{String(itemIndex + 1).padStart(2, "0")}</div>
                <div className="text-sm font-bold text-white/85">{item.title}</div>
                <div className="mt-2 text-[11px] leading-5 text-white/45">{item.eyebrow}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="hidden sm:flex items-center justify-center gap-3 border-t border-white/5 py-2 text-[9px] uppercase tracking-[0.17em] text-white/20">
        ← / → Navigate • Space Next • F Fullscreen • O Overview • N Notes • P Pointer
      </div>
    </section>
  );
}
