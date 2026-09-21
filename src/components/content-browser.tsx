"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Grid2X2,
  List,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export type BrowseStatus = "published" | "idea";

export interface BrowseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  playlist: string;
  formats: string[];
  duration: string;
  status: BrowseStatus;
  href?: string;
  date?: string;
  featured?: boolean;
  hook?: string;
  artifact?: string;
}

interface ContentBrowserProps {
  items: BrowseItem[];
  pageSize?: number;
  eyebrow?: string;
  title: string;
  description: string;
  emptyLabel?: string;
}

const FORMAT_LABELS: Record<string, string> = {
  video: "Video",
  article: "Article",
  visualization: "Visualization",
  artifact: "Artifact",
  animation: "Animation",
  deck: "Deck / PPT",
};

function minutes(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function ContentBrowser({
  items,
  pageSize = 9,
  eyebrow = "Library",
  title,
  description,
  emptyLabel = "No content matches these filters.",
}: ContentBrowserProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BrowseStatus | "all">("all");
  const [category, setCategory] = useState("all");
  const [playlist, setPlaylist] = useState("all");
  const [tag, setTag] = useState("all");
  const [format, setFormat] = useState("all");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => uniqueSorted(items.map((item) => item.category)), [items]);
  const playlists = useMemo(() => uniqueSorted(items.map((item) => item.playlist)), [items]);
  const tags = useMemo(() => uniqueSorted(items.flatMap((item) => item.tags)), [items]);
  const formats = useMemo(() => uniqueSorted(items.flatMap((item) => item.formats)), [items]);

  const tagClusters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const itemTag of item.tags) counts.set(itemTag, (counts.get(itemTag) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 16);
  }, [items]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTag = params.get("tag");
    const requestedPlaylist = params.get("playlist");
    const requestedQuery = params.get("q");

    if (requestedTag && tags.includes(requestedTag)) setTag(requestedTag);
    if (requestedPlaylist && playlists.includes(requestedPlaylist)) setPlaylist(requestedPlaylist);
    if (requestedQuery) setQuery(requestedQuery);
  }, [playlists, tags]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = items.filter((item) => {
      const haystack = [
        item.title,
        item.description,
        item.category,
        item.playlist,
        item.tags.join(" "),
        item.formats.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!needle || haystack.includes(needle)) &&
        (status === "all" || item.status === status) &&
        (category === "all" || item.category === category) &&
        (playlist === "all" || item.playlist === playlist) &&
        (tag === "all" || item.tags.includes(tag)) &&
        (format === "all" || item.formats.includes(format))
      );
    });

    return result.sort((a, b) => {
      if (sort === "featured") {
        return (
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          (b.date ?? "").localeCompare(a.date ?? "") ||
          a.title.localeCompare(b.title)
        );
      }
      if (sort === "newest") return (b.date ?? "").localeCompare(a.date ?? "");
      if (sort === "oldest") return (a.date ?? "9999").localeCompare(b.date ?? "9999");
      if (sort === "shortest") return minutes(a.duration) - minutes(b.duration);
      if (sort === "longest") return minutes(b.duration) - minutes(a.duration);
      return a.title.localeCompare(b.title);
    });
  }, [items, query, status, category, playlist, tag, format, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visibleItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, status, category, playlist, tag, format, sort, pageSize]);

  const hasFilters = Boolean(
    query ||
      status !== "all" ||
      category !== "all" ||
      playlist !== "all" ||
      tag !== "all" ||
      format !== "all"
  );

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setCategory("all");
    setPlaylist("all");
    setTag("all");
    setFormat("all");
    setSort("featured");
  };

  return (
    <section className="space-y-8" aria-labelledby="library-heading">
      <div className="max-w-3xl">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">{eyebrow}</p>
        <h2 id="library-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="rounded-3xl border border-border bg-card/20 p-4 sm:p-5 space-y-5">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-4">
          <label className="relative block">
            <span className="sr-only">Search content</span>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, tags, playlists, or formats…"
              className="w-full h-11 rounded-xl border border-border bg-background/70 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </label>

          <div className="flex items-center gap-1 rounded-xl border border-border p-1 self-start">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={"p-2 rounded-lg transition-colors " + (view === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={"p-2 rounded-lg transition-colors " + (view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as BrowseStatus | "all")} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="idea">Backlog / idea</option>
          </select>
          <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
            <option value="all">All topics</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <select aria-label="Playlist" value={playlist} onChange={(e) => setPlaylist(e.target.value)} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
            <option value="all">All playlists</option>
            {playlists.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <select aria-label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
            <option value="all">All tags</option>
            {tags.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <select aria-label="Format" value={format} onChange={(e) => setFormat(e.target.value)} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
            <option value="all">All formats</option>
            {formats.map((value) => <option key={value} value={value}>{FORMAT_LABELS[value] ?? value}</option>)}
          </select>
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-xl border border-border bg-background px-3 text-sm">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="shortest">Shortest</option>
            <option value="longest">Longest</option>
            <option value="az">A → Z</option>
          </select>
        </div>

        {tagClusters.length > 0 && (
          <div className="space-y-3 border-t border-border/70 pt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Topic clusters</span>
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="text-xs font-semibold hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {tagClusters.map(([cluster, count]) => (
                <button
                  key={cluster}
                  type="button"
                  onClick={() => setTag(tag === cluster ? "all" : cluster)}
                  className={"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors " + (tag === cluster ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40")}
                >
                  <span>#{cluster}</span>
                  <span className={tag === cluster ? "opacity-70" : "text-muted-foreground"}>{count}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{visibleItems.length}</span> of{" "}
          <span className="text-foreground font-semibold">{filteredItems.length}</span> items
          {hasFilters ? " with your filters" : ""}.
        </p>
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {pageCount > 1 ? "Page " + page + " / " + pageCount : "Curated library"}
        </p>
      </div>

      {visibleItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <Sparkles className="w-6 h-6 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-bold text-lg mb-2">Nothing found yet</h3>
          <p className="text-sm text-muted-foreground mb-5">{emptyLabel}</p>
          <button type="button" onClick={clearFilters} className="text-sm font-semibold underline underline-offset-4">Reset filters</button>
        </div>
      ) : (
        <div className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className={"group rounded-2xl border border-border bg-card/20 hover:border-foreground/30 transition-all overflow-hidden p-5" + (view === "list" ? " md:flex md:items-start md:gap-5" : "")}
            >
              <div className={view === "list" ? "md:flex-1" : ""}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[9px] uppercase tracking-wider">{item.category}</Badge>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-wider text-muted-foreground">{item.status === "idea" ? "Backlog" : "Published"}</Badge>
                  </div>
                  {item.featured && <Sparkles className="w-4 h-4 text-muted-foreground shrink-0" />}
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground mb-2">{item.playlist}</p>
                  <h3 className="font-bold tracking-tight text-lg leading-snug mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                </div>

                {item.hook && (
                  <div className="mt-4 rounded-xl border border-border/70 bg-background/50 p-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Video hook</p>
                    <p className="text-xs leading-relaxed">{item.hook}</p>
                  </div>
                )}

                {item.artifact && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                    <PlayCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{item.artifact}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.tags.slice(0, 5).map((itemTag) => (
                    <button key={itemTag} type="button" onClick={() => setTag(itemTag)} className="text-[10px] rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors">
                      #{itemTag}
                    </button>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="w-3.5 h-3.5" />
                    {item.duration}
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {item.formats.slice(0, 3).map((itemFormat) => (
                      <span key={itemFormat} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-medium">
                        <FileText className="w-3 h-3" />
                        {FORMAT_LABELS[itemFormat] ?? itemFormat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={view === "list" ? "md:w-40 md:shrink-0" : ""}>
                {item.href ? (
                  <Link href={item.href} className={buttonVariants({ variant: "outline", size: "sm", className: "mt-4 w-full justify-center font-semibold" })}>
                    Read / open
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                ) : (
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground rounded-xl border border-dashed border-border py-2.5">
                    <PlayCircle className="w-3.5 h-3.5" />
                    Ready to record
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm disabled:opacity-40 hover:border-foreground/40 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((value) => (
            <button type="button" key={value} onClick={() => setPage(value)} className={"w-9 h-9 rounded-xl border text-sm " + (page === value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40")}>
              {value}
            </button>
          ))}
          <button type="button" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm disabled:opacity-40 hover:border-foreground/40 transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
