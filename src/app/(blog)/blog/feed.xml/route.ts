import { sortedArticles, articleUrl } from "@/lib/articles";
import { IMPORTED_BLOGS } from "@/lib/imported-blogs";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export function GET() {
  const curated = sortedArticles().map((article) => ({
    title: article.title,
    url: article.url,
    description: article.description,
    date: article.date,
    category: article.category,
  }));

  const imported = IMPORTED_BLOGS.map((blog) => {
    const parsed = new Date(blog.sourceDate);
    const date = Number.isNaN(parsed.getTime()) ? "2026-01-01" : parsed.toISOString().slice(0, 10);

    return {
      title: blog.title,
      url: articleUrl(blog.slug),
      description: blog.description,
      date,
      category: blog.category,
    };
  });

  const articles = [...curated, ...imported]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 100);

  const items = articles.map((article) => [
    "<item>",
    "  <title>" + escapeXml(article.title) + "</title>",
    "  <link>" + articleUrl(article.slug) + "</link>",
    "  <guid isPermaLink=\"true\">" + articleUrl(article.slug) + "</guid>",
    "  <description>" + escapeXml(article.description) + "</description>",
    "  <pubDate>" + new Date(article.date + "T00:00:00.000Z").toUTCString() + "</pubDate>",
    "  <category>" + escapeXml(article.category) + "</category>",
    "</item>",
  ].join("\n")).join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>StackShade Engineering Journal</title>",
    "    <link>https://stack-shade.github.io/blog</link>",
    "    <description>Long-form engineering stories, protocol references, systems explainers, AI, infrastructure, and practical debugging guides.</description>",
    "    <language>en</language>",
    "    <lastBuildDate>" + new Date().toUTCString() + "</lastBuildDate>",
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}