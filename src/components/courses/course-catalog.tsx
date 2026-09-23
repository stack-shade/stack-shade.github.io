
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Binary,
  Brain,
  Compass,
  Cpu,
  GitBranch,
  Globe,
  Layers,
  Server,
  Sparkles,
  Triangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COURSES, Course, courseStats } from "@/lib/courses-data";
import { loadProgress, progressPercent } from "@/lib/course-progress";
import { CoursePoster } from "@/components/courses/course-poster";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  binary: Binary,
  brain: Brain,
  globe: Globe,
  compass: Compass,
  server: Server,
  cpu: Cpu,
  triangle: Triangle,
  gitBranch: GitBranch,
};

function CourseCard({ course, featured }: { course: Course; featured?: boolean }) {
  const [pct, setPct] = useState(0);
  const stats = courseStats(course);
  const Icon = ICONS[course.icon] ?? Layers;

  useEffect(() => {
    const current = loadProgress(course.slug);
    setPct(progressPercent(stats.lessons, Object.keys(current).length));
  }, [course.slug, stats.lessons]);

  return (
    <Link href={"/courses/" + course.slug} className="group block">
      <article className={"course-card overflow-hidden " + (featured ? "ring-1 ring-foreground/20" : "")}>
        <CoursePoster title={course.title} category={course.category} icon={course.icon} compact />

        <div className="course-card-body">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-background/50 transition-colors group-hover:bg-foreground group-hover:text-background">
              <Icon className="h-4 w-4" />
            </span>

            {featured && (
              <Badge className="font-mono text-[8px] uppercase tracking-[0.08em]">
                <Sparkles className="mr-1 h-3 w-3" /> Flagship
              </Badge>
            )}
          </div>

          <div className="mt-4">
            <h3 className="course-card-title font-black">{course.title}</h3>
            <p className="course-card-desc">{course.tagline}</p>
          </div>

          <div className="course-card-meta">
            <span>{course.level}</span>
            <span>{course.duration}</span>
            <span>{stats.modules} modules · {stats.lessons} lessons</span>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between gap-2 font-mono text-[9px] text-muted-foreground">
              <span>{pct > 0 ? pct + "% complete" : "Ready when you are"}</span>
              <span className="inline-flex items-center gap-1 font-bold text-foreground transition-all group-hover:gap-2">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-foreground transition-all duration-700" style={{ width: pct + "%" }} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function CourseCatalog() {
  const featured = COURSES.filter((course) => course.featured);
  const rest = COURSES.filter((course) => !course.featured);

  return (
    <div className="space-y-12">
      {featured.length > 0 && (
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <span className="lesson-kicker">START HERE</span>
              <h2 className="mt-1 text-xl font-black tracking-tight">Flagship paths</h2>
            </div>
            <span className="hidden font-mono text-[9px] text-muted-foreground sm:block">{featured.length} featured</span>
          </div>
          <div className="course-catalog-grid lg:grid-cols-2">
            {featured.map((course) => <CourseCard key={course.slug} course={course} featured />)}
          </div>
        </section>
      )}

      <section>
        <div className="mb-4">
          <span className="lesson-kicker">EXPLORE</span>
          <h2 className="mt-1 text-xl font-black tracking-tight">All courses</h2>
        </div>
        <div className="course-catalog-grid">
          {rest.map((course) => <CourseCard key={course.slug} course={course} />)}
        </div>
      </section>
    </div>
  );
}
