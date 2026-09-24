
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Circle,
  FlaskConical,
  GraduationCap,
  MonitorPlay,
  PenLine,
  Puzzle,
  Repeat,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Course, Lesson, courseStats } from "@/lib/courses-data";
import { CourseStudyTools } from "@/components/courses/course-study-tools";
import { presentationLessonSlug } from "@/lib/course-presentation";
import {
  CourseProgress,
  lessonId,
  loadProgress,
  nextReviewLabel,
  progressPercent,
  saveProgress,
  toggleLesson,
} from "@/lib/course-progress";

const TYPE_META: Record<
  Lesson["type"],
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  video: { label: "Video", icon: MonitorPlay },
  article: { label: "Read", icon: BookOpen },
  interactive: { label: "Interactive", icon: Puzzle },
  practice: { label: "Practice", icon: PenLine },
  project: { label: "Project", icon: Wrench },
  quiz: { label: "Quiz", icon: BrainCircuit },
};

const SCIENCE = [
  ["Retrieval", "Recall before revealing. The attempt is part of the learning action."],
  ["Spacing", "Return at increasing intervals instead of rereading everything immediately."],
  ["Generation", "Predict the next state or answer before seeing the worked version."],
  ["Dual coding", "Pair compact prose with diagrams, traces, tables and motion."],
  ["Feynman", "Teach the idea back in plain language to expose missing links."],
  ["Interleaving", "Contrast nearby problem types so recognition becomes more useful."],
];

function LessonRow({
  course,
  lesson,
  moduleIndex,
  lessonIndex,
  progress,
  update,
}: {
  course: Course;
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
  progress: CourseProgress;
  update: (next: CourseProgress) => void;
}) {
  const id = lessonId(moduleIndex, lessonIndex);
  const itemProgress = progress[id];
  const meta = TYPE_META[lesson.type];
  const TypeIcon = meta.icon;
  const slug = presentationLessonSlug(moduleIndex, lessonIndex, lesson.title);
  const articleHref = "/courses/" + course.slug + "/" + slug;

  return (
    <div className={"lesson-row group rounded-xl border p-3 transition-colors " + (itemProgress ? "border-border/60 bg-muted/10" : "border-border bg-background/30 hover:border-foreground/25")}>
      <button
        onClick={() => update(toggleLesson(progress, id))}
        aria-label={itemProgress ? "Mark lesson incomplete" : "Mark lesson complete"}
        className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
      >
        {itemProgress ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </button>

      <TypeIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

      <Link
        href={articleHref}
        className="lesson-row-main min-w-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
        aria-label={"Open lesson: " + lesson.title}
      >
        <div className={"lesson-row-title text-xs font-semibold sm:text-sm " + (itemProgress ? "text-muted-foreground line-through decoration-border" : "text-foreground")}>
          {lesson.title}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
          <span>{meta.label}</span>
          <span aria-hidden="true">·</span>
          <span className="lesson-duration">{lesson.duration}</span>
          {itemProgress && <span className="lesson-review font-mono">{nextReviewLabel(itemProgress)}</span>}
        </div>
      </Link>

      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </div>
  );
}

export function CourseStudy({ course }: { course: Course }) {
  const [progress, setProgress] = useState<CourseProgress>({});
  const [loaded, setLoaded] = useState(false);
  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));
  const stats = courseStats(course);

  useEffect(() => {
    setProgress(loadProgress(course.slug));
    setLoaded(true);
  }, [course.slug]);

  useEffect(() => {
    const onProgressChange = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string }>).detail;
      if (detail?.slug === course.slug) {
        setProgress(loadProgress(course.slug));
      }
    };
    window.addEventListener("ss-course-progress", onProgressChange);
    return () => window.removeEventListener("ss-course-progress", onProgressChange);
  }, [course.slug]);

  const update = (next: CourseProgress) => {
    setProgress(next);
    saveProgress(course.slug, next);
  };

  const done = Object.keys(progress).length;
  const pct = progressPercent(stats.lessons, done);


  return (
    <div className="course-study-shell">
      <Card className="course-study-progress">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 shrink-0" />
                <span className="text-sm font-bold">
                  {loaded ? done + " of " + stats.lessons + " complete" : "Loading progress…"}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                Read → predict → inspect → retrieve. Your progress stays on this device.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant="outline" className="font-mono text-[9px]">{pct}%</Badge>
              {done > 0 && (
                <button
                  onClick={() => update({})}
                  className="hidden items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              )}
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-foreground transition-all duration-700" style={{ width: pct + "%" }} />
          </div>
        </CardContent>
      </Card>

      <section id="curriculum" className="scroll-mt-24">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <span className="lesson-kicker">CURRICULUM</span>
            <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Pick a topic</h2>
          </div>
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">
            {stats.modules} modules · {stats.lessons} lessons
          </span>
        </div>

        <div className="space-y-3">
          {course.modules.map((module, moduleIndex) => {
            const moduleDone = module.lessons.filter((_, lessonIndex) => progress[lessonId(moduleIndex, lessonIndex)]).length;
            const modulePct = progressPercent(module.lessons.length, moduleDone);
            const open = openModules.has(moduleIndex);

            return (
              <Card key={module.title} className={"border transition-all " + (open ? "border-foreground/25 bg-card/35" : "border-border bg-card/20")}>
                <CardContent className="p-0">
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 p-4 text-left sm:p-5"
                    onClick={() => setOpenModules((current) => {
                      const next = new Set(current);
                      if (next.has(moduleIndex)) next.delete(moduleIndex);
                      else next.add(moduleIndex);
                      return next;
                    })}
                    aria-expanded={open}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border font-mono text-[10px]">
                      {String(moduleIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold sm:text-base">{module.title}</span>
                        <Badge variant="outline" className="font-mono text-[8px]">{module.phase}</Badge>
                      </span>
                      <span className="mt-1 block truncate text-[11px] text-muted-foreground">{module.hook}</span>
                    </span>
                    <span className="hidden w-20 shrink-0 sm:block">
                      <span className="block h-1.5 overflow-hidden rounded-full bg-border">
                        <span className="block h-full bg-foreground transition-all" style={{ width: modulePct + "%" }} />
                      </span>
                      <span className="mt-1 block text-right font-mono text-[9px] text-muted-foreground">{moduleDone}/{module.lessons.length}</span>
                    </span>
                    <ChevronDown className={"h-4 w-4 shrink-0 text-muted-foreground transition-transform " + (open ? "rotate-180" : "")} />
                  </button>

                  {open && (
                    <div className="border-t border-border/70 p-3 sm:p-4">
                      <div className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <LessonRow
                            key={lessonId(moduleIndex, lessonIndex)}
                            course={course}
                            lesson={lesson}
                            moduleIndex={moduleIndex}
                            lessonIndex={lessonIndex}
                            progress={progress}
                            update={update}
                          />
                        ))}
                      </div>

                      <div className="mt-3 grid gap-3 lg:grid-cols-2">
                        <div className="rounded-xl border border-border bg-muted/10 p-3">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            <span className="lesson-kicker">FEYNMAN PROMPT</span>
                          </div>
                          <p className="mt-2 text-xs leading-6 text-muted-foreground">{module.feynman}</p>
                        </div>
                        <div className="rounded-xl border border-border bg-muted/10 p-3">
                          <div className="flex items-center gap-2">
                            <Repeat className="h-4 w-4" />
                            <span className="lesson-kicker">ACTIVE RECALL</span>
                          </div>
                          <div className="mt-2 space-y-2">
                            {module.recall.slice(0, 2).map((item) => (
                              <details key={item.q} className="rounded-lg border border-border bg-background/30 p-2.5">
                                <summary className="cursor-pointer list-none text-[11px] font-semibold">{item.q}</summary>
                                <p className="mt-2 border-t border-border/60 pt-2 text-[11px] leading-5 text-muted-foreground">{item.a}</p>
                              </details>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <CourseStudyTools course={course} progress={progress} update={update} />



      <section id="study-loop" className="scroll-mt-24 rounded-2xl border border-border bg-card/25 p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              <span className="lesson-kicker">STUDY LOOP</span>
            </div>
            <h2 className="mt-1 text-xl font-black tracking-tight">Designed around learning, not scrolling</h2>
          </div>
          <p className="max-w-xl text-xs leading-6 text-muted-foreground">
            Each topic now has the full loop: article, visual explanation, artifact, retrieval and a recordable presentation.
          </p>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SCIENCE.map(([name, how]) => (
            <div key={name} className="rounded-xl border border-border bg-background/25 p-3">
              <div className="text-xs font-bold">{name}</div>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{how}</p>
            </div>
          ))}
        </div>
      </section>

      </section>
    </div>
  );
}
