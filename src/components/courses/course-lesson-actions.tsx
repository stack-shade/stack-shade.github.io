'use client';

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CourseProgress,
  loadProgress,
  lessonId,
  nextReviewLabel,
  saveProgress,
  toggleLesson,
} from "@/lib/course-progress";

export function CourseLessonActions({
  courseSlug,
  moduleIndex,
  lessonIndex,
}: {
  courseSlug: string;
  moduleIndex: number;
  lessonIndex: number;
}) {
  const [progress, setProgress] = useState<CourseProgress>({});
  const id = lessonId(moduleIndex, lessonIndex);
  const done = Boolean(progress[id]);

  useEffect(() => {
    setProgress(loadProgress(courseSlug));
  }, [courseSlug]);

  useEffect(() => {
    const onProgressChange = (event: Event) => {
      const detail = (event as CustomEvent<{ slug?: string }>).detail;
      if (detail?.slug === courseSlug) {
        setProgress(loadProgress(courseSlug));
      }
    };
    window.addEventListener("ss-course-progress", onProgressChange);
    return () => window.removeEventListener("ss-course-progress", onProgressChange);
  }, [courseSlug]);

  const toggle = () => {
    const next = toggleLesson(progress, id);
    setProgress(next);
    saveProgress(courseSlug, next);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={toggle} variant={done ? "secondary" : "default"} className="cursor-pointer">
        {done ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
        {done ? "Completed — keep the memory" : "Mark lesson complete"}
      </Button>
      {done && (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[10px] font-mono text-muted-foreground">
          <RotateCcw className="h-3 w-3" />
          Next review: {nextReviewLabel(progress[id])}
        </span>
      )}
    </div>
  );
}
