import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CourseLessonActions } from "@/components/courses/course-lesson-actions";
import { CourseCurriculumRail } from "@/components/courses/course-curriculum-rail";
import { ComputerNetworkVisual } from "@/components/courses/computer-network-visual";
import { LessonArticle } from "@/components/courses/lesson-article";
import { LessonMediaHub } from "@/components/courses/lesson-media-hub";
import { getCourse, COURSES } from "@/lib/courses-data";
import { presentationLessonSlug } from "@/lib/course-presentation";
import { getComputerNetworkLesson } from "@/lib/computer-networks-lessons";
import { getLessonContent } from "@/lib/course-lesson-content";
import LessonPracticePanel from "@/components/courses/lesson-practice-panel";
import LessonResourcesPanel from "@/components/courses/lesson-resources-panel";

interface PageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

function findLesson(slug: string, lessonSlug: string) {
  const course = getCourse(slug);
  if (!course) return null;

  for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex += 1) {
    const courseModule = course.modules[moduleIndex];
    for (let lessonIndex = 0; lessonIndex < courseModule.lessons.length; lessonIndex += 1) {
      const lesson = courseModule.lessons[lessonIndex];
      const generatedSlug = presentationLessonSlug(moduleIndex, lessonIndex, lesson.title);
      const legacySlug = lesson.href?.split("/").filter(Boolean).at(-1);
      if (generatedSlug === lessonSlug || legacySlug === lessonSlug) {
        return {
          course,
          module: courseModule,
          lesson,
          moduleIndex,
          lessonIndex,
          generatedSlug,
          legacySlug,
        };
      }
    }
  }

  return null;
}

export function generateStaticParams() {
  return COURSES.flatMap((course) =>
    course.modules.flatMap((module, moduleIndex) =>
      module.lessons.flatMap((lesson, lessonIndex) => {
        const generatedSlug = presentationLessonSlug(moduleIndex, lessonIndex, lesson.title);
        const legacySlug = lesson.href?.split("/").filter(Boolean).at(-1);
        return [
          { slug: course.slug, lesson: generatedSlug },
          ...(legacySlug ? [{ slug: course.slug, lesson: legacySlug }] : []),
        ];
      }),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lesson: lessonSlug } = await params;
  const found = findLesson(slug, lessonSlug);
  if (!found) return {};

  const richSlug =
    slug === "computer-networks" && found.lesson.href
      ? found.lesson.href.split("/").filter(Boolean).at(-1)
      : undefined;
  const rich = richSlug ? getComputerNetworkLesson(richSlug) : undefined;
  const content = getLessonContent(
    found.course,
    found.module,
    found.lesson,
    found.moduleIndex,
    found.lessonIndex,
    rich,
  );

  const url = "https://stack-shade.github.io/courses/" + slug + "/" + lessonSlug;

  return {
    title: content.title + " — " + found.course.title + " — StackShade",
    description: content.overview,
    alternates: { canonical: url },
    openGraph: {
      title: content.title + " — " + found.course.title,
      description: content.overview,
      url,
      siteName: "StackShade",
      images: [
        {
          url: "https://stack-shade.github.io/og-image.svg",
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.overview,
      images: ["https://stack-shade.github.io/og-image.svg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CourseLessonPage({ params }: PageProps) {
  const { slug, lesson: lessonSlug } = await params;
  const found = findLesson(slug, lessonSlug);
  if (!found) notFound();

  const richSlug =
    slug === "computer-networks" && found.lesson.href
      ? found.lesson.href.split("/").filter(Boolean).at(-1)
      : undefined;
  const rich = richSlug ? getComputerNetworkLesson(richSlug) : undefined;

  const content = getLessonContent(
    found.course,
    found.module,
    found.lesson,
    found.moduleIndex,
    found.lessonIndex,
    rich,
  );

  const flat = found.course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      slug: presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
      title: lesson.title,
      moduleIndex,
      lessonIndex,
    })),
  );

  const currentIndex = flat.findIndex((item) => item.slug === lessonSlug);
  const previous = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  const previousFound = previous
    ? {
        module: found.course.modules[previous.moduleIndex],
        lesson: found.course.modules[previous.moduleIndex]?.lessons[previous.lessonIndex],
      }
    : null;

  const previousContent =
    previousFound?.module && previousFound.lesson
      ? getLessonContent(
          found.course,
          previousFound.module,
          previousFound.lesson,
          previous.moduleIndex,
          previous.lessonIndex,
        )
      : null;
  const deckHref = "/courses/" + slug + "/present/" + found.generatedSlug;

  if (found.legacySlug && found.legacySlug === lessonSlug) {
    const canonicalPath = "/courses/" + found.course.slug + "/" + found.generatedSlug;
    return (
      <main className="stack-courses ss-shell py-16">
        <p className="text-sm text-muted-foreground">This lesson has moved to its new learning page.</p>
        <Link href={canonicalPath} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
          Continue to the lesson <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="stack-courses lesson-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: content.title,
            description: content.overview,
            educationalLevel: found.course.level,
            learningResourceType: "Course lesson",
            isPartOf: {
              "@type": "Course",
              name: found.course.title,
              url: "https://stack-shade.github.io/courses/" + found.course.slug,
            },
            url: "https://stack-shade.github.io/courses/" + found.course.slug + "/" + lessonSlug,
          }),
        }}
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        <Link
          href={"/courses/" + found.course.slug}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Course overview
        </Link>
        <span className="font-mono text-[9px] text-muted-foreground">
          Topic {currentIndex + 1} / {flat.length}
        </span>
      </div>

      <header className="lesson-topic-header">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-[9px]">
              {content.eyebrow}
            </Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              <Clock3 className="mr-1 h-3 w-3" /> {found.lesson.duration}
            </Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              <Layers className="mr-1 h-3 w-3" /> {found.module.title}
            </Badge>
          </div>
          <h1 className="max-w-5xl text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {content.overview}
          </p>
        </div>

        <div className="lesson-topic-actions">
          <a href="#lesson-media" className="lesson-topic-action primary">
            <BookOpen className="h-4 w-4" /> Learn
          </a>
          <Link href={deckHref} className="lesson-topic-action">
            <Sparkles className="h-4 w-4" /> Deck
          </Link>
        </div>
      </header>

      <div className="lesson-study-loop">
        <span className="lesson-study-loop-label">LEARNING LOOP</span>
        <span>Watch</span><span>→</span><span>Read</span><span>→</span><span>Inspect</span><span>→</span><span>Retrieve</span><span>→</span><span>Teach back</span>
      </div>

      <div className="mt-5">
        <CourseLessonActions
          courseSlug={found.course.slug}
          moduleIndex={found.moduleIndex}
          lessonIndex={found.lessonIndex}
        />
      </div>

      <div className="lesson-learning-layout mt-7">
        <div className="lesson-learning-content min-w-0">
          <div id="lesson-media">
            <LessonMediaHub
              lessonTitle={content.title}
              lessonMeta={found.module.phase + " · Topic " + (currentIndex + 1) + " / " + flat.length}
              presentationHref={deckHref}
              media={found.lesson.media}
              practice={
                <LessonPracticePanel
                  current={content}
                  previous={previousContent}
                  sketch={{
                    title: content.title + " — sketch",
                    labels: [found.module.phase, found.module.title, "Core mechanism", "Apply"],
                  }}
                />
              }
              resources={
                <LessonResourcesPanel
                  courseSlug={found.course.slug}
                  lessonTitle={content.title}
                  previousLessonTitle={previous?.title ?? null}
                />
              }
            >
              <div className="min-w-0">
                {rich && <ComputerNetworkVisual kind={rich.visual} />}
                <LessonArticle
                  course={found.course}
                  module={found.module}
                  lesson={found.lesson}
                  content={content}
                />
              </div>
            </LessonMediaHub>
          </div>

          <nav className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              {previous ? (
                <Link
                  href={"/courses/" + slug + "/" + previous.slug}
                  className="group block rounded-xl border border-border bg-card/20 p-4 transition-colors hover:border-foreground/25"
                >
                  <span className="lesson-kicker">PREVIOUS</span>
                  <span className="mt-1 flex items-center gap-2 text-sm font-bold">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <Link href={"/courses/" + slug} className="group block rounded-xl border border-border bg-card/20 p-4">
                  <span className="lesson-kicker">COURSE</span>
                  <span className="mt-1 flex items-center gap-2 text-sm font-bold">
                    <ArrowLeft className="h-4 w-4" /> Back to course
                  </span>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  href={"/courses/" + slug + "/" + next.slug}
                  className="group block rounded-xl border border-border bg-card/20 p-4 text-right transition-colors hover:border-foreground/25"
                >
                  <span className="lesson-kicker">NEXT</span>
                  <span className="mt-1 flex items-center justify-end gap-2 text-sm font-bold">
                    {next.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </div>
          </nav>
        </div>

        <CourseCurriculumRail
          course={found.course}
          currentModuleIndex={found.moduleIndex}
          currentLessonIndex={found.lessonIndex}
          mode="article"
        />
      </div>
    </main>
  );
}
