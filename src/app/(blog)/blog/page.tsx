import React from "react";
import { Metadata } from "next";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article, sortedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Engineering Blog — StackShade",
  description: "Original, practical engineering guides on networking, system design, databases, DevOps, Next.js, Git, and backend architecture.",
  alternates: { canonical: "https://stack-shade.github.io/blog" },
  openGraph: {
    title: "Engineering Blog — StackShade",
    description: "Original, practical engineering guides on networking, system design, databases, DevOps, Next.js, Git, and backend architecture.",
    url: "https://stack-shade.github.io/blog",
    siteName: "StackShade",
    images: [{ url: "https://stack-shade.github.io/og-image.png", width: 1200, height: 630, alt: "StackShade — Visual Engineering Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog — StackShade",
    description: "Original, practical engineering guides on networking, system design, databases, DevOps, Next.js, Git, and backend architecture.",
    images: ["https://stack-shade.github.io/og-image.png"],
  },
  robots: { index: true, follow: true },
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="bg-card/20 border-border hover:border-foreground/30 transition-all duration-300 overflow-hidden group">
      <a href={`/blog/${article.slug}`} className="block relative aspect-video md:aspect-[21/9] overflow-hidden border-b border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.banner} alt={article.bannerAlt} className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500" />
      </a>
      <CardHeader className="p-6 md:p-8 space-y-4">
        <div className="blog-meta flex flex-wrap items-center gap-4 text-muted-foreground">
          <Badge variant="outline" className="uppercase text-[9px] tracking-wider">{article.category}</Badge>
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{article.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{article.displayDate}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
        </div>
        <div>
          <a href={`/blog/${article.slug}`} className="block group-hover:underline">
            <CardTitle className="blog-card-title text-2xl sm:text-3xl font-bold mb-3">{article.title}</CardTitle>
          </a>
          <CardDescription className="text-muted-foreground text-[15px] sm:text-base leading-relaxed">{article.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
        <a href={`/blog/${article.slug}`} className={buttonVariants({ variant: "default", size: "sm", className: "cursor-pointer font-semibold" })}>
          Read Article
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </a>
      </CardContent>
    </Card>
  );
}

export default function BlogIndex() {
  const articles = sortedArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="stack-blog selection:bg-foreground/20 selection:text-foreground relative overflow-hidden">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="mb-16 border-b border-border/80 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="outline" className="border-border text-muted-foreground uppercase text-[10px] tracking-wider">StackShade Journal</Badge>
            <span className="blog-meta text-muted-foreground">{articles.length} original engineering guides</span>
          </div>
          <h1 className="blog-display text-5xl sm:text-6xl md:text-7xl mb-6 max-w-4xl">Visual Engineering Chronicles</h1>
          <p className="blog-copy text-muted-foreground max-w-3xl">
            Original, practical guides that break complex engineering into understandable steps.
            Go from browser networking and databases to distributed systems, DevOps, Git, and modern Next.js.
            Each article is written to teach a useful mental model and link to the next topic.
          </p>
        </div>

        <div className="space-y-12">
          {featured && (
            <>
              <h2 className="blog-meta font-bold text-muted-foreground mb-6">Featured Deep Dive</h2>
              <ArticleCard article={featured} />
            </>
          )}

          {rest.length > 0 && (
            <>
              <h2 className="blog-meta font-bold text-muted-foreground mb-6 pt-4">More Engineering Guides</h2>
              {rest.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
