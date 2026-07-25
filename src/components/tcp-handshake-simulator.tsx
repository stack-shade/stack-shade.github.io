'use client';

import React, { useEffect, useState } from "react";
import { Play, RotateCcw, StepForward, Monitor, Server, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HandshakeStep {
  label: string;
  flag: string;
  detail: string;
  direction: "none" | "c2s" | "s2c" | "both";
  desc: string;
}

const STEPS: HandshakeStep[] = [
  {
    label: "Idle",
    flag: "—",
    detail: "No connection",
    direction: "none",
    desc: "You typed https://google.com. Before any HTTP data can flow, TCP (Layer 4) must establish a reliable connection with the server on port 443.",
  },
  {
    label: "Step 1",
    flag: "SYN →",
    detail: "seq = 100",
    direction: "c2s",
    desc: "Client sends a SYN (synchronize) packet with its initial sequence number 100. Meaning: \"I want to connect, and I'll start numbering my bytes from 100.\"",
  },
  {
    label: "Step 2",
    flag: "← SYN + ACK",
    detail: "seq = 300, ack = 101",
    direction: "s2c",
    desc: "Server replies with its own SYN (seq = 300) plus an ACK acknowledging the client's SYN (ack = 101 = \"I expect byte 101 next\").",
  },
  {
    label: "Step 3",
    flag: "ACK →",
    detail: "ack = 301",
    direction: "c2s",
    desc: "Client acknowledges the server's SYN (ack = 301). Both sides have now agreed on sequence numbers — the three-way handshake is complete.",
  },
  {
    label: "Established",
    flag: "⇄ DATA",
    detail: "TLS + HTTP flow",
    direction: "both",
    desc: "The connection is open. The TLS handshake (Layer 6 encryption) and your HTTP request (Layer 7) now ride reliably inside TCP segments.",
  },
];

export function TcpHandshakeSimulator() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [playing]);

  const established = step === STEPS.length - 1;

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <ArrowRight className="w-5 h-5 text-foreground" />
          Animated TCP Three-Way Handshake
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Watch the SYN → SYN-ACK → ACK exchange that opens every reliable TCP connection before a single byte of HTTP data flows.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sequence visual */}
        <div className="border border-border rounded-xl p-5 bg-background/30">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
            {/* Client */}
            <div
              className={`border rounded-xl p-4 text-center transition-all duration-500 ${
                current.direction === "c2s" || established
                  ? "border-foreground bg-muted/20 scale-[1.02]"
                  : "border-border bg-background/20"
              }`}
            >
              <Monitor className="w-6 h-6 mx-auto mb-2 text-foreground" />
              <div className="font-bold text-sm text-foreground">Client</div>
              <div className="font-mono text-[10px] text-muted-foreground">192.168.1.20:51514</div>
              {established && (
                <Badge className="mt-2 font-mono text-[9px]">ESTABLISHED</Badge>
              )}
            </div>

            {/* Arrow lane */}
            <div className="w-28 sm:w-44 flex flex-col items-center gap-2">
              {current.direction === "c2s" && (
                <div key={step} className="flex items-center gap-1 text-foreground">
                  <span className="h-0.5 w-10 sm:w-20 bg-foreground animate-pulse" />
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
              {current.direction === "s2c" && (
                <div key={step} className="flex items-center gap-1 text-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="h-0.5 w-10 sm:w-20 bg-foreground animate-pulse" />
                </div>
              )}
              {current.direction === "both" && (
                <div key={step} className="flex flex-col gap-1.5 text-foreground">
                  <div className="flex items-center gap-1">
                    <span className="h-0.5 w-10 sm:w-20 bg-foreground animate-pulse" />
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="h-0.5 w-10 sm:w-20 bg-foreground animate-pulse" />
                  </div>
                </div>
              )}
              {current.direction === "none" && (
                <span className="h-0.5 w-16 sm:w-28 bg-border border border-dashed border-border" />
              )}
              <Badge
                variant={current.direction === "none" ? "outline" : "default"}
                className="font-mono text-[10px] whitespace-nowrap"
              >
                {current.flag}
              </Badge>
              <span className="font-mono text-[9px] text-muted-foreground whitespace-nowrap">
                {current.detail}
              </span>
            </div>

            {/* Server */}
            <div
              className={`border rounded-xl p-4 text-center transition-all duration-500 ${
                current.direction === "s2c" || established
                  ? "border-foreground bg-muted/20 scale-[1.02]"
                  : "border-border bg-background/20"
              }`}
            >
              <Server className="w-6 h-6 mx-auto mb-2 text-foreground" />
              <div className="font-bold text-sm text-foreground">Server</div>
              <div className="font-mono text-[10px] text-muted-foreground">142.250.x.x:443</div>
              {established && (
                <Badge className="mt-2 font-mono text-[9px]">ESTABLISHED</Badge>
              )}
            </div>
          </div>

          {/* Progress rail */}
          <div className="flex items-center gap-1.5 mt-5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setStep(i); setPlaying(false); }}
                aria-label={`Go to step ${i + 1}`}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i <= step ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Step narration */}
          <div className="border-t border-border/60 mt-4 pt-4 flex items-start gap-2.5">
            {established && <CheckCircle2 className="w-4 h-4 mt-0.5 text-foreground shrink-0" />}
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">{current.label}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{current.desc}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => { if (isLast) setStep(0); setPlaying(!playing); }}
            variant="secondary"
            className="flex-1 cursor-pointer font-semibold"
          >
            <Play className="w-4 h-4 mr-1.5 fill-current" />
            {playing ? "Playing…" : isLast ? "Replay" : "Play Handshake"}
          </Button>
          <Button
            onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
            disabled={isLast}
            className="flex-1 cursor-pointer font-semibold"
          >
            <StepForward className="w-4 h-4 mr-1.5" />
            Next Step
          </Button>
          <Button
            variant="ghost"
            onClick={() => { setStep(0); setPlaying(false); }}
            className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
