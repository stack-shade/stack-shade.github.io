import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleShell } from "@/components/article-shell";
import ImportedArticleBody from "@/components/imported-article-body";
import type { Article } from "@/lib/articles";
import { buildArticleMetadata, getArticle } from "@/lib/articles";
import { getImportedBlog, IMPORTED_BLOGS } from "@/lib/imported-blogs";

function importedToArticle(blog: (typeof IMPORTED_BLOGS)[number]): Article {
  const parsed = new Date(blog.sourceDate);
  const date = Number.isNaN(parsed.getTime()) ? "2026-01-01" : parsed.toISOString().slice(0, 10);

  return {
    slug: blog.slug,
    title: blog.title,
    description: blog.description,
    category: blog.category,
    tags: blog.tags,
    playlist: blog.playlist,
    date,
    displayDate: blog.sourceDate,
    readTime: blog.readTime,
    banner: blog.banner,
    bannerAlt: blog.bannerAlt,
    author: blog.author,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return IMPORTED_BLOGS.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  const blog = getImportedBlog(slug);
  const pageArticle = article ?? (blog ? importedToArticle(blog) : undefined);
  return pageArticle ? buildArticleMetadata(pageArticle) : {};
}

export default async function ImportedBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const blog = getImportedBlog(slug);
  const pageArticle = article ?? (blog ? importedToArticle(blog) : undefined);
  if (!pageArticle || !blog) notFound();

  return (
    <ArticleShell article={pageArticle}>
      <ImportedArticleBody blog={blog} />
    </ArticleShell>
  );
}
