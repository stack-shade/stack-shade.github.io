"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  FileText,
  PlayCircle,
  Presentation,
  StickyNote,
  PencilLine,
} from "lucide-react";

type Media = {
  video?: string;
  notes?: string;
  pdf?: string;
};

type Props = {
  media?: Media;
  presentationHref: string;
  children: React.ReactNode;
  lessonTitle?: string;
  lessonMeta?: string;
  practice?: React.ReactNode;
  resources?: React.ReactNode;
};

type Tab = "article" | "video" | "practice" | "resources" | "presentation" | "notes" | "pdf";

function youtubeEmbed(src: string) {
  try {
    const url = new URL(src);
    if (url.hostname.includes("youtu.be")) {
      return "https://www.youtube.com/embed/" + url.pathname.replace("/", "");
    }
    const id = url.searchParams.get("v");
    if (id && url.hostname.includes("youtube.com")) {
      return "https://www.youtube.com/embed/" + id;
    }
  } catch {
    // Treat invalid URLs as direct media URLs.
  }
  return null;
}

function isDirectVideo(src: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function VideoPanel({ src }: { src: string }) {
  const embed = youtubeEmbed(src);

  return (
    <section className="lesson-media-player">
      <div className="lesson-media-player-head">
        <div>
          <span className="lesson-kicker">VIDEO LESSON</span>
          <h2 className="mt-1 text-base font-black sm:text-lg">Watch the topic</h2>
        </div>
        <PlayCircle className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-black">
        {embed ? (
          <div className="aspect-video">
            <iframe
              src={embed}
              title="StackShade video lesson"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : isDirectVideo(src) ? (
          <video src={src} className="aspect-video w-full bg-black" controls playsInline preload="metadata" />
        ) : (
          <div className="grid min-h-52 place-items-center p-6 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Video source configured</p>
              <a href={src} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs underline">
                Open video
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function DocumentPanel({ href, type }: { href: string; type: "notes" | "pdf" }) {
  const label = type === "pdf" ? "PDF NOTES" : "STUDY NOTES";

  return (
    <section className="lesson-media-document">
      <div className="lesson-media-player-head">
        <div>
          <span className="lesson-kicker">{label}</span>
          <h2 className="mt-1 text-base font-black sm:text-lg">
            {type === "pdf" ? "Read the printable version" : "Read the compact notes"}
          </h2>
        </div>
        {type === "pdf" ? <FileText className="h-5 w-5 text-muted-foreground" /> : <StickyNote className="h-5 w-5 text-muted-foreground" />}
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-background/40">
        {type === "pdf" ? (
          <iframe src={href} title="PDF notes" className="h-[70svh] min-h-[34rem] w-full" />
        ) : (
          <div className="p-5 sm:p-7">
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              These notes are maintained as a separate learning artifact so they can be reused for revision and offline study.
            </p>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-xl border border-border px-4 py-2.5 text-xs font-bold hover:bg-muted/50"
            >
              Open notes
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export function LessonMediaHub({
  media,
  presentationHref,
  children,
  lessonTitle,
  lessonMeta,
  practice,
  resources,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = useMemo(() => {
    const out: { id: Tab; label: string; icon: typeof BookOpen; href?: string }[] = [
      { id: "article", label: "Article", icon: BookOpen },
    ];
    if (media?.video) out.push({ id: "video", label: "Video", icon: PlayCircle });
    if (practice) out.push({ id: "practice", label: "Practice", icon: PencilLine });
    if (resources) out.push({ id: "resources", label: "Resources", icon: FileText });
    out.push({ id: "presentation", label: "Deck", icon: Presentation, href: presentationHref });
    if (media?.notes) out.push({ id: "notes", label: "Notes", icon: StickyNote });
    if (media?.pdf) out.push({ id: "pdf", label: "PDF", icon: FileText });
    return out;
  }, [media, presentationHref, practice, resources]);

  const [active, setActive] = useState<Tab>("article");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("tab") as Tab | null;
    if (raw && tabs.some((tab) => tab.id === raw)) {
      setActive(raw);
    }
  }, [tabs]);

  const setTab = (tab: Tab) => {
    if (tab === "presentation") {
      router.push(presentationHref);
      return;
    }

    const next = new URLSearchParams(window.location.search);
    next.set("tab", tab);
    setActive(tab);
    router.replace(pathname + "?" + next.toString(), { scroll: false });
  };

  return (
    <div className="lesson-media-hub">
      <div className="lesson-media-tabs-shell">
        {(lessonTitle || lessonMeta) && (
          <div className="lesson-media-context">
            <div className="lesson-media-context-title">{lessonTitle}</div>
            {lessonMeta && <div className="lesson-media-context-meta">{lessonMeta}</div>}
          </div>
        )}
        <div className="lesson-media-tabs" role="tablist" aria-label="Lesson media">
          {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setTab(tab.id)}
              className={"lesson-media-tab " + (active === tab.id ? "is-active" : "")}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lesson-media-body">
        {active === "article" && children}
        {active === "video" && media?.video && <VideoPanel src={media.video} />}
        {active === "practice" && practice}
        {active === "resources" && resources}
        {active === "notes" && media?.notes && <DocumentPanel href={media.notes} type="notes" />}
        {active === "pdf" && media?.pdf && <DocumentPanel href={media.pdf} type="pdf" />}
      </div>
    </div>
  );
}
