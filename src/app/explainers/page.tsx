import type { Metadata } from "next";
import { ContentBrowser, type BrowseItem } from "@/components/content-browser";
import { LibraryFrame } from "@/components/library-frame";
import { EXPLAINER_IDEAS } from "@/lib/explainers";
import { ARTICLES } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";
import { Layers3, PlayCircle, Shapes } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explainers — StackShade",
  description:
    "A growing shelf of short engineering videos, mini-articles, visualizations, animations, decks, and interactive artifacts from StackShade.",
  alternates: { canonical: "https://stack-shade.github.io/explainers" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Explainers — StackShade",
    description:
      "Short engineering explainers, experiments, visuals, artifacts, and video-ready topic ideas.",
    url: "https://stack-shade.github.io/explainers",
    siteName: "StackShade",
    type: "website",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StackShade Explainers",
      },
    ],
  },
};

const published: BrowseItem[] = ARTICLES.map((article) => ({
  id: "article-" + article.slug,
  title: article.title,
  description: article.description,
  category: article.category,
  tags: article.tags ?? [],
  playlist: article.playlist ?? "StackShade Journal",
  formats: ["article"],
  duration: article.readTime,
  status: "published",
  href: "/blog/" + article.slug,
  date: article.date,
  featured: article.featured,
}));

const backlog: BrowseItem[] = EXPLAINER_IDEAS.map((idea) => ({
  id: idea.slug,
  title: idea.title,
  description: idea.description,
  category: idea.category,
  tags: idea.tags,
  playlist: idea.playlist,
  formats: idea.formats,
  duration: idea.duration,
  status: idea.status,
  hook: idea.hook,
  artifact: idea.artifact,
}));

const items = [...published, ...backlog];

export default function ExplainersPage() {
  return (
    <LibraryFrame>
      <main className="ss-shell py-10 sm:py-14 lg:py-16">
        <section className="border-b border-border pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant="outline" className="text-[9px] uppercase tracking-wider">
              The unstructured shelf
            </Badge>
            <span className="text-xs text-muted-foreground">
              {EXPLAINER_IDEAS.length} ready-to-record ideas
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,.5fr)] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black tracking-[-0.05em] leading-[0.98] sm:text-5xl md:text-6xl">
                Explainers, experiments & engineering rabbit holes.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                A fast-moving shelf for short videos, deep visual guides, interactive artifacts and presentation-ready topics.
                Everything stays searchable without forcing it into a rigid course.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-border bg-card/20 p-4">
                <PlayCircle className="h-5 w-5" />
                <p className="mt-3 text-sm font-bold">Video-ready</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Hooks, timings and playlists are part of the content model.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/20 p-4">
                <Shapes className="h-5 w-5" />
                <p className="mt-3 text-sm font-bold">Visual by default</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Prefer diagrams, traces, simulators and artifacts over walls of prose.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/20 p-4">
                <Layers3 className="h-5 w-5" />
                <p className="mt-3 text-sm font-bold">Scalable taxonomy</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Tags, formats and playlists keep a large library navigable.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10">
          <ContentBrowser
            items={items}
            pageSize={9}
            eyebrow="Explainer library"
            title="Browse the shelf."
            description="Search by status, topic, playlist, tag, format, or length. Published articles and future video ideas live in one index."
            emptyLabel="Try a broader search or reset the topic cluster."
          />
        </div>

        <section className="mt-14 border-t border-border pt-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Recommended workflow</p>
              <h2 className="mt-1 text-xl font-bold">Idea → video → article → artifact</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Publish the fastest useful explanation first, then deepen the same mental model into durable reading and an inspectable artifact.
              </p>
            </div>
            <Link href="/blog" className="inline-flex shrink-0 items-center text-sm font-semibold hover:underline">
              Browse the journal
            </Link>
          </div>
        </section>
      </main>
    </LibraryFrame>
  );
}
