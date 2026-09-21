import type { Metadata } from "next";
import { ContentBrowser, type BrowseItem } from "@/components/content-browser";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Engineering Blog — StackShade",
  description:
    "Searchable engineering guides with tags, playlists, visual explanations, and practical mental models across networking, systems, databases, AI, DevOps, and web engineering.",
  alternates: { canonical: "https://stack-shade.github.io/blog" },
  openGraph: {
    title: "Engineering Blog — StackShade",
    description:
      "Searchable engineering guides with tags, playlists, visual explanations, and practical mental models.",
    url: "https://stack-shade.github.io/blog",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackShade — Visual Engineering Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog — StackShade",
    description:
      "Searchable engineering guides with tags, playlists, visual explanations, and practical mental models.",
    images: ["https://stack-shade.github.io/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const blogItems: BrowseItem[] = ARTICLES.map((article) => ({
  id: article.slug,
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

export default function BlogIndex() {
  return (
    <div className="stack-blog selection:bg-foreground/20 selection:text-foreground relative overflow-hidden">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="mb-14 border-b border-border/80 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              StackShade Journal
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{ARTICLES.length} guides</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">tagged + clustered</span>
          </div>
          <h1 className="blog-display text-5xl sm:text-6xl md:text-7xl mb-5 max-w-4xl">
            Visual Engineering Chronicles
          </h1>
          <p className="blog-copy text-muted-foreground max-w-3xl">
            Durable deep dives for concepts worth keeping around. Search by topic, tag, or playlist,
            compare reading lengths, and jump between closely related systems.
          </p>
        </div>

        <ContentBrowser
          items={blogItems}
          pageSize={6}
          eyebrow="Browse the journal"
          title="Find the mental model you need."
          description="The blog stays focused on complete, reusable explanations. The separate Explainers shelf is where quick videos, experiments, decks, animations, and one-off ideas live."
          emptyLabel="Try removing a tag or switching the playlist."
        />
      </main>
    </div>
  );
}
