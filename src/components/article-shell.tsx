import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Article, ARTICLES, articleJsonLd } from "@/lib/articles";
import ExcalidrawSketch from "@/components/excalidraw-sketch";
import { ArticleActions } from "@/components/article-actions";
import { ReadingProgress } from "@/components/reading-progress";

interface ArticleShellProps {
  article: Article;
  children: React.ReactNode;
}

export function ArticleShell({ article, children }: ArticleShellProps) {
  return (
    <div className="stack-blog relative overflow-hidden font-sans selection:bg-foreground/20 selection:text-foreground">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mb-7 flex items-center justify-between gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Journal
          </Link>
          <span className="hidden rounded-full border border-border px-3 py-1.5 font-mono text-[9px] text-muted-foreground sm:inline-flex">
            StackShade Journal
          </span>
        </div>

        <article className="space-y-9 lg:space-y-11">
          <header className="mx-auto w-full max-w-5xl">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-border text-foreground text-[9px] font-semibold uppercase tracking-wider">
                  {article.category}
                </Badge>
                {article.playlist && (
                  <Link href={"/blog?playlist=" + encodeURIComponent(article.playlist)}>
                    <Badge variant="outline" className="text-[9px] hover:border-foreground/40">
                      Playlist · {article.playlist}
                    </Badge>
                  </Link>
                )}
              </div>

              <h1 className="blog-display mt-5 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
                {article.title}
              </h1>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border/70 py-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date} className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{article.displayDate}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readTime}</span>
            </div>
            <p className="blog-copy mt-6 text-base leading-8 text-muted-foreground">{article.description}</p>
          </header>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link key={tag} href={"/blog?tag=" + encodeURIComponent(tag)} className="rounded-full border border-border px-3 py-1.5 text-[10px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            <ArticleActions title={article.title} />
          </div>

          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-muted/10 shadow-[0_1rem_4rem_rgba(0,0,0,.12)]">
            <div className="aspect-[16/7] relative bg-card sm:aspect-[16/6.5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.banner} alt={article.bannerAlt} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mt-7">
            <ExcalidrawSketch
              title="Sketch the mental model"
              subtitle="Rebuild the system from memory. The canvas is editable and opens fullscreen when you need more room."
              labels={[
                article.category,
                ...(article.tags ?? []).slice(0, 2),
                "Apply",
              ]}
              height={360}
            />
          </div>

          <div className="blog-reading-layout">
            {article.toc && article.toc.length > 0 && (
              <aside className="blog-reading-sidebar hidden lg:block">
                <div className="blog-reading-sidebar-card sticky top-24 space-y-3">
                  <span className="lesson-kicker">ON THIS PAGE</span>
                  <nav aria-label="On this page" className="grid gap-1">
                    {article.toc.map((item) => (
                      <Link key={item.id} href={"#" + item.id} className="rounded-lg px-2 py-1.5 text-[11px] leading-5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <div className="blog-article-body min-w-0 max-w-[78ch] text-muted-foreground">
              {children}
            </div>

            <aside className="blog-reading-sidebar hidden xl:block">
              <div className="blog-reading-sidebar-card space-y-4">
                <div>
                  <span className="lesson-kicker">READING GUIDE</span>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Start with the mental model. Inspect the visual or artifact. Then retrieve the mechanism from memory.
                  </p>
                </div>

                <div className="border-t border-border/70 pt-3">
                  <span className="lesson-kicker">ARTICLE META</span>
                  <div className="mt-2 space-y-1.5 text-[11px] text-muted-foreground">
                    <div>{article.readTime}</div>
                    <div>{article.category}</div>
                    {article.playlist && <div>{article.playlist}</div>}
                  </div>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="border-t border-border/70 pt-3">
                    <span className="lesson-kicker">TOPICS</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <Link key={tag} href={"/blog?tag=" + encodeURIComponent(tag)} className="rounded-full border border-border px-2 py-1 text-[9px] text-muted-foreground hover:text-foreground">
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-border/70 pt-3">
                  <span className="lesson-kicker">KEEP READING</span>
                  <div className="mt-2">
                    {ARTICLES.filter(
                      (item) =>
                        item.slug !== article.slug &&
                        (item.tags ?? []).some((tag) => (article.tags ?? []).includes(tag)),
                    )
                      .slice(0, 4)
                      .map((item) => (
                        <Link key={item.slug} href={"/blog/" + item.slug} className="block border-b border-border/60 py-2.5 last:border-b-0">
                          <span className="text-xs font-semibold leading-5 text-foreground">{item.title}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </div>
  );
}
