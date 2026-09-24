import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Database,
  Gauge,
  KeyRound,
  LockKeyhole,
  Network,
  RefreshCcw,
  ServerCog,
  ShieldAlert,
} from "lucide-react";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("http-status-codes-explained")!;

export const metadata: Metadata = buildArticleMetadata(article);

type StatusKind = "info" | "success" | "redirect" | "client" | "server" | "legacy";

interface StatusEntry {
  code: number;
  name: string;
  kind: StatusKind;
  summary: string;
  practical: string;
}

const groups: Array<{
  range: string;
  title: string;
  icon: typeof CircleDot;
  intro: string;
  entries: StatusEntry[];
}> = [
  {
    range: "1xx",
    title: "Informational responses",
    icon: CircleDot,
    intro:
      "These are interim responses. The final outcome of the request has not necessarily arrived yet. They are most useful when the transport or server needs to communicate progress, protocol changes, or hints without ending the exchange.",
    entries: [
      { code: 100, name: "Continue", kind: "info", summary: "The server is saying that the request headers look acceptable so far, so the client may continue sending the request body.", practical: "You will most often see this around Expect: 100-continue for potentially large uploads. It lets clients avoid sending a large body when the server is likely to reject the request immediately." },
      { code: 101, name: "Switching Protocols", kind: "info", summary: "The server agrees to change protocols in response to an Upgrade request.", practical: "This is associated with protocol upgrades such as WebSocket over HTTP/1.1. Treat the Upgrade and Connection headers as part of the negotiation rather than reading 101 as ordinary application success." },
      { code: 102, name: "Processing", kind: "legacy", summary: "An old WebDAV interim status that signaled a request had been received while work was still happening.", practical: "MDN marks 102 as deprecated and notes it was removed from WebDAV by RFC 4918. Do not design a new API around it; recognize it when reading historical documentation or server traces." },
      { code: 103, name: "Early Hints", kind: "info", summary: "An interim response that can give the browser resource-loading hints before the final response is ready.", practical: "It is primarily paired with Link headers so a user agent can begin preload or preconnect work early. The 103 is not the page response; the final response still follows." },
    ],
  },
  {
    range: "2xx",
    title: "Successful responses",
    icon: CheckCircle2,
    intro:
      "A 2xx response means the request was successfully processed at the HTTP level. Success still has different shapes: fetching data, creating something, accepting asynchronous work, returning no body, or returning a partial representation.",
    entries: [
      { code: 200, name: "OK", kind: "success", summary: "The request succeeded; the exact meaning depends on the request method and resource.", practical: "GET commonly returns a representation, HEAD returns headers without a response body, and other methods can return the representation of the result. Do not use 200 as a substitute for every possible business outcome." },
      { code: 201, name: "Created", kind: "success", summary: "The request resulted in a new resource being created.", practical: "This is a natural response for resource-creating POST or PUT operations. In APIs, a Location header can identify the newly created resource." },
      { code: 202, name: "Accepted", kind: "success", summary: "The server accepted the request for processing, but the work is not complete yet.", practical: "Use this for asynchronous jobs, imports, report generation, queues, and batch processing. HTTP does not later turn the same 202 into a final response, so a useful API commonly returns a job identifier or status URL." },
      { code: 203, name: "Non-Authoritative Information", kind: "success", summary: "The response metadata is not exactly the same as the origin's because the response came through a transformed or third-party copy.", practical: "It is specialized and much less common than 200. Prefer 200 for ordinary application responses unless the distinction about non-origin metadata matters." },
      { code: 204, name: "No Content", kind: "success", summary: "The operation succeeded and there is intentionally no response body.", practical: "This fits actions such as successful deletes or updates where the client already has everything it needs. Headers can still carry useful metadata." },
      { code: 205, name: "Reset Content", kind: "success", summary: "The server is asking the client to reset the document or input state that initiated the request.", practical: "It is uncommon in modern API design. A form-like interaction is the simplest mental model: submit successfully, then clear or reset the controls that produced the request." },
      { code: 206, name: "Partial Content", kind: "success", summary: "The server is returning only the requested range or ranges of a representation.", practical: "This is important for resumable downloads, media seeking, and Range requests. Content-Range describes which part is being returned." },
      { code: 207, name: "Multi-Status", kind: "success", summary: "A WebDAV response that can carry different outcomes for multiple resources inside one higher-level operation.", practical: "It is useful when one operation spans several resources and one yes/no result would hide important detail. Outside WebDAV, many APIs use their own response envelopes." },
      { code: 208, name: "Already Reported", kind: "success", summary: "A WebDAV-specific response used to avoid repeatedly enumerating the same internal collection members.", practical: "You are unlikely to need it in ordinary REST APIs. Recognize it as a WebDAV optimization rather than a general-purpose application status." },
      { code: 226, name: "IM Used", kind: "success", summary: "A GET response that reflects one or more instance manipulations applied to the selected representation.", practical: "It belongs to a specialized HTTP feature family and is rarely encountered in mainstream application code. For debugging, understand it as a successful transformed representation." },
    ],
  },
  {
    range: "3xx",
    title: "Redirection and cache responses",
    icon: RefreshCcw,
    intro:
      "3xx responses do not simply mean failure. They change how the client should continue the interaction. Some move a URL, some preserve a cached representation, and some exist for protocol compatibility.",
    entries: [
      { code: 300, name: "Multiple Choices", kind: "redirect", summary: "More than one representation or destination could satisfy the request.", practical: "It is uncommon because HTTP does not mandate one universal automatic selection algorithm. Explicit application-level choices are usually easier for modern clients." },
      { code: 301, name: "Moved Permanently", kind: "redirect", summary: "The requested resource has a new permanent URL.", practical: "Use it for stable migrations such as old pages moving to canonical locations. Be deliberate with non-GET requests because method-preservation behavior has historical differences." },
      { code: 302, name: "Found", kind: "redirect", summary: "The requested resource is temporarily available at another URI.", practical: "Treat it as temporary. When method preservation matters, 307 is explicit about retaining the original method." },
      { code: 303, name: "See Other", kind: "redirect", summary: "The client should retrieve another URI using GET.", practical: "A classic use is POST/Redirect/GET: accept a mutation, then send the browser to a GET page representing the resulting state." },
      { code: 304, name: "Not Modified", kind: "redirect", summary: "The cached representation is still valid, so the client can reuse its existing copy.", practical: "304 is about conditional requests and cache validation, not a missing resource. It avoids transferring a representation that the client already has." },
      { code: 305, name: "Use Proxy", kind: "legacy", summary: "A historical status asking the client to use a proxy for the requested resource.", practical: "MDN marks 305 as deprecated because its in-band proxy configuration created security problems. New systems should not rely on it." },
      { code: 306, name: "Unused", kind: "legacy", summary: "A reserved status number that is no longer used.", practical: "IANA currently lists 306 as unused. Treat it as protocol history, not as an application response you should emit." },
      { code: 307, name: "Temporary Redirect", kind: "redirect", summary: "The resource is temporarily elsewhere, and the client must keep the original HTTP method when following the redirect.", practical: "This is especially important for POST, PUT, PATCH, and other non-GET requests. Use 307 when method preservation must be explicit." },
      { code: 308, name: "Permanent Redirect", kind: "redirect", summary: "The resource has permanently moved and the client must preserve the original method when following the new location.", practical: "Use 308 when you need the permanence of 301 plus explicit method preservation. It works well for API endpoint migrations." },
    ],
  },
  {
    range: "4xx",
    title: "Client error responses",
    icon: ShieldAlert,
    intro:
      "A 4xx response tells you that the request could not be processed because something about the request, access context, target resource, or a client-controlled limit prevented success.",
    entries: [
      { code: 400, name: "Bad Request", kind: "client", summary: "The request is malformed or otherwise invalid from the server's point of view.", practical: "Use it for broken syntax, invalid framing, or malformed request structures. It is the broad request-invalid bucket, so prefer a more precise status when one fits." },
      { code: 401, name: "Unauthorized", kind: "client", summary: "The client has not successfully authenticated for the requested operation.", practical: "Despite the name, the key distinction is authentication rather than permission. Challenge-based authentication flows commonly use 401." },
      { code: 402, name: "Payment Required", kind: "client", summary: "Originally reserved for digital payment scenarios without a single standardized real-world convention.", practical: "Some SaaS products use 402 for subscription or payment gates, but that is an application convention. Document the meaning explicitly if you adopt it." },
      { code: 403, name: "Forbidden", kind: "client", summary: "The server will not grant access to the requested resource.", practical: "Think authorization rather than authentication. A server can intentionally return 404 instead when revealing that a protected resource exists would itself be sensitive." },
      { code: 404, name: "Not Found", kind: "client", summary: "The server cannot find the requested resource or endpoint.", practical: "This is normal for missing pages, unknown routes, and API resources that do not exist. It can also be used for deliberate information hiding." },
      { code: 405, name: "Method Not Allowed", kind: "client", summary: "The server understands the HTTP method, but the target resource does not allow that method.", practical: "For example, an API might expose GET and PATCH for a resource but not DELETE. The Allow header can communicate supported methods." },
      { code: 406, name: "Not Acceptable", kind: "client", summary: "Server-driven content negotiation cannot produce a representation satisfying the client's stated preferences.", practical: "This can arise from Accept, language, encoding, or related negotiation rules. The request can be structurally valid while no acceptable representation exists." },
      { code: 407, name: "Proxy Authentication Required", kind: "client", summary: "A proxy between the client and origin requires authentication before it will forward the request.", practical: "Read it as the proxy equivalent of 401. The authentication context belongs to the intermediary rather than the origin application." },
      { code: 408, name: "Request Timeout", kind: "client", summary: "The server is ending an idle or incomplete connection because it waited too long.", practical: "It can appear around pre-connections or other idle connections. A server can also simply close the connection without sending 408." },
      { code: 409, name: "Conflict", kind: "client", summary: "The request conflicts with the current state of the target resource or server.", practical: "Use it when the request is valid in isolation but cannot be applied to current state, such as conflicting edits or uniqueness constraints." },
      { code: 410, name: "Gone", kind: "client", summary: "The server knows the resource was removed permanently and has no forwarding location.", practical: "It communicates stronger removal intent than 404, but APIs do not need to use it for every deleted database row." },
      { code: 411, name: "Length Required", kind: "client", summary: "The server requires a Content-Length field before processing the request.", practical: "It is mainly a protocol-level framing requirement. It can surface when custom clients and servers disagree about request framing." },
      { code: 412, name: "Precondition Failed", kind: "client", summary: "A conditional request included preconditions that are not satisfied by the current resource state.", practical: "This is central to optimistic concurrency. If-Match can mean 'update only when the representation is still the version I read'." },
      { code: 413, name: "Content Too Large", kind: "client", summary: "The request body exceeds a limit imposed by the server.", practical: "CDNs, WAFs, reverse proxies, and applications can enforce different ceilings. Compare the payload against the limit at each layer." },
      { code: 414, name: "URI Too Long", kind: "client", summary: "The request URI is longer than the server is willing or able to process.", practical: "Huge query strings, encoded state blobs, or recursive URL construction can trigger it. Simplify the URL or move suitable state into the request body." },
      { code: 415, name: "Unsupported Media Type", kind: "client", summary: "The server does not support the media format of the request content.", practical: "A common example is sending application/xml to an endpoint that accepts only application/json. Check Content-Type and the actual payload first." },
      { code: 416, name: "Range Not Satisfiable", kind: "client", summary: "A Range request asks for bytes that cannot be fulfilled from the selected representation.", practical: "It commonly appears around downloads or media clients that have stale byte offsets. Compare the requested range with the current representation size." },
      { code: 417, name: "Expectation Failed", kind: "client", summary: "The server cannot satisfy the expectation expressed in the request's Expect header.", practical: "This is a protocol negotiation problem, not a generic application validation error. It is uncommon in ordinary browser traffic." },
      { code: 418, name: "I'm a teapot", kind: "legacy", summary: "A humorous status from an April Fools specification, associated with refusing to brew coffee using a teapot.", practical: "MDN documents 418, while IANA currently lists it as unused. The practical lesson is historical: do not build production control flow around the joke." },
      { code: 421, name: "Misdirected Request", kind: "client", summary: "The request reached a server that cannot serve the combination of scheme and authority in the request.", practical: "It can surface with connection reuse, virtual hosting, or HTTP/2 authority routing when a connection lands on a server that cannot correctly answer for that origin." },
      { code: 422, name: "Unprocessable Content", kind: "client", summary: "The request is syntactically valid, but semantic rules prevent it from being carried out.", practical: "This is a useful API distinction from 400: the JSON can parse correctly while a field value, state transition, or validation rule still makes the operation impossible." },
      { code: 423, name: "Locked", kind: "client", summary: "The target resource is locked, historically in WebDAV workflows.", practical: "The request may be valid, but the lock prevents the operation. Modern APIs often model similar state with domain-specific conflicts." },
      { code: 424, name: "Failed Dependency", kind: "client", summary: "A request failed because a dependent operation failed first, particularly in WebDAV.", practical: "It expresses causal dependency inside a multi-operation exchange. Ordinary JSON APIs often communicate the same relationship inside an error envelope." },
      { code: 425, name: "Too Early", kind: "client", summary: "The server declines to process the request because it is concerned the request may be replayed.", practical: "Investigate replay safety, idempotency, and whether early data was used before the secure connection was fully established." },
      { code: 426, name: "Upgrade Required", kind: "client", summary: "The server refuses the current protocol but indicates that the client could succeed after upgrading.", practical: "The Upgrade header describes acceptable protocol alternatives. It is a compatibility signal rather than a generic software-version error." },
      { code: 428, name: "Precondition Required", kind: "client", summary: "The origin requires the client to send a conditional request.", practical: "It is designed to prevent lost updates. An API can require If-Match so stale clients cannot overwrite newer representations without re-reading them." },
      { code: 429, name: "Too Many Requests", kind: "client", summary: "The client has exceeded a request-rate policy.", practical: "Respect Retry-After when supplied and use exponential backoff or another explicit policy rather than retrying at full speed." },
      { code: 431, name: "Request Header Fields Too Large", kind: "client", summary: "The request headers are too large for the server to process.", practical: "Large cookies, custom headers, authentication metadata, or proxy-added fields can contribute. Measure header size across the whole request path." },
      { code: 451, name: "Unavailable For Legal Reasons", kind: "client", summary: "The resource cannot be supplied because a legal requirement prevents delivery.", practical: "Use it when the cause of unavailability is specifically legal rather than technical. A useful response can make that distinction clear to users and operators." },
    ],
  },
  {
    range: "5xx",
    title: "Server and gateway errors",
    icon: ServerCog,
    intro:
      "A 5xx response means a server-side layer could not successfully fulfill the request. During incidents, separating application failure, upstream failure, temporary unavailability, and gateway timeout is extremely useful.",
    entries: [
      { code: 500, name: "Internal Server Error", kind: "server", summary: "The server encountered an unexpected condition and could not produce a more specific server-error response.", practical: "Think unexpected failure inside this server. Check application logs, exception traces, data-store errors, and recent deploys before blaming the client." },
      { code: 501, name: "Not Implemented", kind: "server", summary: "The server does not support the requested method or functionality.", practical: "This differs from 405: 405 is method known but not allowed on a resource, while 501 is about the server not implementing the method at all. HTTP requires GET and HEAD support." },
      { code: 502, name: "Bad Gateway", kind: "server", summary: "A gateway or proxy received an invalid response while trying to satisfy the request through an upstream server.", practical: "Start at the boundary: reverse proxy, load balancer, CDN, API gateway, or service mesh. Then inspect the upstream response and connection lifecycle." },
      { code: 503, name: "Service Unavailable", kind: "server", summary: "The service is temporarily unable to handle the request, commonly because of maintenance or overload.", practical: "Use it for temporary service states. Retry-After can tell clients when to try again, and operators should account for cache behavior." },
      { code: 504, name: "Gateway Timeout", kind: "server", summary: "A gateway did not receive a timely response from an upstream server.", practical: "A 504 is about the intermediary waiting too long. Trace the chain from client to proxy to application to database or external service." },
      { code: 505, name: "HTTP Version Not Supported", kind: "server", summary: "The server does not support the HTTP version used by the request.", practical: "This is a protocol-compatibility problem. Check client/server support and whether an intermediary is introducing a version mismatch." },
      { code: 506, name: "Variant Also Negotiates", kind: "server", summary: "Content negotiation configuration creates a circular selection path in which a chosen variant negotiates again.", practical: "This is usually a configuration problem in specialized negotiation systems. Inspect representation selection and variant rules." },
      { code: 507, name: "Insufficient Storage", kind: "server", summary: "The method cannot be completed because the server cannot store the representation needed, with WebDAV as the classic context.", practical: "Do not assume this always means the operating system disk is full. The limiting storage abstraction can belong to the resource repository." },
      { code: 508, name: "Loop Detected", kind: "server", summary: "The server detected an infinite loop while processing a request, historically in WebDAV binding traversal.", practical: "When encountered outside that context, investigate recursive routing, proxy loops, redirect cycles, or repeated dependency resolution." },
      { code: 510, name: "Not Extended", kind: "legacy", summary: "A status associated with an HTTP extension experiment that is now obsolete.", practical: "IANA marks it obsoleted. Treat it as protocol history rather than a modern application response." },
      { code: 511, name: "Network Authentication Required", kind: "server", summary: "The client must authenticate with the network before it can access the requested resource.", practical: "This is aimed at intermediary-controlled network access such as captive portals rather than application login. Distinguish it from 401." },
    ],
  },
];

const comparisonRows = [
  ["200", "The request completed successfully", "Normal successful response"],
  ["201", "A new resource was created", "POST /resources"],
  ["202", "Work was accepted but is still pending", "Async job / batch"],
  ["204", "Success with no response body", "Successful mutation with nothing else to return"],
  ["301", "Permanent move", "Canonical page migration"],
  ["302", "Temporary move", "Temporary redirect"],
  ["303", "Follow a different URI with GET", "POST/Redirect/GET"],
  ["304", "Cached representation is still valid", "Conditional GET"],
  ["307", "Temporary move; preserve method", "Temporary API redirect"],
  ["308", "Permanent move; preserve method", "Permanent API migration"],
  ["400", "Request itself is invalid", "Malformed input"],
  ["401", "Authentication is required or failed", "Missing/invalid credentials"],
  ["403", "Access is not permitted", "Authorization failure"],
  ["404", "Resource or route cannot be found", "Missing page or record"],
  ["405", "Method is not allowed here", "DELETE not exposed"],
  ["409", "Request conflicts with current state", "State or uniqueness conflict"],
  ["412", "Conditional request failed", "Stale If-Match"],
  ["415", "Payload media type is unsupported", "Wrong Content-Type"],
  ["422", "Semantics are invalid although syntax is valid", "Domain validation"],
  ["429", "Rate limit was exceeded", "Throttled API client"],
  ["500", "Unexpected error inside this server", "Unhandled application failure"],
  ["502", "Gateway got an invalid upstream response", "Proxy to app failure"],
  ["503", "Service is temporarily unavailable", "Maintenance or overload"],
  ["504", "Gateway waited too long for upstream", "Slow downstream dependency"],
];

const faqs = [
  { q: "What is the difference between 401 and 403?", a: "401 is about authentication: the client has not successfully authenticated. 403 is about authorization: the server will not grant access to the resource." },
  { q: "When should an API return 400 vs 422?", a: "Use 400 for malformed or otherwise invalid request structure. 422 is useful when the request is well-formed but its meaning violates domain or semantic rules." },
  { q: "What is the difference between 301, 302, 307, and 308?", a: "301 and 308 communicate permanent moves; 302 and 307 communicate temporary moves. 307 and 308 explicitly preserve the original method when the client follows the redirect." },
  { q: "What is the difference between 500, 502, 503, and 504?", a: "500 is an unexpected failure in the responding server. 502 points to an invalid upstream response through a gateway. 503 means the service is temporarily unavailable. 504 means a gateway did not get an upstream response in time." },
  { q: "Is 404 always a missing page?", a: "No. It can mean a missing API resource or route, and servers can intentionally use it instead of 403 when they do not want to reveal that a protected resource exists." },
  { q: "Is 429 a network error?", a: "No. 429 is an explicit HTTP response saying a request-rate policy was exceeded. A network error occurs when the client cannot successfully exchange an HTTP response at all." },
  { q: "Should an API return 200 with an error object instead of a 4xx?", a: "Usually, no. When the HTTP request failed according to HTTP semantics, a matching 4xx or 5xx gives browsers, proxies, SDKs, monitoring systems, and developers a clearer signal." },
];

function kindClasses(kind: StatusKind) {
  if (kind === "success") return "border-emerald-500/20 bg-emerald-500/[0.035]";
  if (kind === "redirect") return "border-sky-500/20 bg-sky-500/[0.035]";
  if (kind === "client") return "border-amber-500/20 bg-amber-500/[0.035]";
  if (kind === "server") return "border-rose-500/20 bg-rose-500/[0.035]";
  if (kind === "legacy") return "border-border bg-muted/20";
  return "border-violet-500/20 bg-violet-500/[0.035]";
}

export default function HTTPStatusCodesPage() {
  const allEntries = groups.flatMap((group) => group.entries);
  const legacyEntries = allEntries.filter((entry) => entry.kind === "legacy");
  const activeEntries = allEntries.filter((entry) => entry.kind !== "legacy");

  return (
    <ArticleShell article={article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      <p className="text-lg leading-8 text-foreground sm:text-xl">
        HTTP status codes are tiny numbers with enormous debugging value. A browser, reverse proxy, API gateway, service,
        CDN, cache, and observability system can all make different decisions based on the same three digits. The trick is
        not memorizing a wall of numbers; it is learning what each family says about the state of the exchange.
      </p>

      <aside className="rounded-3xl border border-border bg-foreground p-6 text-background sm:p-8">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">THE MENTAL MODEL</div>
        <p className="mt-3 text-base leading-8 sm:text-lg">
          Read the first digit first. <strong>1xx</strong> means the exchange is still progressing. <strong>2xx</strong> means
          success. <strong>3xx</strong> changes where or how the client should continue. <strong>4xx</strong> points toward
          the request or client context. <strong>5xx</strong> points toward the responding server or upstream chain.
        </p>
      </aside>

      <section id="at-a-glance" className="space-y-5">
        <div>
          <p className="lesson-kicker">AT A GLANCE</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Five families, five questions.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["1xx", "Informational", "Is the exchange still progressing?", "border-violet-500/20 bg-violet-500/[0.035]"],
            ["2xx", "Success", "Did the server complete the request?", "border-emerald-500/20 bg-emerald-500/[0.035]"],
            ["3xx", "Redirect / cache", "Should the client continue differently?", "border-sky-500/20 bg-sky-500/[0.035]"],
            ["4xx", "Client error", "What about the request or access context failed?", "border-amber-500/20 bg-amber-500/[0.035]"],
            ["5xx", "Server error", "What broke in this server or upstream chain?", "border-rose-500/20 bg-rose-500/[0.035]"],
          ].map(([code, title, question, cls]) => (
            <a href={"#status-" + code} key={code} className={"rounded-2xl border p-4 transition hover:-translate-y-0.5 " + cls}>
              <div className="font-mono text-2xl font-black">{code}</div>
              <div className="mt-2 text-sm font-bold text-foreground">{title}</div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{question}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">REFERENCE MAP</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">The codes worth recognizing instantly</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            These are the everyday signals that matter most during API design, browser debugging, cache analysis, authentication
            failures, rate limiting, and incident response.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="border-b border-border px-4 py-3 font-semibold">Code</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Interpretation</th>
                <th className="border-b border-border px-4 py-3 font-semibold">Common context</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([code, interpretation, context]) => (
                <tr key={code} className="border-b border-border/70 last:border-b-0">
                  <td className="px-4 py-3 font-mono font-bold text-foreground">{code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{interpretation}</td>
                  <td className="px-4 py-3 text-muted-foreground">{context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="lesson-kicker">FULL REFERENCE</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Every status shown in the current MDN reference
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            MDN currently groups response codes into five families and points to RFC 9110 for the standards-based HTTP semantics.
            The reference page also exposes several deprecated, unused, or obsolete values. They stay in this article because
            they matter when reading old systems and traffic captures. The current IANA registry separately identifies 306 and
            418 as unused and 510 as obsoleted.
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            Reference snapshot checked September 24, 2026. MDN page last modified September 17, 2026.
          </p>
        </div>

        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <section key={group.range} id={"status-" + group.range} className="scroll-mt-24 space-y-4">
              <div className="border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-muted/30">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{group.range}</p>
                    <h3 className="mt-1 text-xl font-black tracking-tight text-foreground sm:text-2xl">{group.title}</h3>
                  </div>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{group.intro}</p>
              </div>

              <div className="space-y-3">
                {group.entries.map((entry) => (
                  <article id={"status-" + entry.code} key={entry.code} className={"scroll-mt-24 rounded-2xl border p-5 sm:p-6 " + kindClasses(entry.kind)}>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <div className="shrink-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex min-w-[4.7rem] justify-center rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-sm font-black text-foreground">
                            {entry.code}
                          </span>
                          {entry.kind === "legacy" && (
                            <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                              legacy / special
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg font-black tracking-tight text-foreground">{entry.name}</h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{entry.summary}</p>
                        <div className="mt-4 rounded-xl border border-border/70 bg-background/55 p-4">
                          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">WHEN YOU SEE IT</p>
                          <p className="mt-1.5 text-sm leading-6 text-foreground/85">{entry.practical}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">THE DIFFERENCES THAT CAUSE BUGS</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">401 vs 403 vs 404</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["401", "You have not authenticated successfully.", "Think credentials, session, or authentication challenge."],
            ["403", "The server will not let this request access the resource.", "Think authorization, permissions, or deliberate resource hiding."],
            ["404", "The resource cannot be found.", "Think missing route, missing record, or deliberate information hiding."],
          ].map(([code, title, body]) => (
            <div key={code} className="rounded-2xl border border-border bg-card/20 p-5">
              <div className="font-mono text-2xl font-black">{code}</div>
              <p className="mt-3 text-sm font-bold text-foreground">{title}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">REDIRECTS</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">301 vs 302 vs 303 vs 307 vs 308</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Redirect bugs happen when a developer thinks “redirect” is one thing. The useful dimensions are permanence and
            method preservation.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["301", "Permanent", "Method behavior can inherit historical client conventions."],
            ["302", "Temporary", "Use when the destination is temporary; method handling is less explicit."],
            ["303", "See other", "The follow-up request is GET."],
            ["307", "Temporary", "Explicitly preserve the original method."],
            ["308", "Permanent", "Explicitly preserve the original method."],
          ].map(([code, axis, detail]) => (
            <div key={code} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-xl font-black">{code}</div>
              <div className="mt-2 text-xs font-bold text-foreground">{axis}</div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">CONCURRENCY</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">412 vs 428 vs 409</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["409", "The current server state conflicts with the requested action.", "Useful for application-level state conflicts."],
            ["412", "A supplied conditional precondition is now false.", "Think If-Match and optimistic concurrency."],
            ["428", "The server requires conditional requests.", "Think policy: updates must carry a precondition."],
          ].map(([code, title, body]) => (
            <div key={code} className="rounded-2xl border border-border bg-card/20 p-5">
              <div className="font-mono text-2xl font-black">{code}</div>
              <p className="mt-3 text-sm font-bold text-foreground">{title}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">PRODUCTION DEBUGGING</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Read status codes by layer</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [Network, "Browser or API client", "Check the final URL, request method, request headers, content type, credentials, body size, and whether the client followed a redirect."],
            [LockKeyhole, "Authentication and authorization", "Separate 401 from 403. Confirm token freshness, session scope, ownership rules, proxy authentication, and any deliberate information-hiding behavior."],
            [Database, "Application and data layer", "For 409, 412, 422, and 500, inspect state transitions, validation, optimistic concurrency, database constraints, and uncaught exceptions."],
            [Gauge, "Rate limits and infrastructure", "For 413, 429, 431, 502, 503, and 504, identify which hop enforced the limit or failed: CDN, WAF, proxy, gateway, app, or upstream."],
            [ServerCog, "Proxy and upstream chain", "A 502 or 504 often says more about the relationship between layers than about the application. Trace the request through every intermediary."],
            [AlertTriangle, "Legacy protocol signals", "102, 305, 306, 418, and 510 can appear in historical traces. Mark them as special cases instead of inventing business meaning for them."],
          ].map(([Icon, title, body]) => {
            const Component = Icon as typeof Network;
            return (
              <div key={String(title)} className="rounded-2xl border border-border bg-card/20 p-5">
                <Component className="h-5 w-5" />
                <h3 className="mt-4 text-sm font-black text-foreground">{String(title)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{String(body)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">API DESIGN</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Do not collapse every outcome into 200</h2>
        </div>
        <div className="rounded-2xl border border-border bg-card/30 p-5 sm:p-6">
          <p className="text-sm leading-7 text-muted-foreground">
            HTTP is part of your API&apos;s vocabulary. Returning 200 with an application-specific error forces every client to
            decode a second protocol before it can use ordinary HTTP behavior. A more expressive response gives proxies, SDKs,
            monitoring tools, and humans a clearer signal.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">LESS EXPRESSIVE</p>
              <pre className="mt-2 overflow-x-auto text-xs leading-6"><code>{'HTTP/1.1 200 OK\\n{"ok":false,"error":"rate_limited"}'}</code></pre>
            </div>
            <div className="rounded-xl border border-border bg-background/50 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">HTTP CARRIES PART OF THE MEANING</p>
              <pre className="mt-2 overflow-x-auto text-xs leading-6"><code>{'HTTP/1.1 429 Too Many Requests\\nRetry-After: 30'}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">CLIENT RETRIES</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Retrying the wrong status can make an outage worse</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["429", "Back off according to rate-limit policy.", "Immediate hot-loop retries increase pressure."],
            ["503", "Treat the service as potentially temporary.", "Backoff, load shedding, and Retry-After can cooperate."],
            ["504", "Investigate upstream slowness first.", "Blind retries can multiply work in the dependency chain."],
          ].map(([code, title, body]) => (
            <div key={code} className="rounded-2xl border border-border bg-card/20 p-5">
              <div className="font-mono text-xl font-black">{code}</div>
              <p className="mt-3 text-sm font-bold text-foreground">{title}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">CACHE SEMANTICS</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">304 is not an error</h2>
        </div>
        <p>
          One of the easiest status-code mistakes is mentally grouping every 3xx with “redirect.” A <strong>304 Not Modified</strong>
          response is primarily about cache validation: the client already has a representation and can reuse it instead of
          downloading it again. That makes 304 a performance and correctness signal, not a failure.
        </p>
        <div className="rounded-2xl border border-border bg-card/20 p-5">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold sm:text-sm">
            {["Cached copy", "Conditional request", "304", "Reuse cached representation"].map((step, index) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-xl border border-border bg-background px-3 py-2">{step}</span>
                {index < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">SECURITY</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Status codes are part of your security surface</h2>
        </div>
        <p>
          A status code can reveal more than you intended. A careful application may return 404 for a resource that exists but
          should not be disclosed to an untrusted requester. A 401 can indicate missing authentication; a 403 can indicate that
          authentication succeeded but authorization failed. Neither pattern is universally correct, so the strategy belongs in
          the threat model rather than in a copy-pasted controller convention.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/20 p-5">
            <KeyRound className="h-5 w-5" />
            <h3 className="mt-3 text-sm font-black">Authentication</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Use 401 when the client needs a valid authentication context for the requested resource.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/20 p-5">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="mt-3 text-sm font-black">Authorization and disclosure</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Use 403 when refusal is the right signal, or deliberately choose 404 when exposing existence would itself be sensitive.</p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">FAST DEBUGGING CHECKLIST</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">When you see a status code in production</h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {[
            "Identify the hop that generated the response: browser, CDN, proxy, gateway, application, or upstream.",
            "Record the request method, final URL, response headers, and a request correlation ID if available.",
            "Classify the status by family before reading the body.",
            "For 3xx, inspect Location and cache-validation headers.",
            "For 4xx, inspect authentication, authorization, request syntax, content type, payload size, and domain validation.",
            "For 5xx, trace upstream calls, timeouts, recent deploys, resource pressure, and gateway logs.",
            "For 429 and 503, check Retry-After and the service's backoff or load-shedding behavior.",
            "Compare client-visible behavior with server and proxy logs; the first 5xx you see may be an intermediary translating a deeper failure.",
          ].map((item, index) => (
            <li key={item} className="rounded-2xl border border-border bg-card/20 p-4 text-sm leading-6 text-muted-foreground">
              <span className="mr-3 inline-grid h-6 w-6 place-items-center rounded-full border border-border font-mono text-[10px] font-bold text-foreground">{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">SOURCES & ATTRIBUTION</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Primary references</h2>
        </div>
        <div className="rounded-2xl border border-border bg-card/20 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            This StackShade article is an original rewrite and expansion built from the current MDN HTTP status-code reference
            and the standards registry. MDN documentation prose is generally available under CC BY-SA 2.5 or later, and MDN&apos;s
            attribution guidance asks reusers to credit Mozilla Contributors, link to the source, and describe modifications.
            This page therefore links the source documents instead of reproducing the MDN page wholesale; the wording, examples,
            structure, visual treatment, and debugging heuristics here are newly authored for StackShade.
          </p>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            Because this page is a derivative educational work based on MDN material, this article is offered under
            <a href="https://creativecommons.org/licenses/by-sa/2.5/" target="_blank" rel="noopener noreferrer" className="mx-1 underline underline-offset-4 hover:text-foreground">CC BY-SA 2.5 or later</a>
            with attribution and a description of the changes made here: the content has been substantially rewritten,
            expanded with implementation guidance, reorganized for study, and illustrated with original StackShade visuals.
          </p>
          <div className="mt-5 grid gap-3">
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-background p-4 hover:border-foreground/40">
              <span className="text-sm font-bold text-foreground">MDN — HTTP response status codes</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">Current reference and explanations for the five status-code families.</span>
            </a>
            <a href="https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-background p-4 hover:border-foreground/40">
              <span className="text-sm font-bold text-foreground">IANA — HTTP Status Code Registry</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">Registry assignments and the special status of unused, deprecated, and obsoleted values.</span>
            </a>
            <a href="https://www.rfc-editor.org/rfc/rfc9110.html" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-background p-4 hover:border-foreground/40">
              <span className="text-sm font-bold text-foreground">RFC 9110 — HTTP Semantics</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">The core HTTP semantics specification referenced by the registry and MDN.</span>
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Attrib_copyright_license" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-background p-4 hover:border-foreground/40">
              <span className="text-sm font-bold text-foreground">MDN — Attribution & copyright licensing</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">Reuse and attribution guidance for MDN content.</span>
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="lesson-kicker">FAQ</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl">Questions developers ask most</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="rounded-2xl border border-border bg-card/20 px-5 py-4 open:bg-card/40">
              <summary className="cursor-pointer list-none text-sm font-bold text-foreground">{faq.q}</summary>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-foreground p-6 text-background sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-background/10">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">NEXT STEP</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Go from response codes to the whole HTTP journey.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-background/70">
              The next useful mental model is how the browser gets from a URL through DNS, transport, TLS, HTTP, the edge,
              the application, and finally pixels.
            </p>
            <Link href="/blog/what-happens-when-you-type-url" className="mt-5 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2.5 text-xs font-bold text-foreground">
              Read the URL journey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <p className="text-xs leading-6 text-muted-foreground">
        Coverage note: this article expands every status code shown in MDN&apos;s current status-code hierarchy, including legacy
        entries 102, 305, 306, 418, and 510. The MDN hierarchy currently enumerates 60 non-legacy entries; the extra entries
        are retained because they are visible on the reference page and/or important when interpreting historical traffic.
        Total entries covered here: {activeEntries.length} non-legacy entries plus {legacyEntries.length} legacy or special entries.
      </p>
    </ArticleShell>
  );
}
