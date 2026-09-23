
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, Clock3, Layers, Presentation, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CourseLessonActions } from "@/components/courses/course-lesson-actions";
import { ComputerNetworkVisual } from "@/components/courses/computer-network-visual";
import { LessonArticle } from "@/components/courses/lesson-article";
import { getCourse, COURSES } from "@/lib/courses-data";
import { presentationLessonSlug } from "@/lib/course-presentation";
import { getComputerNetworkLesson } from "@/lib/computer-networks-lessons";
import { getLessonContent } from "@/lib/course-lesson-content";

interface PageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

function findLesson(
  slug: string,
  lessonSlug: string,
) {
  const course = getCourse(slug);
  if (!course) return null;

  for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex += 1) {
    const module = course.modules[moduleIndex];
    for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex += 1) {
      const lesson = module.lessons[lessonIndex];
      if (presentationLessonSlug(moduleIndex, lessonIndex, lesson.title) === lessonSlug) {
        return { course, module, lesson, moduleIndex, lessonIndex };
      }
    }
  }

  return null;
}

export function generateStaticParams() {
  return COURSES.flatMap((course) =>
    course.modules.flatMap((module, moduleIndex) =>
      module.lessons.map((lesson, lessonIndex) => ({
        slug: course.slug,
        lesson: presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
      })),
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
          url: "https://stack-shade.github.io/og-image.png",
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
      images: ["https://stack-shade.github.io/og-image.png"],
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
  const deckHref = "/courses/" + slug + "/present/" + lessonSlug;

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
            learningResourceType: "Course lesson article",
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
            <Badge variant="outline" className="font-mono text-[9px]">{content.eyebrow}</Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              <Clock3 className="mr-1 h-3 w-3" /> {found.lesson.duration}
            </Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              <Layers className="mr-1 h-3 w-3" /> {found.module.title}
            </Badge>
          </div>
          <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {content.overview}
          </p>
        </div>

        <div className="lesson-topic-actions">
          <a href="#article" className="lesson-topic-action primary">
            <BookOpen className="h-4 w-4" /> Article
          </a>
          <Link href={deckHref} className="lesson-topic-action">
            <Presentation className="h-4 w-4" /> Presentation
          </Link>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/20 p-3">
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-bold">Complete the loop:</span>
        <span className="text-xs text-muted-foreground">read the article, inspect the visual, retrieve from memory, then teach it back.</span>
      </div>

      <div className="mt-5">
        <CourseLessonActions
          courseSlug={found.course.slug}
          moduleIndex={found.moduleIndex}
          lessonIndex={found.lessonIndex}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div id="article" className="min-w-0">
          {rich && <ComputerNetworkVisual kind={rich.visual} />}
          <LessonArticle
            course={found.course}
            module={found.module}
            lesson={found.lesson}
            content={content}
          />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <div className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4" />
                <span className="lesson-kicker">RECALL MODE</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Do not reread a section when a one-sentence reconstruction would reveal what you know.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="flex items-center gap-2">
                <Presentation className="h-4 w-4" />
                <span className="lesson-kicker">TEACHING DECK</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                The same topic is available as a focused teaching deck with presenter notes, pointer, timer and fullscreen mode.
              </p>
              <Link href={deckHref} className={buttonVariants({ variant: "outline", size: "sm", className: "mt-3 w-full font-mono text-[9px]" })}>
                Open presentation <ArrowRight className="ml-1.5 h-3 w-3" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <nav className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        <div>
          {previous ? (
            <Link href={"/courses/" + slug + "/" + previous.slug} className="group block rounded-xl border border-border bg-card/20 p-4 transition-colors hover:border-foreground/25">
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
            <Link href={"/courses/" + slug + "/" + next.slug} className="group block rounded-xl border border-border bg-card/20 p-4 text-right transition-colors hover:border-foreground/25">
              <span className="lesson-kicker">NEXT</span>
              <span className="mt-1 flex items-center justify-end gap-2 text-sm font-bold">
                {next.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
