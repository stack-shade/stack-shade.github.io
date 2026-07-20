import React from "react";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Globe, Github, Youtube } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — StackShade",
  description: "Learn more about StackShade, its creator Shaswat Raj, and the mission to make engineering education visual and accessible.",
  alternates: {
    canonical: "https://stack-shade.github.io/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="selection:bg-foreground/20 selection:text-foreground min-h-screen">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">About StackShade</h1>

        <div className="space-y-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
          <p className="text-foreground text-lg sm:text-xl leading-relaxed">
            StackShade is a visual engineering education platform dedicated to making complex computer science topics simple, intuitive, and memorable.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Our Mission</h2>
            <p>
              We believe that the best way to learn engineering is by seeing it. Too many resources rely on dense text and abstract notation. StackShade replaces that with visual execution traces, interactive simulators, and structured roadmaps—so you can build real intuition for how systems work.
            </p>
            <p>
              Our focus areas include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Data Structures & Algorithm patterns</li>
              <li>System Design & Architecture</li>
              <li>Backend Engineering & Infrastructure</li>
              <li>Next.js, AI Engineering, and modern web stacks</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Meet the Creator</h2>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full border border-border flex items-center justify-center p-1 shrink-0 select-none bg-card/30">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-2xl font-black tracking-widest text-foreground">SR</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Shaswat Raj</h3>
                <p className="text-xs font-mono text-muted-foreground mt-1 mb-3">Software Engineer & Tech Educator</p>
                <p className="leading-relaxed">
                  Shaswat is a software developer and the creator of StackShade. Driven by the philosophy of <em>&ldquo;learn deeply, build practically, and explain visually,&rdquo;</em> he focuses on demystifying complex concepts in computer science, system design, and AI engineering for developers worldwide.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Connect</h2>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://sh20raj.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "sm", className: "rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center" })}
              >
                <Globe className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                Portfolio
                <ArrowLeft className="w-3 h-3 text-muted-foreground ml-1 rotate-180" />
              </a>
              <a 
                href="https://github.com/sh20raj/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "sm", className: "rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center" })}
              >
                <Github className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                GitHub
                <ArrowLeft className="w-3 h-3 text-muted-foreground ml-1 rotate-180" />
              </a>
              <a 
                href="https://www.youtube.com/@StackShade" 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "sm", className: "rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] flex items-center" })}
              >
                <Youtube className="w-3.5 h-3.5 text-muted-foreground mr-1.5" />
                YouTube
                <ArrowLeft className="w-3 h-3 text-muted-foreground ml-1 rotate-180" />
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className={buttonVariants({ variant: "outline", className: "cursor-pointer" })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
