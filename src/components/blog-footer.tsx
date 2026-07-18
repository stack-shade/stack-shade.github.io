import React from "react";
import { Youtube, Github } from "lucide-react";

export function BlogFooter() {
  return (
    <footer className="py-12 border-t bg-background text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="StackShade Logo" className="w-5 h-5 rounded-md object-cover" />
          <span className="font-bold text-sm text-foreground tracking-tight">StackShade Journal</span>
        </div>

        <p className="text-muted-foreground/60 text-xs">
          © {new Date().getFullYear()} StackShade. Deconstructing complex systems. Created by{" "}
          <a 
            href="https://github.com/sh20raj" 
            className="text-muted-foreground hover:underline transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            sh20raj
          </a>
          .
        </p>

        <div className="flex gap-4">
          <a 
            href="https://www.youtube.com/@StackShade" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube Channel" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Youtube className="w-4 h-4 fill-current" />
          </a>
          <a 
            href="https://github.com/sh20raj" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Profile" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
