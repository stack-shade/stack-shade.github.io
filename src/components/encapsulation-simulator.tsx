'use client';

import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, StepForward, ArrowDownUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Step {
  layer: string;
  action: string;
  pdu: string;
  desc: string;
}

const ENCAP_STEPS: Step[] = [
  {
    layer: "Layers 7–5 · Application / Presentation / Session",
    action: "Pure Data",
    pdu: "Data",
    desc: "Your browser creates an HTTP request. At the top three layers it is simply called Data.",
  },
  {
    layer: "Layer 4 · Transport",
    action: "+ TCP Header",
    pdu: "Segment",
    desc: "TCP wraps the data with source/destination ports (e.g. 443), sequence numbers and a checksum for reliable, ordered delivery.",
  },
  {
    layer: "Layer 3 · Network",
    action: "+ IP Header",
    pdu: "Packet",
    desc: "Source and destination IP addresses are added so routers can choose the best path across the Internet.",
  },
  {
    layer: "Layer 2 · Data Link",
    action: "+ MAC Header + FCS Trailer",
    pdu: "Frame",
    desc: "The NIC wraps the packet with source/destination MAC addresses and an FCS trailer for error detection on the local link.",
  },
  {
    layer: "Layer 1 · Physical",
    action: "Converted to Signals",
    pdu: "Bits",
    desc: "The frame becomes raw bits — electrical pulses in copper, light in fiber, or radio waves in Wi-Fi.",
  },
];

const DECAP_STEPS: Step[] = [
  {
    layer: "Layer 1 · Physical",
    action: "Signals Arrive",
    pdu: "Bits",
    desc: "The receiver's NIC reads raw signals off the wire and reconstructs the stream of bits.",
  },
  {
    layer: "Layer 2 · Data Link",
    action: "− MAC Header + FCS",
    pdu: "Frame",
    desc: "The frame is checked for errors (FCS) and the destination MAC is verified. The Ethernet header and trailer are stripped.",
  },
  {
    layer: "Layer 3 · Network",
    action: "− IP Header",
    pdu: "Packet",
    desc: "The destination IP is confirmed to be this machine. The IP header is removed.",
  },
  {
    layer: "Layer 4 · Transport",
    action: "− TCP Header",
    pdu: "Segment",
    desc: "Segments are reordered by sequence number, missing ones are re-requested, and the stream is reassembled.",
  },
  {
    layer: "Layers 7–5 · Application",
    action: "Original Data Delivered",
    pdu: "Data",
    desc: "The web server receives your exact original HTTP request — ready to be processed.",
  },
];

// visible headers per encapsulation step index
const ENCAP_HEADERS = [
  { eth: false, ip: false, tcp: false, fcs: false, bits: false },
  { eth: false, ip: false, tcp: true, fcs: false, bits: false },
  { eth: false, ip: true, tcp: true, fcs: false, bits: false },
  { eth: true, ip: true, tcp: true, fcs: true, bits: false },
  { eth: true, ip: true, tcp: true, fcs: true, bits: true },
];

// visible headers per decapsulation step index
const DECAP_HEADERS = [
  { eth: true, ip: true, tcp: true, fcs: true, bits: true },
  { eth: true, ip: true, tcp: true, fcs: true, bits: false },
  { eth: false, ip: true, tcp: true, fcs: false, bits: false },
  { eth: false, ip: false, tcp: true, fcs: false, bits: false },
  { eth: false, ip: false, tcp: false, fcs: false, bits: false },
];

export function EncapsulationSimulator() {
  const [mode, setMode] = useState<"encap" | "decap">("encap");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps = mode === "encap" ? ENCAP_STEPS : DECAP_STEPS;
  const headers = mode === "encap" ? ENCAP_HEADERS[step] : DECAP_HEADERS[step];
  const current = steps[step];
  const isLast = step === steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1800);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  const switchMode = (m: "encap" | "decap") => {
    setMode(m);
    setStep(0);
    setPlaying(false);
  };

  const headerBlock = (label: string, sub: string, visible: boolean) => (
    <div
      className={`transition-all duration-500 overflow-hidden ${
        visible ? "max-w-28 opacity-100" : "max-w-0 opacity-0"
      }`}
    >
      <div className="border border-foreground/50 bg-muted/30 rounded-md px-2 py-3 text-center min-w-16">
        <div className="font-mono text-[10px] font-bold text-foreground whitespace-nowrap">{label}</div>
        <div className="font-mono text-[8px] text-muted-foreground whitespace-nowrap">{sub}</div>
      </div>
    </div>
  );

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Package className="w-5 h-5 text-foreground" />
          Encapsulation & Decapsulation Simulator
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Step through how each layer adds its own header on the sender — and strips it off on the receiver.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode toggle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={mode === "encap" ? "default" : "outline"}
            onClick={() => switchMode("encap")}
            className="flex-1 cursor-pointer font-semibold transition-all duration-300"
          >
            Sender: Encapsulation ↓
          </Button>
          <Button
            variant={mode === "decap" ? "default" : "outline"}
            onClick={() => switchMode("decap")}
            className="flex-1 cursor-pointer font-semibold transition-all duration-300"
          >
            Receiver: Decapsulation ↑
          </Button>
        </div>

        {/* Packet Visual */}
        <div className="border border-border rounded-xl p-5 bg-background/30 space-y-4">
          <div className="flex items-center justify-center gap-1 flex-wrap min-h-[76px]">
            {headers.bits ? (
              <div className="font-mono text-xs sm:text-sm text-foreground border border-dashed border-foreground/50 rounded-md px-4 py-3 bg-muted/20 animate-pulse">
                01001000 01101001 00100001 ··· bits on the wire
              </div>
            ) : (
              <>
                {headerBlock("ETH", "MAC hdr", headers.eth)}
                {headerBlock("IP", "Net hdr", headers.ip)}
                {headerBlock("TCP", "Trans hdr", headers.tcp)}
                <div className="border border-foreground bg-foreground text-background rounded-md px-3 py-3 text-center">
                  <div className="font-mono text-[10px] font-bold whitespace-nowrap">HTTP DATA</div>
                  <div className="font-mono text-[8px] opacity-70 whitespace-nowrap">GET /</div>
                </div>
                {headerBlock("FCS", "trailer", headers.fcs)}
              </>
            )}
          </div>

          {/* Progress rail */}
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
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

          {/* Step description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60 pt-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="font-mono text-[10px]">
                  Step {step + 1}/{steps.length}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground">{current.layer}</span>
              </div>
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <ArrowDownUp className="w-4 h-4" />
                {current.action}
                <Badge className="font-mono text-[10px]">PDU: {current.pdu}</Badge>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">{current.desc}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => { if (isLast) { setStep(0); } setPlaying(!playing); }}
            variant="secondary"
            className="flex-1 cursor-pointer font-semibold"
          >
            {playing ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5 fill-current" />}
            {playing ? "Pause" : "Auto Play"}
          </Button>
          <Button
            onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
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
