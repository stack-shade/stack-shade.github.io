"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Library, Menu, Sparkles, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/explainers", label: "Explainers", icon: Sparkles },
  { href: "/blog", label: "Blog", icon: Library },
];

export function BlogNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="ss-shell flex h-14 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2 py-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground sm:px-2.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link href="/blog" className="flex min-w-0 items-center gap-2">
            <Image src="/logo.svg" alt="StackShade" width={28} height={28} className="h-7 w-7 shrink-0 rounded-md object-cover" />
            <span className="truncate text-sm font-black tracking-tight sm:text-base">
              StackShade <span className="font-medium text-muted-foreground">Library</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/30 p-1 md:flex" aria-label="Library navigation">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors " +
                  (active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground")
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
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
            render={<Button variant="outline" size="icon" aria-label="Open library navigation" className="h-9 w-9 rounded-xl md:hidden" />}
          >
            <Menu className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,380px)] border-l border-border bg-background/96 p-0 backdrop-blur-2xl">
            <SheetHeader className="border-b border-border px-5 py-4">
              <SheetTitle className="flex items-center gap-2 text-left text-base">
                <Image src="/logo.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
                StackShade Library
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-1.5 p-4">
              {links.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      "flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold " +
                      (active
                        ? "border-border bg-muted/50 text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/" className="mt-1 flex items-center justify-between rounded-xl border border-border px-3 py-3 text-sm font-semibold">
                Back to StackShade <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="https://www.youtube.com/@StackShade"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "default", className: "mt-3 h-11 rounded-xl" })}
              >
                <Youtube className="mr-2 h-4 w-4 fill-current" />
                Subscribe on YouTube
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
