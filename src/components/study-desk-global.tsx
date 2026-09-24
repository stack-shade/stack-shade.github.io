"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, ExternalLink, Pause, Play, RotateCcw, Timer, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CourseStudyTools } from "@/components/courses/course-study-tools";
import { COURSES, getCourse } from "@/lib/courses-data";
import { loadProgress, saveProgress, type CourseProgress } from "@/lib/course-progress";
import { formatPomodoroClock, useStudyDesk } from "@/components/study-desk-provider";
import { usePathname } from "next/navigation";

const LAST_COURSE_KEY = "ss-study-last-course";

function courseSlugFromPath(pathname: string | null) {
  const parts = pathname?.split("/").filter(Boolean) ?? [];
  if (parts[0] !== "courses" || !parts[1]) return null;
  return getCourse(parts[1]) ? parts[1] : null;
}

export function StudyDeskGlobal() {
  const pathname = usePathname();
  const { pomodoro, togglePomodoro, resetPomodoro } = useStudyDesk();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [activeCourseSlug, setActiveCourseSlug] = useState<string | null>(null);
  const [progress, setProgress] = useState<CourseProgress>({});

  const routeCourseSlug = useMemo(() => courseSlugFromPath(pathname), [pathname]);

  useEffect(() => {
    try {
      const next = routeCourseSlug ?? window.localStorage.getItem(LAST_COURSE_KEY) ?? COURSES[0]?.slug ?? null;
      setActiveCourseSlug(next);
      if (routeCourseSlug) window.localStorage.setItem(LAST_COURSE_KEY, routeCourseSlug);
    } catch {
      setActiveCourseSlug(routeCourseSlug ?? COURSES[0]?.slug ?? null);
    }
  }, [routeCourseSlug]);

  const activeCourse = useMemo(
    () => (activeCourseSlug ? getCourse(activeCourseSlug) ?? null : null),
    [activeCourseSlug],
  );

  const reloadProgress = useCallback(() => {
    if (!activeCourse) {
      setProgress({});
      return;
    }
    setProgress(loadProgress(activeCourse.slug));
  }, [activeCourse]);

  useEffect(() => {
    reloadProgress();
  }, [reloadProgress]);

  useEffect(() => {
    const onProgressChange = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string }>).detail;
      if (!detail?.slug || detail.slug === activeCourse?.slug) reloadProgress();
    };
    const onStorage = (event: StorageEvent) => {
      if (!activeCourse || event.key === "ss-course-" + activeCourse.slug) reloadProgress();
    };

    window.addEventListener("ss-course-progress", onProgressChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("ss-course-progress", onProgressChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [activeCourse, reloadProgress]);

  const updateProgress = useCallback(
    (next: CourseProgress) => {
      if (!activeCourse) return;
      setProgress(next);
      saveProgress(activeCourse.slug, next);
    },
    [activeCourse],
  );

  const timerDuration =
    pomodoro.mode === "focus"
      ? pomodoro.focusMinutes * 60
      : pomodoro.focusMinutes === 50
        ? 10 * 60
        : 5 * 60;

  const hasSession =
    pomodoro.running ||
    pomodoro.mode === "break" ||
    pomodoro.remaining !== timerDuration;

  const timerTitle = pomodoro.mode === "focus" ? "Focus" : "Break";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-[80] inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/95 px-4 text-xs font-bold shadow-lg shadow-black/10 backdrop-blur-xl transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground/30"
        aria-label="Open Study Desk"
      >
        <Zap className="h-4 w-4" />
        <span className="hidden sm:inline">Study Desk</span>
        <span className="sm:hidden">Study</span>
        {pomodoro.running && (
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] tabular-nums">
            {formatPomodoroClock(pomodoro.remaining)}
          </span>
        )}
      </button>

      {hasSession && (
        <div className="fixed bottom-4 right-4 z-[80]">
          {preview && (
            <div className="absolute bottom-[4.4rem] right-0 w-[min(88vw,18rem)] rounded-2xl border border-border bg-background/95 p-3 shadow-2xl shadow-black/15 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="lesson-kicker">{timerTitle}</span>
                  <div className="mt-1 font-mono text-2xl font-black tabular-nums">
                    {formatPomodoroClock(pomodoro.remaining)}
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-[9px]">
                  {pomodoro.focusMinutes}/{pomodoro.focusMinutes === 50 ? 10 : 5}
                </Badge>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-foreground transition-[width]"
                  style={{
                    width:
                      Math.max(
                        0,
                        Math.min(100, ((timerDuration - pomodoro.remaining) / timerDuration) * 100),
                      ) + "%",
                  }}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => togglePomodoro(activeCourse?.slug)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[10px] font-bold text-background"
                >
                  {pomodoro.running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {pomodoro.running ? "Pause" : "Resume"}
                </button>
                <button
                  type="button"
                  onClick={resetPomodoro}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[10px] font-bold"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[10px] font-bold"
                >
                  Full desk
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setPreview((current) => !current)}
            className="grid h-14 w-14 place-items-center rounded-full border-2 border-foreground bg-background/95 shadow-xl shadow-black/15 backdrop-blur-xl transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-foreground/30"
            aria-label={preview ? "Hide Pomodoro preview" : "Show Pomodoro preview"}
            aria-expanded={preview}
          >
            <span className="flex flex-col items-center leading-none">
              <Timer className="mb-1 h-4 w-4" />
              <span className="font-mono text-[10px] font-black tabular-nums">
                {formatPomodoroClock(pomodoro.remaining)}
              </span>
            </span>
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[90]">
          <button
            type="button"
            aria-label="Close Study Desk"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"
          />
          <aside
            className="absolute right-0 top-0 flex h-full w-[min(94vw,42rem)] flex-col border-l border-border bg-background shadow-2xl shadow-black/20"
            aria-label="Study Desk"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span className="lesson-kicker">STUDY DESK</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="truncate text-sm font-black">
                    {activeCourse?.title ?? "Study workspace"}
                  </span>
                  {activeCourse && routeCourseSlug === activeCourse.slug && (
                    <Badge variant="outline" className="hidden font-mono text-[8px] sm:inline-flex">CURRENT</Badge>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {activeCourse && (
                  <a
                    href={"/courses/" + activeCourse.slug}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-[9px] font-bold hover:bg-muted/40"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Course
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted/40"
                  aria-label="Close Study Desk"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="border-b border-border/70 px-4 py-2.5 sm:px-5">
              <label className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                <ChevronDown className="h-3 w-3" />
                Workspace
                <select
                  value={activeCourse?.slug ?? ""}
                  onChange={(event) => {
                    const next = event.target.value || null;
                    setActiveCourseSlug(next);
                    if (next) {
                      try { window.localStorage.setItem(LAST_COURSE_KEY, next); } catch {}
                    }
                  }}
                  className="ml-auto max-w-[70%] rounded-lg border border-border bg-background px-2.5 py-1.5 text-[10px] font-semibold tracking-normal text-foreground outline-none"
                  aria-label="Select study workspace"
                >
                  {COURSES.map((course) => (
                    <option key={course.slug} value={course.slug}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
              {activeCourse ? (
                <CourseStudyTools
                  key={activeCourse.slug}
                  course={activeCourse}
                  progress={progress}
                  update={updateProgress}
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                  <Timer className="mx-auto h-6 w-6" />
                  <p className="mt-2 text-sm font-bold">Choose a course workspace.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
