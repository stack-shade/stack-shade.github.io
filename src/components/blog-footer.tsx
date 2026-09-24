import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Youtube } from "lucide-react";

export function BlogFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-background py-12">
      <div className="ss-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="StackShade" width={26} height={26} className="h-7 w-7 rounded-md" />
              <span className="text-sm font-black tracking-tight">StackShade Journal</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Long-form engineering writing for the details that deserve context: protocols, systems, AI, infrastructure,
              frontend mechanics, and debugging.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
            <nav aria-label="Footer" className="mt-3 grid gap-2 text-sm">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">All stories</Link>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground">Courses</Link>
              <Link href="/explainers" className="text-muted-foreground hover:text-foreground">Explainers</Link>
              <Link href="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link>
              <Link href="/editorial-policy" className="text-muted-foreground hover:text-foreground">Editorial policy</Link>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Tools & links</p>
            <div className="mt-3 grid gap-2 text-sm">
              <a href="http://observatory.campusloop.space/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:underline">
                CampusLoop HTTP Observatory <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a href="https://www.youtube.com/@StackShade" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                YouTube <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a href="https://github.com/sh20raj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                GitHub <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StackShade · Learn deeply. Build practically. Explain visually.</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <a href="https://github.com/sh20raj/stack-shade.github.io" target="_blank" rel="noopener noreferrer" aria-label="StackShade GitHub repository" className="rounded-lg border border-border p-2 hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/@StackShade" target="_blank" rel="noopener noreferrer" aria-label="StackShade YouTube" className="rounded-lg border border-border p-2 hover:text-foreground">
              <Youtube className="h-4 w-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
