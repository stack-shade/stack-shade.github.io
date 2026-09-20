import { Metadata } from "next";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  displayDate: string;
  readTime: string;
  banner: string;
  bannerAlt: string;
  author: string;
  featured?: boolean;
}

export const ARTICLES: Article[] = [
  {
    slug: "what-happens-when-you-type-url",
    title: "What Really Happens When You Type a URL?",
    description: "A step-by-step walkthrough of URL parsing, DNS, routing, TLS, HTTP, server-side processing, and browser rendering.",
    category: "Web Foundations",
    date: "2026-09-20",
    displayDate: "September 20, 2026",
    readTime: "10 min read",
    banner: "/og-image.png",
    bannerAlt: "StackShade visual engineering overview",
    author: "Shaswat Raj",
    featured: true,
  },
  {
    slug: "dns-resolution-explained",
    title: "DNS Resolution Explained: From Domain Name to IP Address",
    description: "Understand recursive resolvers, authoritative servers, DNS records, TTLs, caching, and CDN traffic steering.",
    category: "Networking",
    date: "2026-09-19",
    displayDate: "September 19, 2026",
    readTime: "8 min read",
    banner: "/blog/osi-model-banner.svg",
    bannerAlt: "DNS and networking concepts",
    author: "Shaswat Raj",
  },
  {
    slug: "http1-http2-http3",
    title: "HTTP/1.1 vs HTTP/2 vs HTTP/3: What Actually Changed?",
    description: "A practical comparison of HTTP protocol generations, multiplexing, TCP, QUIC, streams, and web performance.",
    category: "Web Protocols",
    date: "2026-09-18",
    displayDate: "September 18, 2026",
    readTime: "9 min read",
    banner: "/og-image.png",
    bannerAlt: "Modern web protocol architecture",
    author: "Shaswat Raj",
  },
  {
    slug: "database-indexes-btree",
    title: "Database Indexes Explained: B-Trees, Composite Indexes, and Query Plans",
    description: "Learn how database indexes reduce lookup work, why B-trees dominate common workloads, and how query planners use indexes.",
    category: "Databases",
    date: "2026-09-17",
    displayDate: "September 17, 2026",
    readTime: "9 min read",
    banner: "/blog/system-design-banner.png",
    bannerAlt: "Database and system architecture diagram",
    author: "Shaswat Raj",
  },
  {
    slug: "redis-caching",
    title: "Redis Caching Patterns: TTLs, Invalidation, and Cache Stampedes",
    description: "Understand cache-aside, invalidation, hot keys, stampedes, Redis data structures, and when a cache is unnecessary.",
    category: "Backend Engineering",
    date: "2026-09-16",
    displayDate: "September 16, 2026",
    readTime: "8 min read",
    banner: "/blog/system-design-banner.png",
    bannerAlt: "Caching and distributed system architecture",
    author: "Shaswat Raj",
  },
  {
    slug: "cap-theorem-consistency",
    title: "CAP Theorem and Consistency Models: A Failure-First Guide",
    description: "A practical explanation of partitions, consistency, availability, replicas, retries, and distributed-system tradeoffs.",
    category: "Distributed Systems",
    date: "2026-09-15",
    displayDate: "September 15, 2026",
    readTime: "8 min read",
    banner: "/blog/system-design-banner.png",
    bannerAlt: "Distributed systems architecture",
    author: "Shaswat Raj",
  },
  {
    slug: "docker-containers-vs-vms",
    title: "Docker Containers vs Virtual Machines: What Is Actually Different?",
    description: "Compare kernels, isolation, startup time, images, resource boundaries, and why modern infrastructure often uses both.",
    category: "DevOps",
    date: "2026-09-14",
    displayDate: "September 14, 2026",
    readTime: "7 min read",
    banner: "/og-image.png",
    bannerAlt: "Container and infrastructure concepts",
    author: "Shaswat Raj",
  },
  {
    slug: "kafka-event-driven",
    title: "Kafka and Event-Driven Architecture: Topics, Partitions, and Replay",
    description: "Learn how producers, partitions, consumer groups, offsets, retention, retries, and idempotency fit together.",
    category: "Backend Engineering",
    date: "2026-09-13",
    displayDate: "September 13, 2026",
    readTime: "9 min read",
    banner: "/blog/system-design-banner.png",
    bannerAlt: "Event-driven architecture diagram",
    author: "Shaswat Raj",
  },
  {
    slug: "nextjs-server-components",
    title: "Next.js Server Components: Designing a Small Client Boundary",
    description: "Understand the App Router's server/client split, data fetching, streaming, browser APIs, and bundle-size tradeoffs.",
    category: "Next.js",
    date: "2026-09-12",
    displayDate: "September 12, 2026",
    readTime: "8 min read",
    banner: "/og-image.png",
    bannerAlt: "StackShade full-stack engineering guide",
    author: "Shaswat Raj",
  },
  {
    slug: "git-internals-explained",
    title: "Git Internals Explained: Blobs, Trees, Commits, and References",
    description: "Go under the hood of Git's content-addressed object model and understand what branches and HEAD really point to.",
    category: "Developer Tools",
    date: "2026-09-11",
    displayDate: "September 11, 2026",
    readTime: "8 min read",
    banner: "/og-image.png",
    bannerAlt: "Developer tools and Git concepts",
    author: "Shaswat Raj",
  },
  {
    slug: "osi-model-explained",
    title: "OSI Model Explained: 7 Layers of Networking for Beginners",
    description: "Learn the OSI model with interactive diagrams, encapsulation, TCP handshake behavior, OSI vs TCP/IP mapping, and troubleshooting.",
    category: "Networking Fundamentals",
    date: "2026-07-25",
    displayDate: "July 25, 2026",
    readTime: "15 min read",
    banner: "/blog/osi-model-banner.svg",
    bannerAlt: "OSI Model 7 Layers Diagram",
    author: "Shaswat Raj",
  },
  {
    slug: "system-design-internals",
    title: "Scaling High-Throughput Distributed Systems: A Visual Deep Dive",
    description: "Explore load balancing, caching, consistent hashing, messaging, and distributed-system scaling decisions.",
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
      modifiedTime: "2026-09-20T00:00:00.000Z",
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
    dateModified: "2026-09-20T00:00:00.000Z",
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
