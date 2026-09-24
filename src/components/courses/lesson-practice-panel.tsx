"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, CheckCircle2, Layers3, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CourseLessonContent } from "@/lib/course-lesson-content";
import ExcalidrawSketch from "@/components/excalidraw-sketch";

type Props = {
  current: CourseLessonContent;
  previous: CourseLessonContent | null;
  sketch: { title: string; labels: string[] };
};

type PracticeTab = "quiz" | "flashcards" | "qna" | "artifacts";

type QuizItem = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

function buildQuiz(current: CourseLessonContent, previous: CourseLessonContent | null): QuizItem[] {
  const isScaling = current.title.toLowerCase() === "vertical vs horizontal scaling";
  if (isScaling) {
    return [
      {
        question: "A stateless API replica safely handles 100 QPS. Peak demand is 350 QPS. What is the first horizontal estimate?",
        options: ["2", "3", "4", "5"],
        answer: "4",
        explanation: "ceil(350 / 100) = 4 before explicit redundancy and headroom.",
      },
      {
        question: "What is the defining architectural change in horizontal scaling?",
        options: [
          "Replace RAM with faster RAM",
          "Add resources to one machine",
          "Add more machines and distribute work",
          "Increase the database page size",
        ],
        answer: "Add more machines and distribute work",
        explanation: "Scaling out increases the number of workers and introduces routing and coordination concerns.",
      },
      {
        question: "What commonly becomes the next bottleneck after adding application replicas?",
        options: ["The favicon", "A shared dependency such as the database", "The browser theme", "The DNS label length"],
        answer: "A shared dependency such as the database",
        explanation: "Application-tier scale does not multiply the capacity of fixed-capacity downstream dependencies.",
      },
      {
        question: "Why is local in-process session state risky after scaling out?",
        options: [
          "Processes cannot use memory",
          "A later request can land on another replica",
          "HTTP stops working",
          "Load balancers always rewrite sessions",
        ],
        answer: "A later request can land on another replica",
        explanation: "State tied to one process is not automatically available to every other replica.",
      },
      {
        question: "Which statement is the safest interview-level rule?",
        options: [
          "Always scale horizontally",
          "Always scale vertically",
          "Choose after identifying the bottleneck and state/failure constraints",
          "Scaling direction never matters",
        ],
        answer: "Choose after identifying the bottleneck and state/failure constraints",
        explanation: "The workload, dependency chain, failure model and operational constraints determine the appropriate move.",
      },
    ];
  }

  const source = [...current.recall, ...(previous?.recall ?? [])].slice(0, 5);
  return source.map((item) => ({
    question: item.question,
    options: [item.answer, "A plausible but incomplete explanation", "An unrelated mechanism", "A common misconception"],
    answer: item.answer,
    explanation: item.answer,
  }));
}

export default function LessonPracticePanel({ current, previous, sketch }: Props) {
  const [tab, setTab] = useState<PracticeTab>("quiz");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const quiz = useMemo(() => buildQuiz(current, previous), [current, previous]);

  const recall = [...current.recall, ...(previous?.recall ?? [])];
  const cards = [
    {
      front: "Define the core idea in one sentence.",
      back: current.mentalModel,
    },
    {
      front: "What is the most useful analogy?",
      back: current.analogy?.body ?? "Build one physical analogy that preserves the causal relationship.",
    },
    ...(previous ? [{ front: "What did the previous topic establish?", back: previous.mentalModel }] : []),
    ...(current.recall.slice(0, 2).map((item) => ({ front: item.question, back: item.answer }))),
  ];

  const artifacts = [
    { title: "Current topic artifact", artifact: current.artifact },
    ...(previous ? [{ title: "Previous topic artifact", artifact: previous.artifact }] : []),
  ];

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-card/25 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="lesson-kicker">PRACTICE</span>
            <h2 className="mt-1 text-xl font-black">Turn explanation into recall</h2>
            <p className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground">
              Work from the current topic and, when available, the immediately previous topic. Try first; reveal second.
            </p>
          </div>
          <BrainCircuit className="h-5 w-5 shrink-0" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl border border-border bg-background/30 p-1 sm:grid-cols-4">
          {([
            ["quiz", "Quiz"],
            ["flashcards", "Flashcards"],
            ["qna", "QnA"],
            ["artifacts", "Artifacts"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                "rounded-lg px-3 py-2.5 text-xs font-bold transition " +
                (tab === id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "quiz" && (
        <div className="space-y-3">
          {quiz.map((item, index) => (
            <Card key={item.question} className="border-border bg-card/25">
              <CardContent className="p-4 sm:p-5">
                <div className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-border font-mono text-[9px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-6">{item.question}</h3>
                    <div className="mt-3 grid gap-2">
                      {item.options.map((option) => {
                        const selected = answers[index] === option;
                        const correct = option === item.answer;
                        const revealed = Boolean(answers[index]);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAnswers((state) => ({ ...state, [index]: option }))}
                            className={
                              "rounded-xl border px-3 py-2.5 text-left text-[11px] leading-5 transition " +
                              (revealed && correct
                                ? "border-foreground bg-foreground/[0.06] text-foreground"
                                : selected
                                  ? "border-foreground/50 bg-muted/50"
                                  : "border-border hover:border-foreground/25")
                            }
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {answers[index] && (
                      <div className="mt-3 flex gap-2 rounded-xl border border-border bg-muted/10 p-3 text-[10px] leading-5 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{item.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-[10px] font-bold hover:bg-muted/50"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset quiz
          </button>
        </div>
      )}

      {tab === "flashcards" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map((card, index) => {
            const isFlipped = Boolean(flipped[index]);
            return (
              <button
                key={card.front}
                type="button"
                onClick={() => setFlipped((state) => ({ ...state, [index]: !state[index] }))}
                className="min-h-48 rounded-2xl border border-border bg-card/25 p-5 text-left transition hover:border-foreground/25"
              >
                <span className="lesson-kicker">{isFlipped ? "ANSWER" : "PROMPT"}</span>
                <p className="mt-3 text-sm font-bold leading-6">{isFlipped ? card.back : card.front}</p>
                <span className="mt-6 block font-mono text-[8px] text-muted-foreground">
                  click to flip
                </span>
              </button>
            );
          })}
        </div>
      )}

      {tab === "qna" && (
        <div className="space-y-2">
          {recall.map((item, index) => (
            <details key={item.question + index} className="rounded-2xl border border-border bg-card/25 p-4">
              <summary className="cursor-pointer list-none text-sm font-bold">{item.question}</summary>
              <p className="mt-3 border-t border-border/70 pt-3 text-xs leading-6 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      )}

      {tab === "artifacts" && (
        <div className="space-y-4">
          <div className="grid gap-3 lg:grid-cols-2">
            {artifacts.map(({ title, artifact }) => (
              <Card key={title} className="border-border bg-card/25">
                <CardContent className="p-0 overflow-hidden">
                  <div className="border-b border-border/70 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Layers3 className="h-4 w-4" />
                      <span className="text-xs font-bold">{title}</span>
                    </div>
                    <p className="mt-1 text-[10px] leading-5 text-muted-foreground">{artifact.explanation}</p>
                  </div>
                  <pre className="max-h-[26rem] overflow-auto bg-background/40 p-4 text-[10px] leading-5"><code>{artifact.code}</code></pre>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-border bg-card/25">
            <CardContent className="p-4 sm:p-5">
              <span className="lesson-kicker">DRAW IT</span>
              <h3 className="mt-1 text-sm font-black">Reconstruct the architecture without the article</h3>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                <ExcalidrawSketch
                  title={sketch.title}
                  subtitle="Redraw the flow, label the bottleneck, then add one failure."
                  labels={sketch.labels}
                  height={520}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
