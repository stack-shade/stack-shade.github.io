import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleShell } from "@/components/article-shell";
import ImportedArticleBody from "@/components/imported-article-body";
import { buildArticleMetadata, getArticle } from "@/lib/articles";
import { getImportedBlog, IMPORTED_BLOGS } from "@/lib/imported-blogs";

export const dynamicParams = false;

export function generateStaticParams() {
  return IMPORTED_BLOGS.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article ? buildArticleMetadata(article) : {};
}

export default async function ImportedBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const blog = getImportedBlog(slug);
  if (!article || !blog) notFound();

  return (
    <ArticleShell article={article}>
      <ImportedArticleBody blog={blog} />
    </ArticleShell>
  );
}
