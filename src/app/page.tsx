'use client';

import React, { useState } from "react";
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
  X,
  Play
} from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative dot-grid font-sans text-zinc-100 selection:bg-violet-500/30 selection:text-violet-200">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none" />

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#focus-areas" className="hover:text-zinc-100 transition-colors">Topics</a>
            <a href="#courses" className="hover:text-zinc-100 transition-colors">Courses</a>
            <a href="#creator" className="hover:text-zinc-100 transition-colors">Creator</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://www.youtube.com/@StackShade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md shadow-red-600/20 hover:scale-[1.02]"
            >
              <Youtube className="w-4 h-4 fill-current" />
              Subscribe
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-900 bg-zinc-950 px-4 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
            <a 
              href="#focus-areas" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Topics
            </a>
            <a 
              href="#courses" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Courses
            </a>
            <a 
              href="#creator" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Creator
            </a>
            <hr className="border-zinc-900" />
            <a 
              href="https://www.youtube.com/@StackShade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-all"
            >
              <Youtube className="w-5 h-5 fill-current" />
              Subscribe on YouTube
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Code. Design. Engineer. Scale.
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl">
            Learn Faster, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">Remember Longer</span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
            Welcome to <span className="text-zinc-200 font-semibold">StackShade</span> — where complex engineering becomes simple. We explain algorithm patterns, system design, databases, DevOps, and full-stack AI architectures visually.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <a 
              href="https://www.youtube.com/@StackShade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.03]"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch on YouTube
            </a>
            <a 
              href="#courses"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 hover:scale-[1.03]"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section id="focus-areas" className="py-20 border-t border-zinc-900 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">What We Build & Learn</h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Going beyond simple code snippets. We dive into the visual mechanics of how high-scale software works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: DSA */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-inner">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">DSA Patterns & Problem Solving</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Skip the rote memorization. Learn patterns like Sliding Window, Two Pointers, Backtracking, and Graph traversals visually to crack coding interviews and build core fundamentals.
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-zinc-500 font-mono">
                <li>• Visual Algorithm Execution Traces</li>
                <li>• Pattern-Based Problem Solving</li>
                <li>• Interview-Focused Optimization Techniques</li>
              </ul>
            </div>

            {/* Card 2: System Design */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">System Design & Architecture</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Understand how big tech platforms scale. Learn the architecture behind load balancers, caching, database replication, CDN content delivery, and message brokers.
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-zinc-500 font-mono">
                <li>• Horizontal & Vertical Scaling Concepts</li>
                <li>• SQL vs NoSQL, Sharding & Caching</li>
                <li>• Consistency, Availability & Partition Tolerance</li>
              </ul>
            </div>

            {/* Card 3: Backend & DevOps */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Backend Engineering & Infrastructure</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Build reliable and high-performance server components. Master PostgreSQL, Redis cache layers, Kafka message streams, Docker containers, and robust CI/CD pipelines.
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-zinc-500 font-mono">
                <li>• REST, GraphQL & gRPC APIs</li>
                <li>• Event-Driven Architectures with Kafka</li>
                <li>• Containerization, Docker & DevOps Workflows</li>
              </ul>
            </div>

            {/* Card 4: Next.js & AI */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Next.js & AI Engineering</h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Build modern production-grade web applications. Learn React server components, server action integrations, LLM API streaming, vector databases, and AI agent architectures.
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-zinc-500 font-mono">
                <li>• Next.js App Router & Optimized Rendering</li>
                <li>• Retrieval-Augmented Generation (RAG)</li>
                <li>• Build Real-World Projects with AI Agents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 border-t border-zinc-900 bg-zinc-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Courses & Visual Series</h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Structured step-by-step tracks to learn advanced concepts deeply.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course 1 */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                  Free Series
                </span>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">Visual DSA Patterns</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  20+ core algorithms explained through step-by-step visual execution flowcharts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Algorithms</span>
                <a 
                  href="https://www.youtube.com/@StackShade" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors group/link"
                >
                  Start Series
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Course 2 */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
                  Coming Soon
                </span>
                <h3 className="text-lg font-bold text-zinc-100">System Design Cookbook</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  Deeply explore load balancers, CDNs, database indexing, and event queues visually.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Architecture</span>
                <span className="text-xs font-semibold text-zinc-500">Notify Me</span>
              </div>
            </div>

            {/* Course 3 */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
                  Coming Soon
                </span>
                <h3 className="text-lg font-bold text-zinc-100">Next.js & AI Eng</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  Build production full-stack apps with LLM streaming, agent patterns, and vector search.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Full Stack</span>
                <span className="text-xs font-semibold text-zinc-500">Notify Me</span>
              </div>
            </div>

            {/* Course 4 */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
                  Coming Soon
                </span>
                <h3 className="text-lg font-bold text-zinc-100">DevOps & DB Internals</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  A high-fidelity guide to Redis internals, Postgres B-Trees, Docker namespaces, and Kafka architecture.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Infrastructure</span>
                <span className="text-xs font-semibold text-zinc-500">Notify Me</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" className="py-20 border-t border-zinc-900 bg-zinc-950/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Meet the Creator</h2>
            <p className="text-zinc-500 text-sm">Building software with clarity and design.</p>
          </div>

          <div className="glass-card rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Creator Photo / Stylized Initials Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center p-1 shadow-lg shadow-violet-500/10 shrink-0 select-none">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  SR
                </span>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-zinc-100">Shaswat Raj</h3>
              <p className="text-xs font-mono text-violet-400 mt-1 mb-4">Software Engineer & Tech Educator</p>
              
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                Shaswat is a software developer and the creator of StackShade. Driven by the philosophy of <em>&ldquo;learn deeply, build practically, and explain visually,&rdquo;</em> he focuses on demystifying complex concepts in computer science, system design, and AI engineering for developers worldwide.
              </p>

              {/* Creator Links */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="https://sh20raj.github.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  Portfolio Website
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
                <a 
                  href="https://github.com/sh20raj/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-zinc-400" />
                  GitHub Profile
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            <span className="font-bold text-zinc-200 tracking-tight">StackShade</span>
          </div>

          <p className="text-zinc-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} StackShade. Created by{" "}
            <a 
              href="https://github.com/sh20raj" 
              className="text-zinc-400 hover:text-violet-400 hover:underline transition-all"
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
              className="text-zinc-500 hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5 fill-current" />
            </a>
            <a 
              href="https://github.com/sh20raj" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile" 
              className="text-zinc-500 hover:text-zinc-100 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
