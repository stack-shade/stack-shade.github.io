import React from "react";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  BookOpen,
  Network,
  Layers,
  Globe,
  Lock,
  Phone,
  Route,
  Cable,
  Radio,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OSILayerExplorer } from "@/components/osi-layer-explorer";
import { EncapsulationSimulator } from "@/components/encapsulation-simulator";
import { TcpHandshakeSimulator } from "@/components/tcp-handshake-simulator";
import { OSIvsTCPIP } from "@/components/osi-vs-tcpip";
import { OSIQuiz } from "@/components/osi-quiz";

export const metadata: Metadata = {
  title: "OSI Model Explained | 7 Layers of Networking for Beginners (2026)",
  description:
    "Learn the OSI model's 7 layers with interactive diagrams, an encapsulation simulator, an animated TCP handshake, OSI vs TCP/IP mapping, and a practice quiz. Perfect for CCNA, GATE, and interviews.",
  alternates: {
    canonical: "https://stack-shade.github.io/blog/osi-model-explained",
  },
  openGraph: {
    title: "OSI Model Explained | 7 Layers of Networking for Beginners (2026) | StackShade Blog",
    description:
      "Learn the OSI model's 7 layers with interactive diagrams, an encapsulation simulator, an animated TCP handshake, OSI vs TCP/IP mapping, and a practice quiz.",
    url: "https://stack-shade.github.io/blog/osi-model-explained",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/blog/osi-model-banner.svg",
        width: 1200,
        height: 630,
        alt: "OSI Model 7 Layers Diagram",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2026-07-25T00:00:00.000Z",
    authors: ["Shaswat Raj"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI Model Explained | 7 Layers of Networking for Beginners (2026) | StackShade Blog",
    description:
      "Learn the OSI model's 7 layers with interactive diagrams, an encapsulation simulator, an animated TCP handshake, OSI vs TCP/IP mapping, and a practice quiz.",
    images: ["https://stack-shade.github.io/blog/osi-model-banner.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    q: "Why does the OSI Model have 7 layers?",
    a: "To divide networking into modular functions. Each layer does one job and talks only to its neighbors, which makes systems easier to design, maintain, standardize and troubleshoot.",
  },
  {
    q: "Which layer uses IP addresses?",
    a: "The Network layer (Layer 3). IP addresses are logical addresses used for routing packets across networks.",
  },
  {
    q: "Which layer uses MAC addresses?",
    a: "The Data Link layer (Layer 2). MAC addresses are physical addresses burned into network cards, used for delivery inside the local network.",
  },
  {
    q: "Which layer uses port numbers?",
    a: "The Transport layer (Layer 4). Ports identify which application should receive the data — HTTP:80, HTTPS:443, SSH:22, DNS:53.",
  },
  {
    q: "Which layer handles encryption?",
    a: "The Presentation layer (Layer 6) — the translator layer responsible for encryption, decryption, compression and data formatting.",
  },
  {
    q: "Which layer is responsible for routing?",
    a: "The Network layer (Layer 3). Routers examine destination IP addresses and choose the best path.",
  },
  {
    q: "Which layer provides reliability?",
    a: "The Transport layer (Layer 4), primarily through TCP's acknowledgements, retransmissions and sequence numbers.",
  },
  {
    q: "What device works at Layer 3? Layer 2? Layer 1?",
    a: "Router at Layer 3, Switch at Layer 2, Hub and Repeater at Layer 1.",
  },
];

export default function ArticlePage() {
  return (
    <div className="selection:bg-foreground/20 selection:text-foreground relative overflow-hidden">
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "OSI Model Explained | 7 Layers of Networking for Beginners (2026)",
            description:
              "Learn the OSI model's 7 layers with interactive diagrams, an encapsulation simulator, an animated TCP handshake, OSI vs TCP/IP mapping, and a practice quiz.",
            image: "https://stack-shade.github.io/blog/osi-model-banner.svg",
            datePublished: "2026-07-25T00:00:00.000Z",
            author: {
              "@type": "Person",
              name: "Shaswat Raj",
              url: "https://sh20raj.github.io/",
            },
            publisher: {
              "@type": "Organization",
              name: "StackShade",
              logo: {
                "@type": "ImageObject",
                url: "https://stack-shade.github.io/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://stack-shade.github.io/blog/osi-model-explained",
            },
          }),
        }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back Link */}
        <div className="mb-10">
          <a
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Articles
          </a>
        </div>

        <article className="space-y-12">
          {/* Header */}
          <header className="space-y-6">
            <Badge
              variant="outline"
              className="border-border text-foreground uppercase text-[10px] tracking-wider font-semibold"
            >
              Networking Fundamentals
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              OSI Model Explained: 7 Layers of Networking for Beginners
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono border-y border-border/60 py-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                Shaswat Raj
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                July 25, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                15 min read
              </span>
            </div>
          </header>

          {/* Banner */}
          <div className="border border-border rounded-2xl overflow-hidden aspect-video relative bg-muted/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/osi-model-banner.svg"
              alt="OSI Model 7 Layers Diagram"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Article Content */}
          <div className="space-y-10 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              The <strong>OSI (Open Systems Interconnection) Model</strong> is a conceptual framework that explains
              how data travels from one device to another over a network. Every message you send — a WhatsApp text,
              an email, a YouTube video, a webpage request — passes through these seven layers before reaching its
              destination.
            </p>
            <p>
              Understanding the OSI model is one of the most important networking concepts because it explains how
              the Internet works, helps you troubleshoot network issues, and shows up constantly in interviews and
              certifications like <strong>CCNA, CompTIA Network+, GATE, and university exams</strong>. This guide
              comes with interactive explorers, simulators and a quiz — treat it like a mini networking course.
            </p>

            <hr className="border-border/60" />

            {/* What & Why */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-foreground" />
                What is the OSI Model & Why Do We Need It?
              </h2>
              <p>
                The OSI Model was developed by the <strong>International Organization for Standardization (ISO)</strong> in
                1984 to standardize communication between different computer systems, regardless of manufacturer or
                operating system.
              </p>
              <p>
                Imagine Cisco, Microsoft, Apple, Samsung and Linux all invented their own incompatible ways to
                communicate — a Windows PC could never talk to a Linux server. The OSI model solves this by defining
                common standards, dividing communication into <strong>7 independent layers</strong> where each layer
                performs one specific job and communicates only with the layers directly above and below it.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <Card className="bg-card/20 border-border">
                  <CardHeader>
                    <CardTitle className="text-base font-bold">The Parcel Analogy</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-1.5 text-muted-foreground">
                    <p>Networking works like delivering a parcel:</p>
                    <p className="font-mono text-[11px] leading-relaxed">
                      Write message → Pack it → Label it → Transport it → Deliver it → Unpack it → Read it
                    </p>
                    <p>Each step is independent — exactly how OSI layers behave.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/20 border-border">
                  <CardHeader>
                    <CardTitle className="text-base font-bold">Benefits of a Layered Model</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Standardization of communication</li>
                      <li>Easier troubleshooting (isolate by layer)</li>
                      <li>Vendor independence & interoperability</li>
                      <li>Modular design — change one layer, keep the rest</li>
                      <li>Easier protocol development</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* 7 Layers Overview + Explorer */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Layers className="w-6 h-6 text-foreground" />
                The Seven Layers — Interactive Explorer
              </h2>
              <p>
                The layers are numbered from 7 (closest to the user) down to 1 (closest to the wire). Data moves
                from Layer 7 down to Layer 1 on the sender, and from Layer 1 up to Layer 7 on the receiver.
              </p>

              <div className="border border-border rounded-xl p-4 bg-muted/5 space-y-3">
                <h4 className="text-sm font-bold text-foreground">Memory Mnemonics</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="border border-border/70 rounded-lg p-3 bg-background/30">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Top → Bottom (7→1)</span>
                    <p className="font-bold text-foreground mt-1">All People Seem To Need Data Processing</p>
                  </div>
                  <div className="border border-border/70 rounded-lg p-3 bg-background/30">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Bottom → Top (1→7)</span>
                    <p className="font-bold text-foreground mt-1">Please Do Not Throw Sausage Pizza Away</p>
                  </div>
                </div>
              </div>

              <OSILayerExplorer />
            </section>

            <hr className="border-border/60" />

            {/* Data Flow */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Globe className="w-6 h-6 text-foreground" />
                How Data Flows: A Real Example
              </h2>
              <p>
                Suppose you open Chrome and visit <code>https://google.com</code>. Your request travels from Layer 7
                down to Layer 1, crosses the physical medium, then climbs from Layer 1 up to Layer 7 on Google&apos;s
                server. This is called <strong>Encapsulation → Transmission → Decapsulation</strong>.
              </p>

              {/* Sender / Receiver visual */}
              <div className="border border-border/80 rounded-xl p-5 bg-muted/5">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-6 items-center">
                  {/* Sender stack */}
                  <div className="space-y-1">
                    <p className="text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Sender ↓
                    </p>
                    {["Application", "Presentation", "Session", "Transport", "Network", "Data Link", "Physical"].map(
                      (l, i) => (
                        <div
                          key={l}
                          className={`border rounded-md px-2 py-1.5 text-center text-[10px] sm:text-xs font-semibold ${
                            i === 6
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-background/40 text-foreground"
                          }`}
                        >
                          {7 - i} · {l}
                        </div>
                      )
                    )}
                  </div>

                  {/* Medium */}
                  <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                    <span className="text-[9px] font-mono uppercase tracking-wider hidden sm:block">Physical Medium</span>
                    <span className="h-px w-10 sm:w-24 bg-foreground" />
                    <Radio className="w-4 h-4 text-foreground" />
                    <span className="font-mono text-[9px]">bits · signals</span>
                    <span className="h-px w-10 sm:w-24 bg-foreground" />
                    <span className="text-[9px] font-mono text-center">cable / fiber / Wi-Fi</span>
                  </div>

                  {/* Receiver stack */}
                  <div className="space-y-1">
                    <p className="text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Receiver ↑
                    </p>
                    {["Physical", "Data Link", "Network", "Transport", "Session", "Presentation", "Application"].map(
                      (l, i) => (
                        <div
                          key={l}
                          className={`border rounded-md px-2 py-1.5 text-center text-[10px] sm:text-xs font-semibold ${
                            i === 0
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-background/40 text-foreground"
                          }`}
                        >
                          {i + 1} · {l}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Layer by layer */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Network className="w-6 h-6 text-foreground" />
                Layer-by-Layer Deep Dive
              </h2>

              {/* L7 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L7</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Application Layer
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  The layer closest to the user — it provides network services to software applications. Important:
                  the Application Layer is <strong>NOT</strong> the application itself; it&apos;s the networking
                  interface apps use. Chrome, Outlook, Gmail and WhatsApp all talk through it.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["HTTP", "HTTPS", "FTP", "SMTP", "POP3", "IMAP", "DNS"].map((p) => (
                    <Badge key={p} variant="secondary" className="font-mono text-[10px]">{p}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Analogy: you tell a waiter what food you want — the waiter is the Application Layer.
                </p>
              </div>

              {/* L6 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L6</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Presentation Layer — The Translator
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  Different systems store data differently. This layer converts data into a common format and handles
                  encryption, decryption, compression and decompression. Without it, a Windows computer might not
                  understand data from another system.
                </p>
                <div className="grid sm:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="border border-border/70 rounded-lg p-2.5 bg-muted/10">
                    Plain Text → AES Encryption → Encrypted Data
                  </div>
                  <div className="border border-border/70 rounded-lg p-2.5 bg-muted/10">
                    Image → JPEG Compression → Smaller File
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["SSL/TLS", "JPEG", "PNG", "GIF", "MP3", "MP4", "MPEG"].map((p) => (
                    <Badge key={p} variant="secondary" className="font-mono text-[10px]">{p}</Badge>
                  ))}
                </div>
              </div>

              {/* L5 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L5</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Session Layer
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  Establishes, maintains, synchronizes and terminates communication sessions — exactly like a phone
                  call: connection established → conversation maintained → connection closed.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["NetBIOS", "RPC", "PPTP"].map((p) => (
                    <Badge key={p} variant="secondary" className="font-mono text-[10px]">{p}</Badge>
                  ))}
                </div>
              </div>

              {/* L4 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L4</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Transport Layer — End-to-End Delivery
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  One of the most important layers. Sending a 5 GB movie? The Transport layer divides it into
                  thousands of segments and the receiver reassembles them. It owns reliability, error recovery, flow
                  control, segmentation and reassembly.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="border border-border/70 rounded-lg p-3 bg-muted/10">
                    <h4 className="font-bold text-foreground text-xs mb-1">TCP — Reliable</h4>
                    <p className="text-[11px]">
                      Connection-oriented, acknowledgements, guaranteed delivery. Used by banking, logins, email and
                      file downloads.
                    </p>
                  </div>
                  <div className="border border-border/70 rounded-lg p-3 bg-muted/10">
                    <h4 className="font-bold text-foreground text-xs mb-1">UDP — Fast</h4>
                    <p className="text-[11px]">
                      Connectionless, no acknowledgement, no delivery guarantee. Used by live streaming, video calls,
                      gaming and DNS queries.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["HTTP :80", "HTTPS :443", "FTP :21", "SSH :22", "DNS :53"].map((p) => (
                    <Badge key={p} variant="outline" className="font-mono text-[10px]">{p}</Badge>
                  ))}
                </div>
              </div>

              {/* L3 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L3</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <Route className="w-4 h-4" /> Network Layer — Routing
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  Finds the best path across networks using logical addressing. If data must travel from India to the
                  USA, the Network layer decides the route. Uses IP addresses like{" "}
                  <code>192.168.1.20</code>. Devices: <strong>routers</strong>.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["IPv4", "IPv6", "ICMP", "OSPF", "RIP", "BGP"].map((p) => (
                    <Badge key={p} variant="secondary" className="font-mono text-[10px]">{p}</Badge>
                  ))}
                </div>
              </div>

              {/* L2 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L2</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <Cable className="w-4 h-4" /> Data Link Layer — Local Delivery
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  Handles communication inside the local network using permanently assigned MAC addresses like{" "}
                  <code>00:1A:2B:3C:4D:5E</code>. Responsible for framing, error detection, physical addressing and
                  media access control. Devices: <strong>switches and bridges</strong>.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Ethernet", "PPP", "HDLC"].map((p) => (
                    <Badge key={p} variant="secondary" className="font-mono text-[10px]">{p}</Badge>
                  ))}
                </div>
              </div>

              {/* L1 */}
              <div className="border border-border rounded-xl p-5 bg-background/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-[10px]">L1</Badge>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <Radio className="w-4 h-4" /> Physical Layer — Raw Bits
                  </h3>
                </div>
                <p className="text-xs sm:text-sm">
                  The lowest layer: transmits raw bits —{" "}
                  <code className="font-mono text-xs">0 1 0 1 1 0</code> — as electrical, optical or radio signals.
                  No packets, no IP addresses. Media includes Ethernet cable, fiber optics, Wi-Fi radio waves,
                  Bluetooth and USB. Devices: <strong>hubs, repeaters, cables, connectors</strong>.
                </p>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Encapsulation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Layers className="w-6 h-6 text-foreground" />
                Encapsulation & Decapsulation
              </h2>
              <p>
                As data moves downward through the layers, each layer adds its own header (and sometimes a trailer) —
                this is <strong>encapsulation</strong>. At the receiver, headers are stripped off one by one in
                reverse — <strong>decapsulation</strong>. Each stage of data has its own name, called a{" "}
                <strong>PDU (Protocol Data Unit)</strong>.
              </p>

              <EncapsulationSimulator />

              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 font-bold text-foreground">Layer</th>
                      <th className="text-left p-3 font-bold text-foreground">PDU</th>
                      <th className="text-left p-3 font-bold text-foreground">What Gets Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr><td className="p-3">Application / Presentation / Session</td><td className="p-3 font-mono">Data</td><td className="p-3">—</td></tr>
                    <tr><td className="p-3">Transport</td><td className="p-3 font-mono">Segment (TCP) / Datagram (UDP)</td><td className="p-3">Ports, sequence numbers, checksum</td></tr>
                    <tr><td className="p-3">Network</td><td className="p-3 font-mono">Packet</td><td className="p-3">Source & destination IP</td></tr>
                    <tr><td className="p-3">Data Link</td><td className="p-3 font-mono">Frame</td><td className="p-3">Source & destination MAC + FCS trailer</td></tr>
                    <tr><td className="p-3">Physical</td><td className="p-3 font-mono">Bits</td><td className="p-3">Signals on the medium</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Devices */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Cable className="w-6 h-6 text-foreground" />
                Devices at Each Layer
              </h2>
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 font-bold text-foreground">Layer</th>
                      <th className="text-left p-3 font-bold text-foreground">Devices</th>
                      <th className="text-left p-3 font-bold text-foreground">Why There</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr><td className="p-3">Application</td><td className="p-3 font-mono">Proxy Server</td><td className="p-3">Understands full HTTP requests</td></tr>
                    <tr><td className="p-3">Presentation</td><td className="p-3 font-mono">SSL Accelerator</td><td className="p-3">Offloads encryption work</td></tr>
                    <tr><td className="p-3">Session</td><td className="p-3 font-mono">Gateway</td><td className="p-3">Manages sessions between systems</td></tr>
                    <tr><td className="p-3">Transport</td><td className="p-3 font-mono">Firewall</td><td className="p-3">Filters by port & connection state</td></tr>
                    <tr><td className="p-3">Network</td><td className="p-3 font-mono">Router</td><td className="p-3">Routes by IP address</td></tr>
                    <tr><td className="p-3">Data Link</td><td className="p-3 font-mono">Switch, Bridge</td><td className="p-3">Forwards frames by MAC address</td></tr>
                    <tr><td className="p-3">Physical</td><td className="p-3 font-mono">Hub, Repeater</td><td className="p-3">Regenerates raw signals</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* OSI vs TCP/IP */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Network className="w-6 h-6 text-foreground" />
                OSI vs TCP/IP Model
              </h2>
              <p>
                The OSI model is the <strong>theoretical</strong> 7-layer teaching model. The modern Internet actually
                runs on the <strong>TCP/IP model</strong>, which collapses those seven layers into four practical ones.
              </p>

              <OSIvsTCPIP />

              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 font-bold text-foreground">OSI Model</th>
                      <th className="text-left p-3 font-bold text-foreground">TCP/IP Model</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr><td className="p-3">7 layers</td><td className="p-3">4 layers</td></tr>
                    <tr><td className="p-3">Theoretical reference model</td><td className="p-3">Practical, implemented model</td></tr>
                    <tr><td className="p-3">ISO standard (1984)</td><td className="p-3">Internet standard (ARPANET)</td></tr>
                    <tr><td className="p-3">Used for learning & troubleshooting</td><td className="p-3">Used in real networks today</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* TCP Handshake */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Phone className="w-6 h-6 text-foreground" />
                Before Data Flows: The TCP Three-Way Handshake
              </h2>
              <p>
                Before your browser sends a single HTTP request, the Transport layer opens a reliable connection with
                a three-message exchange: <strong>SYN → SYN-ACK → ACK</strong>. Both sides agree on starting sequence
                numbers so lost or reordered segments can be detected and fixed later.
              </p>

              <TcpHandshakeSimulator />
            </section>

            <hr className="border-border/60" />

            {/* Webpage walkthrough */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Globe className="w-6 h-6 text-foreground" />
                How a Webpage Loads — Full OSI Walkthrough
              </h2>
              <p>You type <code>www.youtube.com</code> and press Enter. Here&apos;s the complete journey:</p>

              <div className="space-y-2.5">
                {[
                  ["7 · Application", "Your browser creates an HTTP/HTTPS request. DNS resolves youtube.com to an IP address first."],
                  ["6 · Presentation", "The request is encrypted using TLS so nobody on the path can read it."],
                  ["5 · Session", "A communication session with YouTube's server is established and maintained."],
                  ["4 · Transport", "TCP performs the three-way handshake, then divides the request into reliably-delivered segments (port 443)."],
                  ["3 · Network", "Each segment gets source and destination IP addresses; routers choose the best path across the Internet."],
                  ["2 · Data Link", "Frames are built with MAC addresses for hop-to-hop delivery inside each local network."],
                  ["1 · Physical", "Frames become electrical, optical or wireless signals and physically travel the medium."],
                ].map(([layer, desc]) => (
                  <div key={layer} className="border border-border rounded-lg p-3.5 bg-background/25 flex gap-3 items-start">
                    <Badge variant="outline" className="font-mono text-[10px] shrink-0 mt-0.5">{layer}</Badge>
                    <p className="text-xs sm:text-sm">{desc}</p>
                  </div>
                ))}
              </div>

              <p>
                The receiving server then performs the exact reverse — decapsulating from Layer 1 up to Layer 7,
                reconstructing your original request, processing it, and sending the webpage back through the same
                pipeline.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Analogy table */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-foreground" />
                The Letter-Delivery Analogy
              </h2>
              <div className="overflow-x-auto border border-border rounded-xl">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 font-bold text-foreground">Real World</th>
                      <th className="text-left p-3 font-bold text-foreground">OSI Layer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr><td className="p-3">Write the letter</td><td className="p-3 font-mono">Application</td></tr>
                    <tr><td className="p-3">Translate the language</td><td className="p-3 font-mono">Presentation</td></tr>
                    <tr><td className="p-3">Seal the envelope</td><td className="p-3 font-mono">Session</td></tr>
                    <tr><td className="p-3">Courier service</td><td className="p-3 font-mono">Transport</td></tr>
                    <tr><td className="p-3">Highway route</td><td className="p-3 font-mono">Network</td></tr>
                    <tr><td className="p-3">Local post office</td><td className="p-3 font-mono">Data Link</td></tr>
                    <tr><td className="p-3">Road / cable</td><td className="p-3 font-mono">Physical</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Troubleshooting */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-foreground" />
                Troubleshooting by Layer (Bottom-Up)
              </h2>
              <p>
                The OSI model&apos;s superpower is structured troubleshooting. Pros debug bottom-up, eliminating one
                layer at a time:
              </p>
              <div className="space-y-2.5">
                {[
                  ["L1 · Physical", "Is the cable plugged in? Wi-Fi on? Any link lights?", "No signal at all"],
                  ["L2 · Data Link", "Is the NIC working? Connected to the right switch/VLAN?", "Link up, but no local connectivity"],
                  ["L3 · Network", "Do you have an IP? Can you ping the gateway? ping 8.8.8.8?", "Local network fine, no Internet"],
                  ["L4 · Transport", "Is a firewall blocking the port? Is the service listening on 443?", "IP works, specific app blocked"],
                  ["L7 · Application", "Does DNS resolve? Is the app configured correctly?", "ping 8.8.8.8 works, google.com doesn't"],
                ].map(([layer, checks, symptom]) => (
                  <div key={layer} className="border border-border rounded-lg p-3.5 bg-background/25">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono text-[10px]">{layer}</Badge>
                      <span className="text-[11px] font-mono text-muted-foreground">Symptom: {symptom}</span>
                    </div>
                    <p className="text-xs sm:text-sm">{checks}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Interview questions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-foreground" />
                Common Interview Questions
              </h2>
              <div className="space-y-2.5">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group border border-border rounded-lg bg-background/25 open:bg-muted/10 transition-colors"
                  >
                    <summary className="cursor-pointer list-none p-3.5 font-bold text-foreground text-xs sm:text-sm flex items-center justify-between gap-3">
                      {f.q}
                      <span className="text-muted-foreground group-open:rotate-45 transition-transform text-base leading-none">+</span>
                    </summary>
                    <p className="px-3.5 pb-3.5 text-xs sm:text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Quiz */}
            <OSIQuiz />

            <hr className="border-border/60" />

            {/* Takeaways */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-foreground" />
                Key Takeaways
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                <li>The OSI Model is a <strong>7-layer conceptual framework</strong> (ISO, 1984) that standardizes network communication.</li>
                <li>Each layer has <strong>one specific responsibility</strong> and talks only to its adjacent layers.</li>
                <li>Data flows <strong>Layer 7 → Layer 1</strong> when sending (encapsulation) and <strong>Layer 1 → Layer 7</strong> when receiving (decapsulation).</li>
                <li><strong>Layer 4 (Transport)</strong> gives reliable delivery via TCP or fast delivery via UDP — identified by port numbers.</li>
                <li><strong>Layer 3 (Network)</strong> routes packets across the Internet using IP addresses; routers live here.</li>
                <li><strong>Layer 2 (Data Link)</strong> handles local delivery using MAC addresses; switches live here.</li>
                <li><strong>Layer 1 (Physical)</strong> transmits raw bits over cables, fiber or radio.</li>
                <li>PDUs transform as data descends: <strong>Data → Segment → Packet → Frame → Bits</strong>.</li>
                <li>OSI is for <strong>learning and troubleshooting</strong>; the 4-layer <strong>TCP/IP model</strong> is what the real Internet runs on.</li>
              </ul>
              <p>
                This foundation unlocks the advanced topics: routing protocols, switching, VLANs, firewalls, DNS,
                VPNs, cloud networking and network security.
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
