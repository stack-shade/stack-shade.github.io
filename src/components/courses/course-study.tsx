'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  AlarmClockCheck,
  ArrowUpRight,
  BookOpen,
  Brain,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Circle,
  Eye,
  FlaskConical,
  GraduationCap,
  Layers,
  Lightbulb,
  MonitorPlay,
  PenLine,
  Puzzle,
  Repeat,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Course, Lesson, courseStats } from "@/lib/courses-data";
import {
  CourseProgress,
  isDue,
  lessonId,
  loadProgress,
  markReviewed,
  nextReviewLabel,
  progressPercent,
  saveProgress,
  toggleLesson,
} from "@/lib/course-progress";

const TYPE_META: Record<Lesson["type"], { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  video: { label: "Video", icon: MonitorPlay },
  article: { label: "Read", icon: BookOpen },
  interactive: { label: "Interactive", icon: Puzzle },
  practice: { label: "Practice", icon: PenLine },
  project: { label: "Project", icon: Wrench },
  quiz: { label: "Quiz", icon: BrainCircuit },
};

const SCIENCE = [
  {
    icon: BrainCircuit,
    name: "Active Recall",
    how: "Answer the recall questions BEFORE revealing. Trying to retrieve an answer before rereading strengthens the memory trace and reveals what you do not yet know.",
  },
  {
    icon: Repeat,
    name: "Spaced Repetition",
    how: "Completed lessons return for review after 1, 3, 7, 21 and 60 days. Review at expanding intervals so older knowledge is retrieved after increasing delays.",
  },
  {
    icon: Layers,
    name: "Chunking",
    how: "Each module is one small digestible chunk with a one-line memory hook. Finish a chunk fully before starting the next.",
  },
  {
    icon: GraduationCap,
    name: "Feynman Technique",
    how: "Every module ends with a teach-it-back prompt. If you can't explain it simply, you haven't learned it yet.",
  },
  {
    icon: FlaskConical,
    name: "Interleaving",
    how: "Mixed revision phases deliberately shuffle topics — discrimination between problem types is what exams test.",
  },
  {
    icon: Lightbulb,
    name: "Elaboration",
    how: "Ask why a rule works, what it connects to, and when it would fail. Linking new ideas to prior knowledge makes the concept easier to reconstruct later.",
  },
  {
    icon: PenLine,
    name: "Generation",
    how: "Attempt the solution, diagram, subnet calculation or explanation before seeing the worked version. The attempt becomes feedback rather than passive copying.",
  },
  {
    icon: Brain,
    name: "Self-Explanation",
    how: "After each visual or example, explain why the next step follows from the previous one. Mechanistic explanations are more useful than repeating labels.",
  },
  {
    icon: Eye,
    name: "Dual Coding",
    how: "Pair concise explanations with diagrams or simulations so the same idea is encoded in complementary forms.",
  },
];

export function CourseStudy({ course }: { course: Course }) {
  const [progress, setProgress] = useState<CourseProgress>({});
  const [loaded, setLoaded] = useState(false);
  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const stats = courseStats(course);

  useEffect(() => {
    setProgress(loadProgress(course.slug));
    setLoaded(true);
  }, [course.slug]);

  const update = (next: CourseProgress) => {
    setProgress(next);
    saveProgress(course.slug, next);
  };

  const done = Object.keys(progress).length;
  const pct = progressPercent(stats.lessons, done);

  const dueLessons = useMemo(() => {
    const out: { id: string; title: string; module: string }[] = [];
    course.modules.forEach((m, mi) => {
      m.lessons.forEach((l, li) => {
        const id = lessonId(mi, li);
        const p = progress[id];
        if (p && isDue(p)) out.push({ id, title: l.title, module: m.title });
      });
    });
    return out;
  }, [course, progress]);

  const toggleModule = (i: number) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleReveal = (key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <Card className="bg-card/40 border-border">
        <CardContent className="p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-foreground" />
              <span className="font-bold text-foreground text-sm">
                {loaded ? `${done} of ${stats.lessons} lessons complete` : "Loading your progress…"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-[10px]">{pct}%</Badge>
              {done > 0 && (
                <button
                  onClick={() => update({})}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full bg-foreground rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Progress saves on this device automatically. Reviews follow the 1 · 3 · 7 · 21 · 60 day spaced schedule.
          </p>
        </CardContent>
      </Card>

      {/* Spaced repetition — review due */}
      {loaded && dueLessons.length > 0 && (
        <Card className="border-foreground/60 bg-muted/20 ring-1 ring-foreground/15">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlarmClockCheck className="w-5 h-5 text-foreground animate-pulse" />
              <h3 className="font-bold text-foreground text-sm">
                {dueLessons.length} lesson{dueLessons.length > 1 ? "s" : ""} due for spaced review
              </h3>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Your brain is about to forget these — a 2-minute recall now resets the forgetting curve.
            </p>
            <div className="space-y-2">
              {dueLessons.slice(0, 5).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-3 border border-border rounded-lg p-2.5 bg-background/40"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{d.title}</p>
                    <p className="text-[10px] text-muted-foreground font-mono truncate">{d.module}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => update(markReviewed(progress, d.id))}
                    className="cursor-pointer shrink-0 text-[10px] h-7"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Mark reviewed
                  </Button>
                </div>
              ))}
              {dueLessons.length > 5 && (
                <p className="text-[10px] text-muted-foreground font-mono text-center pt-1">
                  + {dueLessons.length - 5} more — review oldest first
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to study — neuroscience panel */}
      <Card className="bg-card/40 border-border">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            How to study this course (the neuroscience built in)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCIENCE.map((s) => (
              <div key={s.name} className="border border-border/70 rounded-lg p-3 bg-background/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-foreground">
                  <s.icon className="w-4 h-4" />
                  <span className="font-bold text-xs">{s.name}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{s.how}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Curriculum */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-foreground">Curriculum</h2>
        {course.modules.map((m, mi) => {
          const moduleDone = m.lessons.filter((_, li) => progress[lessonId(mi, li)]).length;
          const modulePct = progressPercent(m.lessons.length, moduleDone);
          const open = openModules.has(mi);
          return (
            <Card key={m.title} className={`border transition-colors ${open ? "border-foreground/40 bg-card/40" : "border-border bg-card/20"}`}>
              <CardContent className="p-0">
                {/* Module header */}
                <button
                  onClick={() => toggleModule(mi)}
                  className="w-full p-5 flex items-center gap-4 text-left cursor-pointer group"
                >
                  <span className="font-mono text-[10px] text-muted-foreground border border-border rounded-md px-2 py-1 shrink-0">
                    {String(mi + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-foreground text-sm sm:text-base">{m.title}</h3>
                      <Badge variant="outline" className="font-mono text-[9px]">{m.phase}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{m.hook}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block w-20">
                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${modulePct}%` }} />
                      </div>
                      <p className="text-[9px] font-mono text-muted-foreground text-right mt-1">
                        {moduleDone}/{m.lessons.length}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {open && (
                  <div className="border-t border-border/60 p-5 space-y-4">
                    {/* Lessons */}
                    <div className="space-y-1.5">
                      {m.lessons.map((l, li) => {
                        const id = lessonId(mi, li);
                        const p = progress[id];
                        const meta = TYPE_META[l.type];
                        const TypeIcon = meta.icon;
                        const inner = (
                          <>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                update(toggleLesson(progress, id));
                              }}
                              aria-label={p ? "Mark incomplete" : "Mark complete"}
                              className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {p ? (
                                <CheckCircle2 className="w-5 h-5 text-foreground" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <TypeIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                            <span className={`flex-1 min-w-0 text-xs sm:text-sm font-medium truncate ${p ? "text-muted-foreground line-through decoration-border" : "text-foreground"}`}>
                              {l.title}
                            </span>
                            {p && (
                              <Badge variant="outline" className="hidden sm:inline-flex font-mono text-[9px] shrink-0">
                                {nextReviewLabel(p)}
                              </Badge>
                            )}
                            <span className="font-mono text-[10px] text-muted-foreground shrink-0">{l.duration}</span>
                            {l.href && <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                          </>
                        );
                        const cls = `w-full flex items-center gap-3 border rounded-lg px-3 py-2.5 transition-all duration-200 ${
                          p ? "border-border/50 bg-muted/10" : "border-border bg-background/30 hover:border-foreground/40"
                        }`;
                        return l.href ? (
                          <a key={id} href={l.href} className={cls}>
                            {inner}
                          </a>
                        ) : (
                          <div key={id} className={cls}>
                            {inner}
                          </div>
                        );
                      })}
                    </div>

                    {/* Feynman prompt */}
                    <div className="border border-border/70 rounded-lg p-3.5 bg-muted/10 flex gap-2.5">
                      <GraduationCap className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                          Feynman Prompt — teach it back
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{m.feynman}</p>
                      </div>
                    </div>

                    {/* Active recall */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <BrainCircuit className="w-3.5 h-3.5" />
                        Active Recall — answer before revealing
                      </p>
                      {m.recall.map((r, ri) => {
                        const key = `${mi}-${ri}`;
                        const shown = revealed.has(key);
                        return (
                          <div key={key} className="border border-border rounded-lg bg-background/30">
                            <button
                              onClick={() => toggleReveal(key)}
                              className="w-full p-3 flex items-center justify-between gap-3 text-left cursor-pointer"
                            >
                              <span className="text-xs sm:text-sm font-semibold text-foreground">{r.q}</span>
                              <Badge variant={shown ? "secondary" : "default"} className="shrink-0 text-[9px] font-mono">
                                {shown ? "Hide" : "Reveal"}
                              </Badge>
                            </button>
                            {shown && (
                              <p className="px-3 pb-3 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-2.5">
                                <Lightbulb className="w-3.5 h-3.5 inline mr-1.5 text-foreground" />
                                {r.a}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
