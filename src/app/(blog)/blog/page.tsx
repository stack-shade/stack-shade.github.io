import React from "react";
import { Metadata } from "next";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User 
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Engineering Blog — StackShade",
  description: "Visual logs, deep dives, and articles on DSA patterns, System Design, DevOps, databases, and AI engineering.",
  alternates: {
    canonical: "https://stack-shade.github.io/blog",
  },
  openGraph: {
    title: "Engineering Blog — StackShade",
    description: "Visual logs, deep dives, and articles on DSA patterns, System Design, DevOps, databases, and AI engineering.",
    url: "https://stack-shade.github.io/blog",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackShade — Visual Engineering Blog Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog — StackShade",
    description: "Visual logs, deep dives, and articles on DSA patterns, System Design, DevOps, databases, and AI engineering.",
    images: ["https://stack-shade.github.io/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogIndex() {
  return (
    <div className="selection:bg-foreground/20 selection:text-foreground relative overflow-hidden">
      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 border-b pb-10">
          <Badge variant="outline" className="mb-4 border-border text-muted-foreground uppercase text-[10px] tracking-wider">
            StackShade Journal
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Visual Engineering Chronicles
          </h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Where complex architectures are decomposed into simple visual blocks. Read our practical guides on DSA, systems, scaling, and database internals.
          </p>
        </div>

        {/* Featured Article */}
        <div className="space-y-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Featured Deep Dive</h2>
          
          <Card className="bg-card/20 border-border hover:border-foreground/30 transition-all duration-300 overflow-hidden group">
            {/* Banner image wrapper */}
            <a href="/blog/system-design-internals" className="block relative aspect-video md:aspect-[21/9] overflow-hidden border-b border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/blog/system-design-banner.png" 
                alt="Scaling Distributed Systems Banner" 
                className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500"
              />
            </a>

            <CardHeader className="p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Shaswat Raj
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  July 18, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  12 min read
                </span>
              </div>

              <div>
                <a href="/blog/system-design-internals" className="block group-hover:underline">
                  <CardTitle className="text-2xl font-bold tracking-tight mb-3">
                    Scaling High-Throughput Distributed Systems: A Visual Deep Dive
                  </CardTitle>
                </a>
                <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Understand the underlying mechanics of Layer 4 vs Layer 7 load balancers, cache consistency patterns, consistent hashing rings, event-driven streaming delivery guarantees, and distributed consensus. Complete with interactive system simulators.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
              <a 
                href="/blog/system-design-internals"
                className={buttonVariants({ variant: "default", size: "sm", className: "cursor-pointer font-semibold" })}
              >
                Read Article
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
