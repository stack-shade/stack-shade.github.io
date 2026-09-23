
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlarmClockCheck,
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
  Presentation,
  Puzzle,
  Repeat,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course, Lesson, courseStats } from "@/lib/courses-data";\nimport { CourseStudyTools } from "@/components/courses/course-study-tools";
import { presentationLessonSlug } from "@/lib/course-presentation";
import {
  CourseProgress,
  isDue,
  lessonId,
  loadProgress,
  markReviewed,
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
  const deckHref = "/courses/" + course.slug + "/present/" + slug;

  return (
    <div className={"lesson-row rounded-xl border p-3 transition-colors " + (itemProgress ? "border-border/60 bg-muted/10" : "border-border bg-background/30 hover:border-foreground/25")}>
      <button
        onClick={() => update(toggleLesson(progress, id))}
        aria-label={itemProgress ? "Mark lesson incomplete" : "Mark lesson complete"}
        className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
      >
        {itemProgress ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </button>

      <TypeIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

      <div className="lesson-row-main">
        <div className={"lesson-row-title text-xs font-semibold sm:text-sm " + (itemProgress ? "text-muted-foreground line-through decoration-border" : "text-foreground")}>
          {lesson.title}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
          <span>{meta.label}</span>
          <span aria-hidden="true">·</span>
          <span className="lesson-duration">{lesson.duration}</span>
          {itemProgress && <span className="lesson-review font-mono">{nextReviewLabel(itemProgress)}</span>}
        </div>
      </div>

      <div className="lesson-actions">
        <Link href={articleHref} className="lesson-action primary">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Read</span>
        </Link>
        <Link href={deckHref} className="lesson-action">
          <Presentation className="h-3.5 w-3.5" />
          <span>Deck</span>
        </Link>
      </div>

      <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
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

  const update = (next: CourseProgress) => {
    setProgress(next);
    saveProgress(course.slug, next);
  };

  const done = Object.keys(progress).length;
  const pct = progressPercent(stats.lessons, done);


