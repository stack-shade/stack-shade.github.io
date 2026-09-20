'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Binary,
  Compass,
  Cpu,
  GitBranch,
  Globe,
  Layers,
  Server,
  Sparkles,
  Triangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COURSES, Course, courseStats } from "@/lib/courses-data";
import { loadProgress, progressPercent } from "@/lib/course-progress";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  binary: Binary,
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
    const progress = loadProgress(course.slug);
    const done = Object.keys(progress).length;
    setPct(progressPercent(stats.lessons, done));
  }, [course.slug, stats.lessons]);

  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <Card
        className={`h-full border transition-all duration-300 hover:border-foreground/40 hover:shadow-lg hover:-translate-y-0.5 bg-card/25 ${
          featured ? "border-foreground/60 ring-1 ring-foreground/20" : "border-border"
        }`}
      >
        <CardContent className="p-6 sm:p-7 flex flex-col h-full gap-5">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl border border-border bg-background/40 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              <Icon className="w-5 h-5" />
            </div>
            {featured && (
              <Badge className="font-mono text-[9px] uppercase tracking-[0.08em]">
                <Sparkles className="w-3 h-3 mr-1" />
                Flagship
              </Badge>
            )}
          </div>

          <div className="space-y-1.5">
            <h3 className="course-title font-bold text-xl text-foreground group-hover:underline underline-offset-4">
              {course.title}
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{course.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            <Badge variant="outline" className="font-mono text-[9px]">{course.level}</Badge>
            <Badge variant="outline" className="font-mono text-[9px]">{course.duration}</Badge>
            <Badge variant="secondary" className="font-mono text-[9px]">
              {stats.modules} modules · {stats.lessons} lessons
            </Badge>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>{pct > 0 ? `${pct}% complete` : "Not started"}</span>
              <span className="flex items-center gap-1 text-foreground font-semibold group-hover:gap-2 transition-all">
                Start <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CourseCatalog() {
  const featured = COURSES.filter((c) => c.featured);
  const rest = COURSES.filter((c) => !c.featured);

  return (
    <div className="space-y-10">
      <div className="grid sm:grid-cols-2 gap-5">
        {featured.map((c) => (
          <CourseCard key={c.slug} course={c} featured />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </div>
  );
}
