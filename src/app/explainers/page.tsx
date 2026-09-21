import type { Metadata } from "next";
import { ContentBrowser, type BrowseItem } from "@/components/content-browser";
import { EXPLAINER_IDEAS } from "@/lib/explainers";
import { ARTICLES } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Layers3, PlayCircle, Shapes } from "lucide-react";
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
        url: "https://stack-shade.github.io/og-image.png",
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
    <div className="selection:bg-foreground/20 selection:text-foreground">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <section className="border-b border-border pb-14 mb-14">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant="outline" className="text-[9px] uppercase tracking-wider">
              The unstructured shelf
            </Badge>
            <span className="text-xs text-muted-foreground">
              {EXPLAINER_IDEAS.length} ready-to-record ideas
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.055em] leading-[0.95] max-w-4xl mb-6">
            Explainers, experiments & weird little engineering rabbit holes.
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            Not a course. Not a textbook. This is the fast-moving shelf for videos and articles you can make
            whenever a topic is interesting: tiny 5-minute explainers, long visual deep dives, interactive artifacts,
            animated diagrams, and presentation-ready decks.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-10">
            <div className="rounded-2xl border border-border bg-card/20 p-5">
              <PlayCircle className="w-5 h-5 mb-4" />
              <p className="font-semibold mb-1">Video-first</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hooks, timings, and playlist names are attached to every idea.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/20 p-5">
              <Shapes className="w-5 h-5 mb-4" />
              <p className="font-semibold mb-1">Visual by default</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use animations, simulators, diagrams, artifacts, and decks—not just paragraphs.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/20 p-5">
              <Layers3 className="w-5 h-5 mb-4" />
              <p className="font-semibold mb-1">Taxonomy that scales</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tags + playlists + categories keep a huge random library discoverable.
              </p>
            </div>
          </div>
        </section>

        <ContentBrowser
          items={items}
          pageSize={9}
          eyebrow="Explainer library"
          title="Browse everything without forcing it into a course."
          description="Published guides and future video ideas share one searchable index. Filter by status, topic, playlist, tag, format, or length; click a cluster to pivot into related ideas."
          emptyLabel="Try a broader search or reset the topic cluster."
        />

        <section className="mt-16 pt-10 border-t border-border">
          <div className="rounded-3xl border border-border bg-card/20 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Recommended workflow
              </p>
              <h2 className="text-2xl font-bold mb-2">Idea → video → article → artifact</h2>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Start with the quickest visual hook, publish the video, then expand the same mental model into a
                durable article and one small interactive artifact. The content stays connected without becoming a course.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline whitespace-nowrap"
            >
              Browse the journal
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
