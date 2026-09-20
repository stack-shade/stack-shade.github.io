'use client';

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, LockKeyhole, Radio, Router, Shield, Shuffle, Signal, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VisualKind } from "@/lib/computer-networks-lessons";

function Flow({ items, vertical=false }: { items: string[]; vertical?: boolean }) {
  return (
    <div className={vertical ? "space-y-2" : "flex flex-wrap items-center gap-2"}>
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2">
          <div className="rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-semibold text-foreground shadow-sm">
            {item}
          </div>
          {i < items.length - 1 && (vertical ? <ArrowDown className="h-4 w-4 text-muted-foreground mx-auto" /> : <ArrowRight className="h-4 w-4 text-muted-foreground" />)}
        </div>
      ))}
    </div>
  );
}

function SubnetVisual() {
  const [ip, setIp] = useState("192.168.10.37");
  const [prefix, setPrefix] = useState("27");

  const calc = useMemo(() => {
    const nums = ip.split(".").map(Number);
    const p = Number(prefix);
    if (nums.length !== 4 || nums.some(n => !Number.isInteger(n) || n < 0 || n > 255) || !Number.isInteger(p) || p < 0 || p > 32) return null;
    const value = nums.reduce((acc, n) => (acc * 256 + n) >>> 0, 0);
    const mask = p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0;
    const network = (value & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const toIp = (n: number) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
    const hostBits = 32 - p;
    const size = 2 ** hostBits;
    const conventionalUsable = hostBits >= 2 ? Math.max(0, size - 2) : size;
    return { mask: toIp(mask), network: toIp(network), broadcast: toIp(broadcast), hostBits, size, conventionalUsable };
  }, [ip, prefix]);

  return (
    <Card className="border-border/70 bg-background/30">
      <CardHeader><CardTitle className="text-sm">Subnet playground</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={ip}
            onChange={e => setIp(e.target.value)}
            aria-label="IPv4 address"
            inputMode="decimal"
            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm font-mono outline-none transition-colors focus:border-foreground/50"
          />
          <input
            value={prefix}
            onChange={e => setPrefix(e.target.value)}
            aria-label="CIDR prefix"
            inputMode="numeric"
            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm font-mono outline-none transition-colors focus:border-foreground/50"
          />
        </div>
        {calc ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              ["Mask", calc.mask],
              ["Network", calc.network],
              ["Broadcast", calc.broadcast],
              ["Conventional usable", String(calc.conventionalUsable)],
            ].map(([k,v]) => (
              <div key={k} className="rounded-lg border border-border p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 font-mono text-sm font-bold text-foreground">{v}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">Enter a valid IPv4 address and prefix from 0–32.</div>
        )}
        {calc && <div className="rounded-lg border border-border/70 p-3 text-xs text-muted-foreground">
          {calc.size.toLocaleString()} total addresses • {calc.hostBits} host bits • /{prefix} prefix
        </div>}
      </CardContent>
    </Card>
  );
}

function TroubleVisual() {
  const [step, setStep] = useState(0);
  const steps = [
    ["L1/L2", "Interface, link, VLAN, neighbor state"],
    ["L3", "Address, gateway, route"],
    ["L4", "Port, listener, firewall"],
    ["L7", "DNS, TLS, HTTP, application"],
  ];
  return (
    <Card className="border-border/70 bg-background/30">
      <CardHeader><CardTitle className="text-sm">Troubleshooting decision ladder</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {steps.map(([label, detail], i) => (
          <button key={label} onClick={() => setStep(i)} className={`w-full text-left rounded-lg border px-3 py-2.5 transition-all ${step === i ? "border-foreground/60 bg-muted/20" : "border-border"}`}>
            <div className="flex items-center gap-2 text-xs font-bold">{i === step ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border border-border" />}{label}</div>
            <div className="pl-6 pt-1 text-[11px] text-muted-foreground">{detail}</div>
          </button>
        ))}
        <p className="text-[11px] text-muted-foreground">Current test: <span className="font-semibold text-foreground">{steps[step][1]}</span></p>
      </CardContent>
    </Card>
  );
}

export function ComputerNetworkVisual({ kind }: { kind: VisualKind }) {
  if (kind === "subnet") return <SubnetVisual />;
  if (kind === "troubleshooting") return <TroubleVisual />;

  const content: Record<string, ReactNode> = {
    osi: (
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          {["L7 Application","L6 Presentation","L5 Session","L4 Transport","L3 Network","L2 Data Link","L1 Physical"].map((x, i) => (
            <div key={x} className={`rounded-lg border border-border px-3 py-2.5 bg-background/60 text-xs font-semibold animate-pulse ${i % 2 ? "delay-150" : ""}`}>{x}</div>
          ))}
        </div>
        <div className="rounded-xl border border-dashed border-border p-5 flex flex-col justify-center gap-3">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">PDU path</div>
          <Flow items={["Data","Segment","Packet","Frame","Bits"]} vertical />
        </div>
      </div>
    ),
    encapsulation: (
      <div className="space-y-3">
        {[
          ["Data","Application payload"],
          ["Segment","+ TCP/UDP header"],
          ["Packet","+ IP header"],
          ["Frame","+ MAC/FCS"],
          ["Bits","Signal on the medium"],
        ].map(([a,b],i) => (
          <div key={a} className="flex items-center gap-3 border border-border rounded-lg p-3 bg-background/50">
            <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-xs font-bold">{i+1}</div>
            <div><div className="text-xs font-bold">{a}</div><div className="text-[11px] text-muted-foreground">{b}</div></div>
          </div>
        ))}
      </div>
    ),
    "web-journey": <Flow items={["URL","DNS","Route","TLS / QUIC","HTTP","Render"]} />,
    signals: (
      <div className="grid sm:grid-cols-3 gap-3">
        {([
          [Wifi, "Copper", "Electrical voltage changes"],
          [Radio, "Fiber", "Light pulses"],
          [Signal, "Radio", "Electromagnetic waves"],
        ] as [LucideIcon, string, string][]).map(([Icon, name, detail]) => (
          <div key={name} className="rounded-xl border border-border p-4 bg-background/50">
            <Icon className="h-5 w-5 mb-2" />
            <div className="text-sm font-bold">{name}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{detail}</div>
            <div className="mt-3 flex gap-1">{Array.from({length:8}).map((_,i)=><span key={i} className={`h-1.5 flex-1 rounded-full bg-foreground/30 ${i%2?"animate-pulse":""}`} />)}</div>
          </div>
        ))}
      </div>
    ),
    arp: (
      <div className="rounded-xl border border-border p-4 bg-background/40">
        <div className="grid grid-cols-3 items-center gap-3">
          <div className="rounded-lg border border-border p-3 text-center text-xs font-bold">Host A</div>
          <div className="text-center text-xs"><div className="font-mono rounded-md border border-dashed p-2 animate-pulse">Who has 192.168.1.1?</div><ArrowRight className="mx-auto h-4 w-4 my-2" /><div className="font-mono rounded-md border p-2">8c:85:90:aa:bb:cc</div></div>
          <div className="rounded-lg border border-border p-3 text-center text-xs font-bold">Gateway</div>
        </div>
      </div>
    ),
    switch: (
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-sm font-bold"><Router className="h-4 w-4" /> Switch</div>
          <div className="mt-3 space-y-2 text-xs font-mono">
            <div>AA:AA → Gi1/0/1</div><div>BB:BB → Gi1/0/7</div><div>CC:CC → Gi1/0/12</div>
          </div>
        </div>
        <Flow items={["Frame in","MAC lookup","Forward"]} />
      </div>
    ),
    "frame-trace": <Flow items={["Host A","Switch 1","Switch 2","Router (if needed)","Host B"]} />,
    routing: (
      <div className="rounded-xl border border-border overflow-hidden text-xs">
        {["0.0.0.0/0 → ISP","10.0.0.0/8 → R1","10.20.0.0/16 → R2","10.20.30.0/24 → R3 ✓"].map((r,i)=><div key={r} className={`px-3 py-2.5 border-b last:border-b-0 border-border ${i===3?"bg-muted/20 font-bold":""}`}>{r}</div>)}
      </div>
    ),
    nat: <Flow items={["10.0.0.24:51514","NAT 198.51.100.7:40001","203.0.113.10:443"]} />,
    protocols: <Flow items={["OSI model","TCP/IP model","TCP","IP","HTTP"]} />,
    tcp: (
      <div className="rounded-xl border border-border p-4">
        <Flow items={["SEQ bytes","ACK progress","Loss signal","Retransmit","Ordered stream"]} />
      </div>
    ),
    "tcp-handshake": (
      <div className="space-y-2">
        {["C → S   SYN   Seq=100","S → C   SYN-ACK   Seq=900 Ack=101","C → S   ACK   Ack=901","C ↔ S   DATA","FIN / ACK teardown"].map((x,i)=><div key={x} className="rounded-lg border border-border p-3 font-mono text-[11px] animate-pulse">{x}</div>)}
      </div>
    ),
    "tcp-control": <Flow items={["rwnd","min(rwnd,cwnd)","in-flight bytes","ACK/loss feedback","new cwnd"]} />,
    congestion: (
      <div className="flex items-end gap-1 h-36 border-b border-l border-border px-3">
        {[10,18,30,48,70,94,115,76,84,92].map((h,i)=><div key={i} className={`flex-1 rounded-t bg-foreground/60 ${i===7?"animate-pulse":""}`} style={{height:h}} />)}
      </div>
    ),
    quic: <Flow items={["HTTP/3","QUIC streams","TLS 1.3","UDP","IP"]} />,
    "tcp-capture": (
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-border p-4 font-mono text-[11px] space-y-2">
          <div>SYN</div><div>SYN-ACK</div><div>ACK</div><div>PSH, ACK</div><div className="text-muted-foreground">retransmission?</div>
        </div>
        <div className="rounded-xl border border-dashed border-border p-4">
          <div className="text-xs font-bold">Read it as a timeline</div>
          <div className="mt-2 text-[11px] text-muted-foreground">flow → sequence → ACK → anomaly → closure</div>
        </div>
      </div>
    ),
    dns: <Flow items={["Client","Recursive","Root","TLD","Authoritative"]} />,
    "dns-journey": <Flow items={["Cache?","Root referral","TLD referral","Authoritative answer","Cache TTL"]} />,
    http: (
      <div className="grid sm:grid-cols-3 gap-2 text-[11px]">
        {[
          ["HTTP/1.1","TCP","keep-alive + multiple requests"],
          ["HTTP/2","TCP","binary frames + multiplexed streams"],
          ["HTTP/3","QUIC/UDP","independent streams"],
        ].map(([a,b,c])=><div key={a} className="rounded-lg border border-border p-3"><div className="font-bold">{a}</div><div className="font-mono text-muted-foreground mt-1">{b}</div><div className="mt-2">{c}</div></div>)}
      </div>
    ),
    tls: (
      <div className="grid sm:grid-cols-4 gap-2">
        {([
          [LockKeyhole, "ClientHello"],
          [Shield, "Certificate"],
          [Shuffle, "Key schedule"],
          [CheckCircle2, "Encrypted app data"],
        ] as [LucideIcon, string][]).map(([Icon, label])=><div key={label} className="rounded-lg border border-border p-3 text-center"><Icon className="h-5 w-5 mx-auto mb-2" /><div className="text-[11px] font-bold">{label}</div></div>)}
      </div>
    ),
    applications: <Flow items={["WebSocket","SMTP","IMAP","DHCP DORA"]} />,
    devtools: <Flow items={["Request","Headers","Timing","Initiator","Response"]} />,
    security: <Flow items={["Firewall","Proxy","VPN tunnel","Backend"]} />,
    attacks: (
      <div className="grid sm:grid-cols-3 gap-2">
        {[
          ["SYN flood","Finite connection state"],
          ["DNS spoof","Trusted answer"],
          ["MITM","Endpoint authentication"],
        ].map(([a,b])=><div key={a} className="rounded-lg border border-border p-3"><div className="font-bold text-xs">{a}</div><div className="text-[11px] text-muted-foreground mt-1">{b}</div></div>)}
      </div>
    ),
    toolkit: <Flow items={["ping","traceroute","dig","curl","ss"]} />,
    wireshark: (
      <div className="rounded-xl border border-border overflow-hidden font-mono text-[10px]">
        {["DNS A query","TCP SYN","TCP SYN-ACK","TLS ClientHello","TLS ServerHello","HTTP request / encrypted app data"].map((x,i)=><div key={x} className="px-3 py-2 border-b border-border last:border-b-0 flex gap-3"><span className="text-muted-foreground">{String(i+1).padStart(2,"0")}</span><span>{x}</span></div>)}
      </div>
    ),
  };

  return (
    <Card className="overflow-hidden border-border/70 bg-card/20">
      <CardHeader className="border-b border-border/60">
        <div className="flex items-center gap-2">
          <Signal className="h-4 w-4" />
          <CardTitle className="text-sm">Visual model</CardTitle>
        </div>
        <p className="text-[11px] text-muted-foreground">Watch the structure first. Then read the technical details.</p>
      </CardHeader>
      <CardContent className="p-5">{content[kind] ?? <div className="text-sm text-muted-foreground">Visualization coming soon.</div>}</CardContent>
    </Card>
  );
}
