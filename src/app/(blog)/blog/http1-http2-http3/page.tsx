import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("http1-http2-http3")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function HttpVersionsPage() {
  return (
    <ArticleShell article={article}>
      <p>
        HTTP has kept the same core job for decades: define how clients and servers
        exchange web resources. The transport underneath it, however, has changed
        dramatically. HTTP/1.1, HTTP/2, and HTTP/3 represent different answers to
        the performance limits discovered as the web became more interactive.
      </p>

      <h2>HTTP/1.1: simple and widely compatible</h2>
      <p>
        HTTP/1.1 sends textual requests and responses over TCP. Persistent connections
        reduce connection setup overhead, but one connection still has ordering
        constraints that make packet loss and multiple resource downloads expensive.
        Browsers therefore opened several connections in parallel.
      </p>

      <h2>Why HTTP/1.1 became difficult to scale</h2>
      <p>
        Modern pages can require HTML, CSS, JavaScript, fonts, images, and API calls.
        Sending these resources efficiently over multiple TCP connections adds overhead.
        Head-of-line blocking at the application stream level and repeated headers also
        limit efficiency.
      </p>

      <h2>HTTP/2: multiplex many streams</h2>
      <p>
        HTTP/2 keeps TCP but introduces a binary framing layer and multiplexed streams.
        Multiple requests and responses can share one connection instead of waiting for
        each other in a strictly sequential sequence. Header compression with HPACK
        also reduces repetitive metadata.
      </p>

      <h2>Streams, frames, and priorities</h2>
      <p>
        HTTP/2 breaks messages into frames associated with streams. Because frames from
        multiple streams can be interleaved, a single connection can carry many
        resources at once. This removes a large amount of HTTP/1.1-era connection
        management complexity.
      </p>

      <h2>HTTP/3: HTTP over QUIC</h2>
      <p>
        HTTP/3 changes the transport from TCP to QUIC, which runs over UDP and provides
        reliable streams, encryption, connection migration, and modern congestion
        control mechanisms. Crucially, loss on one stream does not force unrelated
        streams to wait for the same ordered byte stream.
      </p>

      <h2>The practical comparison</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr><th>Version</th><th>Transport</th><th>Key idea</th><th>Typical strength</th></tr>
          </thead>
          <tbody>
            <tr><td>HTTP/1.1</td><td>TCP</td><td>Persistent connections</td><td>Compatibility and simplicity</td></tr>
            <tr><td>HTTP/2</td><td>TCP</td><td>Multiplexed streams</td><td>Efficient resource delivery</td></tr>
            <tr><td>HTTP/3</td><td>QUIC/UDP</td><td>Independent streams</td><td>Better behavior on lossy networks</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Does HTTP/3 make every website faster?</h2>
      <p>
        No. Protocol improvements are only one part of latency. Server processing,
        database queries, JavaScript execution, image size, caching, and geographic
        distance can dominate. HTTP/3 is especially interesting for environments where
        connection setup and packet loss are meaningful, but good application
        engineering still matters.
      </p>

      <h2>How to inspect it</h2>
      <p>
        Open browser DevTools, inspect the Network panel, and look for the protocol
        column. Command-line tools such as <code>curl -I</code> are also useful, while
        browser connection details can reveal whether a site negotiated h2 or h3.
      </p>

      <h2>What to learn next</h2>
      <p>
        Protocols make more sense when you connect them to the full page-load pipeline.
        Read
        <Link href="/blog/what-happens-when-you-type-url" className="underline ml-1">
          what really happens when you type a URL
        </Link>
        and then explore the networking foundation in our
        <Link href="/blog/osi-model-explained" className="underline ml-1">
          OSI model guide
        </Link>.
      </p>
    </ArticleShell>
  );
}
