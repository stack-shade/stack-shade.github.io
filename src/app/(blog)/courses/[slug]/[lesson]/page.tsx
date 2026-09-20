import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BrainCircuit, CheckCircle2, Clock3, Lightbulb, Repeat2, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseLessonActions } from "@/components/courses/course-lesson-actions";
import { ComputerNetworkVisual } from "@/components/courses/computer-network-visual";
import { getCourse } from "@/lib/courses-data";
import { getComputerNetworkLesson, COMPUTER_NETWORK_LESSON_ORDER } from "@/lib/computer-networks-lessons";

interface PageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

export function generateStaticParams() {
  const course = getCourse("computer-networks");
  if (!course) return [];
  return COMPUTER_NETWORK_LESSON_ORDER.map((lesson) => ({ slug: course.slug, lesson }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lesson } = await params;
  const course = getCourse(slug);
  const content = getComputerNetworkLesson(lesson);
  if (!course || !content) return {};
  const url = `https://stack-shade.github.io/courses/${course.slug}/${lesson}`;
  return {
    title: `${content.title} — ${course.title} — StackShade`,
    description: content.overview,
    alternates: { canonical: url },
    openGraph: {
      title: `${content.title} — ${course.title}`,
      description: content.overview,
      url,
      siteName: "StackShade",
      images: [{ url: "https://stack-shade.github.io/og-image.png", width: 1200, height: 630, alt: content.title }],
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

function findLessonPosition(course: NonNullable<ReturnType<typeof getCourse>>, slug: string) {
  for (let mi = 0; mi < course.modules.length; mi += 1) {
    for (let li = 0; li < course.modules[mi].lessons.length; li += 1) {
      const href = course.modules[mi].lessons[li].href;
      if (href?.endsWith(`/${slug}`)) return { moduleIndex: mi, lessonIndex: li };
    }
  }
  return null;
}

export default async function CourseLessonPage({ params }: PageProps) {
  const { slug, lesson } = await params;
  const course = getCourse(slug);
  const content = getComputerNetworkLesson(lesson);
  if (!course || slug !== "computer-networks" || !content) notFound();

  const position = findLessonPosition(course, lesson);
  if (!position) notFound();

  const flat = course.modules.flatMap((m, mi) =>
    m.lessons.map((l, li) => ({ moduleIndex: mi, lessonIndex: li, title: l.title, href: l.href }))
  );
  const currentIndex = flat.findIndex((x) => x.moduleIndex === position.moduleIndex && x.lessonIndex === position.lessonIndex);
  const previous = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: content.title,
          description: content.overview,
          educationalLevel: course.level,
          learningResourceType: "Course lesson",
          isPartOf: { "@type": "Course", name: course.title, url: `https://stack-shade.github.io/courses/${course.slug}` },
          url: `https://stack-shade.github.io/courses/${course.slug}/${lesson}`,
        }) }}
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Course overview
        </Link>
        <div className="text-[10px] font-mono text-muted-foreground">
          Lesson {currentIndex + 1} / {flat.length}
        </div>
      </div>

      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-[10px]">{content.eyebrow}</Badge>
          <Badge variant="secondary" className="font-mono text-[10px]"><Clock3 className="mr-1 h-3 w-3" /> Deep study</Badge>
        </div>
        <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">{content.title}</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{content.overview}</p>
        <CourseLessonActions courseSlug={course.slug} moduleIndex={position.moduleIndex} lessonIndex={position.lessonIndex} />
      </header>

      <div className="mt-10 space-y-8">
        <ComputerNetworkVisual kind={content.visual} />

        <Card className="border-foreground/20 bg-muted/10">
          <CardHeader>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Lightbulb className="h-4 w-4" /> Mental model
            </div>
            <CardTitle className="text-lg">Make the abstraction memorable</CardTitle>
          </CardHeader>
          <CardContent><p className="text-sm leading-7 text-muted-foreground">{content.mentalModel}</p></CardContent>
        </Card>

        <section className="space-y-5">
          {content.deepDive.map((section) => (
            <Card key={section.title} className="border-border/70 bg-card/20">
              <CardHeader><CardTitle className="text-base sm:text-lg">{section.title}</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-7 text-muted-foreground">{section.body}</p></CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-background/30 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            <h2 className="text-lg font-black">Flow: reconstruct it from memory</h2>
          </div>
          <div className="space-y-3">
            {content.flow.map((step, index) => (
              <div key={step.label} className="flex gap-3 rounded-xl border border-border/70 bg-card/20 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-mono">{String(index + 1).padStart(2, "0")}</div>
                <div><div className="text-xs font-bold">{step.label}</div><p className="mt-1 text-xs leading-6 text-muted-foreground">{step.detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border overflow-hidden">
          <div className="border-b border-border bg-muted/20 p-5">
            <div className="flex items-center gap-2"><Target className="h-4 w-4" /><h2 className="text-lg font-black">{content.artifact.title}</h2></div>
          </div>
          <pre className="overflow-x-auto bg-black/30 p-5 text-xs leading-6 text-foreground"><code>{content.artifact.code}</code></pre>
          <div className="p-5 text-sm leading-7 text-muted-foreground">{content.artifact.explanation}</div>
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <Card className="border-border/70 bg-card/20">
            <CardHeader><CardTitle className="text-base">Common mistakes</CardTitle></CardHeader>
            <CardContent><ul className="space-y-2.5 text-sm text-muted-foreground">{content.mistakes.map(m => <li key={m} className="flex gap-2"><span>•</span><span>{m}</span></li>)}</ul></CardContent>
          </Card>
          <Card className="border-border/70 bg-card/20">
            <CardHeader><CardTitle className="text-base">Exam & interview angle</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-7 text-muted-foreground">{content.examAngle}</p></CardContent>
          </Card>
        </section>

        <section className="rounded-2xl border border-border bg-muted/10 p-5 sm:p-6">
          <div className="flex items-center gap-2"><BrainCircuit className="h-4 w-4" /><h2 className="text-lg font-black">Active recall</h2></div>
          <p className="mt-2 text-xs text-muted-foreground">Answer from memory before opening each answer. Retrieval is the study action here.</p>
          <div className="mt-4 space-y-2.5">
            {content.recall.map((item) => (
              <details key={item.question} className="group rounded-xl border border-border bg-background/40 p-4">
                <summary className="cursor-pointer list-none text-sm font-semibold">{item.question}</summary>
                <p className="mt-3 border-t border-border/60 pt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <Card className="border-border/70 bg-card/20">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Repeat2 className="h-4 w-4" /> Feynman challenge</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-7 text-muted-foreground">{content.feynman}</p></CardContent>
          </Card>
          <Card className="border-border/70 bg-card/20">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CheckCircle2 className="h-4 w-4" /> Deliberate practice loop</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">1.</strong> Predict before reading.</p>
              <p><strong className="text-foreground">2.</strong> Read the visual model and explain it aloud.</p>
              <p><strong className="text-foreground">3.</strong> Rebuild the flow without notes.</p>
              <p><strong className="text-foreground">4.</strong> Solve one small application task.</p>
              <p><strong className="text-foreground">5.</strong> Revisit on a spaced schedule.</p>
            </CardContent>
          </Card>
        </section>

        <nav className="grid sm:grid-cols-2 gap-3 pt-4">
          {previous ? (
            <Link href={previous.href!} className="rounded-xl border border-border p-4 hover:border-foreground/40 transition-colors">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Previous</div>
              <div className="mt-1 text-sm font-bold">{previous.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={next.href!} className="rounded-xl border border-border p-4 hover:border-foreground/40 transition-colors text-left sm:text-right">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Next</div>
              <div className="mt-1 text-sm font-bold">{next.title}</div>
            </Link>
          ) : <div />}
        </nav>
      </div>
    </main>
  );
}
