import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("dns-resolution-explained")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function DnsResolutionExplainedPage() {
  return (
    <ArticleShell article={article}>
      <p>
        DNS, the Domain Name System, is the naming layer that lets people use names such
        as <code>stack-shade.github.io</code> instead of remembering numeric IP
        addresses. It looks simple at the browser level, but DNS is a distributed,
        cached hierarchy designed to scale to an enormous number of queries.
      </p>

      <h2>Why DNS exists</h2>
      <p>
        Humans prefer stable names while networks need routable addresses. DNS decouples
        the two. A domain can move between servers or CDNs while the public name remains
        the same, as long as DNS records are updated.
      </p>

      <h2>The hierarchy</h2>
      <p>
        DNS is organized from right to left. The root zone delegates to top-level
        domains such as <code>.com</code>, <code>.org</code>, and country-code TLDs.
        A TLD then points queries toward authoritative name servers for a specific
        domain.
      </p>

      <h2>Recursive vs authoritative servers</h2>
      <p>
        Your device usually talks to a recursive resolver. The resolver performs work
        on your behalf and caches answers. Authoritative servers are the source of
        truth for a domain's records. This separation keeps end-user queries fast
        while distributing responsibility across the hierarchy.
      </p>

      <h2>Step-by-step resolution</h2>
      <ol>
        <li>The browser and operating system check local caches.</li>
        <li>If necessary, the configured recursive resolver is queried.</li>
        <li>The resolver asks a root server where to find the relevant TLD.</li>
        <li>The TLD server points the resolver to the domain's authoritative servers.</li>
        <li>The authoritative server returns a record such as A or AAAA.</li>
        <li>The resolver caches the result for its TTL and returns it to the client.</li>
      </ol>

      <h2>Important record types</h2>
      <p>
        An <strong>A</strong> record maps a hostname to an IPv4 address, while
        <strong>AAAA</strong> is used for IPv6. <strong>CNAME</strong> creates an
        alias to another hostname. <strong>MX</strong> controls mail delivery.
        <strong>TXT</strong> stores text used for many verification and policy
        mechanisms, including email authentication.
      </p>

      <h2>What TTL really changes</h2>
      <p>
        Every cacheable DNS answer can have a time-to-live. A shorter TTL lets changes
        propagate through caches sooner but can increase resolver traffic. A longer TTL
        reduces query volume but means changes may remain cached longer.
      </p>

      <h2>DNS and CDNs</h2>
      <p>
        DNS is often part of traffic steering. A CDN can answer a hostname with an
        edge address chosen according to geography, availability, load, or network
        policy. This is one reason a single domain can serve users from different
        physical locations.
      </p>

      <h2>Useful debugging commands</h2>
      <pre className="overflow-x-auto rounded-xl border border-border bg-muted/20 p-4 text-sm"><code>{`dig example.com
dig A example.com
dig AAAA example.com
dig +trace example.com
nslookup example.com`}</code></pre>

      <p>
        The <code>+trace</code> command is especially useful for learning because it
        shows the delegation chain instead of hiding it behind a recursive resolver.
      </p>

      <h2>Common failure modes</h2>
      <ul>
        <li>A missing or incorrect record can produce NXDOMAIN or other resolution errors.</li>
        <li>Stale cached answers can make a recently changed domain appear inconsistent.</li>
        <li>DNS may be healthy while the actual server, TLS configuration, or HTTP layer is failing.</li>
      </ul>

      <h2>Related reading</h2>
      <p>
        Once DNS makes sense, the next step is understanding the rest of the request
        path. Continue with
        <Link href="/blog/what-happens-when-you-type-url" className="underline ml-1">
          what happens when you type a URL
        </Link>
        or compare
        <Link href="/blog/http1-http2-http3" className="underline ml-1">
          HTTP/1.1, HTTP/2, and HTTP/3
        </Link>.
      </p>
    </ArticleShell>
  );
}
