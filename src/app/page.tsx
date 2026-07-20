import React from "react";
import { Metadata } from "next";
import { 
  ArrowUpRight, 
  Code2, 
  Server, 
  Terminal, 
  Sparkles, 
  ArrowRight,
  Play,
  Globe,
  Github,
  Youtube
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StackShade — Learn Faster, Remember Longer",
  description: "Visual explanations of DSA patterns, system design, backend engineering, DevOps, Next.js, and AI engineering. Build like real engineers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "StackShade",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "StackShade — Learn Faster, Remember Longer",
    description: "Visual explanations of DSA patterns, system design, backend engineering, DevOps, Next.js, and AI engineering. Build like real engineers.",
    url: "https://stack-shade.github.io",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackShade — Visual Engineering Social Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackShade — Learn Faster, Remember Longer",
    description: "Visual explanations of DSA patterns, system design, backend engineering, DevOps, Next.js, and AI engineering. Build like real engineers.",
    images: ["https://stack-shade.github.io/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://stack-shade.github.io",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-foreground/20 selection:text-foreground bg-background text-foreground overflow-hidden">
      {/* Schema.org Organization/Website JSON-LD for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "StackShade",
            "url": "https://stack-shade.github.io",
            "description": "Visual explanations of DSA patterns, system design, backend engineering, DevOps, Next.js, and AI engineering.",
            "publisher": {
              "@type": "Organization",
              "name": "StackShade",
              "logo": {
                "@type": "ImageObject",
                "url": "https://stack-shade.github.io/logo.png"
              }
            }
          })
        }}
      />

      {/* Extracted client-side Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Badge 
            variant="outline" 
            className="px-3.5 py-1 text-xs mb-6 text-muted-foreground border-border bg-transparent font-medium tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-muted-foreground" />
            Code. Design. Engineer. Scale.
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl">
            Learn Faster, <span className="text-muted-foreground">Remember Longer</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
            Welcome to <span className="text-foreground font-semibold">StackShade</span> — where complex engineering becomes simple. We explain algorithm patterns, system design, databases, DevOps, and full-stack AI architectures visually.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg">
            <a 
              href="https://www.youtube.com/@StackShade" 
              target="_blank" 
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", className: "w-full sm:w-auto px-8 py-6 rounded-xl font-bold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer flex justify-center items-center" })}
            >
              <Play className="w-5 h-5 fill-current mr-2" />
              Watch on YouTube
            </a>
            
            <a 
              href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer flex justify-center items-center" })}
            >
              StackShade HQ (Notion)
              <ArrowUpRight className="w-4 h-4 text-muted-foreground ml-1" />
            </a>
          </div>

          <a 
            href="#courses" 
            className="mt-8 text-sm font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all group"
          >
            Explore upcoming courses
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section id="focus-areas" className="py-20 border-t bg-card/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">What We Build & Learn</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Going beyond simple code snippets. We dive into the visual mechanics of how high-scale software works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: DSA */}
            <Card className="bg-card/30 border-border hover:border-foreground/30 hover:bg-muted/10 hover:shadow-sm transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground shadow-sm">
                  <Code2 className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">DSA Patterns & Problem Solving</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Skip the rote memorization. Learn patterns like Sliding Window, Two Pointers, Backtracking, and Graph traversals visually to crack coding interviews and build core fundamentals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground/80 font-mono">
                  <li>• Visual Algorithm Execution Traces</li>
                  <li>• Pattern-Based Problem Solving</li>
                  <li>• Interview-Focused Optimization Techniques</li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2: System Design */}
            <Card className="bg-card/30 border-border hover:border-foreground/30 hover:bg-muted/10 hover:shadow-sm transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground shadow-sm">
                  <Server className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">System Design & Architecture</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Understand how big tech platforms scale. Learn the architecture behind load balancers, caching, database replication, CDN content delivery, and message brokers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground/80 font-mono">
                  <li>• Horizontal & Vertical Scaling Concepts</li>
                  <li>• SQL vs NoSQL, Sharding & Caching</li>
                  <li>• Consistency, Availability & Partition Tolerance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3: Backend & DevOps */}
            <Card className="bg-card/30 border-border hover:border-foreground/30 hover:bg-muted/10 hover:shadow-sm transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground shadow-sm">
                  <Terminal className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">Backend Engineering & Infrastructure</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Build reliable and high-performance server components. Master PostgreSQL, Redis cache layers, Kafka message streams, Docker containers, and robust CI/CD pipelines.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground/80 font-mono">
                  <li>• REST, GraphQL & gRPC APIs</li>
                  <li>• Event-Driven Architectures with Kafka</li>
                  <li>• Containerization, Docker & DevOps Workflows</li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 4: Next.js & AI */}
            <Card className="bg-card/30 border-border hover:border-foreground/30 hover:bg-muted/10 hover:shadow-sm transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-foreground shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">Next.js & AI Engineering</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Build modern production-grade web applications. Learn React server components, server action integrations, LLM API streaming, vector databases, and AI agent architectures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground/80 font-mono">
                  <li>• Next.js App Router & Optimized Rendering</li>
                  <li>• Retrieval-Augmented Generation (RAG)</li>
                  <li>• Build Real-World Projects with AI Agents</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 border-t bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Courses & Visual Series</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Structured step-by-step tracks to learn advanced concepts deeply.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course 1 */}
            <Card className="bg-card/30 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-foreground/30 hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="border-border text-foreground mb-4">
                    Free Series
                  </Badge>
                  <CardTitle className="text-lg font-bold transition-colors">Visual DSA Patterns</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    20+ core algorithms explained through step-by-step visual execution flowcharts.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Algorithms</span>
                  <a 
                    href="https://www.youtube.com/@StackShade" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-foreground hover:underline transition-all group/link"
                  >
                    Start Series
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Course 2 */}
            <Card className="bg-card/30 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-foreground/30 hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="border-border text-muted-foreground mb-4">
                    Coming Soon
                  </Badge>
                  <CardTitle className="text-lg font-bold">System Design Cookbook</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    Deeply explore load balancers, CDNs, database indexing, and event queues visually.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Architecture</span>
                  <span className="text-xs font-semibold text-muted-foreground/50">Notify Me</span>
                </div>
              </CardContent>
            </Card>

            {/* Course 3 */}
            <Card className="bg-card/30 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-foreground/30 hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="border-border text-muted-foreground mb-4">
                    Coming Soon
                  </Badge>
                  <CardTitle className="text-lg font-bold">Next.js & AI Eng</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    Build production full-stack apps with LLM streaming, agent patterns, and vector search.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Full Stack</span>
                  <span className="text-xs font-semibold text-muted-foreground/50">Notify Me</span>
                </div>
              </CardContent>
            </Card>

            {/* Course 4 */}
            <Card className="bg-card/30 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-foreground/30 hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="border-border text-muted-foreground mb-4">
                    Coming Soon
                  </Badge>
                  <CardTitle className="text-lg font-bold">DevOps & DB Internals</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    A high-fidelity guide to Redis internals, Postgres B-Trees, Docker namespaces, and Kafka architecture.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Infrastructure</span>
                  <span className="text-xs font-semibold text-muted-foreground/50">Notify Me</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-20 border-t bg-card/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Meet the Creator</h2>
            <p className="text-muted-foreground text-sm">Building software with clarity and design.</p>
          </div>

          <Card className="bg-card/20 border-border p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Creator Avatar with initials */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-border flex items-center justify-center p-1 shrink-0 select-none">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black tracking-widest text-foreground">
                  SR
                </span>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">Shaswat Raj</h3>
              <p className="text-xs font-mono text-muted-foreground mt-1 mb-4">Software Engineer & Tech Educator</p>
              
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Shaswat is a software developer and the creator of StackShade. Driven by the philosophy of <em>&ldquo;learn deeply, build practically, and explain visually,&rdquo;</em> he focuses on demystifying complex concepts in computer science, system design, and AI engineering for developers worldwide.
              </p>

              {/* Creator Links using shadcn buttonVariants */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="https://sh20raj.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "secondary", size: "sm", className: "rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center" })}
                >
                  <Globe className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                  Portfolio Website
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-1" />
                </a>
                
                <a 
                  href="https://github.com/sh20raj/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "secondary", size: "sm", className: "rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center" })}
                >
                  <Github className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                  GitHub Profile
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-1" />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="StackShade Logo" className="w-5 h-5 rounded-md object-cover" />
            <span className="font-bold text-foreground tracking-tight">StackShade</span>
          </div>

          <a 
            href="https://stack-shade.github.io/algoforge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
          >
            <span className="font-semibold text-foreground">StackShade&apos;s Algoforge</span>
          </a>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          </div>

          <p className="text-muted-foreground/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} StackShade. Created by{" "}
            <a 
              href="https://github.com/sh20raj" 
              className="text-muted-foreground hover:underline transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              sh20raj
            </a>
            . All rights reserved.
          </p>

          <div className="flex gap-4">
            <a 
              href="https://www.youtube.com/@StackShade" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube Channel" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Youtube className="w-5 h-5 fill-current" />
            </a>
            <a 
              href="https://github.com/sh20raj" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
