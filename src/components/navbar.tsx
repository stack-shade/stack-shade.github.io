
"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, Sparkles, Youtube, BookOpen, Library, Boxes, Info, Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/explainers", label: "Explainers", icon: Sparkles },
  { href: "/blog", label: "Blog", icon: Library },
  { href: "/resources", label: "Resources", icon: Boxes },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/82 backdrop-blur-xl">
      <div className="ss-shell flex h-14 items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <img src="/logo.png" alt="StackShade" className="h-8 w-8 rounded-lg object-cover" />
          <span className="truncate text-base font-black tracking-tight sm:text-lg">StackShade</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/30 p-1 md:flex" aria-label="Primary">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            HQ <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://www.youtube.com/@StackShade"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default", size: "sm", className: "h-8 rounded-full px-3 text-[10px] font-bold" })}
          >
            <Youtube className="mr-1.5 h-3.5 w-3.5 fill-current" />
            YouTube
          </a>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation"
                className="h-9 w-9 rounded-xl md:hidden"
              />
            }
          >
            <Menu className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(88vw,380px)] border-l border-border bg-background/96 p-0 backdrop-blur-2xl"
          >
            <SheetHeader className="border-b border-border px-5 py-4">
              <SheetTitle className="flex items-center gap-2 text-left text-base">
                {/* eslint-disable-next-line @next/next/no-img-element */}\n                <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg object-cover" />
                StackShade
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col p-4">
              <div className="grid gap-1.5">
                {links.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                    </Link>
                  );
                })}
              </div>

              <a
                href="https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-between rounded-xl border border-border px-3 py-3 text-sm font-semibold"
              >
                <span>StackShade HQ</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="https://www.youtube.com/@StackShade"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "default", className: "mt-4 h-11 w-full rounded-xl font-semibold" })}
              >
                <Youtube className="mr-2 h-4 w-4 fill-current" />
                Subscribe on YouTube
              </a>

              <p className="mt-4 px-1 text-[10px] leading-5 text-muted-foreground">
                Deep articles, visual explainers, practice and screen-recordable courses — built for small screens first.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
