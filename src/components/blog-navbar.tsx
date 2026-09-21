'use client';

import React from "react";
import Link from "next/link";
import { Youtube, ArrowLeft, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function BlogNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors border border-border px-2.5 py-1 rounded-md bg-card/45"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Main Site</span>
            <span className="sm:hidden">Home</span>
          </Link>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <Link href="/blog" className="flex items-center gap-2 hover:opacity-90 transition-opacity min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="StackShade Logo" className="w-7 h-7 rounded-md object-cover" />
            <span className="font-bold text-lg tracking-tight text-foreground whitespace-nowrap">
              StackShade <span className="font-medium text-muted-foreground">Library</span>
            </span>
          </Link>
        </div>

        <nav aria-label="Primary content" className="hidden md:flex items-center gap-5 text-xs font-medium text-muted-foreground">
          <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
          <Link href="/explainers" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Explainers
          </Link>
          <Link href="/blog" className="hover:text-foreground transition-colors text-foreground">Blog</Link>
          <Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link>
        </nav>

        <a
          href="https://www.youtube.com/@StackShade"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer text-xs shrink-0",
          })}
        >
          <Youtube className="w-3.5 h-3.5 fill-current mr-1.5" />
          Subscribe
        </a>
      </div>
    </header>
  );
}
