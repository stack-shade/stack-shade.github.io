"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Flame,
  NotebookPen,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Target,
  Timer,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/courses-data";
import {
  CourseProgress,
  REVIEW_INTERVALS_DAYS,
  isDue,
  lessonId,
  nextReviewLabel,
  progressPercent,
  reviewLesson,
} from "@/lib/course-progress";
import { presentationLessonSlug } from "@/lib/course-presentation";
import { formatPomodoroClock, useStudyDesk } from "@/components/study-desk-provider";

type ToolTab = "focus" | "review" | "today" | "notes";

interface DeskState {
  notes: string;
  dailyTarget: number;
  focusSessionsByDay: Record<string, number>;
}

interface Props {
  course: Course;
  progress: CourseProgress;
  update: (next: CourseProgress) => void;
}

const DEFAULT_DESK_STATE: DeskState = {
  notes: "",
  dailyTarget: 3,
  focusSessionsByDay: {},
};

const TOOL_TABS: { id: ToolTab; label: string; icon: typeof Timer; hint: string }[] = [
  { id: "focus", label: "Focus", icon: Timer, hint: "Pomodoro + one task" },
  { id: "review", label: "Review", icon: RefreshCw, hint: "Spaced repetition" },
  { id: "today", label: "Today", icon: Target, hint: "Daily study plan" },
  { id: "notes", label: "Notes", icon: NotebookPen, hint: "Quick scratchpad" },
];

function deskKey(slug: string) {
  return "ss-study-desk-" + slug;
}

function localDayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function startOfLocalDay() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function readDeskState(slug: string): DeskState {
  if (typeof window === "undefined") return DEFAULT_DESK_STATE;
  try {
    const raw = window.localStorage.getItem(deskKey(slug));
    if (!raw) return DEFAULT_DESK_STATE;
    const parsed = JSON.parse(raw) as Partial<DeskState>;
    return {
      notes: typeof parsed.notes === "string" ? parsed.notes : "",
      dailyTarget:
        typeof parsed.dailyTarget === "number" && Number.isFinite(parsed.dailyTarget)
          ? Math.min(8, Math.max(1, Math.round(parsed.dailyTarget)))
          : 3,
      focusSessionsByDay:
        parsed.focusSessionsByDay && typeof parsed.focusSessionsByDay === "object"
          ? parsed.focusSessionsByDay as Record<string, number>
          : {},
    };
  } catch {
    return DEFAULT_DESK_STATE;
  }
}

function persistDeskState(slug: string, state: DeskState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(deskKey(slug), JSON.stringify(state));
  } catch {
    // Local-only study data is best-effort.
  }
}

export function CourseStudyTools({ course, progress, update }: Props) {
  const [tab, setTab] = useState<ToolTab>("focus");
  const [desk, setDesk] = useState<DeskState>(DEFAULT_DESK_STATE);
  const [deskLoaded, setDeskLoaded] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const {
    pomodoro,
    togglePomodoro,
    setPomodoroPreset,
    resetPomodoro,
  } = useStudyDesk();

  const lessons = useMemo(
    () =>
      course.modules.flatMap((courseModule, moduleIndex) =>
        courseModule.lessons.map((lesson, lessonIndex) => {
          const slug = presentationLessonSlug(moduleIndex, lessonIndex, lesson.title);
          return {
            id: lessonId(moduleIndex, lessonIndex),
            title: lesson.title,
            module: courseModule.title,
            href: "/courses/" + course.slug + "/" + slug,
          };
        }),
      ),
    [course],
  );

  const todayKey = localDayKey();
  const startOfToday = startOfLocalDay();

  useEffect(() => {
    const loaded = readDeskState(course.slug);
    setDesk(loaded);
    setDeskLoaded(true);
  }, [course.slug]);

  useEffect(() => {
    const onDeskChange = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string }>).detail;
      if (detail?.slug === course.slug) {
        setDesk(readDeskState(course.slug));
      }
    };
    window.addEventListener("ss-study-desk-change", onDeskChange);
    return () => window.removeEventListener("ss-study-desk-change", onDeskChange);
  }, [course.slug]);

  const patchDesk = useCallback(
    (mutate: (current: DeskState) => DeskState) => {
      setDesk((current) => {
        const next = mutate(current);
        persistDeskState(course.slug, next);
        return next;
      });
    },
    [course.slug],
  );

  const firstIncomplete = useMemo(
    () => lessons.find((lesson) => !progress[lesson.id]) ?? null,
    [lessons, progress],
  );

  useEffect(() => {
    if (!selectedLessonId || !lessons.some((lesson) => lesson.id === selectedLessonId)) {
      setSelectedLessonId(firstIncomplete?.id ?? null);
      return;
    }

    if (progress[selectedLessonId]) {
      setSelectedLessonId(firstIncomplete?.id ?? null);
    }
  }, [firstIncomplete, lessons, progress, selectedLessonId]);

  const selectedLesson =
    lessons.find((lesson) => lesson.id === selectedLessonId) ??
    firstIncomplete ??
    lessons[0] ??
    null;

  const completedToday = useMemo(
    () =>
      Object.values(progress).filter(
        (item) => item.completedAt >= startOfToday,
      ).length,
    [progress, startOfToday],
  );

  const dueItems = useMemo(
    () =>
      lessons
        .map((lesson) => ({ lesson, progress: progress[lesson.id] }))
        .filter(
          (item): item is { lesson: (typeof lessons)[number]; progress: NonNullable<CourseProgress[string]> } =>
            Boolean(item.progress && isDue(item.progress)),
        ),
    [lessons, progress],
  );

  const masteredCount = useMemo(
    () =>
      Object.values(progress).filter(
        (item) => item.reviews >= REVIEW_INTERVALS_DAYS.length,
      ).length,
    [progress],
  );

  const reviewableCount = Object.keys(progress).length;
  const upcomingCount = Math.max(
    0,
    reviewableCount - dueItems.length - masteredCount,
  );

  const focusMinutes = pomodoro.focusMinutes;
  const focusMode = pomodoro.mode;
  const remaining = pomodoro.remaining;
  const running = pomodoro.running;
  const focusWorkSeconds = focusMinutes * 60;
  const focusBreakSeconds = focusMinutes === 50 ? 10 * 60 : 5 * 60;
  const focusDuration = focusMode === "focus" ? focusWorkSeconds : focusBreakSeconds;
  const focusElapsed = Math.max(0, focusDuration - remaining);
  const focusPercent = focusDuration
    ? Math.min(100, Math.round((focusElapsed / focusDuration) * 100))
    : 0;
  const sessionsToday = desk.focusSessionsByDay[todayKey] ?? 0;
  const notesWordCount = desk.notes.trim()
    ? desk.notes.trim().split(/\s+/).filter(Boolean).length
    : 0;

  if (!deskLoaded) {
    return (
      <section className="rounded-2xl border border-border bg-card/20 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Timer className="h-4 w-4" />
          Loading study desk…
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card/25">
      <div className="border-b border-border/80 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="lesson-kicker">STUDY DESK</span>
            </div>
            <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
              Learn it. Work it. Remember it.
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
              Everything you need between lessons: focused work, deliberate review, a realistic daily target, and a place to think.
            </p>
          </div>

          <div className="hidden items-center gap-2 font-mono text-[9px] text-muted-foreground lg:flex">
            <span>{sessionsToday} focus session{sessionsToday === 1 ? "" : "s"} today</span>
            <span aria-hidden="true">·</span>
            <span>{dueItems.length} due</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl border border-border bg-background/30 p-1 lg:grid-cols-4" role="tablist" aria-label="Study tools">
          {TOOL_TABS.map((tool) => {
            const Icon = tool.icon;
            const active = tab === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(tool.id)}
                className={
                  "min-w-0 rounded-lg px-2.5 py-2.5 text-left transition-colors " +
                  (active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted/45 hover:text-foreground")
                }
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold">{tool.label}</span>
                </span>
                <span
                  className={
                    "mt-1 block truncate font-mono text-[8px] " +
                    (active ? "text-background/60" : "text-muted-foreground")
                  }
                >
                  {tool.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {tab === "focus" && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="rounded-2xl border border-border bg-background/30 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <Badge variant="outline" className="font-mono text-[9px]">
                    {focusMode === "focus" ? "FOCUS" : "BREAK"}
                  </Badge>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {focusMode === "focus"
                      ? "One problem or one concept. Nothing else."
                      : "Step away. Let the last block settle."}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {[25, 50].map((minutes) => (
                    <button
                      key={minutes}
                      type="button"
                      disabled={running}
                      onClick={() => setPomodoroPreset(minutes, course.slug)}
                      className={
                        "rounded-lg border px-2.5 py-1.5 font-mono text-[9px] transition-colors " +
                        (focusMinutes === minutes
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:text-foreground") +
                        (running ? " cursor-not-allowed opacity-50" : "")
                      }
                    >
                      {minutes}/{minutes === 50 ? 10 : 5}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="font-mono text-[clamp(3.8rem,10vw,7rem)] font-black leading-none tracking-[-0.06em] tabular-nums">
                  {formatPomodoroClock(remaining)}
                </div>
                <div className="mx-auto mt-4 h-2 max-w-xl overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-foreground transition-[width] duration-700"
                    style={{ width: focusPercent + "%" }}
                  />
                </div>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
                  {focusPercent}% of {focusMode} block
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <Button
                  onClick={() => togglePomodoro(course.slug)}
                  className="min-w-28 cursor-pointer"
                >
                  {running ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {running ? "Pause" : focusElapsed > 0 ? "Resume" : "Start"}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetPomodoro}
                  className="cursor-pointer"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="mt-5 text-center text-[10px] text-muted-foreground">
                Finish a focus block to log a session automatically.
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="lesson-kicker">CURRENT TASK</span>
                </div>
                <select
                  value={selectedLesson?.id ?? ""}
                  onChange={(event) => setSelectedLessonId(event.target.value || null)}
                  className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-semibold outline-none focus:border-foreground"
                  aria-label="Choose focus task"
                >
                  {lessons.length === 0 && <option value="">No lessons</option>}
                  {lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))}
                </select>
                {selectedLesson && (
                  <>
                    <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                      {selectedLesson.module}
                    </p>
                    <Link
                      href={selectedLesson.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold hover:underline"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Open lesson
                    </Link>
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  <span className="lesson-kicker">TODAY</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-border bg-background/30 p-3">
                    <div className="text-lg font-black tabular-nums">{sessionsToday}</div>
                    <div className="mt-1 font-mono text-[8px] text-muted-foreground">FOCUS BLOCKS</div>
                  </div>
                  <div className="rounded-xl border border-border bg-background/30 p-3">
                    <div className="text-lg font-black tabular-nums">{completedToday}</div>
                    <div className="mt-1 font-mono text-[8px] text-muted-foreground">LESSONS DONE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "review" && (
          <div className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-background/30 p-3">
                <div className="text-lg font-black tabular-nums">{dueItems.length}</div>
                <div className="mt-1 font-mono text-[8px] text-muted-foreground">DUE NOW</div>
              </div>
              <div className="rounded-xl border border-border bg-background/30 p-3">
                <div className="text-lg font-black tabular-nums">{upcomingCount}</div>
                <div className="mt-1 font-mono text-[8px] text-muted-foreground">UPCOMING</div>
              </div>
              <div className="rounded-xl border border-border bg-background/30 p-3">
                <div className="text-lg font-black tabular-nums">{masteredCount}</div>
                <div className="mt-1 font-mono text-[8px] text-muted-foreground">MASTERED</div>
              </div>
              <div className="rounded-xl border border-border bg-background/30 p-3">
                <div className="text-lg font-black tabular-nums">{reviewableCount}</div>
                <div className="mt-1 font-mono text-[8px] text-muted-foreground">IN REVIEW SYSTEM</div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-3.5">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                <span className="text-xs font-bold">Review ladder</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {REVIEW_INTERVALS_DAYS.map((days, index) => (
                  <span key={days} className="inline-flex items-center gap-1">
                    <span className="rounded-full border border-border bg-background/50 px-2.5 py-1 font-mono text-[9px]">
                      {days}d
                    </span>
                    {index < REVIEW_INTERVALS_DAYS.length - 1 && (
                      <span className="text-[9px] text-muted-foreground">→</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                Rate your recall instead of blindly marking a topic complete. The next interval is based on the rating.
              </p>
            </div>

            {dueItems.length > 0 ? (
              <div className="space-y-2">
                {dueItems.slice(0, 8).map(({ lesson, progress: item }) => (
                  <div
                    key={lesson.id}
                    className="rounded-xl border border-border bg-background/30 p-3.5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold">{lesson.title}</p>
                        <p className="mt-1 truncate font-mono text-[8px] text-muted-foreground">
                          {lesson.module} · {nextReviewLabel(item)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <Link
                          href={lesson.href}
                          className="mr-1 inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[9px] font-bold hover:bg-muted/40"
                        >
                          <BookOpen className="h-3 w-3" />
                          Open
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => update(reviewLesson(progress, lesson.id, "again"))}
                          className="h-7 px-2 text-[9px]"
                        >
                          Again
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => update(reviewLesson(progress, lesson.id, "good"))}
                          className="h-7 px-2 text-[9px]"
                        >
                          Good
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => update(reviewLesson(progress, lesson.id, "easy"))}
                          className="h-7 px-2 text-[9px]"
                        >
                          Easy
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {dueItems.length > 8 && (
                  <p className="pt-1 text-center font-mono text-[9px] text-muted-foreground">
                    + {dueItems.length - 8} more due
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center">
                <CheckCircle2 className="mx-auto h-6 w-6" />
                <p className="mt-2 text-sm font-bold">Nothing is due right now.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Finish a lesson and return on its scheduled review day.
                </p>
              </div>
            )}
          </div>
        )}

        {tab === "today" && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="rounded-2xl border border-border bg-background/30 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="lesson-kicker">DAILY PLAN</span>
                  <h3 className="mt-1 text-lg font-black">
                    {completedToday} / {desk.dailyTarget} lessons
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Small enough to finish. Large enough to move the course.
                  </p>
                </div>
                <Badge variant="outline" className="font-mono text-[9px]">
                  {progressPercent(desk.dailyTarget, completedToday)}%
                </Badge>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-foreground transition-all"
                  style={{
                    width:
                      Math.min(
                        100,
                        progressPercent(desk.dailyTarget, completedToday),
                      ) + "%",
                  }}
                />
              </div>

              <div className="mt-5">
                <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                  Daily target
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((target) => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => patchDesk((current) => ({ ...current, dailyTarget: target }))}
                      className={
                        "grid h-9 w-9 place-items-center rounded-lg border font-mono text-[9px] transition-colors " +
                        (desk.dailyTarget === target
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:text-foreground")
                      }
                    >
                      {target}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span className="lesson-kicker">NEXT UP</span>
                </div>
                {selectedLesson ? (
                  <>
                    <p className="mt-2 text-xs font-bold leading-5">{selectedLesson.title}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{selectedLesson.module}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={selectedLesson.href}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[9px] font-bold hover:bg-muted/40"
                      >
                        <BookOpen className="h-3 w-3" />
                        Continue
                      </Link>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setTab("focus")}
                        className="h-7 text-[9px]"
                      >
                        <Timer className="mr-1.5 h-3 w-3" />
                        Focus
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-xs text-muted-foreground">
                    You have no incomplete lessons left. Use Review to keep the course fresh.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span className="lesson-kicker">REVIEW QUEUE</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {dueItems.length === 0
                    ? "No reviews due. Keep learning."
                    : dueItems.length + " topic" + (dueItems.length === 1 ? "" : "s") + " waiting for retrieval."}
                </p>
                <button
                  type="button"
                  onClick={() => setTab("review")}
                  className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-bold hover:underline"
                >
                  Open review queue
                  <RefreshCw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "notes" && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="rounded-2xl border border-border bg-background/30 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="lesson-kicker">SCRATCHPAD</span>
                  <h3 className="mt-1 text-lg font-black">Think before you forget it.</h3>
                </div>
                <Badge variant="outline" className="font-mono text-[9px]">
                  {notesWordCount} words
                </Badge>
              </div>
              <textarea
                value={desk.notes}
                onChange={(event) =>
                  patchDesk((current) => ({ ...current, notes: event.target.value }))
                }
                placeholder="Write a pattern in your own words, a mistake you made, an edge case, or a question to revisit…"
                className="mt-4 min-h-64 w-full resize-y rounded-xl border border-border bg-background/40 p-3 text-xs leading-6 outline-none placeholder:text-muted-foreground/70 focus:border-foreground sm:min-h-72"
              />
              <p className="mt-2 text-[9px] text-muted-foreground">
                Saved automatically on this device.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <NotebookPen className="h-4 w-4" />
                  <span className="lesson-kicker">GOOD NOTE PROMPTS</span>
                </div>
                <div className="mt-3 space-y-2 text-[10px] leading-5 text-muted-foreground">
                  <p>What clue tells me this is this pattern?</p>
                  <p>What would make my first approach fail?</p>
                  <p>Can I explain the invariant without code?</p>
                  <p>What edge case would break my intuition?</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4" />
                  <span className="lesson-kicker">PAIR IT WITH RETRIEVAL</span>
                </div>
                <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                  After writing, close the note and answer the module recall questions from memory. The note is for compression, not rereading.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
