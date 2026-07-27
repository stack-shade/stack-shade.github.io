import { Metadata } from "next";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO, e.g. "2026-07-25"
  displayDate: string; // e.g. "July 25, 2026"
  readTime: string;
  banner: string; // path under /public
  bannerAlt: string;
  author: string;
  featured?: boolean;
}

export const ARTICLES: Article[] = [
  {
    slug: "osi-model-explained",
    title: "OSI Model Explained: 7 Layers of Networking for Beginners",
    description:
      "Learn the OSI model's 7 layers with interactive diagrams, an encapsulation simulator, an animated TCP handshake, OSI vs TCP/IP mapping, and a practice quiz. Perfect for CCNA, GATE, and interviews.",
    category: "Networking Fundamentals",
    date: "2026-07-25",
    displayDate: "July 25, 2026",
    readTime: "15 min read",
    banner: "/blog/osi-model-banner.svg",
    bannerAlt: "OSI Model 7 Layers Diagram",
    author: "Shaswat Raj",
    featured: true,
  },
  {
    slug: "system-design-internals",
    title: "Scaling High-Throughput Distributed Systems: A Visual Deep Dive",
    description:
      "Learn how to scale backend clusters using Layer 4/7 load balancers, caching strategies, consistent hashing rings, and event-driven architectures.",
    category: "Advanced Architecture",
    date: "2026-07-18",
    displayDate: "July 18, 2026",
    readTime: "12 min read",
    banner: "/blog/system-design-banner.png",
    bannerAlt: "System Design Architecture Diagram",
    author: "Shaswat Raj",
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function sortedArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function articleUrl(slug: string) {
  return `https://stack-shade.github.io/blog/${slug}`;
}

export function buildArticleMetadata(article: Article): Metadata {
  const url = articleUrl(article.slug);
  const image = `https://stack-shade.github.io${article.banner}`;
  const title = `${article.title} | StackShade Blog`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: article.description,
      url,
      siteName: "StackShade",
      images: [{ url: image, width: 1200, height: 630, alt: article.bannerAlt }],
      locale: "en_US",
      type: "article",
      publishedTime: `${article.date}T00:00:00.000Z`,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export function articleJsonLd(article: Article) {
  const url = articleUrl(article.slug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `https://stack-shade.github.io${article.banner}`,
    datePublished: `${article.date}T00:00:00.000Z`,
    author: {
      "@type": "Person",
      name: article.author,
      url: "https://sh20raj.github.io/",
    },
    publisher: {
      "@type": "Organization",
      name: "StackShade",
      logo: {
        "@type": "ImageObject",
        url: "https://stack-shade.github.io/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
