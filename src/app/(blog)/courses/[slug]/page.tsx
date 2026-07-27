import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CourseStudy } from "@/components/courses/course-study";
import { COURSES, getCourse, courseStats } from "@/lib/courses-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  const url = `https://stack-shade.github.io/courses/${course.slug}`;
  return {
    title: `${course.title} — StackShade Courses`,
    description: course.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${course.title} — StackShade Courses`,
      description: course.description,
      url,
      siteName: "StackShade",
      images: [
        {
          url: "https://stack-shade.github.io/og-image.png",
          width: 1200,
          height: 630,
          alt: `${course.title} course`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} — StackShade Courses`,
      description: course.description,
      images: ["https://stack-shade.github.io/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const stats = courseStats(course);
  const others = COURSES.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back link */}
      <div className="mb-10">
        <Link
          href="/courses"
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
          All Courses
        </Link>
      </div>

      {/* Course header */}
      <header className="space-y-6 mb-12">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-border text-foreground uppercase text-[10px] tracking-wider font-semibold">
            {course.category}
          </Badge>
          {course.featured && (
            <Badge className="uppercase text-[10px] tracking-wider font-semibold">Flagship</Badge>
          )}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">{course.title}</h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono border-y border-border/60 py-4">
          <span className="flex items-center gap-1.5">
            <Signal className="w-4 h-4" />
            {course.level}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            {stats.modules} modules · {stats.lessons} lessons
          </span>
        </div>

        {/* Outcomes */}
        <Card className="bg-card/30 border-border">
          <CardContent className="p-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              What you&apos;ll walk away with
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                  {o}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </header>

      {/* Interactive study experience */}
      <CourseStudy course={course} />

      {/* Related courses */}
      <div className="mt-16 pt-10 border-t border-border">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
          Keep going
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="group">
              <div className="border border-border rounded-xl p-4 h-full bg-card/20 hover:border-foreground/40 transition-all duration-300">
                <h3 className="font-bold text-sm text-foreground group-hover:underline underline-offset-4 mb-1">
                  {c.title}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2">{c.tagline}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-foreground mt-3 group-hover:gap-2 transition-all">
                  Open course <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
