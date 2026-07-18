'use client';

import React from "react";
import { 
  Layers, 
  Youtube, 
  Github, 
  Globe, 
  ArrowUpRight, 
  Code2, 
  Server, 
  Terminal, 
  Sparkles, 
  ArrowRight,
  Menu,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-violet-500/30 selection:text-violet-200 bg-background text-foreground overflow-hidden">
      {/* Background soft glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none -z-10" />

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              StackShade
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#focus-areas" className="text-muted-foreground hover:text-foreground transition-colors">Topics</a>
            <a href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a>
            <a href="#creator" className="text-muted-foreground hover:text-foreground transition-colors">Creator</a>
            <a 
              href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 font-semibold"
            >
              StackShade HQ
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              asChild
              className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:scale-[1.02] shadow-md shadow-red-600/10 cursor-pointer"
            >
              <a 
                href="https://www.youtube.com/@StackShade" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Youtube className="w-4 h-4 fill-current mr-2" />
                Subscribe
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button using Sheet Component */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle menu" className="cursor-pointer">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-md border-l">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <Layers className="w-5 h-5 text-violet-400" />
                  StackShade
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <a 
                  href="#focus-areas" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Topics
                </a>
                <a 
                  href="#courses" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Courses
                </a>
                <a 
                  href="#creator" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Creator
                </a>
                <a 
                  href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                >
                  StackShade HQ (Notion)
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <hr className="border-border" />
                <Button 
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full py-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <a 
                    href="https://www.youtube.com/@StackShade" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Youtube className="w-5 h-5 fill-current mr-2" />
                    Subscribe on YouTube
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Badge 
            variant="outline" 
            className="px-3.5 py-1 text-xs mb-6 text-violet-400 border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 transition-colors font-medium tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400 mr-1.5 inline" />
            Code. Design. Engineer. Scale.
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl">
            Learn Faster, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-in fade-in duration-1000">Remember Longer</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
            Welcome to <span className="text-foreground font-semibold">StackShade</span> — where complex engineering becomes simple. We explain algorithm patterns, system design, databases, DevOps, and full-stack AI architectures visually.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg">
            <Button 
              asChild
              size="lg"
              className="w-full sm:w-auto px-8 py-6 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-violet-500/10 cursor-pointer"
            >
              <a 
                href="https://www.youtube.com/@StackShade" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Play className="w-5 h-5 fill-current mr-2" />
                Watch on YouTube
              </a>
            </Button>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <a 
                href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                StackShade HQ (Notion)
                <ArrowUpRight className="w-4 h-4 text-violet-400 ml-1" />
              </a>
            </Button>
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
      <section id="focus-areas" className="py-20 border-t bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">What We Build & Learn</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Going beyond simple code snippets. We dive into the visual mechanics of how high-scale software works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: DSA */}
            <Card className="bg-card/40 border-border hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-inner">
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
            <Card className="bg-card/40 border-border hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
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
            <Card className="bg-card/40 border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
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
            <Card className="bg-card/40 border-border hover:border-fuchsia-500/30 hover:shadow-lg hover:shadow-fuchsia-500/5 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shadow-inner">
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
      <section id="courses" className="py-20 border-t bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Courses & Visual Series</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Structured step-by-step tracks to learn advanced concepts deeply.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course 1 */}
            <Card className="bg-card/55 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-violet-500/20 hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors mb-4">
                    Free Series
                  </Badge>
                  <CardTitle className="text-lg font-bold group-hover:text-violet-400 transition-colors">Visual DSA Patterns</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    20+ core algorithms explained through step-by-step visual execution flowcharts.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Algorithms</span>
                  <a 
                    href="https://www.youtube.com/@StackShade" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors group/link"
                  >
                    Start Series
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Course 2 */}
            <Card className="bg-card/55 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-zinc-800 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors mb-4">
                    Coming Soon
                  </Badge>
                  <CardTitle className="text-lg font-bold">System Design Cookbook</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    Deeply explore load balancers, CDNs, database indexing, and event queues visually.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Architecture</span>
                  <span className="text-xs font-semibold text-muted-foreground/50">Notify Me</span>
                </div>
              </CardContent>
            </Card>

            {/* Course 3 */}
            <Card className="bg-card/55 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-zinc-800 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors mb-4">
                    Coming Soon
                  </Badge>
                  <CardTitle className="text-lg font-bold">Next.js & AI Eng</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    Build production full-stack apps with LLM streaming, agent patterns, and vector search.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Full Stack</span>
                  <span className="text-xs font-semibold text-muted-foreground/50">Notify Me</span>
                </div>
              </CardContent>
            </Card>

            {/* Course 4 */}
            <Card className="bg-card/55 border-border flex flex-col justify-between h-full relative overflow-hidden group hover:border-zinc-800 transition-all duration-300">
              <CardHeader className="p-6">
                <div>
                  <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors mb-4">
                    Coming Soon
                  </Badge>
                  <CardTitle className="text-lg font-bold">DevOps & DB Internals</CardTitle>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    A high-fidelity guide to Redis internals, Postgres B-Trees, Docker namespaces, and Kafka architecture.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/60">Infrastructure</span>
                  <span className="text-xs font-semibold text-muted-foreground/50">Notify Me</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-20 border-t bg-card/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Meet the Creator</h2>
            <p className="text-muted-foreground text-sm">Building software with clarity and design.</p>
          </div>

          <Card className="bg-card/30 border-border p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Creator Avatar with initials */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center p-1 shadow-lg shadow-violet-500/10 shrink-0 select-none">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  SR
                </span>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">Shaswat Raj</h3>
              <p className="text-xs font-mono text-violet-400 mt-1 mb-4">Software Engineer & Tech Educator</p>
              
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Shaswat is a software developer and the creator of StackShade. Driven by the philosophy of <em>&ldquo;learn deeply, build practically, and explain visually,&rdquo;</em> he focuses on demystifying complex concepts in computer science, system design, and AI engineering for developers worldwide.
              </p>

              {/* Creator Links using shadcn Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button 
                  asChild
                  variant="secondary"
                  size="sm"
                  className="rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                >
                  <a 
                    href="https://sh20raj.github.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                    Portfolio Website
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-1" />
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="secondary"
                  size="sm"
                  className="rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                >
                  <a 
                    href="https://github.com/sh20raj/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                    GitHub Profile
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            <span className="font-bold text-foreground tracking-tight">StackShade</span>
          </div>

          <p className="text-muted-foreground/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} StackShade. Created by{" "}
            <a 
              href="https://github.com/sh20raj" 
              className="text-muted-foreground hover:text-violet-400 hover:underline transition-all"
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
              className="text-muted-foreground hover:text-red-500 transition-colors"
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
