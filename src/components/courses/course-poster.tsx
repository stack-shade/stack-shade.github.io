'use client';

import {
  Binary,
  Cpu,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  Shield,
  Sparkles,
  Triangle,
} from "lucide-react";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  binary: Binary,
  globe: Globe2,
  compass: Network,
  server: Layers3,
  cpu: Cpu,
  triangle: Triangle,
  gitBranch: GitBranch,
  layers: Layers3,
  shield: Shield,
};

const VARIANTS: Record<string, string> = {
  Algorithms: "poster-algorithms",
  "Web Engineering": "poster-web",
  Backend: "poster-backend",
  DevOps: "poster-devops",
  "Computer Networks": "poster-network",
  "Data Mining": "poster-data",
  "System Design": "poster-system",
  Cybersecurity: "poster-cybersecurity",
};

export function CoursePoster({
  title,
  category,
  icon,
  compact = false,
}: {
  title: string;
  category: string;
  icon: string;
  compact?: boolean;
}) {
  const Icon = ICONS[icon] ?? Layers3;
  const variant = VARIANTS[category] ?? "poster-system";

  return (
    <div
      className={[
        "course-poster relative isolate overflow-hidden rounded-2xl border border-border/80",
        variant,
        compact ? "course-poster-compact" : "course-poster-hero",
      ].join(" ")}
      aria-label={`\${title} course poster`}
    >
      <div className="poster-grid absolute inset-0 opacity-70" />
      <div className="poster-orbit poster-orbit-one" />
      <div className="poster-orbit poster-orbit-two" />
      <div className="poster-glow poster-glow-one" />
      <div className="poster-glow poster-glow-two" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="poster-kicker">
            <Sparkles className="h-3.5 w-3.5" />
            STACKSHADE / COURSE
          </div>
          <div className="poster-icon">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="poster-category">{category}</div>
          <h2 className="poster-title">{title}</h2>
          <div className="mt-4 flex items-center gap-2">
            <span className="poster-node" />
            <span className="poster-line" />
            <span className="poster-node" />
            <span className="poster-line poster-line-short" />
            <span className="poster-node" />
          </div>
        </div>
      </div>
    </div>
  );
}
