'use client';

import React, { useState } from "react";
import { Layers, MousePointerClick, Network, Cable, Box } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LayerInfo {
  number: number;
  name: string;
  pdu: string;
  tagline: string;
  description: string;
  protocols: string[];
  devices: string[];
  analogy: string;
  examples: string;
}

const LAYERS: LayerInfo[] = [
  {
    number: 7,
    name: "Application",
    pdu: "Data",
    tagline: "Network services for end-user applications",
    description:
      "The layer closest to the user. It is NOT the application itself — it provides the networking interface that applications use to communicate over a network.",
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "POP3", "IMAP", "DNS"],
    devices: ["Proxy Server", "Application Gateway"],
    analogy: "You tell a waiter what food you want. The waiter is the interface between you and the kitchen.",
    examples: "Chrome requesting a webpage, Outlook sending email, WhatsApp delivering a message.",
  },
  {
    number: 6,
    name: "Presentation",
    pdu: "Data",
    tagline: "The translator of the OSI model",
    description:
      "Converts data into a common format so different systems can understand each other. Handles encryption, decryption, compression and decompression.",
    protocols: ["SSL/TLS", "AES", "JPEG", "PNG", "MPEG", "MP3", "ASCII"],
    devices: ["SSL Accelerator"],
    analogy: "A translator converting a letter into a language the receiver understands — and sealing it so nobody else can read it.",
    examples: "TLS encrypting your HTTPS request, JPEG compressing a photo before upload.",
  },
  {
    number: 5,
    name: "Session",
    pdu: "Data",
    tagline: "Opens, maintains and closes conversations",
    description:
      "Establishes, manages, synchronizes and terminates communication sessions between two devices — like dialing a call, talking, and hanging up.",
    protocols: ["NetBIOS", "RPC", "PPTP", "SOCKS"],
    devices: ["Session Gateway"],
    analogy: "Making a phone call: the connection is established, the conversation is maintained, then the call is terminated.",
    examples: "Keeping you logged into YouTube while you browse multiple videos.",
  },
  {
    number: 4,
    name: "Transport",
    pdu: "Segment",
    tagline: "Reliable end-to-end delivery",
    description:
      "Breaks data into segments, numbers them, and reassembles them at the destination. Provides reliability, error recovery and flow control using port numbers.",
    protocols: ["TCP", "UDP"],
    devices: ["Firewall", "L4 Load Balancer"],
    analogy: "A courier splitting a 5 GB movie into thousands of numbered parcels, then verifying every single one arrived.",
    examples: "TCP for banking and logins (reliable), UDP for live streams and gaming (fast).",
  },
  {
    number: 3,
    name: "Network",
    pdu: "Packet",
    tagline: "Routing across the Internet",
    description:
      "Adds logical addressing (IP addresses) and determines the best path for packets to travel from source to destination across multiple networks.",
    protocols: ["IPv4", "IPv6", "ICMP", "OSPF", "BGP", "RIP"],
    devices: ["Router", "L3 Switch"],
    analogy: "A GPS choosing the fastest highway route from India to the USA.",
    examples: "Your packet hopping through routers in Singapore and Germany to reach a US server.",
  },
  {
    number: 2,
    name: "Data Link",
    pdu: "Frame",
    tagline: "Hop-to-hop delivery inside the local network",
    description:
      "Packages packets into frames with physical MAC addresses, detects transmission errors, and controls access to the shared medium.",
    protocols: ["Ethernet", "PPP", "HDLC", "ARP", "VLAN (802.1Q)"],
    devices: ["Switch", "Bridge"],
    analogy: "The local post office that knows exactly which house on the street each letter goes to.",
    examples: "A switch forwarding a frame to your laptop using its MAC address (00:1A:2B:3C:4D:5E).",
  },
  {
    number: 1,
    name: "Physical",
    pdu: "Bits",
    tagline: "Raw 0s and 1s on the wire",
    description:
      "Transmits raw bits as electrical, optical or radio signals. No packets, no addresses — just voltage levels, light pulses and waves.",
    protocols: ["Ethernet PHY", "USB", "DSL", "Wi-Fi Radio (802.11)", "Bluetooth"],
    devices: ["Hub", "Repeater", "Cables", "Connectors"],
    analogy: "The actual road, asphalt and trucks that physically carry the parcels.",
    examples: "Fiber optic light pulses, Wi-Fi radio waves, electrical signals in a copper cable.",
  },
];

export function OSILayerExplorer() {
  const [selected, setSelected] = useState<number>(7);
  const layer = LAYERS.find((l) => l.number === selected)!;

  return (
    <Card className="bg-card/40 border border-border w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Layers className="w-5 h-5 text-foreground" />
          Interactive OSI Layer Explorer
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm flex items-center gap-1.5">
          <MousePointerClick className="w-4 h-4" />
          Click any layer to reveal its protocols, devices, PDU and a real-world analogy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-5 gap-6">
          {/* Layer Stack */}
          <div className="md:col-span-2 flex flex-col-reverse gap-1.5">
            {LAYERS.slice().reverse().map((l) => (
              <button
                key={l.number}
                onClick={() => setSelected(l.number)}
                className={`flex items-center justify-between border rounded-lg px-3 py-2.5 text-left transition-all duration-300 cursor-pointer ${
                  selected === l.number
                    ? "bg-foreground text-background border-foreground scale-[1.02] shadow-sm"
                    : "bg-background/40 border-border hover:border-foreground/40 hover:bg-muted/30"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-[10px] w-5 h-5 rounded flex items-center justify-center border ${
                      selected === l.number ? "border-background/40" : "border-border"
                    }`}
                  >
                    {l.number}
                  </span>
                  <span className="font-bold text-sm">{l.name}</span>
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-mono ${
                    selected === l.number ? "border-background/40 text-background" : ""
                  }`}
                >
                  {l.pdu}
                </Badge>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="md:col-span-3 border border-border rounded-xl p-5 bg-background/30 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="font-mono text-[10px]">Layer {layer.number}</Badge>
                <Badge variant="outline" className="font-mono text-[10px]">
                  PDU: {layer.pdu}
                </Badge>
              </div>
              <h4 className="text-lg font-black text-foreground">
                {layer.name} Layer
              </h4>
              <p className="text-xs text-muted-foreground italic">{layer.tagline}</p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>

            <div className="space-y-3">
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5" /> Protocols
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {layer.protocols.map((p) => (
                    <Badge key={p} variant="secondary" className="font-mono text-[10px]">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Cable className="w-3.5 h-3.5" /> Devices
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {layer.devices.map((d) => (
                    <Badge key={d} variant="outline" className="font-mono text-[10px]">
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border border-border/70 rounded-lg p-3 bg-muted/10">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Real-World Analogy
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{layer.analogy}</p>
              </div>

              <div className="border border-border/70 rounded-lg p-3 bg-muted/10">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5" /> In Practice
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{layer.examples}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
