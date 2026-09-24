
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CourseStudy } from "@/components/courses/course-study";
import { CybersecurityToolkit } from "@/components/courses/cybersecurity-toolkit";
import { CoursePoster } from "@/components/courses/course-poster";
import { COURSES, getCourse, courseStats } from "@/lib/courses-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const url = "https://stack-shade.github.io/courses/" + course.slug;
  return {
    title: course.title + " — StackShade Courses",
    description: course.description,
    alternates: { canonical: url },
    openGraph: {
      title: course.title + " — StackShade Courses",
      description: course.description,
      url,
      siteName: "StackShade",
      images: [{ url: "https://stack-shade.github.io/og-image.svg", width: 1200, height: 630, alt: course.title + " course" }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: ["https://stack-shade.github.io/og-image.svg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const stats = courseStats(course);
  const others = COURSES.filter((item) => item.slug !== course.slug).slice(0, 3);

  return (
    <main className="stack-courses ss-shell py-6 sm:py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.description,
            provider: {
              "@type": "Organization",
              name: "StackShade",
              sameAs: "https://stack-shade.github.io/",
            },
            educationalLevel: course.level,
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: course.duration,
            },
            url: "https://stack-shade.github.io/courses/" + course.slug,
          }),
        }}
      />
      <Link
        href="/courses"
        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        All courses
      </Link>

      <header className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,.65fr)] lg:items-end">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[9px]">{course.category}</Badge>
            {course.featured && <Badge className="font-mono text-[9px]">Featured path</Badge>}
          </div>
          <h1 className="courses-display text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {course.title}
          </h1>
          <p className="courses-copy mt-4 max-w-3xl text-muted-foreground sm:text-lg">
            {course.description}
          </p>

          <div className="mt-5 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-border bg-card/25">
            <div className="border-r border-border p-3 sm:p-4">
              <Signal className="h-4 w-4" />
              <div className="mt-2 font-bold text-xs">{course.level}</div>
            </div>
            <div className="border-r border-border p-3 sm:p-4">
              <Clock className="h-4 w-4" />
              <div className="mt-2 font-bold text-xs">{course.duration}</div>
            </div>
            <div className="p-3 sm:p-4">
              <Layers className="h-4 w-4" />
              <div className="mt-2 font-bold text-xs">{stats.modules} modules · {stats.lessons} lessons</div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.35rem] border border-border bg-card/20">
          <CoursePoster title={course.title} category={course.category} icon={course.icon} />
        </div>
      </header>

      <section className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="border-border bg-card/25">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="lesson-kicker">LEARNER OUTCOMES</span>
                <h2 className="mt-1 text-lg font-black">What you should be able to do</h2>
              </div>
              <span className="hidden font-mono text-[9px] text-muted-foreground sm:block">{course.outcomes.length} outcomes</span>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-background/25 p-3 text-xs leading-5 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                  {outcome}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/25">
          <CardContent className="p-4 sm:p-5">
            <span className="lesson-kicker">TOPIC FORMAT</span>
            <h2 className="mt-1 text-lg font-black">Every topic has two modes</h2>
            <div className="mt-4 space-y-2.5 text-xs leading-5 text-muted-foreground">
              <p><strong className="text-foreground">Read</strong> — deep article with diagrams, artifacts and retrieval.</p>
              <p><strong className="text-foreground">Present</strong> — focused deck with notes, pointer, timer and fullscreen.</p>
              <p><strong className="text-foreground">Review</strong> — spaced review queue with due dates and recall ratings.</p>
              <p><strong className="text-foreground">Focus</strong> — Pomodoro sessions, daily goals and a persistent scratchpad.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="mt-8">
        <CourseStudy course={course} />
      </div>

      {slug === "cybersecurity" && <CybersecurityToolkit />}

      {slug === "natural-language-processing" && (
        <section className="mt-10 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="lesson-kicker">REFERENCE STACK</span>
              <h2 className="mt-1 text-xl font-black">Where this curriculum comes from</h2>
              <p className="mt-2 max-w-3xl text-xs leading-6 text-muted-foreground">
                The first six modules follow the supplied 28-video Codebasics playlist. The extension track fills the major gaps with current academic and tooling curricula, so the course moves from fundamentals to modern NLP without treating LLMs as a black box.
              </p>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground">28-video core + modern extensions</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href="https://www.youtube.com/playlist?list=PLeo1K3hjS3uuvuAXhYjV2lMEShq2UYSwX" target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background/25 p-4 transition hover:border-foreground/25">
              <span className="font-mono text-[9px] text-muted-foreground">BASE</span>
              <h3 className="mt-1 text-sm font-bold">Codebasics NLP Tutorial Python</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">The supplied 28-video learning spine.</p>
            </a>
            <a href="https://web.stanford.edu/class/cs224n/" target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background/25 p-4 transition hover:border-foreground/25">
              <span className="font-mono text-[9px] text-muted-foreground">ACADEMIC</span>
              <h3 className="mt-1 text-sm font-bold">Stanford CS224N</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Deep learning, Transformers, LLMs and evaluation.</p>
            </a>
            <a href="https://www.deeplearning.ai/specializations/natural-language-processing/" target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background/25 p-4 transition hover:border-foreground/25">
              <span className="font-mono text-[9px] text-muted-foreground">FOUNDATIONS</span>
              <h3 className="mt-1 text-sm font-bold">DeepLearning.AI NLP</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Probabilistic models, RNNs, attention and classic NLP.</p>
            </a>
            <a href="https://huggingface.co/learn/llm-course/chapter1/1" target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background/25 p-4 transition hover:border-foreground/25">
              <span className="font-mono text-[9px] text-muted-foreground">MODERN STACK</span>
              <h3 className="mt-1 text-sm font-bold">Hugging Face LLM Course</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Transformers, fine-tuning, datasets, tokenizers and modern LLM practice.</p>
            </a>
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-border pt-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <span className="lesson-kicker">KEEP GOING</span>
            <h2 className="mt-1 text-xl font-black">Another path next</h2>
          </div>
          <Link href="/courses" className="font-mono text-[9px] text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {others.map((item) => (
            <Link key={item.slug} href={"/courses/" + item.slug} className="group rounded-xl border border-border bg-card/20 p-4 transition-colors hover:border-foreground/25">
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{item.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] group-hover:gap-2">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
