"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

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
  banner?: string;
  bannerAlt?: string;
}

interface ContentBrowserProps {
  items: BrowseItem[];
  pageSize?: number;
  eyebrow?: string;
  title: string;
  description: string;
  emptyLabel?: string;
}

type SortMode = "featured" | "newest" | "oldest" | "shortest" | "longest" | "az";
type ViewMode = "list" | "grid";

const PARAMS = {
  query: "q",
  status: "status",
  category: "category",
  playlist: "playlist",
  tag: "tag",
  format: "format",
  sort: "sort",
  page: "page",
  view: "view",
  size: "size",
} as const;

const FORMAT_LABELS: Record<string, string> = {
  video: "Video",
  article: "Article",
  visualization: "Visualization",
  artifact: "Artifact",
  animation: "Animation",
  deck: "Deck / PPT",
};

const PAGE_SIZES = [6, 12, 24, 48];

function minutes(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function parsePositiveInt(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function pageWindow(page: number, pageCount: number): Array<number | "…"> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);

  const values = new Set<number>([1, pageCount, page, page - 1, page + 1]);
  if (page <= 3) [2, 3, 4].forEach((value) => values.add(value));
  if (page >= pageCount - 2) [pageCount - 3, pageCount - 2, pageCount - 1].forEach((value) => values.add(value));

  const ordered = [...values].filter((value) => value >= 1 && value <= pageCount).sort((a, b) => a - b);
  const result: Array<number | "…"> = [];

  for (let index = 0; index < ordered.length; index += 1) {
    const current = ordered[index];
    const previous = ordered[index - 1];
    if (index > 0 && current - previous > 1) result.push("…");
    result.push(current);
  }

  return result;
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
  const [sort, setSort] = useState<SortMode>("featured");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [view, setView] = useState<ViewMode>("list");
  const [hydrated, setHydrated] = useState(false);
  const syncFrame = useRef<number | null>(null);

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
      .slice(0, 18);
  }, [items]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const requestedTag = params.get(PARAMS.tag);
    const requestedPlaylist = params.get(PARAMS.playlist);
    const requestedQuery = params.get(PARAMS.query);
    const requestedCategory = params.get(PARAMS.category);
    const requestedFormat = params.get(PARAMS.format);
    const requestedStatus = params.get(PARAMS.status);
    const requestedSort = params.get(PARAMS.sort);
    const requestedPage = parsePositiveInt(params.get(PARAMS.page), 1);
    const requestedSize = parsePositiveInt(params.get(PARAMS.size), pageSize);
    const requestedView = params.get(PARAMS.view);

    if (requestedTag && tags.includes(requestedTag)) setTag(requestedTag);
    if (requestedPlaylist && playlists.includes(requestedPlaylist)) setPlaylist(requestedPlaylist);
    if (requestedQuery) setQuery(requestedQuery);
    if (requestedCategory && categories.includes(requestedCategory)) setCategory(requestedCategory);
    if (requestedFormat && formats.includes(requestedFormat)) setFormat(requestedFormat);
    if (requestedStatus === "all" || requestedStatus === "published" || requestedStatus === "idea") {
      if (requestedStatus) setStatus(requestedStatus);
    }
    if (["featured", "newest", "oldest", "shortest", "longest", "az"].includes(requestedSort ?? "")) {
      setSort(requestedSort as SortMode);
    }
    if (PAGE_SIZES.includes(requestedSize)) setSize(requestedSize);
    if (requestedView === "grid" || requestedView === "list") setView(requestedView);

    setPage(requestedPage);
    setHydrated(true);
  }, [categories, formats, pageSize, playlists, tags]);

  useEffect(() => {
    if (!hydrated) return;

    const maxPage = Math.max(1, Math.ceil(items.length / size));
    const safePage = Math.min(page, maxPage);
    if (safePage !== page) setPage(safePage);

    const params = new URLSearchParams();
    const pairs: Array<[string, string, string]> = [
      [PARAMS.query, query, ""],
      [PARAMS.status, status, "all"],
      [PARAMS.category, category, "all"],
      [PARAMS.playlist, playlist, "all"],
      [PARAMS.tag, tag, "all"],
      [PARAMS.format, format, "all"],
      [PARAMS.sort, sort, "featured"],
      [PARAMS.page, String(safePage), "1"],
      [PARAMS.view, view, "list"],
      [PARAMS.size, String(size), String(pageSize)],
    ];

    for (const [key, value, defaultValue] of pairs) {
      if (value && value !== defaultValue) params.set(key, value);
    }

    const queryString = params.toString();
    const nextUrl = window.location.pathname + (queryString ? "?" + queryString : "");

    if (syncFrame.current !== null) cancelAnimationFrame(syncFrame.current);
    syncFrame.current = requestAnimationFrame(() => {
      if (window.location.search !== (queryString ? "?" + queryString : "")) {
        window.history.replaceState(null, "", nextUrl);
      }
    });

    return () => {
      if (syncFrame.current !== null) cancelAnimationFrame(syncFrame.current);
    };
  }, [category, format, hydrated, items.length, page, pageSize, playlist, query, size, sort, status, tag, view]);

  useEffect(() => {
    setPage(1);
  }, [category, format, playlist, query, sort, status, tag, size]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes((event.target as HTMLElement)?.tagName ?? "")) {
        event.preventDefault();
        document.getElementById("blog-content-search")?.focus();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return items
      .filter((item) => {
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
      })
      .sort((a, b) => {
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
  }, [category, format, items, playlist, query, sort, status, tag]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / size));
  const safePage = Math.min(page, pageCount);
  const visibleItems = filteredItems.slice((safePage - 1) * size, safePage * size);

  const hasFilters = Boolean(
    query || status !== "all" || category !== "all" || playlist !== "all" || tag !== "all" || format !== "all",
  );

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setCategory("all");
    setPlaylist("all");
    setTag("all");
    setFormat("all");
    setSort("featured");
    setPage(1);
  };

  const setFilterPageOne = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <section aria-labelledby="library-heading" className="space-y-8">
      <div className="max-w-3xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="library-heading" className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
          </div>
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {filteredItems.length} stories
          </span>
        </div>
      </div>

      <div className="sticky top-[4.4rem] z-30 -mx-4 border-y border-border/70 bg-background/95 px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search stories</span>
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="blog-content-search"
              value={query}
              onChange={(event) => setFilterPageOne(setQuery, event.target.value)}
              placeholder="Search the library…"
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-14 text-sm outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-ring/20"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">/</kbd>
            {query && (
              <button type="button" onClick={() => setFilterPageOne(setQuery, "")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground sm:right-11">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilterPageOne(setSort, "featured")}
              className={"shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition " + (sort === "featured" ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:text-foreground")}
            >
              For you
            </button>
            <button
              type="button"
              onClick={() => setFilterPageOne(setSort, "newest")}
              className={"shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition " + (sort === "newest" ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:text-foreground")}
            >
              Newest
            </button>
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-border p-1">
              <button type="button" aria-label="List view" onClick={() => setView("list")} className={"rounded-full p-1.5 " + (view === "list" ? "bg-muted text-foreground" : "text-muted-foreground")}>
                <List className="h-4 w-4" />
              </button>
              <button type="button" aria-label="Grid view" onClick={() => setView("grid")} className={"rounded-full p-1.5 " + (view === "grid" ? "bg-muted text-foreground" : "text-muted-foreground")}>
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </span>
          <select aria-label="Topic" value={category} onChange={(e) => setFilterPageOne(setCategory, e.target.value)} className="h-9 shrink-0 rounded-full border border-border bg-background px-3 text-xs">
            <option value="all">All topics</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <select aria-label="Playlist" value={playlist} onChange={(e) => setFilterPageOne(setPlaylist, e.target.value)} className="h-9 shrink-0 rounded-full border border-border bg-background px-3 text-xs">
            <option value="all">All series</option>
            {playlists.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <select aria-label="Tag" value={tag} onChange={(e) => setFilterPageOne(setTag, e.target.value)} className="h-9 shrink-0 rounded-full border border-border bg-background px-3 text-xs">
            <option value="all">Any tag</option>
            {tags.map((value) => <option key={value} value={value}>#{value}</option>)}
          </select>
          <select aria-label="Format" value={format} onChange={(e) => setFilterPageOne(setFormat, e.target.value)} className="h-9 shrink-0 rounded-full border border-border bg-background px-3 text-xs">
            <option value="all">Any format</option>
            {formats.map((value) => <option key={value} value={value}>{FORMAT_LABELS[value] ?? value}</option>)}
          </select>
          <select aria-label="Sort stories" value={sort} onChange={(e) => setFilterPageOne(setSort, e.target.value as SortMode)} className="h-9 shrink-0 rounded-full border border-border bg-background px-3 text-xs">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="shortest">Shortest reads</option>
            <option value="longest">Longest reads</option>
            <option value="az">A → Z</option>
          </select>
          <select aria-label="Stories per page" value={size} onChange={(e) => setFilterPageOne(setSize, Number(e.target.value))} className="h-9 shrink-0 rounded-full border border-border bg-background px-3 text-xs">
            {PAGE_SIZES.map((value) => <option key={value} value={value}>{value} / page</option>)}
          </select>
          {hasFilters && <button type="button" onClick={clearFilters} className="shrink-0 text-xs font-semibold underline underline-offset-4">Clear</button>}
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto">
          {tagClusters.map(([cluster, count]) => (
            <button
              key={cluster}
              type="button"
              onClick={() => setFilterPageOne(setTag, tag === cluster ? "all" : cluster)}
              className={"shrink-0 rounded-full border px-2.5 py-1.5 text-[10px] " + (tag === cluster ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground")}
            >
              #{cluster} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border pb-3 text-xs text-muted-foreground">
        <p>
          Showing <span className="font-semibold text-foreground">{visibleItems.length}</span> of <span className="font-semibold text-foreground">{filteredItems.length}</span>
          {hasFilters ? " matching this view" : ""}
        </p>
        <p className="font-mono uppercase tracking-[0.12em]">{pageCount > 1 ? "Page " + safePage + " / " + pageCount : "Complete index"}</p>
      </div>

      {visibleItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
          <Sparkles className="mx-auto mb-4 h-6 w-6 text-muted-foreground" />
          <h3 className="text-lg font-bold">No stories match that view</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{emptyLabel}</p>
          <button type="button" onClick={clearFilters} className="mt-5 text-sm font-semibold underline underline-offset-4">Reset the library</button>
        </div>
      ) : (
        <div className={view === "grid" ? "grid gap-x-6 gap-y-5 md:grid-cols-2" : "divide-y divide-border"}>
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className={
                view === "list"
                  ? "group grid gap-4 py-6 first:pt-2 sm:grid-cols-[minmax(0,1fr)_13rem] sm:items-start"
                  : "group overflow-hidden rounded-2xl border border-border bg-card/20"
              }
            >
              {item.banner && (
                <div className={view === "list" ? "order-2 overflow-hidden rounded-xl border border-border sm:order-2" : "overflow-hidden border-b border-border"}>
                  <div className={view === "list" ? "aspect-[16/10] bg-muted" : "aspect-[16/9] bg-muted"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.banner}
                      alt={item.bannerAlt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              )}

              <div className={view === "list" ? "min-w-0" : "p-5"}>
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  <span>{item.category}</span>
                  {item.featured && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 text-foreground"><Sparkles className="h-3 w-3" /> Featured</span>
                    </>
                  )}
                  {item.date && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={item.date}>{new Date(item.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                    </>
                  )}
                </div>

                <Link href={item.href ?? "#"} className="mt-2 block">
                  <h3 className={view === "list" ? "text-xl font-black leading-tight tracking-tight text-foreground sm:text-2xl" : "text-lg font-black leading-tight tracking-tight text-foreground"}>
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{item.description}</p>
                </Link>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{item.duration}</span>
                  <span className="text-border">•</span>
                  <span>{item.playlist}</span>
                  {item.tags.slice(0, 3).map((itemTag) => (
                    <button key={itemTag} type="button" onClick={() => setFilterPageOne(setTag, itemTag)} className="rounded-full border border-border px-2.5 py-1 text-[10px] hover:text-foreground">
                      #{itemTag}
                    </button>
                  ))}
                </div>

                {item.artifact && <p className="mt-3 text-xs leading-5 text-muted-foreground">{item.artifact}</p>}

                <Link
                  href={item.href ?? "#"}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-foreground underline-offset-4 hover:underline"
                >
                  Read story <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="Blog pagination" className="flex flex-col items-center justify-between gap-4 border-t border-border pt-5 sm:flex-row">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40 hover:border-foreground/40 sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          <div className="flex items-center gap-1.5">
            {pageWindow(safePage, pageCount).map((value, index) =>
              value === "…" ? (
                <span key={"ellipsis-" + index} className="px-2 text-sm text-muted-foreground">…</span>
              ) : (
                <button
                  key={value}
                  type="button"
                  aria-current={value === safePage ? "page" : undefined}
                  onClick={() => setPage(value)}
                  className={"h-9 min-w-9 rounded-lg border px-2 text-xs font-semibold " + (value === safePage ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground")}
                >
                  {value}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            disabled={safePage === pageCount}
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-40 hover:border-foreground/40 sm:w-auto"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </section>
  );
}
