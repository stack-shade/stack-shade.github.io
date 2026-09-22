'use client';

import { useState } from "react";
import { ArrowRight, BrainCircuit, Database, FileText, GitBranch, Search, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STAGES = [
  ["Raw text", "Messy language"],
  ["Tokens", "Discrete units"],
  ["Representations", "Features / vectors"],
  ["Model", "Statistical or neural"],
  ["Output", "Prediction / generation"],
] as const;

function PipelineVisual() {
  const [active, setActive] = useState(0);
  return (
    <Card className="border-border/70 bg-background/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base"><GitBranch className="h-4 w-4" /> The NLP stack in five moves</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-5">
          {STAGES.map(([title, detail], index) => (
            <button
              key={title}
              onClick={() => setActive(index)}
              className={`rounded-xl border p-4 text-left transition-all ${active === index ? "border-foreground/60 bg-muted/20" : "border-border bg-background/40 hover:bg-muted/10"}`}
            >
              <div className="font-mono text-[10px] text-muted-foreground">0{index + 1}</div>
              <div className="mt-1 text-sm font-bold">{title}</div>
              <div className="mt-1 text-[11px] leading-5 text-muted-foreground">{detail}</div>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm leading-7 text-muted-foreground">
          Current focus: <span className="font-semibold text-foreground">{STAGES[active][0]}</span> — {STAGES[active][1]}.
        </div>
      </CardContent>
    </Card>
  );
}

function AttentionVisual() {
  const words = ["The", "cat", "sat", "because", "it", "was", "tired"];
  const [selected, setSelected] = useState(4);
  return (
    <Card className="border-border/70 bg-background/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base"><BrainCircuit className="h-4 w-4" /> Self-attention as selective context</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {words.map((word, index) => {
            const distance = Math.abs(index - selected);
            const strength = Math.max(0.2, 1 - distance * 0.16);
            return (
              <button
                key={word + index}
                onClick={() => setSelected(index)}
                className="rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-all"
                style={{ opacity: index === selected ? 1 : strength }}
              >
                {word}
              </button>
            );
          })}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Query", "What does this token need?"],
            ["Keys", "Which positions look relevant?"],
            ["Values", "What information gets mixed in?"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border border-border p-3">
              <div className="text-xs font-bold">{title}</div>
              <div className="mt-1 text-[11px] leading-5 text-muted-foreground">{body}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RAGVisual() {
  const [step, setStep] = useState(0);
  const steps = [
    ["Question", "What does the user need?"],
    ["Retrieve", "Find relevant chunks."],
    ["Ground", "Put evidence into context."],
    ["Generate", "Produce the answer."],
  ];
  return (
    <Card className="border-border/70 bg-background/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4" /> RAG: retrieve before you generate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-4">
          {steps.map(([title, body], index) => (
            <button key={title} onClick={() => setStep(index)} className={`rounded-xl border p-4 text-left ${step === index ? "border-foreground/60 bg-muted/20" : "border-border"}`}>
              <div className="font-mono text-[10px] text-muted-foreground">0{index + 1}</div>
              <div className="mt-1 text-sm font-bold">{title}</div>
              <div className="mt-1 text-[11px] leading-5 text-muted-foreground">{body}</div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-4 w-4" /> Documents
          <ArrowRight className="h-4 w-4" />
          <Database className="h-4 w-4" /> Search index
          <ArrowRight className="h-4 w-4" />
          <Sparkles className="h-4 w-4" /> LLM
        </div>
      </CardContent>
    </Card>
  );
}

export function NlpLearningVisuals() {
  return (
    <div className="space-y-5">
      <PipelineVisual />
      <AttentionVisual />
      <RAGVisual />
    </div>
  );
}
