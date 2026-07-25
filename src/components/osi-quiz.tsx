'use client';

import React, { useState } from "react";
import { BrainCircuit, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
  tag: string;
}

const QUESTIONS: Question[] = [
  {
    q: "Which layer uses IP addresses?",
    options: ["Data Link", "Network", "Transport", "Application"],
    answer: 1,
    explanation: "The Network layer (L3) adds logical IP addresses and routes packets across networks.",
    tag: "Addressing",
  },
  {
    q: "Which layer uses MAC addresses?",
    options: ["Physical", "Network", "Data Link", "Session"],
    answer: 2,
    explanation: "The Data Link layer (L2) delivers frames hop-to-hop using burned-in MAC addresses like 00:1A:2B:3C:4D:5E.",
    tag: "Addressing",
  },
  {
    q: "Which layer uses port numbers like 80 and 443?",
    options: ["Transport", "Network", "Application", "Data Link"],
    answer: 0,
    explanation: "The Transport layer (L4) multiplexes applications using ports — HTTP:80, HTTPS:443, SSH:22, DNS:53.",
    tag: "Addressing",
  },
  {
    q: "Which layer handles encryption and compression?",
    options: ["Application", "Session", "Transport", "Presentation"],
    answer: 3,
    explanation: "The Presentation layer (L6) is the translator — it encrypts (TLS), decrypts, compresses and formats data.",
    tag: "Functions",
  },
  {
    q: "A router operates primarily at which layer?",
    options: ["Layer 2", "Layer 3", "Layer 4", "Layer 7"],
    answer: 1,
    explanation: "Routers forward packets based on destination IP addresses — a Layer 3 (Network) job.",
    tag: "Devices",
  },
  {
    q: "A switch forwards traffic using MAC addresses. Which layer?",
    options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
    answer: 1,
    explanation: "Switches and bridges live at Layer 2 (Data Link), forwarding frames by MAC address.",
    tag: "Devices",
  },
  {
    q: "What is the PDU (Protocol Data Unit) at the Transport layer with TCP?",
    options: ["Packet", "Frame", "Bits", "Segment"],
    answer: 3,
    explanation: "Data → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1).",
    tag: "PDU",
  },
  {
    q: "You're live-streaming a cricket match and can tolerate a few dropped frames, but not delay. TCP or UDP?",
    options: ["TCP — reliability first", "UDP — speed first", "TCP with retries", "Neither works"],
    answer: 1,
    explanation: "UDP is connectionless with no retransmission — perfect for live streams, gaming and DNS where latency beats perfection.",
    tag: "TCP vs UDP",
  },
  {
    q: "Troubleshooting: the Ethernet cable is unplugged and there's no signal at all. Which layer do you check FIRST?",
    options: ["Layer 7 · Application", "Layer 3 · Network", "Layer 1 · Physical", "Layer 5 · Session"],
    answer: 2,
    explanation: "Always troubleshoot bottom-up. No signal = a Physical layer problem: cables, connectors, NIC, radio.",
    tag: "Troubleshooting",
  },
  {
    q: "Troubleshooting: ping 8.8.8.8 works, but google.com doesn't resolve. Which layer/service is broken?",
    options: ["Physical — cabling", "Application — DNS", "Data Link — MAC", "Transport — TCP"],
    answer: 1,
    explanation: "IP connectivity works (L1–L3 fine), but name resolution fails. DNS is an Application layer (L7) service.",
    tag: "Troubleshooting",
  },
];

export function OSIQuiz() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[index];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === question.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index === QUESTIONS.length - 1) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const grade =
    score >= 9 ? "CCNA-ready. Outstanding." :
    score >= 7 ? "Strong networking fundamentals." :
    score >= 5 ? "Good start — review the weak spots above." :
    "Re-read the layers and try again — it will click.";

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <BrainCircuit className="w-5 h-5 text-foreground" />
          OSI Practice Quiz — Instant Feedback
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          10 questions modeled on CCNA, GATE and university exam patterns, including troubleshooting scenarios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {finished ? (
          <div className="border border-border rounded-xl p-8 bg-background/30 text-center space-y-4">
            <Trophy className="w-10 h-10 mx-auto text-foreground" />
            <div>
              <div className="text-4xl font-black text-foreground font-mono">
                {score}/{QUESTIONS.length}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{grade}</p>
            </div>
            <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-700"
                style={{ width: `${(score / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <Button onClick={restart} className="cursor-pointer font-semibold">
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retake Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Progress */}
            <div className="flex items-center justify-between gap-4">
              <Badge variant="outline" className="font-mono text-[10px]">
                Question {index + 1}/{QUESTIONS.length}
              </Badge>
              <div className="flex items-center gap-1.5 flex-1 max-w-48">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      i < index ? "bg-foreground" : i === index ? "bg-foreground/50" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Score {score}
              </Badge>
            </div>

            {/* Question */}
            <div className="border border-border rounded-xl p-5 bg-background/30 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-bold text-foreground text-sm sm:text-base leading-snug">{question.q}</h4>
                <Badge variant="outline" className="font-mono text-[9px] shrink-0">{question.tag}</Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {question.options.map((opt, i) => {
                  const isCorrect = picked !== null && i === question.answer;
                  const isWrongPick = picked === i && i !== question.answer;
                  return (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      disabled={picked !== null}
                      className={`border rounded-lg px-3.5 py-3 text-left text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-between gap-2 ${
                        isCorrect
                          ? "border-foreground bg-foreground text-background"
                          : isWrongPick
                            ? "border-destructive bg-destructive/10 text-foreground"
                            : picked !== null
                              ? "border-border bg-background/20 text-muted-foreground opacity-60"
                              : "border-border bg-background/30 hover:border-foreground/50 hover:bg-muted/20 cursor-pointer text-foreground"
                      }`}
                    >
                      <span>{opt}</span>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      {isWrongPick && <XCircle className="w-4 h-4 shrink-0 text-destructive" />}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className="border border-border/70 rounded-lg p-3.5 bg-muted/10">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">
                      {picked === question.answer ? "Correct. " : "Not quite. "}
                    </strong>
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={next}
              disabled={picked === null}
              className="w-full cursor-pointer font-semibold"
            >
              {index === QUESTIONS.length - 1 ? "See Results" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
