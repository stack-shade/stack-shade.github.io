'use client';

import React, { useState } from "react";
import { GitCompareArrows, MousePointerClick } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OSI_LAYERS = [
  { n: 7, name: "Application" },
  { n: 6, name: "Presentation" },
  { n: 5, name: "Session" },
  { n: 4, name: "Transport" },
  { n: 3, name: "Network" },
  { n: 2, name: "Data Link" },
  { n: 1, name: "Physical" },
];

const TCPIP_LAYERS = [
  { name: "Application", maps: [7, 6, 5], protocols: "HTTP, DNS, SMTP, FTP" },
  { name: "Transport", maps: [4], protocols: "TCP, UDP" },
  { name: "Internet", maps: [3], protocols: "IP, ICMP" },
  { name: "Network Access", maps: [2, 1], protocols: "Ethernet, Wi-Fi" },
];

export function OSIvsTCPIP() {
  // selected: either an OSI layer number or a TCP/IP layer name
  const [selectedOsi, setSelectedOsi] = useState<number | null>(7);
  const [selectedTcpip, setSelectedTcpip] = useState<string | null>(null);

  const activeTcpip = selectedTcpip
    ? selectedTcpip
    : TCPIP_LAYERS.find((t) => t.maps.includes(selectedOsi ?? -1))?.name ?? null;

  const activeOsiLayers = selectedTcpip
    ? TCPIP_LAYERS.find((t) => t.name === selectedTcpip)?.maps ?? []
    : selectedOsi !== null
      ? [selectedOsi]
      : [];

  const handleOsiClick = (n: number) => {
    setSelectedOsi(n);
    setSelectedTcpip(null);
  };

  const handleTcpipClick = (name: string) => {
    setSelectedTcpip(name);
    setSelectedOsi(null);
  };

  const description = (() => {
    if (selectedTcpip) {
      const t = TCPIP_LAYERS.find((x) => x.name === selectedTcpip)!;
      const names = t.maps.map((n) => OSI_LAYERS.find((o) => o.n === n)!.name).join(" + ");
      return `The TCP/IP ${t.name} layer absorbs the OSI ${names} layer${t.maps.length > 1 ? "s" : ""}. Common protocols: ${t.protocols}.`;
    }
    if (selectedOsi !== null) {
      const osi = OSI_LAYERS.find((o) => o.n === selectedOsi)!;
      const t = TCPIP_LAYERS.find((x) => x.maps.includes(selectedOsi))!;
      return `The OSI ${osi.name} layer (L${selectedOsi}) maps onto the TCP/IP ${t.name} layer. Protocols there: ${t.protocols}.`;
    }
    return "Click a layer to see the mapping.";
  })();

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <GitCompareArrows className="w-5 h-5 text-foreground" />
          OSI vs TCP/IP — Interactive Mapping
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm flex items-center gap-1.5">
          <MousePointerClick className="w-4 h-4" />
          Click any layer on either model to see where it lives in the other.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-start">
          {/* OSI column */}
          <div className="space-y-1.5">
            <div className="text-center mb-3">
              <Badge variant="outline" className="font-mono text-[10px]">OSI · 7 Layers · Theory</Badge>
            </div>
            {OSI_LAYERS.map((l) => (
              <button
                key={l.n}
                onClick={() => handleOsiClick(l.n)}
                className={`w-full border rounded-lg px-3 py-2.5 text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeOsiLayers.includes(l.n)
                    ? "bg-foreground text-background border-foreground scale-[1.02]"
                    : "bg-background/40 border-border hover:border-foreground/40"
                }`}
              >
                <span className="font-bold text-xs sm:text-sm">{l.name}</span>
                <span className={`font-mono text-[9px] ${activeOsiLayers.includes(l.n) ? "opacity-70" : "text-muted-foreground"}`}>
                  L{l.n}
                </span>
              </button>
            ))}
          </div>

          {/* Middle arrows */}
          <div className="flex flex-col justify-around self-stretch py-8 text-muted-foreground">
            {TCPIP_LAYERS.map((t) => (
              <div key={t.name} className="flex items-center gap-0.5">
                <span className={`h-px w-3 sm:w-6 ${activeTcpip === t.name ? "bg-foreground" : "bg-border"}`} />
                <span className={`text-[10px] ${activeTcpip === t.name ? "text-foreground" : ""}`}>⇄</span>
                <span className={`h-px w-3 sm:w-6 ${activeTcpip === t.name ? "bg-foreground" : "bg-border"}`} />
              </div>
            ))}
          </div>

          {/* TCP/IP column */}
          <div className="flex flex-col gap-1.5">
            <div className="text-center mb-3">
              <Badge variant="outline" className="font-mono text-[10px]">TCP/IP · 4 Layers · Practice</Badge>
            </div>
            {TCPIP_LAYERS.map((t) => (
              <button
                key={t.name}
                onClick={() => handleTcpipClick(t.name)}
                style={{ minHeight: `${t.maps.length * 46}px` }}
                className={`w-full border rounded-lg px-3 py-2.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
                  activeTcpip === t.name
                    ? "bg-foreground text-background border-foreground scale-[1.02]"
                    : "bg-background/40 border-border hover:border-foreground/40"
                }`}
              >
                <span className="font-bold text-xs sm:text-sm">{t.name}</span>
                <span className={`font-mono text-[9px] mt-0.5 ${activeTcpip === t.name ? "opacity-70" : "text-muted-foreground"}`}>
                  {t.protocols}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-border/70 rounded-lg p-3.5 bg-muted/10">
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
