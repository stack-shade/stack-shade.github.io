import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("what-happens-when-you-type-url")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function WhatHappensWhenYouTypeUrlPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Typing <code>https://example.com</code> into a browser looks like one tiny action,
        but a surprising amount of engineering happens before the first pixels appear.
        Your browser has to understand the URL, discover an address, establish network
        connections, negotiate security, send an HTTP request, receive a response, and
        turn bytes into a page.
      </p>

      <h2>1. The browser parses the URL</h2>
      <p>
        A URL is not just a string. The browser separates the scheme, hostname, optional
        port, path, query string, and fragment. For example,
        <code>https://example.com/docs?id=42</code> means HTTPS is the scheme,
        <code>example.com</code> is the host, <code>/docs</code> is the path, and
        <code>?id=42</code> is the query string.
      </p>

      <h2>2. DNS turns a name into an address</h2>
      <p>
        Networks route packets using IP addresses, not human-friendly domain names.
        The browser therefore needs a DNS answer for the hostname. It can often reuse
        a browser or operating-system cache; otherwise the resolver walks the DNS
        hierarchy to find an authoritative answer.
      </p>
      <p>
        A useful mental model is: the domain name is a contact name, while the IP
        address is the destination. For a deeper explanation, read our
        <Link href="/blog/dns-resolution-explained" className="underline ml-1">
          DNS resolution guide
        </Link>.
      </p>

      <h2>3. The machine reaches the server</h2>
      <p>
        Once an address is known, the operating system decides how to reach it. On a
        local network this can involve ARP or IPv6 neighbor discovery, then switches,
        routers, and an ISP carry packets toward the destination. Real requests may
        cross multiple autonomous systems before reaching a CDN or origin server.
      </p>

      <h2>4. HTTPS establishes a secure connection</h2>
      <p>
        With HTTPS, the client negotiates TLS with the server. Certificate validation
        helps the browser verify that the server controls the requested domain, while
        the handshake establishes symmetric encryption keys for the session.
        Modern browsers commonly use HTTP/2 or HTTP/3 on top of that secure channel.
      </p>

      <h2>5. The browser sends an HTTP request</h2>
      <p>
        The request contains a method such as GET, the target path, protocol headers,
        and often cookies or other metadata. Servers may route the request through a
        CDN, reverse proxy, load balancer, API gateway, or application service before
        it reaches the code responsible for generating the response.
      </p>

      <h2>6. The server builds the response</h2>
      <p>
        A response has a status code, headers, and a body. The body might be HTML,
        JSON, an image, JavaScript, CSS, or another representation. A cache can
        sometimes answer immediately; otherwise the application may read a database,
        call another service, render HTML, or perform authorization checks first.
      </p>

      <h2>7. The browser builds the page</h2>
      <p>
        The browser parses HTML into a DOM, downloads referenced stylesheets and
        scripts, computes layout, paints pixels, and schedules additional work.
        JavaScript can change the DOM, request API data, and trigger more rendering.
        This is why a page can visibly appear before it is completely finished.
      </p>

      <h2>Where latency comes from</h2>
      <p>
        A slow page is rarely caused by one magical bottleneck. DNS lookup, connection
        setup, TLS, server processing, database work, network transfer, script
        execution, layout, and image decoding can each add time. Performance work is
        therefore about measuring the whole chain rather than guessing.
      </p>

      <h2>A practical debugging checklist</h2>
      <ul>
        <li>Use browser DevTools Network to inspect DNS, connection, TTFB, download, and render timings.</li>
        <li>Check whether a CDN or cache is serving static assets close to users.</li>
        <li>Inspect server logs for slow database queries and downstream API calls.</li>
        <li>Reduce unnecessary JavaScript and defer work that is not required for the first screen.</li>
      </ul>

      <h2>Key takeaway</h2>
      <p>
        “Open a website” is really a distributed pipeline: name resolution, routing,
        secure transport, HTTP, server architecture, and browser rendering all work
        together. Learning this chain gives you a strong foundation for networking,
        system design, web performance, and debugging.
      </p>
    </ArticleShell>
  );
}
