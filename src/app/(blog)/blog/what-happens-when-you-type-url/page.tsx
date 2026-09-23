import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import {
  DebugPlaybook,
  ProtocolComparison,
  URLJourneyLab,
} from "@/components/url-journey-lab";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("what-happens-when-you-type-url")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function WhatHappensWhenYouTypeUrlPage() {
  return (
    <ArticleShell article={article}>
      <p>
        You type <code>https://example.com/products?id=42#reviews</code>, press Enter,
        and a page appears. It feels like one action. Under the hood, it is a
        distributed choreography between the browser, operating system, DNS, routers,
        transport protocols, TLS, edge infrastructure, application servers, databases,
        and the rendering engine.
      </p>

      <p>
        This guide follows one request from the address bar to the first useful pixels.
        The goal is not memorising seven boxes; it is building a mental model that lets
        you explain web performance, debug outages, reason about networking, and answer
        the classic interview question without hand-waving.
      </p>

      <URLJourneyLab />

      <section>
        <h2>1. Start with the URL — it is a structured instruction</h2>
        <p>
          A URL tells the browser much more than “which website”. Consider
          <code>https://www.example.com:443/products?id=42#reviews</code>. The scheme is
          <code>https</code>, the hostname is <code>www.example.com</code>, the explicit
          port is <code>443</code>, the path is <code>/products</code>, the query is
          <code>?id=42</code>, and the fragment is <code>#reviews</code>.
        </p>

        <div className="my-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Scheme", "https", "Which protocol family should be used?"],
            ["Host", "www.example.com", "Which network name should be resolved?"],
            ["Port", "443", "Which service endpoint should receive the connection?"],
            ["Path", "/products", "Which resource or route is requested?"],
            ["Query", "?id=42", "What extra input should the server/application consider?"],
            ["Fragment", "#reviews", "Which document position should the browser show?"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </div>
              <code className="mt-2 block break-all text-sm font-semibold text-foreground">
                {value}
              </code>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>

        <div className="not-prose my-6 rounded-2xl border border-border bg-muted/10 p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            Mental shortcut
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground">
            URL = protocol + destination + resource + optional inputs + optional viewport hint.
          </p>
        </div>
      </section>

      <section>
        <h2>2. Before DNS, the browser can sometimes avoid the network entirely</h2>
        <p>
          A “fast” page load often starts with work that is invisible because it is
          already cached. The browser can reuse previously learned information and the
          operating system can keep DNS answers or connection-related state around.
          Some environments also use a local hosts file, proxy, or enterprise resolver.
        </p>

        <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/20 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="grid h-8 w-8 place-items-center rounded-xl border border-border font-mono text-[10px]">W</span>
              Warm path
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              A cache hit can remove a lookup or reuse an existing connection, shrinking
              the amount of fresh work needed before the request reaches the server.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/20 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="grid h-8 w-8 place-items-center rounded-xl border border-border font-mono text-[10px]">C</span>
              Cold path
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              No useful cache state means more discovery: name resolution, connection
              setup, security negotiation, and server work all become visible.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>3. DNS answers the first big question: “Where?”</h2>
        <p>
          Routers forward packets toward IP addresses, while humans use names. DNS is
          the distributed naming system that bridges those two worlds. A recursive
          resolver can answer from cache or walk the hierarchy: root, top-level domain,
          and the authoritative servers for the domain.
        </p>

        <div className="not-prose my-6 rounded-2xl border border-border bg-card/20 p-4 sm:p-5">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            {[
              ["Client", "“Where is example.com?”"],
              ["Recursive resolver", "checks cache / asks onward"],
              ["Authoritative DNS", "returns the zone answer"],
            ].map(([title, detail], index) => (
              <div key={title} className="contents">
                <div className="rounded-xl border border-border bg-background/40 p-3">
                  <div className="text-xs font-bold text-foreground">{title}</div>
                  <div className="mt-1 font-mono text-[10px] leading-5 text-muted-foreground">{detail}</div>
                </div>
                {index < 2 && (
                  <div className="hidden text-center font-mono text-xs text-muted-foreground sm:block">→</div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-5 text-muted-foreground">
            The resolver can cache answers according to their TTL. A cache hit avoids
            repeating the whole hierarchy for every visitor.
          </p>
        </div>

        <p>
          DNS is a major reason one domain can front different physical locations. CDNs
          and traffic-management systems can steer a hostname toward an edge endpoint
          rather than a single permanent server.
          <Link href="/blog/dns-resolution-explained" className="ml-1 underline underline-offset-4">
            Go deeper with the DNS guide.
          </Link>
        </p>
      </section>

      <section>
        <h2>4. The operating system turns an IP address into a path</h2>
        <p>
          Once the destination address is known, your machine still has to reach it.
          On a local network that can involve ARP for IPv4 or IPv6 neighbour discovery.
          A switch moves frames inside the local network, while routers forward packets
          between networks. Across the Internet, traffic can pass through multiple
          networks and autonomous systems before reaching an edge location or origin.
        </p>

        <div className="not-prose my-6 rounded-2xl border border-border bg-card/20 p-4">
          <div className="grid gap-2 md:grid-cols-5 md:items-center">
            {[
              ["Laptop / phone", "local stack"],
              ["Wi-Fi / Ethernet", "link"],
              ["Router", "next hop"],
              ["ISP + transit", "many hops"],
              ["CDN / origin", "destination"],
            ].map(([title, detail], index) => (
              <div key={title} className="flex items-center gap-2">
                <div className="min-w-0 flex-1 rounded-xl border border-border bg-background/40 p-3">
                  <div className="text-xs font-bold text-foreground">{title}</div>
                  <div className="mt-1 font-mono text-[9px] text-muted-foreground">{detail}</div>
                </div>
                {index < 4 && <span className="hidden shrink-0 text-muted-foreground md:block">→</span>}
              </div>
            ))}
          </div>
        </div>

        <p>
          This is why <code>traceroute</code> or <code>tracert</code> is useful when
          learning: it reveals the observable hop sequence instead of treating the
          Internet as a single magic pipe.
        </p>
      </section>

      <section>
        <h2>5. Transport asks: “How do we talk reliably?”</h2>
        <p>
          A common HTTPS path uses TCP. The familiar three-way handshake is
          <code>SYN → SYN-ACK → ACK</code>. It establishes state on both ends before
          application data flows. Modern HTTP/3 changes this by using QUIC over UDP,
          integrating transport setup with TLS and using independently managed streams.
        </p>

        <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
          {[
            ["SYN", "Client proposes a new TCP connection."],
            ["SYN-ACK", "Server acknowledges and proposes its sequence state."],
            ["ACK", "Client acknowledges; the TCP connection can carry application data."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{title}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>6. TLS asks: “Can we trust this endpoint, and can we encrypt the conversation?”</h2>
        <p>
          HTTPS layers TLS on top of the connection. During a simplified TLS 1.3
          handshake, the client and server negotiate cryptographic parameters, the server
          proves control of the domain with a certificate chain, and both sides establish
          keys used for encrypted application traffic.
        </p>

        <div className="not-prose my-6 overflow-hidden rounded-2xl border border-border bg-card/20">
          <div className="grid gap-0 sm:grid-cols-5">
            {[
              ["ClientHello", "supported versions + crypto choices"],
              ["ServerHello", "selection + handshake parameters"],
              ["Certificate", "identity chain for the server"],
              ["Key schedule", "derive traffic keys"],
              ["Finished", "confirm the handshake"],
            ].map(([title, body], index) => (
              <div key={title} className="border-b border-border p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="font-mono text-[9px] text-muted-foreground">0{index + 1}</div>
                <div className="mt-2 text-xs font-bold text-foreground">{title}</div>
                <div className="mt-1 text-[10px] leading-5 text-muted-foreground">{body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="not-prose my-6 rounded-2xl border border-border bg-muted/10 p-4">
          <div className="text-xs font-bold text-foreground">Important nuance</div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Encryption protects application contents, but it does not mean every piece
            of network metadata disappears. Connection endpoints and other protocol
            information can still matter for operations and privacy analysis.
          </p>
        </div>
      </section>

      <section>
        <h2>7. HTTP finally says what the browser wants</h2>
        <p>
          After the connection is ready, the browser sends an HTTP request. In a
          human-readable HTTP/1.1 example, that looks conceptually like this:
        </p>

        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{"GET /products?id=42 HTTP/1.1\nHost: example.com\nAccept: text/html\nAccept-Language: en-US\nAccept-Encoding: gzip, br\nCookie: session=…\n\n[optional request body]"}</code></pre>

        <p>
          The method, target, headers, and optional body become inputs for the server.
          The actual wire representation depends on the HTTP version: HTTP/1.1 uses
          textual messages, while HTTP/2 and HTTP/3 use binary framing.
        </p>

        <div className="not-prose my-6 rounded-2xl border border-border bg-card/20 p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            The useful question
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground">
            Don’t ask only “Did the request reach the server?” Ask “Which layer answered it?”
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            {["Browser cache", "CDN / proxy", "Application", "Database / dependency"].map((item) => (
              <div key={item} className="rounded-xl border border-border px-3 py-2 text-[10px] font-semibold text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>8. The server path is usually a chain, not one machine</h2>
        <p>
          A production request can pass through a CDN, reverse proxy, load balancer, API
          gateway, application service, cache, and database. A cache hit may end the
          journey early. A miss can trigger business logic, authentication, database
          queries, downstream API calls, rendering, and only then a response.
        </p>

        <div className="not-prose my-6 grid gap-2 lg:grid-cols-6 lg:items-center">
          {[
            ["EDGE", "cache / security"],
            ["LB", "choose a backend"],
            ["APP", "business logic"],
            ["CACHE", "reuse data"],
            ["DB", "persistent state"],
            ["RESPONSE", "bytes return"],
          ].map(([title, body], index) => (
            <div key={title} className="flex items-center gap-2 lg:contents">
              <div className="rounded-xl border border-border bg-background/40 p-3">
                <div className="font-mono text-[9px] text-muted-foreground">{title}</div>
                <div className="mt-1 text-[10px] leading-4 text-muted-foreground">{body}</div>
              </div>
              {index < 5 && <span className="hidden text-center text-muted-foreground lg:block">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>9. One document request becomes many resource requests</h2>
        <p>
          The initial HTML is often just the beginning. Parsing it can reveal stylesheets,
          JavaScript modules, images, fonts, manifests, analytics, API calls, and other
          assets. A single navigation can therefore create a request waterfall with many
          independent rows.
        </p>

        <div className="not-prose my-6 overflow-hidden rounded-2xl border border-border bg-card/20">
          <div className="border-b border-border px-4 py-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Request waterfall · conceptual
            </div>
          </div>
          <div className="space-y-2 p-4">
            {[
              ["document", "0%", "31%"],
              ["style.css", "18%", "29%"],
              ["app.js", "25%", "44%"],
              ["hero.webp", "38%", "31%"],
              ["font.woff2", "46%", "18%"],
              ["api/products", "54%", "35%"],
            ].map(([name, left, width]) => (
              <div key={name} className="grid grid-cols-[6rem_1fr] items-center gap-3">
                <code className="truncate text-[10px] text-muted-foreground">{name}</code>
                <div className="h-6 rounded-md bg-muted/20">
                  <div
                    className="h-full rounded-md border border-foreground/20 bg-foreground/10"
                    style={{ marginLeft: left, width }}
                    aria-label={name + " request timing bar"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p>
          This is also why “the server returned in 200 ms” does not necessarily mean “the
          page was visible in 200 ms”. The browser may still need to download, decode,
          execute, layout, paint, and compose a second wave of resources.
        </p>
      </section>

      <section>
        <h2>10. The browser turns bytes into a visual scene</h2>
        <p>
          HTML is parsed into a DOM. CSS is parsed into a CSSOM. The browser combines
          relevant information into a renderable representation, calculates layout,
          paints visual fragments, and composites layers into what you actually see.
        </p>

        <div className="not-prose my-6 grid gap-2 sm:grid-cols-5">
          {[
            ["HTML", "DOM", "turn markup into a node tree"],
            ["CSS", "CSSOM", "turn rules into computed style information"],
            ["DOM + CSSOM", "Render tree", "decide what can actually be displayed"],
            ["Geometry", "Layout", "calculate boxes, positions and line wraps"],
            ["Pixels", "Paint → Composite", "rasterize and combine visual layers"],
          ].map(([from, to, detail]) => (
            <div key={to} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[9px] text-muted-foreground">{from}</div>
              <div className="mt-2 text-xs font-bold text-foreground">{to}</div>
              <div className="mt-1 text-[10px] leading-5 text-muted-foreground">{detail}</div>
            </div>
          ))}
        </div>

        <p>
          This is the moment where networking concepts become browser-engine concepts:
          a page can have a fast server response and still feel slow because the main
          thread has too much JavaScript, too much layout work, or expensive image
          decoding.
        </p>
      </section>

      <section>
        <h2>11. JavaScript creates a second wave of work</h2>
        <p>
          The browser can execute JavaScript after initial HTML arrives. Scripts may
          attach event handlers, update the DOM, request JSON from an API, hydrate
          application state, lazy-load media, or trigger further layout and paint work.
        </p>

        <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
          {[
            ["HTML arrives", "Initial structure becomes available."],
            ["JS runs", "Application logic starts requesting or mutating state."],
            ["UI changes", "DOM/layout/paint can run again."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="text-xs font-bold text-foreground">{title}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <p>
          Cookies can join this story too. A response may set a cookie, and later
          requests can send it back. That is one mechanism behind session identifiers,
          preferences, experiments, and login state.
        </p>
      </section>

      <ProtocolComparison />

      <section>
        <h2>12. HTTP/1.1 vs HTTP/2 vs HTTP/3 changes the shape of the journey</h2>
        <p>
          The application intent can be identical while the transport machinery differs.
          HTTP/1.1 commonly uses persistent TCP connections. HTTP/2 multiplexes multiple
          streams over a TCP connection and uses binary framing plus header compression.
          HTTP/3 maps HTTP semantics onto QUIC, which runs over UDP and supports
          independent streams with transport features such as connection migration.
        </p>
        <p>
          The useful lesson is not “HTTP/3 is always faster”. Network conditions,
          implementation details, server configuration, cache behaviour, and page
          structure determine the real result.
        </p>
      </section>

      <section>
        <h2>13. Caching is how systems delete work from the path</h2>
        <p>
          Caching can happen at multiple layers: browser, DNS resolver, CDN, reverse
          proxy, application cache, database buffer or query cache, and more. A cache hit
          can remove an entire stage of work. A cache miss often turns a short request
          into a longer dependency chain.
        </p>

        <div className="not-prose my-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Browser", "reuse already downloaded bytes"],
            ["DNS", "reuse name → address answers"],
            ["CDN", "serve content from an edge"],
            ["App", "reuse expensive computed data"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{title}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="not-prose my-6 rounded-2xl border border-border bg-muted/10 p-4">
          <div className="text-xs font-bold text-foreground">A performance mindset</div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            Instead of asking “How can I make this step faster?”, also ask “Can I make
            this step unnecessary on the next request?”
          </p>
        </div>
      </section>

      <section>
        <h2>14. The mobile path is the same idea with different radio links</h2>
        <p>
          On a phone, packets may travel from the browser over Wi-Fi to a local router
          or over a cellular radio to a carrier network. The downstream architecture is
          still recognisable: naming, routing, transport/security, HTTP, server-side
          processing, and rendering.
        </p>
        <p>
          The medium changes latency and loss characteristics, but the mental model
          survives. That is why the same debugging vocabulary applies to laptops,
          phones, cloud VMs, and edge devices.
        </p>
      </section>

      <DebugPlaybook />

      <section>
        <h2>15. Where did the milliseconds go?</h2>
        <p>
          “Page load” is not one timer. A browser can spend time discovering the
          destination, establishing a connection, negotiating TLS, waiting for the first
          byte, transferring the body, parsing resources, running JavaScript, calculating
          layout, painting, and compositing.
        </p>

        <div className="not-prose my-6 rounded-2xl border border-border bg-card/20 p-4 sm:p-5">
          <div className="grid gap-2 sm:grid-cols-7">
            {[
              "DNS",
              "Connect",
              "TLS",
              "Request",
              "TTFB",
              "Download",
              "Render",
            ].map((item, index) => (
              <div key={item} className="rounded-xl border border-border bg-background/40 p-3 text-center">
                <div className="font-mono text-[9px] text-muted-foreground">0{index + 1}</div>
                <div className="mt-1 text-[10px] font-bold text-foreground">{item}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-5 text-muted-foreground">
            Real timings vary by cache state, protocol version, distance, congestion,
            server load, resource priority, device hardware, and page architecture.
          </p>
        </div>
      </section>

      <section>
        <h2>16. Common misconceptions to delete from your mental model</h2>
        <div className="not-prose my-6 grid gap-3">
          {[
            ["“DNS returns the server.”", "DNS returns records. The resulting address can point to an edge, proxy, gateway, or other front door rather than the application process itself."],
            ["“HTTPS means everything is hidden.”", "TLS protects application contents, but not every piece of connection metadata."],
            ["“200 OK means the page is done.”", "A successful response can still trigger many subresource requests and substantial browser-side work."],
            ["“The browser talks directly to one server.”", "CDNs, reverse proxies, load balancers, caches and services often sit between the browser and application logic."],
            ["“HTTP/3 is just HTTP/2 with a new number.”", "HTTP/3 changes the transport substrate by running HTTP semantics over QUIC."],
            ["“Slow website = slow server.”", "The bottleneck may be DNS, connection setup, TLS, transfer, JavaScript, layout, image decoding, or any downstream dependency."],
          ].map(([myth, correction]) => (
            <div key={myth} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="text-xs font-bold text-foreground">{myth}</div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{correction}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>17. The 10-second interview answer</h2>
        <div className="not-prose my-6 rounded-2xl border border-foreground/20 bg-foreground/[0.035] p-5">
          <p className="text-sm font-semibold leading-7 text-foreground">
            “The browser parses the URL, checks local state and resolves the hostname
            with DNS, reaches the destination, establishes TCP/TLS or QUIC/TLS,
            sends an HTTP request, gets a response through the edge/server stack,
            then parses HTML/CSS and executes JavaScript to build, layout, paint,
            and composite the page. The page may trigger many more network requests
            along the way.”
          </p>
        </div>
      </section>

      <section>
        <h2>18. The durable mental model</h2>
        <p>Memorise the questions, not the boxes:</p>
        <div className="not-prose my-6 grid gap-2 md:grid-cols-2">
          {[
            ["WHERE?", "DNS → IP / endpoint"],
            ["HOW CONNECT?", "TCP or QUIC → transport state"],
            ["HOW TRUST?", "TLS → identity + encryption"],
            ["WHAT?", "HTTP → resource + metadata"],
            ["WHO ANSWERS?", "cache → CDN → proxy → app → dependency"],
            ["HOW VISIBLE?", "HTML/CSS/JS → DOM/CSSOM → layout → paint → composite"],
          ].map(([question, answer]) => (
            <div key={question} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{question}</div>
              <div className="mt-2 text-sm font-bold text-foreground">{answer}</div>
            </div>
          ))}
        </div>

        <p>
          Once this chain is familiar, the web stops looking like a black box. You can
          point to the layer where a failure happens, choose a tool that observes that
          layer, and reason about whether the fix is reducing work, moving work, caching
          work, or eliminating work.
        </p>

        <p>
          Continue with the dedicated
          <Link href="/blog/dns-resolution-explained" className="mx-1 underline underline-offset-4">
            DNS resolution guide
          </Link>
          and the
          <Link href="/blog/http1-http2-http3" className="mx-1 underline underline-offset-4">
            HTTP/1.1 vs HTTP/2 vs HTTP/3 guide
          </Link>
          to go one layer deeper.
        </p>
      </section>
    </ArticleShell>
  );
}
