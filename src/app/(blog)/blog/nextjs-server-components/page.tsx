/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("nextjs-server-components")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function NextjsServerComponentsPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Next.js App Router changes the default way a React application thinks about
        rendering. Server Components run on the server and can access server-side data
        without shipping their implementation to the browser. Client Components are used
        when a UI needs browser state, effects, event handlers, or other client-only APIs.
      </p>

      <h2>Why server and client boundaries matter</h2>
      <p>
        A browser does not need every piece of application code. If a component only
        reads data and renders HTML, keeping it on the server can reduce client-side
        JavaScript. Interactive controls such as a search box, drag-and-drop editor, or
        button with local state can be isolated into a Client Component.
      </p>

      <h2>The default is intentional</h2>
      <p>
        In the App Router, a component is a Server Component unless it opts into client
        behavior with <code>"use client"</code>. This encourages developers to make the
        client boundary as small as practical instead of turning an entire page into one
        large client bundle.
      </p>

      <h2>Data fetching on the server</h2>
      <p>
        Server Components can fetch data close to the rendering environment. The result
        can be used directly to produce the page without first loading an API route into
        the browser just to fetch the same data. Authentication and database access also
        remain on the server where appropriate.
      </p>

      <h2>When to use a Client Component</h2>
      <ul>
        <li>Interactive event handlers such as onClick or onChange.</li>
        <li>Browser APIs such as localStorage, geolocation, or window.</li>
        <li>Client-side state and effects.</li>
        <li>Third-party components that require a browser runtime.</li>
      </ul>

      <h2>A common mistake</h2>
      <p>
        Adding <code>"use client"</code> to a high-level layout or page can pull much
        more code into the browser than necessary. Start with the interactive leaf
        component and move the boundary upward only when the composition actually
        requires it.
      </p>

      <h2>Streaming and loading states</h2>
      <p>
        App Router applications can stream parts of a page as data becomes available.
        Loading UI can make slow sections feel responsive while the rest of the interface
        is already visible. This is a rendering strategy, not a substitute for fixing
        slow queries or expensive server work.
      </p>

      <h2>SEO and progressive rendering</h2>
      <p>
        Server-rendered content is naturally useful for search engines because important
        text can be delivered as part of the initial document. Good metadata, canonical
        URLs, headings, internal links, and genuinely useful copy still matter; rendering
        technology alone does not create search value.
      </p>

      <h2>A practical architecture</h2>
      <p>
        Think of the server as the place for data, composition, and secure operations,
        and the browser as the place for interaction. This separation can make a
        production application easier to reason about and can keep client bundles small.
      </p>

      <p>
        For the networking side of a modern web app, continue with our
        <Link href="/blog/http1-http2-http3" className="underline ml-1">
          HTTP versions guide
        </Link>
        and our full
        <Link href="/blog/what-happens-when-you-type-url" className="underline ml-1">
          browser request walkthrough
        </Link>.
      </p>
    </ArticleShell>
  );
}
