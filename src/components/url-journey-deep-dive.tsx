export function URLJourneyDeepDive() {
  return (
    <>
      <section>
        <h2>19. 🧭 A More Accurate Mental Model: A Navigation Is Not One Request</h2>
        <p>It is tempting to imagine that opening a website is simply one request from a browser to a server. A modern navigation is closer to a cascade of dependent operations: URL parsing, cache checks, DNS, local networking, routing, connection setup, TLS, HTTP, edge infrastructure, application work, and finally browser rendering.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Navigation
│
├── URL parsing
├── Browser / OS cache checks
├── DNS resolution
├── Local network + routing
├── TCP + TLS or QUIC
├── HTTP request
├── CDN / proxy / load balancer
├── Application + database
├── HTTP response
│
└── Browser discovers more resources
    ├── CSS
    ├── JavaScript
    ├── fonts
    ├── images
    └── API requests`}</code></pre>
        <p>Many of these operations can overlap or be reused. That is why the real journey is better understood as a graph of work than a perfectly linear checklist.</p>
      </section>

      <section>
        <h2>20. 🗂️ Caches Exist at Many Layers</h2>
        <p>“The cache” is not one thing. A browser can reuse HTTP resources, DNS answers, memory-resident data, service-worker responses, and connections. Farther away, CDNs, reverse proxies, application caches, and database caches can also remove work from the path.</p>
        <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Browser", "Reuse downloaded resources."],
            ["DNS", "Reuse domain-to-address answers."],
            ["CDN", "Serve cacheable content near users."],
            ["Application", "Reuse expensive computed data."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{title}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <p>A cache hit can remove an entire stage. A miss can turn a short request into a chain involving an origin, database, or downstream API. This is why cache invalidation and cache keys are architecture concerns, not merely optimisations.</p>
      </section>

      <section>
        <h2>21. 🏠 Your Laptop Usually Reaches a Router Before the Internet</h2>
        <p>Your computer normally does not send an Internet packet directly to a distant web server. A typical path begins on a local link and then moves through a gateway and provider network.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Laptop
  ↓
Wi-Fi / Ethernet
  ↓
Default gateway / router
  ↓
ISP
  ↓
Internet
  ↓
CDN / origin network
  ↓
Server`}</code></pre>
        <p>On IPv4 networks, ARP can help discover the link-layer address of a local gateway. IPv6 uses Neighbor Discovery for the corresponding family of functions. This local-network work is easy to forget because the browser hides it completely.</p>
      </section>

      <section>
        <h2>22. 📦 Frame, Packet, Segment, Request — These Are Different Things</h2>
        <p>Network data is wrapped as it moves through different layers. An HTTP request is an application-level concept; the network may transport that data inside TLS records, TCP segments or QUIC packets, IP packets, and finally local Ethernet or Wi-Fi frames.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`┌──────────────────────────────────────┐
│ Ethernet / Wi-Fi Frame               │
│  ┌────────────────────────────────┐  │
│  │ IP Packet                     │  │
│  │  ┌──────────────────────────┐ │  │
│  │  │ TCP Segment / QUIC Packet│ │  │
│  │  │  ┌────────────────────┐  │ │  │
│  │  │  │ TLS / HTTP data    │  │ │  │
│  │  │  └────────────────────┘  │ │  │
│  │  └──────────────────────────┘ │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘`}</code></pre>
        <p>Keeping these terms separate makes packet captures, browser DevTools, and networking documentation much easier to understand.</p>
      </section>

      <section>
        <h2>23. 🌍 How Does the Internet Know Where to Send the Packet?</h2>
        <p>Routers use routing information to choose a next hop. The Internet is not one network; it is a collection of interconnected networks called autonomous systems. Between those networks, BGP is a fundamental routing protocol.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Your device
   ↓
Home / campus router
   ↓
ISP
   ↓
Regional / transit network
   ↓
Peering / transit
   ↓
Destination network
   ↓
CDN / origin`}</code></pre>
        <p>The exact route can vary. A traceroute can expose an observable sequence of hops, but missing replies do not automatically mean that a router or link is broken because network devices can filter or deprioritise diagnostic probes.</p>
      </section>

      <section>
        <h2>24. 🧩 NAT Means Your Private IP Is Not Usually the Public Endpoint</h2>
        <p>A laptop on a typical IPv4 home or campus network might have a private address such as <code>192.168.1.20</code>. The router can translate connections to a public address using Network Address Translation.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Laptop
192.168.1.20:53000
      ↓
Router / NAT
      ↓
Public Internet
      ↓
Web server :443`}</code></pre>
        <p>The router tracks connection state so returning traffic can be associated with the internal device. This is one reason a website generally cannot see your laptop&apos;s private LAN address.</p>
      </section>

      <section>
        <h2>25. 🔢 IP Addresses Still Need Ports</h2>
        <p>An IP address identifies a network endpoint, but a host can run many services. Ports help the transport layer deliver traffic to the intended service.</p>
        <div className="not-prose my-6 grid gap-2 sm:grid-cols-4">
          {[
            ["80", "HTTP"],
            ["443", "HTTPS"],
            ["22", "SSH"],
            ["53", "DNS"],
          ].map(([port, service]) => (
            <div key={port} className="rounded-xl border border-border bg-card/20 p-4 text-center">
              <div className="font-mono text-lg font-bold text-foreground">{port}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">{service}</div>
            </div>
          ))}
        </div>
        <p>So a destination can conceptually look like <code>93.184.216.34:443</code>: the address identifies the host and the port identifies the service endpoint.</p>
      </section>

      <section>
        <h2>26. 🔐 TLS Is More Than “Encryption”</h2>
        <p>TLS provides several important properties. It protects application data from straightforward network observation, detects tampering with protected data, and gives the browser a way to authenticate the server through certificates and its trust model.</p>
        <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Confidentiality", "Protected application data is encrypted."],
            ["Integrity", "Unexpected modification of protected data is detectable."],
            ["Authentication", "Certificates help the client validate the server identity."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="text-xs font-bold text-foreground">{title}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <p>A simplified modern handshake establishes authentication and key material, after which symmetric encryption protects the bulk application traffic efficiently. HTTPS therefore is not simply “public-key encryption for every byte”.</p>
      </section>

      <section>
        <h2>27. 🔀 Redirects Can Add Another Entire Request</h2>
        <p>The URL you enter does not have to be the final resource URL. A server can return a redirect and tell the browser where to continue.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`http://example.com
      ↓
   301 / 308
      ↓
https://example.com
      ↓
   200 OK`}</code></pre>
        <p>A long redirect chain can add latency because each redirect may require another navigation step. Redirects are therefore worth inspecting when diagnosing a slow first load.</p>
      </section>

      <section>
        <h2>28. 📦 Compression Makes the Network Carry Fewer Bytes</h2>
        <p>Text-heavy resources such as HTML, CSS, JavaScript, JSON, and SVG often benefit from HTTP content compression. The server sends a compressed representation and the browser decompresses it before using the content.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Original HTML
      ↓
Compression
      ↓
Smaller response
      ↓
Network
      ↓
Browser
      ↓
Decompression`}</code></pre>
        <p>Common content encodings include gzip, Brotli (<code>br</code>), and, where supported, newer formats such as zstd. Compression reduces transferred bytes, but it does not eliminate the browser&apos;s parsing and execution cost.</p>
      </section>

      <section>
        <h2>29. 🛡️ The Browser Enforces Security Boundaries After the Response Arrives</h2>
        <p>Security is not finished when TLS succeeds. Browsers enforce policies around origins, cookies, scripts, embedded resources, and cross-origin requests.</p>
        <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Same-Origin Policy", "Separates web origins."],
            ["CORS", "Controls browser cross-origin access when a server opts in."],
            ["CSP", "Restricts where scripts and other resources may come from."],
            ["HSTS", "Tells browsers to prefer HTTPS for a site."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="text-xs font-bold text-foreground">{title}</div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <p>CORS is especially misunderstood: it is primarily a browser security mechanism governing JavaScript access across origins. It is not a generic replacement for server-to-server authentication or network firewall rules.</p>
      </section>

      <section>
        <h2>30. 🍪 Cookies Turn Stateless HTTP Into Stateful Experiences</h2>
        <p>HTTP requests are individually understandable, but applications often need to associate many requests with the same browser session. Cookies are one common mechanism.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Server
  ↓
Set-Cookie: session=abc123
  ↓
Browser stores cookie
  ↓
Later request
  ↓
Cookie: session=abc123
  ↓
Server identifies session`}</code></pre>
        <p>Cookie attributes such as <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite</code> affect how browsers handle cookies. Login state, preferences, and other application state can therefore become part of the navigation story.</p>
      </section>

      <section>
        <h2>31. 🏗️ Server-Side Rendering and Client-Side Rendering Change Where Work Happens</h2>
        <p>A website does not have to generate all UI in the same place. With server-side rendering, the server can produce useful HTML before the browser executes the application&apos;s JavaScript. With client-side rendering, the browser can receive a smaller shell and construct more of the interface after JavaScript and API data arrive.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Server-side rendering
Browser → Server → HTML → Browser

Client-side rendering
Browser → HTML shell → JavaScript → API → UI

Hybrid
Server-rendered content + client interactivity + API requests`}</code></pre>
        <p>Modern frameworks often combine these approaches. The important point is that “the server returned the page” and “the browser finished rendering the app” can be very different milestones.</p>
      </section>

      <section>
        <h2>32. 🛰️ WebSockets Can Keep the Conversation Open</h2>
        <p>A normal page navigation is request/response oriented. Real-time applications such as chats, collaborative editors, and some dashboards may establish a persistent WebSocket connection so both sides can exchange messages over time.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`Initial page
   ↓
JavaScript
   ↓
WebSocket connection
   ⇅
Events / messages / updates
   ⇅
Server`}</code></pre>
        <p>Opening a website can therefore be the beginning of a long-lived session rather than the end of a single request.</p>
      </section>

      <section>
        <h2>33. 🔍 Read the DevTools Waterfall Like an Engineer</h2>
        <p>The Network panel is one of the best tools for turning this entire theory into something observable. Reload with DevTools open and inspect the first document request, then inspect its Timing, Headers, Initiator, and Response.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`DNS       ███
Connect      ███
TLS              ███
Request             █
Waiting             ███████
Download                   ██
Render                      ████`}</code></pre>
        <div className="not-prose my-6 grid gap-2 sm:grid-cols-2">
          {[
            ["Large DNS time", "Investigate resolution and resolver behaviour."],
            ["Large connection time", "Investigate network path and connection setup."],
            ["Large waiting / TTFB", "Investigate application, database, or upstream services."],
            ["Large download", "Investigate payload size, compression, bandwidth, or cache."],
            ["Large rendering", "Investigate JavaScript, style/layout, images, and main-thread work."],
            ["Unexpected requests", "Inspect the Initiator column and application code."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="text-xs font-bold text-foreground">{title}</div>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>34. 🧪 Investigate the Journey Yourself</h2>
        <p>You can observe different layers with different tools. No single command shows the entire journey.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`# DNS
dig example.com

# HTTP headers
curl -I https://example.com

# Verbose connection + TLS + HTTP details
curl -v https://example.com

# Network path
traceroute example.com

# Windows
tracert example.com`}</code></pre>
        <p>Then compare those observations with Chrome or Edge DevTools. DNS gives you naming information, traceroute gives you an imperfect view of path hops, curl exposes what its own client observed, and DevTools shows browser-level request and rendering behaviour.</p>
      </section>

      <section>
        <h2>35. 🧯 Use the Stack as a Debugging Checklist</h2>
        <p>When a website is slow or broken, stop saying “the Internet is slow” and locate the layer where the pipeline stops.</p>
        <div className="not-prose my-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "URL correct?", "DNS resolves?", "Correct endpoint?", "Local network working?",
            "Route available?", "Port reachable?", "TLS valid?", "Redirect chain reasonable?",
            "HTTP status expected?", "CDN behaving correctly?", "Server / TTFB healthy?",
            "Database / API healthy?", "Response compressed?", "Cache configured?",
            "JavaScript expensive?", "Images too large?", "Fonts delaying content?",
            "Layout / paint expensive?",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-border bg-card/20 px-3 py-2 text-[11px] text-muted-foreground">
              □ {item}
            </div>
          ))}
        </div>
        <p>This turns the URL journey into a practical engineering method: identify the layer, choose a tool that observes that layer, measure the failure, and then decide whether work should be reduced, moved, cached, or eliminated.</p>
      </section>

      <section>
        <h2>36. 🧠 The Bigger Lesson: A Webpage Is a Distributed System Meeting a Browser Runtime</h2>
        <p>The visible page is only the final layer. Underneath it are naming systems, routers, transport protocols, cryptography, CDNs, proxies, load balancers, application code, caches, databases, APIs, JavaScript engines, layout systems, and graphics pipelines.</p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{`                    🖥️ Pixels
                       ▲
                    Rendering
                       ▲
                 HTML / CSS / JS
                       ▲
                      HTTP
                       ▲
                  TLS / QUIC
                       ▲
                  TCP / UDP
                       ▲
                       IP
                       ▲
             Routers / Networks
                       ▲
             Wi-Fi / Ethernet
                       ▲
                    Hardware`}</code></pre>
        <p>The most useful mental model is to remember five questions rather than memorising dozens of boxes:</p>
        <div className="not-prose my-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["WHERE?", "DNS"],
            ["HOW?", "IP + routing + transport"],
            ["TRUST?", "TLS / HTTPS"],
            ["WHAT?", "HTTP"],
            ["HOW VISIBLE?", "DOM → layout → paint → composite"],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-border bg-card/20 p-4 text-center">
              <div className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground">{q}</div>
              <div className="mt-2 text-xs font-bold text-foreground">{a}</div>
            </div>
          ))}
        </div>
        <p>Once this chain becomes familiar, the web stops looking like a black box. The next time a page takes five seconds to load, you can ask a much better question: <strong>where exactly did those five seconds go?</strong></p>
      </section>
    </>
  );
}
