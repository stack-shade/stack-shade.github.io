"use client";

import {
  useEffect,
  useMemo,
  useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Globe,
  Layers,
  Play,
  RefreshCw,
  Zap,
} from "lucide-react";

type JourneyStage = {
  id: string;
  number: string;
  title: string;
  question: string;
  summary: string;
  detail: string;
  wire: string;
  tool: string;
};

const STAGES: JourneyStage[] = [
  {
    id: "parse",
    number: "01",
    title: "Parse the URL",
    question: "What did I type?",
    summary: "The browser turns one string into a structured navigation instruction.",
    detail: "Scheme, hostname, port, path, query and fragment have different jobs. The fragment is normally handled by the browser rather than sent as part of the HTTP request.",
    wire: "https://example.com:443/products?id=42#reviews",
    tool: "URL parser / address bar",
  },
  {
    id: "dns",
    number: "02",
    title: "Resolve the name",
    question: "WHERE?",
    summary: "DNS maps the hostname to a record the network stack can use.",
    detail: "Local and recursive caches can make this step nearly invisible. A cache miss may send the resolver through root, TLD and authoritative infrastructure before an address is returned.",
    wire: "example.com → A / AAAA → address",
    tool: "dig +trace example.com",
  },
  {
    id: "route",
    number: "03",
    title: "Reach the endpoint",
    question: "HOW DO WE GET THERE?",
    summary: "The OS sends packets through a local link, router, ISP and upstream networks.",
    detail: "The destination may be a CDN edge, reverse proxy or load balancer rather than the application process. Local delivery can involve ARP or IPv6 neighbour discovery.",
    wire: "device → LAN → router → ISP → transit → edge",
    tool: "traceroute example.com",
  },
  {
    id: "tls",
    number: "04",
    title: "Establish trust + encryption",
    question: "HOW TRUST?",
    summary: "HTTPS negotiates cryptographic parameters and proves the server identity with certificates.",
    detail: "A simplified TLS 1.3 story is ClientHello, ServerHello, certificate/authentication, key schedule and Finished. After the handshake, application data is encrypted.",
    wire: "ClientHello ↔ ServerHello / Certificate ↔ Finished",
    tool: "curl -v https://example.com",
  },
  {
    id: "http",
    number: "05",
    title: "Send the HTTP request",
    question: "WHAT DO I WANT?",
    summary: "The browser describes the resource and context it needs.",
    detail: "Method, target, headers and an optional body become inputs to the server path. HTTP/1.1 is text-oriented; HTTP/2 and HTTP/3 use binary framing.",
    wire: "GET /products?id=42 HTTP/1.1",
    tool: "DevTools → Network",
  },
  {
    id: "server",
    number: "06",
    title: "Edge + app build the answer",
    question: "WHO ANSWERS?",
    summary: "A cache, CDN, proxy, load balancer, application or dependency can terminate the request.",
    detail: "A cache hit may return immediately. A miss can trigger authentication, business logic, cache/database reads, downstream APIs or server-side rendering.",
    wire: "edge → proxy → app → cache / DB → response",
    tool: "server logs + APM + cache headers",
  },
  {
    id: "response",
    number: "07",
    title: "HTML unlocks a waterfall",
    question: "WHAT ELSE IS NEEDED?",
    summary: "The first response can schedule more requests for CSS, JavaScript, images, fonts and APIs.",
    detail: "A fast document response is not the same as a fast usable page. The browser can still be busy downloading and decoding a second wave of resources.",
    wire: "HTML → CSS / JS / images / fonts / API",
    tool: "DevTools request waterfall",
  },
  {
    id: "render",
    number: "08",
    title: "Turn bytes into pixels",
    question: "HOW VISIBLE?",
    summary: "DOM + CSSOM + layout + paint + composite become the pixels on screen.",
    detail: "JavaScript can mutate the DOM, request data, trigger more style/layout work and update the visual scene after initial HTML is visible.",
    wire: "HTML → DOM + CSS → render tree → layout → paint → composite",
    tool: "Performance panel",
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
      aria-label={copied ? "Copied" : "Copy command"}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function StageSvg({ stage }: { stage: string }) {
  if (stage === "parse") {
    const parts = [
      { label: "scheme", value: "https", x: 38, w: 84 },
      { label: "host", value: "example.com", x: 128, w: 160 },
      { label: "port", value: ":443", x: 294, w: 64 },
      { label: "path", value: "/products", x: 364, w: 126 },
      { label: "query", value: "?id=42", x: 496, w: 100 },
      { label: "fragment", value: "#reviews", x: 602, w: 116 },
    ];
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <rect x="12" y="12" width="736" height="266" rx="20" fill="none" stroke="currentColor" opacity=".13" />
        <text x="38" y="54" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          ADDRESS BAR → STRUCTURED NAVIGATION
        </text>
        <rect x="30" y="78" width="700" height="66" rx="16" fill="currentColor" opacity=".055" />
        <text x="48" y="118" fill="currentColor" fontSize="21" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          https://example.com:443/products?id=42#reviews
        </text>
        {parts.map((part) => (
          <g key={part.label}>
            <rect x={part.x} y="172" width={part.w} height="56" rx="12" fill="currentColor" opacity=".06" stroke="currentColor" strokeOpacity=".16" />
            <text x={part.x + 10} y="192" fill="currentColor" opacity=".42" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
              {part.label}
            </text>
            <text x={part.x + 10} y="214" fill="currentColor" fontSize="12" fontWeight="700">
              {part.value}
            </text>
          </g>
        ))}
        <text x="38" y="255" fill="currentColor" opacity=".44" fontSize="11">
          The fragment is a browser-side navigation hint; it is not part of the HTTP target sent to the server.
        </text>
      </svg>
    );
  }

  if (stage === "dns") {
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          DNS HIERARCHY · CACHE CHANGES THE PATH
        </text>
        <g fontFamily="ui-sans-serif, system-ui, sans-serif">
          {[
            ["Browser / OS", "cache?", 40, 92],
            ["Recursive resolver", "cache or ask onward", 250, 92],
            ["Root", "where is .com?", 480, 52],
            [".com TLD", "where is example.com?", 480, 128],
            ["Authoritative", "A / AAAA answer", 480, 204],
          ].map(([title, body, x, y]) => (
            <g key={title}>
              <rect x={x as number} y={y as number} width={title === "Recursive resolver" ? 190 : 228} height="54" rx="14" fill="currentColor" opacity=".055" stroke="currentColor" strokeOpacity=".15" />
              <text x={(x as number) + 14} y={(y as number) + 22} fill="currentColor" fontSize="12" fontWeight="700">{title}</text>
              <text x={(x as number) + 14} y={(y as number) + 40} fill="currentColor" opacity=".45" fontSize="9">{body}</text>
            </g>
          ))}
          <path d="M268 118H480" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M595 106V130" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
          <path d="M595 182V206" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
          <path d="M178 118H228" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
          <circle cx="228" cy="118" r="5" fill="currentColor" opacity=".7" />
          <circle cx="595" cy="130" r="5" fill="currentColor" opacity=".7" />
          <circle cx="595" cy="206" r="5" fill="currentColor" opacity=".7" />
          <text x="36" y="278" fill="currentColor" opacity=".42" fontSize="11">
            TTL controls how long cacheable DNS answers can remain reusable.
          </text>
        </g>
      </svg>
    );
  }

  if (stage === "route") {
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          PACKET PATH · ONE HOP AT A TIME
        </text>
        {[
          ["DEVICE", "10.0.0.x", 48],
          ["LAN / AP", "frame", 184],
          ["ROUTER", "next hop", 320],
          ["ISP / TRANSIT", "many networks", 456],
          ["EDGE / ORIGIN", "destination", 602],
        ].map(([title, body, x], index) => (
          <g key={title as string}>
            <rect x={x as number} y="102" width="112" height="78" rx="16" fill="currentColor" opacity={index === 4 ? ".10" : ".055"} stroke="currentColor" strokeOpacity=".16" />
            <circle cx={(x as number) + 20} cy="126" r="8" fill="currentColor" opacity=".34" />
            <text x={(x as number) + 36} y="130" fill="currentColor" fontSize="10" fontWeight="700">{title}</text>
            <text x={(x as number) + 14} y="155" fill="currentColor" opacity=".44" fontSize="9">{body}</text>
            {index < 4 && <path d={"M" + ((x as number) + 112) + " 141H" + ((x as number) + 132)} stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />}
          </g>
        ))}
        <text x="48" y="218" fill="currentColor" opacity=".43" fontSize="10">IPv4 local delivery may use ARP · IPv6 uses neighbour discovery</text>
        <text x="48" y="246" fill="currentColor" opacity=".43" fontSize="10">The destination may be an edge front door, not the final application process.</text>
      </svg>
    );
  }

  if (stage === "tls") {
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          TLS 1.3 · SIMPLIFIED HANDSHAKE
        </text>
        <line x1="180" y1="74" x2="180" y2="252" stroke="currentColor" strokeOpacity=".12" />
        <line x1="580" y1="74" x2="580" y2="252" stroke="currentColor" strokeOpacity=".12" />
        <text x="120" y="68" fill="currentColor" fontSize="11" fontWeight="700">CLIENT</text>
        <text x="530" y="68" fill="currentColor" fontSize="11" fontWeight="700">SERVER</text>
        <path d="M190 104H570" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" />
        <polygon points="570,104 558,98 558,110" fill="currentColor" opacity=".7" />
        <text x="280" y="97" fill="currentColor" fontSize="10">ClientHello</text>
        <path d="M570 146H190" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" />
        <polygon points="190,146 202,140 202,152" fill="currentColor" opacity=".7" />
        <text x="304" y="140" fill="currentColor" fontSize="10">ServerHello + Certificate</text>
        <path d="M190 188H570" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" />
        <polygon points="570,188 558,182 558,194" fill="currentColor" opacity=".7" />
        <text x="312" y="181" fill="currentColor" fontSize="10">handshake / key schedule</text>
        <path d="M570 230H190" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" />
        <polygon points="190,230 202,224 202,236" fill="currentColor" opacity=".7" />
        <text x="347" y="223" fill="currentColor" fontSize="10">Finished</text>
        <rect x="246" y="248" width="270" height="26" rx="13" fill="currentColor" opacity=".055" />
        <text x="274" y="266" fill="currentColor" opacity=".45" fontSize="9">application data can now use negotiated keys</text>
      </svg>
    );
  }

  if (stage === "http") {
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          REQUEST = METHOD + TARGET + HEADERS + OPTIONAL BODY
        </text>
        <rect x="36" y="72" width="690" height="164" rx="18" fill="currentColor" opacity=".045" stroke="currentColor" strokeOpacity=".14" />
        <text x="56" y="106" fill="currentColor" fontSize="16" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">GET /products?id=42 HTTP/1.1</text>
        <text x="56" y="140" fill="currentColor" opacity=".6" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">Host: example.com</text>
        <text x="56" y="164" fill="currentColor" opacity=".6" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">Accept: text/html</text>
        <text x="56" y="188" fill="currentColor" opacity=".6" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">Accept-Encoding: gzip, br</text>
        <text x="56" y="212" fill="currentColor" opacity=".6" fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">Cookie: session=…</text>
        <text x="36" y="266" fill="currentColor" opacity=".42" fontSize="10">HTTP/2 and HTTP/3 carry the same application semantics using binary framing.</text>
      </svg>
    );
  }

  if (stage === "server") {
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          PRODUCTION REQUEST PATH · EARLY TERMINATION IS NORMAL
        </text>
        <g fontFamily="ui-sans-serif, system-ui, sans-serif">
          {[
            ["CDN", "edge cache", 42, 95],
            ["PROXY", "routing / auth", 188, 95],
            ["LOAD BALANCER", "choose backend", 334, 95],
            ["APP", "business logic", 480, 95],
            ["DB", "persistent state", 626, 95],
          ].map(([title, body, x]) => (
            <g key={title as string}>
              <rect x={x as number} y="95" width="104" height="76" rx="16" fill="currentColor" opacity={title === "CDN" ? ".10" : ".055"} stroke="currentColor" strokeOpacity=".16" />
              <text x={(x as number) + 13} y="124" fill="currentColor" fontSize="11" fontWeight="700">{title}</text>
              <text x={(x as number) + 13} y="148" fill="currentColor" opacity=".42" fontSize="9">{body}</text>
            </g>
          ))}
          <path d="M146 133H188" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
          <path d="M292 133H334" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
          <path d="M438 133H480" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
          <path d="M584 133H626" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
          <rect x="74" y="208" width="222" height="42" rx="14" fill="currentColor" opacity=".05" />
          <text x="92" y="233" fill="currentColor" opacity=".48" fontSize="10">cache hit → response can stop here</text>
          <rect x="382" y="208" width="300" height="42" rx="14" fill="currentColor" opacity=".05" />
          <text x="400" y="233" fill="currentColor" opacity=".48" fontSize="10">cache miss → app → dependencies → response</text>
        </g>
      </svg>
    );
  }

  if (stage === "response") {
    return (
      <svg viewBox="0 0 760 290" className="h-auto w-full">
        <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          ONE NAVIGATION · MANY RESOURCE REQUESTS
        </text>
        <text x="48" y="76" fill="currentColor" opacity=".48" fontSize="9">RESOURCE</text>
        <text x="256" y="76" fill="currentColor" opacity=".48" fontSize="9">TIMELINE</text>
        {[
          ["document", 88, 210],
          ["style.css", 124, 152],
          ["app.js", 154, 246],
          ["hero.webp", 186, 178],
          ["font.woff2", 216, 122],
          ["api/products", 246, 202],
        ].map(([name, y, width]) => (
          <g key={name as string}>
            <text x="48" y={(y as number) + 13} fill="currentColor" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{name}</text>
            <rect x="256" y={y as number} width="430" height="24" rx="8" fill="currentColor" opacity=".045" />
            <rect x={300 + ((y as number) % 70)} y={y as number} width={width as number} height="24" rx="8" fill="currentColor" opacity={name === "document" ? ".13" : ".075"} />
          </g>
        ))}
        <text x="48" y="284" fill="currentColor" opacity=".42" fontSize="10">The waterfall tells you what the browser had to fetch after the first HTML response.</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 760 290" className="h-auto w-full">
      <text x="36" y="42" fill="currentColor" opacity=".42" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        BROWSER RENDER PIPELINE
      </text>
      {[
        ["HTML", "DOM", 42],
        ["CSS", "CSSOM", 174],
        ["DOM + CSSOM", "Render tree", 306],
        ["Geometry", "Layout", 438],
        ["Pixels", "Paint → Composite", 570],
      ].map(([from, to, x], index) => (
        <g key={to as string}>
          <rect x={x as number} y="96" width={index === 2 ? 118 : index === 4 ? 150 : 108} height="76" rx="16" fill="currentColor" opacity={index === 4 ? ".10" : ".055"} stroke="currentColor" strokeOpacity=".16" />
          <text x={(x as number) + 13} y="124" fill="currentColor" opacity=".42" fontSize="9">{from}</text>
          <text x={(x as number) + 13} y="149" fill="currentColor" fontSize="12" fontWeight="700">{to}</text>
          {index < 4 && <path d={"M" + ((x as number) + (index === 2 ? 118 : 108)) + " 134H" + ((x as number) + (index === 2 ? 132 : 132))} stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />}
        </g>
      ))}
      <text x="42" y="214" fill="currentColor" opacity=".42" fontSize="10">JavaScript can mutate the DOM, request JSON and trigger another render pass.</text>
      <text x="42" y="242" fill="currentColor" opacity=".42" fontSize="10">A page becomes visible progressively; “response complete” and “visually complete” differ.</text>
    </svg>
  );
}

function ProtocolCard({
  active,
  title,
  eyebrow,
  detail,
  transport,
}: {
  active: boolean;
  title: string;
  eyebrow: string;
  detail: string;
  transport: string;
}) {
  return (
    <div className={"rounded-2xl border p-4 transition " + (active ? "border-foreground bg-foreground/[0.045]" : "border-border bg-card/20")}>
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</div>
      <div className="mt-2 text-sm font-bold text-foreground">{title}</div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
      <div className="mt-3 rounded-lg border border-border bg-background/30 px-2.5 py-2 font-mono text-[9px] text-muted-foreground">{transport}</div>
    </div>
  );
}

export function ProtocolComparison() {
  const [active, setActive] = useState(0);
  const protocols = [
    {
      title: "HTTP/1.1",
      eyebrow: "TEXT + TCP",
      detail: "Persistent TCP connections reduce repeated setup, but the protocol still revolves around ordered HTTP/1.1 message exchange.",
      transport: "HTTP/1.1 → TCP → TLS",
    },
    {
      title: "HTTP/2",
      eyebrow: "MULTIPLEXED + TCP",
      detail: "Multiple streams can share one connection, using binary framing and header compression while retaining TCP as the transport.",
      transport: "HTTP/2 → TCP → TLS",
    },
    {
      title: "HTTP/3",
      eyebrow: "QUIC + UDP",
      detail: "HTTP semantics run over QUIC. Streams are independent at the transport layer and the connection can support migration between network paths.",
      transport: "HTTP/3 → QUIC → UDP → IP",
    },
  ];

  return (
    <section className="not-prose my-10 rounded-3xl border border-border bg-card/10 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Protocol microscope</span>
          </div>
          <h3 className="mt-2 text-xl font-black tracking-tight text-foreground">Same intent. Different transport machinery.</h3>
          <p className="mt-2 max-w-2xl text-xs leading-6 text-muted-foreground">
            Tap a version to see what changes beneath the HTTP semantics.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background/30 px-3 py-2 font-mono text-[9px] text-muted-foreground">
          {protocols[active].transport}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {protocols.map((protocol, index) => (
          <button
            key={protocol.title}
            type="button"
            onClick={() => setActive(index)}
            className="text-left"
            aria-pressed={active === index}
          >
            <ProtocolCard
              active={active === index}
              title={protocol.title}
              eyebrow={protocol.eyebrow}
              detail={protocol.detail}
              transport={protocol.transport}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export function DebugPlaybook() {
  const commands = [
    ["DNS", "dig example.com", "See the DNS answer and TTL-related details."],
    ["PATH", "traceroute example.com", "Inspect the observable hop sequence toward the destination."],
    ["HTTP", "curl -I https://example.com", "Inspect status code and response headers without downloading the full body."],
    ["TLS", "curl -v https://example.com", "Verbose connection output helps expose handshake and protocol details."],
  ];

  return (
    <section className="not-prose my-10 rounded-3xl border border-border bg-card/10 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <Zap className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Hands-on debug lab</div>
          <h3 className="mt-2 text-xl font-black tracking-tight text-foreground">Stop guessing. Observe the layer.</h3>
          <p className="mt-2 max-w-2xl text-xs leading-6 text-muted-foreground">
            Run these locally, then compare what each tool can actually prove. No single
            command sees the entire journey.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {commands.map(([layer, command, detail]) => (
          <div key={layer} className="rounded-2xl border border-border bg-background/35 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{layer}</div>
              <CopyButton value={command} />
            </div>
            <code className="mt-3 block overflow-x-auto rounded-xl border border-border bg-muted/20 px-3 py-3 text-[11px] text-foreground">
              {command}
            </code>
            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-muted/10 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
          <AlertTriangle className="h-3.5 w-3.5" />
          What a tool does not tell you
        </div>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          A successful DNS lookup does not prove TLS works. A successful TLS handshake
          does not prove the application is healthy. A 200 response does not prove the
          browser is finished rendering. Debug by layer.
        </p>
      </div>
    </section>
  );
}

export function URLJourneyLab() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        if (current >= STAGES.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1800);
    return () => window.clearInterval(id);
  }, [playing]);

  const stage = STAGES[active];
  const progress = ((active + 1) / STAGES.length) * 100;

  const statCards = useMemo(
    () => [
      ["01", "WHERE?", "DNS / endpoint"],
      ["02", "HOW?", "TCP / QUIC"],
      ["03", "TRUST?", "TLS / identity"],
      ["04", "WHAT?", "HTTP / resource"],
      ["05", "WHO?", "edge / app / DB"],
      ["06", "VISIBLE?", "render pipeline"],
    ],
    [],
  );

  function move(next: number) {
    setPlaying(false);
    setActive(Math.max(0, Math.min(STAGES.length - 1, next)));
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-3xl border border-border bg-card/15 shadow-[0_1.5rem_5rem_rgba(0,0,0,.12)]">
      <div className="border-b border-border bg-muted/[0.08] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Interactive article artifact</span>
            </div>
            <h3 className="mt-2 max-w-3xl text-xl font-black tracking-tight text-foreground sm:text-2xl">
              Replay the request: <span className="font-mono text-[0.8em]">URL → pixels</span>
            </h3>
            <p className="mt-2 max-w-3xl text-xs leading-6 text-muted-foreground">
              Move through the pipeline manually or press play. Every card answers one
              question a browser must solve before the page is useful.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setPlaying((value) => !value);
              if (active === STAGES.length - 1) setActive(0);
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-foreground bg-foreground px-3.5 py-2.5 text-xs font-bold text-background transition hover:opacity-90"
          >
            {playing ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            {playing ? "Playing journey" : "Replay journey"}
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background/35">
          <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
            {STAGES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => move(index)}
                className={"flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2.5 py-2 text-left transition sm:min-w-[7rem] " + (active === index ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground")}
                aria-current={active === index ? "step" : undefined}
              >
                <span className="font-mono text-[8px]">{item.number}</span>
                <span className="truncate text-[10px] font-semibold">{item.title}</span>
              </button>
            ))}
          </div>
          <div className="h-1 bg-muted/20">
            <div className="h-full bg-foreground transition-all duration-500" style={{ width: progress + "%" }} />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-background/30">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-border font-mono text-[9px]">{stage.number}</span>
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-foreground">{stage.title}</div>
                  <div className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground">{stage.question}</div>
                </div>
              </div>
              <div className="hidden rounded-lg border border-border px-2 py-1 font-mono text-[8px] text-muted-foreground sm:block">
                {stage.tool}
              </div>
            </div>
            <div className="overflow-x-auto p-3 sm:p-5">
              <div className="min-w-[620px]">
                <StageSvg stage={stage.id} />
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-muted/[0.06] p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">At this checkpoint</div>
            <div className="mt-3 text-base font-bold text-foreground">{stage.question}</div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{stage.summary}</p>

            <div className="mt-4 rounded-xl border border-border bg-background/35 p-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">What is actually moving?</div>
              <code className="mt-2 block break-words text-[10px] leading-5 text-foreground">{stage.wire}</code>
            </div>

            <div className="mt-3 rounded-xl border border-border bg-background/35 p-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">The mechanism</div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{stage.detail}</p>
            </div>
          </aside>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map(([number, title, detail]) => (
            <div key={number} className="rounded-xl border border-border bg-background/25 px-3 py-3">
              <div className="font-mono text-[8px] text-muted-foreground">{number}</div>
              <div className="mt-1 text-[10px] font-bold text-foreground">{title}</div>
              <div className="mt-1 text-[9px] text-muted-foreground">{detail}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => move(active - 1)}
            disabled={active === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-[10px] font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </button>

          <span className="font-mono text-[9px] text-muted-foreground">
            {active + 1} / {STAGES.length}
          </span>

          <button
            type="button"
            onClick={() => move(active + 1)}
            disabled={active === STAGES.length - 1}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-[10px] font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default URLJourneyLab;
