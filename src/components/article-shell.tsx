import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Article, ARTICLES, articleJsonLd } from "@/lib/articles";

interface ArticleShellProps {
  article: Article;
  children: React.ReactNode;
}

export function ArticleShell({ article, children }: ArticleShellProps) {
  return (
    <div className="font-sans selection:bg-foreground/20 selection:text-foreground relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Articles
          </Link>
        </div>

        <article className="space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-border text-foreground uppercase text-[10px] tracking-wider font-semibold"
              >
                {article.category}
              </Badge>
              {article.playlist && (
                <Link href={"/blog?playlist=" + encodeURIComponent(article.playlist)}>
                  <Badge
                    variant="outline"
                    className="text-[10px] hover:border-foreground/40 transition-colors"
                  >
                    Playlist · {article.playlist}
                  </Badge>
                </Link>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono border-y border-border/60 py-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.displayDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={"/blog?tag=" + encodeURIComponent(tag)}
                    className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="border border-border rounded-2xl overflow-hidden aspect-video relative bg-muted/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.banner} alt={article.bannerAlt} className="object-cover w-full h-full" />
          </div>

          <div className="blog-reading-layout">
            <div className="blog-article-body space-y-10 text-muted-foreground">
              {children}
            </div>

            <aside className="blog-reading-sidebar">
              <div className="blog-reading-sidebar-card space-y-4">
                <div>
                  <span className="lesson-kicker">READING GUIDE</span>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Read for the mental model first. Then inspect the visual or artifact before moving on.
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
                    {ARTICLES.filter((item) => item.slug !== article.slug && (item.tags ?? []).some((tag) => (article.tags ?? []).includes(tag))).slice(0, 3).map((item) => (
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
