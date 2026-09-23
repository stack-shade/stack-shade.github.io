import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronRight, Circle, Presentation } from "lucide-react";
import type { Course } from "@/lib/courses-data";
import { lessonId } from "@/lib/course-progress";
import { presentationLessonSlug } from "@/lib/course-presentation";

interface Props {
  course: Course;
  currentModuleIndex: number;
  currentLessonIndex: number;
  mode?: "article" | "presentation";
}

export function CourseCurriculumRail({
  course,
  currentModuleIndex,
  currentLessonIndex,
  mode = "article",
}: Props) {
  const current = course.modules[currentModuleIndex]?.lessons[currentLessonIndex];
  const label = current?.title ?? "Course contents";

  return (
    <div className="course-curriculum-rail">
      <details className="course-learning-card lg:hidden" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <span className="lesson-kicker">COURSE CONTENTS</span>
            <p className="mt-1 truncate text-sm font-bold">{label}</p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
        </summary>
        <div className="max-h-[55svh] overflow-auto border-t border-border/70 p-2.5">
          <CurriculumList
            course={course}
            currentModuleIndex={currentModuleIndex}
            currentLessonIndex={currentLessonIndex}
            mode={mode}
          />
        </div>
      </details>

      <aside className="course-learning-sidebar hidden lg:block">
        <div className="course-learning-card overflow-hidden">
          <div className="course-curriculum-header">
            <div className="min-w-0">
              <span className="lesson-kicker">COURSE CONTENTS</span>
              <p className="mt-1 truncate text-sm font-bold">{label}</p>
            </div>
            {mode === "presentation" ? (
              <Presentation className="h-4 w-4 shrink-0 text-muted-foreground" />
            ) : (
              <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </div>
          <div className="max-h-[calc(100svh-7rem)] overflow-auto p-2.5">
            <CurriculumList
              course={course}
              currentModuleIndex={currentModuleIndex}
              currentLessonIndex={currentLessonIndex}
              mode={mode}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

function CurriculumList({
  course,
  currentModuleIndex,
  currentLessonIndex,
  mode,
}: Props) {
  return (
    <div className="space-y-2">
      {course.modules.map((module, moduleIndex) => {
        const isCurrentModule = moduleIndex === currentModuleIndex;
        const moduleDone = 0;

        return (
          <details key={module.title} open={isCurrentModule} className="course-curriculum-module">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-muted/40">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border font-mono text-[8px]">
                {String(moduleIndex + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-bold">{module.title}</span>
                <span className="mt-0.5 block truncate font-mono text-[8px] text-muted-foreground">
                  {module.phase} · {module.lessons.length} topics
                </span>
              </span>
              <span className="text-[8px] text-muted-foreground">{moduleDone}/{module.lessons.length}</span>
            </summary>

            <div className="space-y-1 px-1 pt-1">
              {module.lessons.map((lesson, lessonIndex) => {
                const slug = presentationLessonSlug(moduleIndex, lessonIndex, lesson.title);
                const href =
                  mode === "presentation"
                    ? "/courses/" + course.slug + "/present/" + slug
                    : "/courses/" + course.slug + "/" + slug;
                const active =
                  moduleIndex === currentModuleIndex && lessonIndex === currentLessonIndex;

                return (
                  <Link
                    key={lessonId(moduleIndex, lessonIndex)}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={
                      "group flex items-start gap-2 rounded-lg border px-2.5 py-2 text-[10px] leading-4 transition-colors " +
                      (active
                        ? "border-foreground/25 bg-foreground/[0.07] text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/30 hover:text-foreground")
                    }
                  >
                    <span className="mt-0.5 shrink-0">
                      {active ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 opacity-35" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block">{lesson.title}</span>
                      <span className="mt-0.5 block font-mono text-[8px] opacity-60">{lesson.duration}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}
