"use client";

import { Check, Link2, Printer, Share2 } from "lucide-react";
import { useState } from "react";

export function ArticleActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt("Copy this article URL:", window.location.href);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
        return;
      } catch {
        return;
      }
    }
    await copyLink();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-foreground/30 hover:text-foreground" aria-label="Copy article link">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-foreground/30 hover:text-foreground" aria-label="Share article">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </button>
      <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-foreground/30 hover:text-foreground" aria-label="Print article">
        <Printer className="h-3.5 w-3.5" />
        Print
      </button>
    </div>
  );
}
