import React from "react";
import { Metadata } from "next";
import { GraduationCap, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CourseCatalog } from "@/components/courses/course-catalog";

export const metadata: Metadata = {
  title: "Courses — Learn DSA, System Design, OS, Networks, Next.js & DevOps",
  description:
    "Full topic-wise organized courses built on neuroscience: DSA Patterns (90 days), System Design Fundamentals & Advanced, Operating Systems, Computer Networks, Next.js Full Stack, and DevOps & Git — with interactive visualizations, active recall and spaced repetition.",
  alternates: {
    canonical: "https://stack-shade.github.io/courses",
  },
  openGraph: {
    title: "StackShade Courses — Learn Faster, Remember Longer",
    description:
      "Full topic-wise organized courses with interactive visual learning, active recall and spaced repetition: DSA, System Design, OS, Networks, Next.js, DevOps.",
    url: "https://stack-shade.github.io/courses",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackShade Courses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackShade Courses — Learn Faster, Remember Longer",
    description:
      "Full topic-wise organized courses with interactive visual learning, active recall and spaced repetition.",
    images: ["https://stack-shade.github.io/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoursesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="mb-14 border-b border-border pb-10 max-w-3xl">
        <Badge
          variant="outline"
          className="mb-4 border-border text-muted-foreground uppercase text-[10px] tracking-wider"
        >
          StackShade Courses
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Learn faster. <span className="text-muted-foreground">Remember longer.</span>
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          Every course is organized topic-by-topic and engineered around how memory actually works:
          interactive visualizations instead of walls of text, active recall after every module,
          spaced repetition that resurfaces lessons right before you forget them, and Feynman
          prompts that force real understanding.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <GraduationCap className="w-4 h-4" />
            7 courses · 60+ modules · 400+ lessons
          </span>
          <a
            href="https://www.youtube.com/@StackShade"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm", className: "text-xs cursor-pointer" })}
          >
            <Youtube className="w-3.5 h-3.5 mr-1.5" />
            Companion videos on YouTube
          </a>
        </div>
      </div>

      <CourseCatalog />
    </main>
  );
}
