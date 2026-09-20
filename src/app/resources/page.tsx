import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Network, Server, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources — StackShade",
  description: "A curated starting point for StackShade engineering guides, courses, simulators, and learning paths.",
  alternates: { canonical: "https://stack-shade.github.io/resources" },
  robots: { index: true, follow: true },
};

const guides = [
  ["/blog/what-happens-when-you-type-url", "What Really Happens When You Type a URL?", "Browser, DNS, TLS, HTTP, servers, and rendering."],
  ["/blog/osi-model-explained", "OSI Model Explained", "Networking layers, encapsulation, TCP, and troubleshooting."],
  ["/blog/dns-resolution-explained", "DNS Resolution Explained", "Recursive resolvers, authoritative servers, records, and TTLs."],
  ["/blog/http1-http2-http3", "HTTP/1.1 vs HTTP/2 vs HTTP/3", "How modern web transport evolved."],
  ["/blog/database-indexes-btree", "Database Indexes & B-Trees", "Query planning, composite indexes, and write tradeoffs."],
  ["/blog/redis-caching", "Redis & Caching", "Cache-aside, TTLs, invalidation, and stampedes."],
  ["/blog/cap-theorem-consistency", "CAP & Consistency", "Distributed failures, partitions, and consistency models."],
  ["/blog/kafka-event-driven", "Kafka & Event-Driven Systems", "Topics, partitions, offsets, consumers, and replay."],
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">StackShade Resources</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">Start learning from the foundations.</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A single place to move from fundamentals to systems thinking. Use the guides for focused reading,
            the courses for structured study, and the interactive pages when you want to experiment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <Link href="/blog" className="group rounded-2xl border border-border bg-card/20 p-7 hover:border-foreground/30 transition-all">
            <BookOpen className="w-7 h-7 mb-6" />
            <h2 className="text-xl font-bold mb-2">Engineering Blog</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Deep technical articles with examples, architecture diagrams, and practical debugging notes.</p>
            <span className="inline-flex items-center gap-1 mt-5 text-sm font-semibold">Read guides <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
          <Link href="/courses" className="group rounded-2xl border border-border bg-card/20 p-7 hover:border-foreground/30 transition-all">
            <Code2 className="w-7 h-7 mb-6" />
            <h2 className="text-xl font-bold mb-2">Structured Courses</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Topic-by-topic learning paths for DSA, networks, operating systems, system design, Next.js, and DevOps.</p>
            <span className="inline-flex items-center gap-1 mt-5 text-sm font-semibold">Browse courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
          <Link href="/algoforge" className="group rounded-2xl border border-border bg-card/20 p-7 hover:border-foreground/30 transition-all">
            <Wrench className="w-7 h-7 mb-6" />
            <h2 className="text-xl font-bold mb-2">Interactive Tools</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Use visual simulators and learning tools to connect theory to concrete execution.</p>
            <span className="inline-flex items-center gap-1 mt-5 text-sm font-semibold">Open tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
        </div>

        <section className="border-t border-border pt-12">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Featured guides</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Build the mental model first</h2>
            </div>
            <Network className="w-8 h-8 text-muted-foreground hidden sm:block" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {guides.map(([href, title, description]) => (
              <Link key={href} href={href} className="group rounded-xl border border-border/80 bg-background/60 p-5 hover:border-foreground/30 transition-all">
                <h3 className="font-bold mb-2 group-hover:underline">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border mt-14 pt-10">
          <div className="flex flex-wrap gap-4">
            <Link href="/editorial-policy" className="text-sm underline underline-offset-4">Editorial policy</Link>
            <Link href="/about" className="text-sm underline underline-offset-4">About StackShade</Link>
            <Link href="/privacy" className="text-sm underline underline-offset-4">Privacy policy</Link>
            <Link href="/terms" className="text-sm underline underline-offset-4">Terms of use</Link>
            <Link href="/contact" className="text-sm underline underline-offset-4">Contact</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
