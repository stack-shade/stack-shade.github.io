'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { 
  Youtube, 
  ArrowUpRight, 
  Menu
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then((reg) => console.log("SW registered:", reg.scope))
        .catch((err) => console.error("SW registration failed:", err));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="StackShade Logo" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-bold text-xl tracking-tight text-foreground">
              StackShade
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <Link href="/algoforge" className="text-muted-foreground hover:text-foreground transition-colors">Algoforge</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          <a 
            href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            StackShade HQ
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://www.youtube.com/@StackShade" 
            target="_blank" 
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default", className: "font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer" })}
          >
            <Youtube className="w-4 h-4 fill-current mr-2" />
            Subscribe
          </a>
        </div>

        {/* Mobile Menu Button using Sheet Component */}
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label="Toggle menu" className="md:hidden cursor-pointer" />
            }
          >
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-md border-l">
            <SheetHeader>
              <SheetTitle className="text-left flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="StackShade Logo" className="w-6 h-6 rounded-md object-cover" />
                StackShade
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              <Link 
                href="/blog" 
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <a 
                href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                StackShade HQ (Notion)
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <hr className="border-border" />
              <a 
                href="https://www.youtube.com/@StackShade" 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "default", className: "w-full py-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex justify-center items-center font-semibold" })}
              >
                <Youtube className="w-5 h-5 fill-current mr-2" />
                Subscribe on YouTube
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
