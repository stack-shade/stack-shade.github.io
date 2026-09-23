import Image from "next/image";
import Link from "next/link";
import { Github, Youtube } from "lucide-react";

export function BlogFooter() {
  return (
    <footer className="mt-14 border-t bg-background py-10">
      <div className="ss-shell">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="StackShade" width={24} height={24} className="h-6 w-6 rounded-md" />
            <span className="text-sm font-bold tracking-tight">StackShade Library</span>
          </div>

          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} StackShade · Learn deeply. Build practically. Explain visually.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a href="https://www.youtube.com/@StackShade" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
              <Youtube className="h-4 w-4 fill-current" />
            </a>
            <a href="https://github.com/sh20raj" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Link href="/courses" className="hover:text-foreground hover:underline">Courses</Link>
          <Link href="/explainers" className="hover:text-foreground hover:underline">Explainers</Link>
          <Link href="/blog" className="hover:text-foreground hover:underline">Blog</Link>
          <Link href="/resources" className="hover:text-foreground hover:underline">Resources</Link>
          <Link href="/about" className="hover:text-foreground hover:underline">About</Link>
          <Link href="/contact" className="hover:text-foreground hover:underline">Contact</Link>
          <Link href="/privacy" className="hover:text-foreground hover:underline">Privacy</Link>
          <Link href="/editorial-policy" className="hover:text-foreground hover:underline">Editorial Policy</Link>
          <Link href="/terms" className="hover:text-foreground hover:underline">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
