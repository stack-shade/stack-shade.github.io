import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Presentation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CoursePresentationPlayer } from "@/components/courses/course-presentation-player";
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

  const url = `https://stack-shade.github.io/courses/${slug}/present/${lesson}`;
  return {
    title: `${presentation.lesson.title} — Presentation Mode — StackShade`,
    description: `Screen-recordable teaching presentation for ${presentation.lesson.title}, inside ${course.title}.`,
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
    <main className="min-h-screen bg-[#050608] text-white">
      <div className="mx-auto max-w-[1600px] px-2 py-2 sm:px-4 sm:py-4">
        <div className="mb-2 flex items-center justify-between gap-2 px-2">
          <Link href={`/courses/${slug}`} className="inline-flex items-center text-xs font-semibold text-white/45 hover:text-white">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to course
          </Link>
          <Badge variant="outline" className="border-white/10 bg-white/[0.03] text-[9px] text-white/45">
            <Presentation className="mr-1.5 h-3 w-3" /> Presentation Mode
          </Badge>
        </div>
        <CoursePresentationPlayer presentation={presentation} />
      </div>
    </main>
  );
}
