import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3, ShieldCheck } from "lucide-react";
import { ContentBrowser, type BrowseItem } from "@/components/content-browser";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Engineering Blog — StackShade",
  description:
    "A deep technical reading room for software engineers: practical guides on web protocols, AI, networking, systems, databases, DevOps, Linux, and modern development.",
  alternates: { canonical: "https://stack-shade.github.io/blog" },
  openGraph: {
    title: "Engineering Blog — StackShade",
    description:
      "Long-form engineering stories, practical mental models, protocol references, and systems explainers.",
    url: "https://stack-shade.github.io/blog",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackShade Engineering Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog — StackShade",
    description:
      "Long-form engineering stories, practical mental models, protocol references, and systems explainers.",
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
  banner: article.banner,
  bannerAlt: article.bannerAlt,
}));

const categoryCount = new Set(ARTICLES.map((article) => article.category)).size;
const tagCount = new Set(ARTICLES.flatMap((article) => article.tags ?? [])).size;

export default function BlogIndex() {
  const featured = [...ARTICLES]
    .filter((article) => article.featured)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <main className="stack-blog min-h-screen selection:bg-foreground/15 selection:text-foreground">
      <section className="border-b border-border">
        <div className="ss-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>StackShade Journal</span>
              <span aria-hidden="true">·</span>
              <span>{ARTICLES.length} stories</span>
              <span aria-hidden="true">·</span>
              <span>{categoryCount} topics</span>
              <span aria-hidden="true">·</span>
              <span>{tagCount} tags</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
              Engineering ideas, written to be read all the way through.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              StackShade is a reading room for concepts that deserve more than a snippet: protocols, distributed systems,
              AI, frontend mechanics, infrastructure, debugging playbooks, and the small details that make software click.
            </p>
          </div>

          <aside className="rounded-2xl border border-border bg-card/30 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Start here</p>
            <div className="mt-4 space-y-3">
              {[
                ["Read deeply", "Long-form guides with examples, edge cases, and practical mental models."],
                ["Search everything", "Use the search box or press / to jump directly into the library."],
                ["Keep the context", "Every story carries topics, related reading, and source notes."],
              ].map(([title, body]) => (
                <div key={title} className="border-t border-border/70 pt-3 first:border-t-0 first:pt-0">
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {featured && (
        <section className="ss-shell py-10 md:py-12">
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card/20">
            <div className="grid md:grid-cols-[1.15fr_.85fr]">
              <Link href={"/blog/" + featured.slug} className="group relative block min-h-[20rem] overflow-hidden bg-muted md:min-h-[28rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.banner}
                  alt={featured.bannerAlt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                  <span className="inline-flex rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                    Featured story
                  </span>
                  <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">{featured.title}</h2>
                </div>
              </Link>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <span>{featured.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={featured.date}>{featured.displayDate}</time>
                  </div>
                  <p className="mt-6 text-base leading-8 text-muted-foreground">{featured.description}</p>
                </div>

                <div className="mt-8">
                  <Link
                    href={"/blog/" + featured.slug}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background transition hover:opacity-90"
                  >
                    Read the featured story <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="ss-shell pb-16 md:pb-24">
        <div className="mb-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_22rem] md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">The library</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Find the piece of the stack you need.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Search, filter, sort, switch layouts, and share the exact view with URL parameters. The index stays static and fast;
              the browsing state stays in the address bar.
            </p>
          </div>

          <a href="http://observatory.campusloop.space/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border bg-card/20 p-4 transition hover:border-foreground/30 hover:bg-card/40">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">CampusLoop tool</p>
              <p className="mt-1 text-sm font-bold text-foreground">HTTP Observatory</p>
              <p className="mt-1 text-xs text-muted-foreground">Inspect and understand the response chain from a practical observability angle.</p>
            </div>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="/blog/http-status-codes-explained"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card/20 p-4 transition hover:border-foreground/30 hover:bg-card/40"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">New reference</p>
              <p className="mt-1 text-sm font-bold text-foreground">HTTP Status Codes, deeply explained</p>
              <p className="mt-1 text-xs text-muted-foreground">Every MDN-listed code, production patterns, and debugging heuristics.</p>
            </div>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/20 p-4">
            <Clock3 className="h-4 w-4 text-muted-foreground" />
            <p className="mt-3 text-sm font-bold text-foreground">Readable pace</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Reading times are surfaced before you commit to a story.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/20 p-4">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <p className="mt-3 text-sm font-bold text-foreground">Source-aware</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">External research is credited and version-sensitive claims link back to primary references.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/20 p-4">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <p className="mt-3 text-sm font-bold text-foreground">Built to compound</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Topic links and related guides turn individual posts into connected study paths.</p>
          </div>
        </div>

        <ContentBrowser
          items={blogItems}
          pageSize={12}
          eyebrow="Browse the journal"
          title="Stories, references, and deep dives."
          description="The URL is the state: q, filters, sort, page, view, and page size are all shareable. That makes filtered views bookmarkable, crawlable as one canonical library, and easy to resume."
          emptyLabel="Try a broader search or clear one of the active filters."
        />
      </section>
    </main>
  );
}
