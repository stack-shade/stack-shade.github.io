import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
        <div className="mb-10 border-b border-border/80 pb-10">
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

        {ARTICLES.filter((article) => article.featured).slice(0, 1).map((article) => (
          <section key={article.slug} className="mb-12 grid gap-5 rounded-[1.35rem] border border-border bg-card/25 p-4 sm:p-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.65fr)]">
            <div className="flex min-h-[18rem] flex-col justify-between rounded-[1rem] border border-border bg-background/40 p-5 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[9px]">Featured guide</Badge>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
                    <Clock3 className="h-3 w-3" /> {article.readTime}
                  </span>
                </div>
                <div className="mt-8">
                  <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">{article.title}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{article.description}</p>
                </div>
              </div>
              <Link href={"/blog/" + article.slug} className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-foreground bg-foreground px-4 py-2.5 text-xs font-bold text-background">
                Start reading <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col justify-between rounded-[1rem] border border-border bg-background/30 p-5 sm:p-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground"><Sparkles className="h-3.5 w-3.5" /> StackShade method</div>
                <div className="mt-5 grid gap-2">
                  {["Mental model first", "Visual reasoning", "Concrete artifact", "Retrieval + transfer"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/30 p-3 text-xs font-semibold">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-border font-mono text-[9px]">0{index + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-xs leading-5 text-muted-foreground">Long-form guides are the durable layer; quick explainers and decks sit around them.</p>
            </div>
          </section>
        ))}

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
