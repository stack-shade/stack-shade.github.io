import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Presentation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CourseCurriculumRail } from "@/components/courses/course-curriculum-rail";
import { CoursePresentationPlayer } from "@/components/courses/course-presentation-player";
import { LibraryFrame } from "@/components/library-frame";
import { COURSES, getCourse } from "@/lib/courses-data";
import { getAllPresentationParams, getPresentationBySlug } from "@/lib/course-presentation";

interface PageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

export function generateStaticParams() {
  return getAllPresentationParams(COURSES);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lesson } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const presentation = getPresentationBySlug(course, lesson);
  if (!presentation) return {};

  const url = "https://stack-shade.github.io/courses/" + slug + "/present/" + lesson;
  return {
    title: presentation.lesson.title + " — Presentation Mode — StackShade",
    description:
      "Screen-recordable teaching presentation for " +
      presentation.lesson.title +
      ", inside " +
      course.title +
      ".",
    alternates: { canonical: url },
    robots: { index: false, follow: true },
  };
}

export default async function CoursePresentationPage({ params }: PageProps) {
  const { slug, lesson } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const presentation = getPresentationBySlug(course, lesson);
  if (!presentation) notFound();

  return (
    <LibraryFrame>
      <main className="presentation-page bg-[#050608] text-white">
        <div className="presentation-page-grid">
          <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-2 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
              <Link
                href={"/courses/" + slug + "/" + lesson}
                className="inline-flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-white/45 hover:text-white sm:text-xs"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">Back to topic</span>
              </Link>

              <div className="flex shrink-0 items-center gap-1.5">
                <Link
                  href={"/courses/" + slug + "/" + lesson}
                  className="hidden items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold text-white/55 hover:bg-white/[0.06] hover:text-white sm:inline-flex"
                >
                  <BookOpen className="h-3 w-3" />
                  Read
                </Link>
                <Badge variant="outline" className="border-white/[0.1] bg-white/[0.03] text-[8px] text-white/45">
                  <Presentation className="mr-1.5 h-3 w-3" />
                  PowerPoint mode
                </Badge>
              </div>
            </div>

            <CoursePresentationPlayer presentation={presentation} />
          </div>

          <div className="presentation-page-rail">
            <CourseCurriculumRail
              course={course}
              currentModuleIndex={presentation.moduleIndex}
              currentLessonIndex={presentation.lessonIndex}
              mode="presentation"
            />
          </div>
        </div>
      </main>
    </LibraryFrame>
  );
}
