"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Grid2X2,
  Info,
  Maximize2,
  Minimize2,
  MousePointer2,
  Pause,
  Play,
  Presentation,
  StickyNote,
  TimerReset,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CoursePresentation, PresentationSlide } from "@/lib/course-presentation";
import { PRESENTATION_AUTOPLAY_MS } from "@/lib/presentation-design-system";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return mins + ":" + secs;
}

function SlideContent({
  slide,
  index,
  total,
}: {
  slide: PresentationSlide;
  index: number;
  total: number;
}) {
  return (
    <article className="relative flex aspect-video w-full min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-[#0a0c10] shadow-[0_2rem_7rem_rgba(0,0,0,.3)] sm:rounded-[1.5rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(139,92,246,.1),transparent_28%),radial-gradient(circle_at_8%_90%,rgba(59,130,246,.06),transparent_25%)]" />
      <div className="relative flex min-h-0 flex-1 flex-col p-5 sm:p-8 lg:p-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-violet-400" />
            <span className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
              {slide.eyebrow}
            </span>
          </div>
          <span className="shrink-0 font-mono text-[9px] text-white/30 sm:text-[10px]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-4 sm:py-7">
          <div className="max-w-6xl">
            <h1 className="max-w-5xl text-[clamp(1.8rem,4.6vw,5.1rem)] font-black leading-[0.98] tracking-[-0.05em] text-white">
              {slide.title}
            </h1>

            {slide.body && (
              <p className="mt-4 line-clamp-5 max-w-4xl text-[clamp(.85rem,1.55vw,1.18rem)] leading-[1.6] text-white/63 sm:mt-6">
                {slide.body}
              </p>
            )}
          </div>

          {slide.bullets && (
            <div className="mt-5 grid min-h-0 gap-2.5 sm:mt-7 sm:grid-cols-2">
              {slide.bullets.slice(0, 4).map((bullet, bulletIndex) => (
                <div
                  key={bulletIndex}
                  className="min-w-0 rounded-xl border border-white/[0.09] bg-white/[0.028] p-3.5 sm:p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[8px] text-white/30">
                      {String(bulletIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-7 bg-white/20" />
                  </div>
                  <p className="line-clamp-4 text-[11px] leading-5 text-white/72 sm:text-xs sm:leading-5">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          )}

          {slide.flow && (
            <div className="mt-5 grid min-h-0 gap-2.5 sm:mt-7 sm:grid-cols-2 xl:grid-cols-4">
              {slide.flow.slice(0, 4).map((step, stepIndex) => (
                <div
                  key={step.label}
                  className="min-w-0 rounded-xl border border-white/[0.09] bg-white/[0.028] p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[8px] text-white/30">{String(stepIndex + 1).padStart(2, "0")}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  </div>
                  <div className="mt-2 text-xs font-bold text-white/92">{step.label}</div>
                  <p className="mt-1.5 line-clamp-4 text-[10px] leading-4.5 text-white/55">{step.detail}</p>
                </div>
              ))}
            </div>
          )}

          {slide.code && (
            <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.09] bg-black/50 sm:mt-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-3 py-2 text-[8px] uppercase tracking-[0.16em] text-white/35">
                <span>{slide.code.language}</span>
                <span>inspect</span>
              </div>
              <pre className="max-h-[19svh] overflow-hidden p-3 text-[10px] leading-5 text-white/75 sm:text-xs sm:leading-6">
                <code>{slide.code.value}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] pt-3">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] text-white/25 sm:text-[9px]">
            <Presentation className="h-3.5 w-3.5" />
            StackShade deck
          </div>
          <div className="hidden items-center gap-2 font-mono text-[9px] text-white/25 sm:flex">
            Predict → explain → retrieve
          </div>
        </div>
      </div>
    </article>
  );
}

export function CoursePresentationPlayer({ presentation }: { presentation: CoursePresentation }) {
  const pathname = usePathname();
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [pointerPosition, setPointerPosition] = useState({ x: 60, y: 60 });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawSlide = Number(params.get("slide") ?? "1");
    if (Number.isFinite(rawSlide)) {
      setIndex(Math.max(0, Math.min(presentation.slides.length - 1, rawSlide - 1)));
    }
    setOverview(params.get("overview") === "1");
    setNotes(params.get("notes") === "1");
    setPointer(params.get("pointer") === "1");
    setAutoplay(params.get("autoplay") === "1");
  }, [presentation.slides.length]);

  const slide = presentation.slides[index];

  const sync = useCallback(
    (nextIndex: number, extras?: Record<string, string | null>) => {
      const next = new URLSearchParams(window.location.search);
      next.set("slide", String(nextIndex + 1));
      next.set("mode", "present");
      Object.entries(extras ?? {}).forEach(([key, value]) => {
        if (value === null) next.delete(key);
        else next.set(key, value);
      });
      router.replace(pathname + "?" + next.toString(), { scroll: false });
    },
    [pathname, router],
  );

  const go = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(presentation.slides.length - 1, nextIndex));
      setIndex(clamped);
      sync(clamped);
    },
    [presentation.slides.length, sync],
  );

  const setUiState = useCallback(
    (key: string, value: boolean) => {
      const next = new URLSearchParams(window.location.search);
      if (value) next.set(key, "1");
      else next.delete(key);
      next.set("slide", String(index + 1));
      next.set("mode", "present");
      router.replace(pathname + "?" + next.toString(), { scroll: false });

      if (key === "overview") setOverview(value);
      if (key === "notes") setNotes(value);
      if (key === "pointer") setPointer(value);
      if (key === "autoplay") setAutoplay(value);
    },
    [index, pathname, router],
  );

  const toggleFullscreen = async () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      await stageRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName)) return;

      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(presentation.slides.length - 1);
      } else if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void toggleFullscreen();
      } else if (event.key.toLowerCase() === "o") {
        event.preventDefault();
        setUiState("overview", !overview);
      } else if (event.key.toLowerCase() === "n") {
        event.preventDefault();
        setUiState("notes", !notes);
      } else if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        setUiState("pointer", !pointer);
      } else if (event.key === "Escape") {
        setOverview(false);
        setNotes(false);
        sync(index, { overview: null, notes: null });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, notes, overview, pointer, presentation.slides.length, setUiState, sync]);

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
        const next = value + 1;
        sync(next);
        return next;
      });
    }, PRESENTATION_AUTOPLAY_MS);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoplay, presentation.slides.length, sync]);

  return (
    <section
      ref={stageRef}
      className="presentation-stage flex min-h-[100svh] flex-col overflow-hidden bg-[#050608] text-white"
      onPointerMove={(event) => {
        if (!pointer || !stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        setPointerPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }}
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < 24 && Math.abs(event.deltaX) < 24) return;
        event.preventDefault();
        if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
          go(event.deltaX > 0 ? index + 1 : index - 1);
        } else {
          go(event.deltaY > 0 ? index + 1 : index - 1);
        }
      }}
      onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart;
        const delta = end - touchStart;
        if (Math.abs(delta) > 42) go(delta > 0 ? index - 1 : index + 1);
        setTouchStart(null);
      }}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.1] bg-white/[0.03]">
            <Presentation className="h-4 w-4 text-white/70" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[8px] font-bold uppercase tracking-[0.16em] text-white/30 sm:text-[9px]">
              {presentation.course.title}
            </div>
            <div className="truncate text-[11px] font-semibold text-white/80 sm:text-xs">
              {presentation.lesson.title}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline" className="hidden border-white/[0.1] bg-white/[0.03] font-mono text-[8px] text-white/45 sm:inline-flex">
            {presentation.module.phase}
          </Badge>
          <span className="font-mono text-[9px] text-white/30 sm:text-[10px]">{formatTime(elapsed)}</span>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[8rem_minmax(0,1fr)]">
        <aside className="order-2 border-t border-white/[0.08] lg:order-1 lg:border-r lg:border-t-0">
          <div className="h-full overflow-x-auto overflow-y-hidden px-2 py-2 lg:overflow-y-auto lg:px-2 lg:py-3">
            <div className="flex gap-2 lg:block">
              {presentation.slides.map((item, itemIndex) => {
                const active = itemIndex === index;
                return (
                  <button
                    key={itemIndex}
                    type="button"
                    onClick={() => go(itemIndex)}
                    className={
                      "group w-36 shrink-0 overflow-hidden rounded-xl border text-left transition-colors lg:mb-2 lg:w-full " +
                      (active
                        ? "border-white/35 bg-white/[0.08]"
                        : "border-white/[0.07] bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.04]")
                    }
                  >
                    <div className="aspect-video border-b border-white/[0.07] bg-[#0b0d12] p-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[7px] text-white/35">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                      </div>
                      <div className="mt-2 line-clamp-2 text-[8px] font-semibold leading-3 text-white/65">
                        {item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="order-1 flex min-h-0 min-w-0 items-center justify-center p-2 sm:p-4 lg:order-2 lg:p-6">
          <div className="w-full max-w-[1500px]">
            <div key={index} className="stackshade-slide-in">
              <SlideContent slide={slide} index={index} total={presentation.slides.length} />
            </div>
          </div>
        </div>
      </div>

      {pointer && (
        <div
          className="pointer-events-none absolute z-[70] h-4 w-4 rounded-full border-2 border-red-300 bg-red-500 shadow-[0_0_0_7px_rgba(239,68,68,.14)]"
          style={{ left: pointerPosition.x, top: pointerPosition.y, transform: "translate(-50%, -50%)" }}
        />
      )}

      <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-white/[0.08] px-2 py-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] sm:px-4 sm:py-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => go(index + 1)} disabled={index === presentation.slides.length - 1} aria-label="Next slide">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setUiState("autoplay", !autoplay)} aria-label="Toggle autoplay">
            {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setUiState("overview", true)} aria-label="Slide overview">
            <Grid2X2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setUiState("pointer", !pointer)} aria-label="Toggle pointer">
            <MousePointer2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setUiState("notes", !notes)} aria-label="Toggle presenter notes">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setElapsed(0)} aria-label="Reset timer">
            <TimerReset className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setUiState("overview", true)} aria-label="Open slide list">
            <FileText className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-9 bg-white px-3 text-black hover:bg-white/90" onClick={() => void toggleFullscreen()}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="ml-1.5 hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </Button>
        </div>
      </footer>

      {notes && (
        <section className="border-t border-white/[0.08] bg-[#0a0c10] px-4 py-3 text-xs leading-6 text-white/60 sm:px-5 sm:py-4">
          <div className="mb-1 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
            <StickyNote className="h-3.5 w-3.5" />
            Presenter notes
          </div>
          {slide.notes ?? "Speak to the visual, then let the learner predict the next state."}
        </section>
      )}

      {overview && (
        <div className="fixed inset-0 z-[60] overflow-auto bg-[#050608]/96 p-3 backdrop-blur-xl sm:p-6">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">Slide navigator</div>
                <div className="mt-1 text-lg font-black text-white">Choose a slide</div>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white/60 hover:bg-white/10 hover:text-white" onClick={() => setUiState("overview", false)} aria-label="Close slide overview">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {presentation.slides.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  type="button"
                  onClick={() => {
                    setUiState("overview", false);
                    go(itemIndex);
                  }}
                  className={
                    "rounded-2xl border p-2 text-left transition-colors " +
                    (itemIndex === index ? "border-white/30 bg-white/[0.07]" : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]")
                  }
                >
                  <div className="aspect-video rounded-xl border border-white/[0.07] bg-[#0b0d12] p-4">
                    <div className="font-mono text-[8px] text-white/30">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-4 line-clamp-3 text-sm font-bold leading-5 text-white/82">{item.title}</div>
                  </div>
                  <div className="px-1 pb-1 pt-2 text-[10px] text-white/45">{item.eyebrow}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
