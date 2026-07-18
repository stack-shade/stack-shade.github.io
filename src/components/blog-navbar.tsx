'use client';

import React from "react";
import Link from "next/link";
import { Youtube, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function BlogNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors border border-border px-2.5 py-1 rounded-md bg-card/45"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Main Site
          </Link>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <Link href="/blog" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="StackShade Logo" className="w-7 h-7 rounded-md object-cover" />
            <span className="font-bold text-lg tracking-tight text-foreground">
              StackShade <span className="font-medium text-muted-foreground">Blog</span>
            </span>
          </Link>
        </div>

        {/* Categories / Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground transition-colors">All Articles</Link>
          <span className="text-border">|</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">System Design</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Algorithms</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Backend</span>
        </nav>

        <div>
          <a 
            href="https://www.youtube.com/@StackShade" 
            target="_blank" 
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default", size: "sm", className: "font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer text-xs" })}
          >
            <Youtube className="w-3.5 h-3.5 fill-current mr-1.5" />
            Subscribe
          </a>
        </div>
      </div>
    </header>
  );
}
