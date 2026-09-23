import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
          <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
            <CoursePresentationPlayer
              presentation={presentation}
              backHref={"/courses/" + slug + "/" + lesson}
            />
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
