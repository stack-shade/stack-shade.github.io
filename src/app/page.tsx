import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  GitBranch,
  Layers3,
  Play,
  Search,
  ShieldCheck,
  Sparkles,

  Workflow,
  Youtube,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { COURSES, courseStats } from "@/lib/courses-data";
import { sortedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "StackShade — Learn Engineering by Understanding the System",
  description:
    "Free visual courses, technical explainers and hands-on learning paths for DSA, system design, networking, AI, cybersecurity, DevOps and full-stack engineering.",
  keywords: [
    "StackShade",
    "computer science courses",
    "DSA course",
    "system design course",
    "cybersecurity course",
    "NLP course",
    "AI engineering",
    "DevOps",
    "computer networks",
    "technical explainers",
    "software engineering",
  ],
  alternates: {
    canonical: "https://stack-shade.github.io/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "StackShade — Learn Engineering by Understanding the System",
    description:
      "Free visual courses, technical explainers and hands-on learning paths for modern software engineering.",
    url: "https://stack-shade.github.io/",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StackShade — technical learning library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackShade — Learn Engineering by Understanding the System",
    description:
      "Free visual courses, technical explainers and hands-on learning paths for modern software engineering.",
    images: ["https://stack-shade.github.io/og-image.svg"],
  },
};

const focusAreas = [
  {
    title: "Algorithms",
    eyebrow: "DSA",
    icon: Code2,
    body: "Pattern-first problem solving with visual traces, complexity analysis and interview practice.",
    tags: ["Sliding Window", "Graphs", "Backtracking"],
    href: "/courses/dsa-patterns",
  },
  {
    title: "Systems",
    eyebrow: "ARCHITECTURE",
    icon: Layers3,
    body: "Understand how data, traffic, storage and failure move through real distributed systems.",
    tags: ["Scaling", "Caching", "Messaging"],
    href: "/courses/system-design-fundamentals",
  },
  {
    title: "AI Engineering",
    eyebrow: "AI / NLP",
    icon: BrainCircuit,
    body: "Learn NLP, Transformers, RAG, agents and production AI by reconstructing the mechanism underneath.",
    tags: ["Transformers", "RAG", "Agents"],
    href: "/courses/natural-language-processing",
  },
  {
    title: "Security",
    eyebrow: "CYBERSECURITY",
    icon: ShieldCheck,
    body: "Connect attack surface, evidence, controls, detections and response across modern infrastructure.",
    tags: ["AppSec", "SOC", "DFIR"],
    href: "/courses/cybersecurity",
  },
];

const learningLoop = [
  ["01", "See", "Visual explanation and a concrete system model."],
  ["02", "Understand", "Step-by-step mechanism, not just definitions."],
  ["03", "Reconstruct", "Draw the idea back from memory."],
  ["04", "Apply", "Practice, inspect failure cases and build something."],
];

const capabilities = [
  ["Courses", "Structured multi-week paths"],
  ["Explainers", "Deep technical articles"],
  ["Artifacts", "Diagrams, code and visual models"],
  ["Practice", "Recall, projects and labs"],
];

export default function Home() {
  const visibleCourses = COURSES.slice(0, 6);
  const latest = sortedArticles().slice(0, 4);
  const totalLessons = COURSES.reduce((sum, course) => sum + courseStats(course).lessons, 0);
  const totalModules = COURSES.reduce((sum, course) => sum + courseStats(course).modules, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "StackShade",
                url: "https://stack-shade.github.io/",
                description:
                  "Free visual courses, technical explainers and hands-on learning paths for software engineering and computer science.",
                inLanguage: "en",
              },
              {
                "@type": "Organization",
                name: "StackShade",
                url: "https://stack-shade.github.io/",
                logo: "https://stack-shade.github.io/logo.svg",
              },
              {
                "@type": "ItemList",
                name: "StackShade courses",
                numberOfItems: COURSES.length,
                itemListElement: COURSES.map((course, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: course.title,
                  url: "https://stack-shade.github.io/courses/" + course.slug,
                })),
              },
            ],
          }),
        }}
      />

      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--foreground)_7%,transparent),transparent_42%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Technical learning, rebuilt
              </div>

              <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl lg:text-[5.8rem]">
                Learn engineering by
                <span className="block text-muted-foreground">understanding the system.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-xl sm:leading-8">
                StackShade turns difficult computer-science and software-engineering topics into visual lessons,
                structured courses, practical artifacts and active-recall practice.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className={buttonVariants({
                    size: "lg",
                    className: "h-12 rounded-xl px-6 text-sm font-bold",
                  })}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/blog"
                  className={buttonVariants({
                    size: "lg",
                    variant: "outline",
                    className: "h-12 rounded-xl px-6 text-sm font-semibold",
                  })}
                >
                  Read technical guides
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card/30 sm:grid-cols-4">
                {capabilities.map(([label, value], index) => (
                  <div
                    key={label}
                    className={"p-4 sm:p-5 " + (index < capabilities.length - 1 ? "border-b border-border sm:border-b-0 sm:border-r" : "")}
                  >
                    <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
                    <div className="mt-1.5 text-xs font-bold sm:text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card/25 p-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">CURRENT LIBRARY</div>
                <div className="mt-2 text-3xl font-black tracking-tight">{COURSES.length}</div>
                <div className="mt-1 text-xs text-muted-foreground">course paths</div>
              </div>
              <div className="rounded-2xl border border-border bg-card/25 p-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">CURRICULUM</div>
                <div className="mt-2 text-3xl font-black tracking-tight">{totalLessons}+</div>
                <div className="mt-1 text-xs text-muted-foreground">lessons across {totalModules} modules</div>
              </div>
              <div className="rounded-2xl border border-border bg-card/25 p-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">LEARNING MODE</div>
                <div className="mt-2 flex items-center gap-2 text-xl font-black tracking-tight">
                  Learn → Recall → Build
                </div>
                <div className="mt-1 text-xs text-muted-foreground">not just watch and forget</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/15">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
              <span>Algorithms</span>
              <span>System Design</span>
              <span>Networks</span>
              <span>Operating Systems</span>
              <span>AI / NLP</span>
              <span>Web Engineering</span>
              <span>DevOps</span>
              <span>Cybersecurity</span>
            </div>
          </div>
        </section>

        <section id="focus-areas" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                CHOOSE A PROBLEM SPACE
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Learn the parts that make software work.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Start with the area closest to your current goal, then follow the connections underneath it. StackShade is designed as one learning graph rather than disconnected tutorials.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {focusAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border border-border bg-card/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-card/35 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background/40">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="mt-6 font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">{item.eyebrow}</div>
                    <h3 className="mt-1 text-xl font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-[9px] font-mono text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="courses" className="border-b border-border bg-card/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  COURSE LIBRARY
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Structured paths, not playlists.
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  Each course turns a topic into a sequence of concepts, explanations, visual models, exercises and project work.
                </p>
              </div>
              <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
                Browse all {COURSES.length} courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course) => {
                const stats = courseStats(course);
                return (
                  <Link
                    key={course.slug}
                    href={"/courses/" + course.slug}
                    className="group rounded-2xl border border-border bg-card/25 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-card/40 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant="outline" className="font-mono text-[8px] uppercase tracking-[0.12em]">
                        {course.category}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="mt-5 text-lg font-black leading-tight">{course.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">{course.tagline}</p>
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-border/70 pt-4 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground">
                      <span>{stats.modules} modules</span>
                      <span>{stats.lessons} lessons</span>
                      <span>{course.duration}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  THE LEARNING LOOP
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  The goal is recall, not recognition.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  A lesson should survive after the browser tab is closed. StackShade separates explanation from reconstruction so you have to produce the idea yourself.
                </p>

                <Link
                  href="/courses"
                  className={buttonVariants({
                    variant: "outline",
                    className: "mt-6 h-10 rounded-xl text-xs font-semibold",
                  })}
                >
                  Explore the learning system
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {learningLoop.map(([number, title, body]) => (
                  <div key={number} className="rounded-2xl border border-border bg-card/20 p-5">
                    <div className="font-mono text-[9px] text-muted-foreground">{number}</div>
                    <h3 className="mt-4 text-base font-black">{title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  LATEST GUIDES
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Go deeper when one lesson is not enough.
                </h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
                Open the library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {latest.map((article) => (
                <Link
                  key={article.slug}
                  href={"/blog/" + article.slug}
                  className="group rounded-2xl border border-border bg-card/20 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/25"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{article.category}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-5 text-sm font-black leading-5">{article.title}</h3>
                  <p className="mt-2 line-clamp-4 text-xs leading-5 text-muted-foreground">{article.description}</p>
                  <div className="mt-5 border-t border-border/70 pt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                    {article.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/30 p-6 sm:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border">
                  <Workflow className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-2xl font-black">Build while you learn.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  Courses connect concepts to implementation: diagrams, code, labs, system walkthroughs, projects and architecture reviews.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {[
                    "Visual system models",
                    "Practice artifacts",
                    "Hands-on projects",
                    "Failure-mode analysis",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/20 px-3 py-2.5 text-xs">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/30 p-6 sm:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border">
                  <Search className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-2xl font-black">Find the concept you actually need.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  The library is organized around semantic topics and individual lesson URLs, so humans and AI systems can navigate directly to the concept instead of hunting through a feed.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Semantic course index",
                    "Per-lesson URLs",
                    "Structured data",
                    "LLM-readable indexes",
                  ].map((item) => (
                    <span key={item} className="rounded-full border border-border px-3 py-1.5 text-[9px] font-mono text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/15">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              START HERE
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
              Pick one hard topic and go all the way down.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              You do not need another tab full of bookmarks. Pick a path, understand the mechanism, reconstruct it, then build with it.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className={buttonVariants({
                  size: "lg",
                  className: "h-12 rounded-xl px-6 text-sm font-bold",
                })}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Browse courses
              </Link>
              <a
                href="https://www.youtube.com/@StackShade"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "h-12 rounded-xl px-6 text-sm font-semibold",
                })}
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Watch on YouTube
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-card text-[10px] font-black">S</span>
            <div>
              <div className="text-sm font-black">StackShade</div>
              <div className="text-[10px] text-muted-foreground">Learn deeply. Build practically. Explain visually.</div>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">Courses</Link>
            <Link href="/explainers" className="hover:text-foreground">Explainers</Link>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <Link href="/resources" className="hover:text-foreground">Resources</Link>
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/editorial-policy" className="hover:text-foreground">Editorial Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://www.youtube.com/@StackShade" target="_blank" rel="noopener noreferrer" aria-label="StackShade on YouTube" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
              <Youtube className="h-4 w-4 fill-current" />
            </a>
            <a href="https://github.com/sh20raj" target="_blank" rel="noopener noreferrer" aria-label="StackShade on GitHub" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
              <GitBranch className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
