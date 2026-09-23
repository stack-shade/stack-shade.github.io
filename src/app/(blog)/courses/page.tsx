import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Youtube } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CourseCatalog } from "@/components/courses/course-catalog";

export const metadata: Metadata = {
  title: "Courses — Learn Faster, Remember Longer | StackShade",
  description:
    "StackShade courses combine deep articles, visual explanations, concrete artifacts, active recall and recordable teaching decks.",
  alternates: { canonical: "https://stack-shade.github.io/courses" },
  openGraph: {
    title: "StackShade Courses — Learn Faster, Remember Longer",
    description:
      "Deep, visual, topic-by-topic engineering courses with article and presentation modes.",
    url: "https://stack-shade.github.io/courses",
    siteName: "StackShade",
    images: [{ url: "https://stack-shade.github.io/og-image.png", width: 1200, height: 630, alt: "StackShade Courses" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackShade Courses — Learn Faster, Remember Longer",
    description: "Deep, visual, topic-by-topic engineering courses with article and presentation modes.",
    images: ["https://stack-shade.github.io/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function CoursesPage() {
  return (
    <main className="stack-courses ss-shell py-8 sm:py-12 lg:py-16">
      <section className="course-index-hero ss-glow">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5" />
            StackShade Learning Lab
          </div>
          <h1 className="courses-display text-5xl font-black sm:text-6xl lg:text-8xl">
            Learn the system. <span className="text-muted-foreground">Not just the syntax.</span>
          </h1>
          <p className="hero-copy courses-copy mt-5 text-muted-foreground sm:text-lg">
            Topic-by-topic courses built as complete learning loops: a deep article, a visual model, a concrete artifact, retrieval practice and a screen-recordable presentation.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="https://www.youtube.com/@StackShade"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm", className: "font-mono text-[10px]" })}
            >
              <Youtube className="mr-1.5 h-3.5 w-3.5" />
              Companion videos
            </a>
            <Link
              href="/explainers"
              className={buttonVariants({ variant: "default", size: "sm", className: "font-mono text-[10px]" })}
            >
              Explore explainers
            </Link>
          </div>
        </div>

        <div className="course-stat-strip">
          <div className="course-stat">
            <b>8</b>
            <span>learning paths</span>
          </div>
          <div className="course-stat">
            <b>72+</b>
            <span>modules</span>
          </div>
          <div className="course-stat">
            <b>Read + Deck</b>
            <span>every topic gets both modes</span>
          </div>
        </div>
      </section>

      <div className="mt-10 sm:mt-14">
        <CourseCatalog />
      </div>
    </main>
  );
}
