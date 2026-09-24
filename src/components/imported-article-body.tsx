import Link from "next/link";
import type { ImportedBlog, ImportedBlock } from "@/lib/imported-blogs";
import { articleUrl } from "@/lib/articles";

function inline(text: string) {
  const parts = text.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      return <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{part.slice(2, -2)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function Block({ block }: { block: ImportedBlock }) {
  if (block.type === "p") {
    return <p>{inline(block.text ?? "")}</p>;
  }
  if (block.type === "bullets") {
    return <ul className="list-disc space-y-2 pl-5">{(block.items ?? []).map((item) => <li key={item}>{inline(item)}</li>)}</ul>;
  }
  if (block.type === "code") {
    return (
      <figure className="overflow-hidden rounded-2xl border border-border bg-card">
        {block.title && <figcaption className="border-b border-border/70 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{block.title}</figcaption>}
        <pre className="overflow-x-auto p-4 text-[11px] leading-6 text-foreground"><code>{block.code}</code></pre>
      </figure>
    );
  }
  if (block.type === "flow") {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/40 p-4">
        {(block.nodes ?? []).map((node, index) => (
          <span key={node + index} className="flex items-center gap-2">
            <span className="rounded-xl border border-border bg-background px-3 py-2 text-[11px] font-semibold text-foreground">{node}</span>
            {index < (block.nodes?.length ?? 0) - 1 && <span className="text-muted-foreground" aria-hidden="true">→</span>}
          </span>
        ))}
      </div>
    );
  }
  const tone = block.tone === "warning" ? "border-amber-500/30 bg-amber-500/5" : block.tone === "tip" ? "border-emerald-500/30 bg-emerald-500/5" : "border-border bg-card/40";
  return (
    <aside className={`rounded-2xl border p-4 ${tone}`}>
      <div className="lesson-kicker">{block.title}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{inline(block.text ?? "")}</p>
    </aside>
  );
}

export default function ImportedArticleBody({ blog }: { blog: ImportedBlog }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blog.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "StackShade Blog", item: "https://stack-shade.github.io/blog" },
      { "@type": "ListItem", position: 2, name: blog.title, item: articleUrl(blog.slug) },
    ],
  };
  const citationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: blog.title,
    description: blog.description,
    mainEntityOfPage: articleUrl(blog.slug),
    isBasedOn: { "@type": "CreativeWork", url: blog.sourceUrl, name: blog.sourceTitle },
    citation: blog.sources.map((source) => source[1]),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citationJsonLd) }} />

      <p className="text-lg leading-8 text-foreground sm:text-xl">{blog.intro}</p>

      <aside className="rounded-2xl border border-border bg-foreground px-5 py-5 text-background">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">The answer</div>
        <p className="mt-2 text-base leading-7">{blog.answer}</p>
      </aside>

      <aside className="rounded-2xl border border-border bg-card/30 px-5 py-4">
        <div className="lesson-kicker">SOURCE & ATTRIBUTION</div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This is an original StackShade rewrite and expansion based on <a className="underline underline-offset-4 hover:text-foreground" href={blog.sourceUrl} target="_blank" rel="noreferrer">{blog.sourceTitle}</a> by Imad Saddik, originally published {blog.sourceDate}. The original article and repository materials are credited here for provenance; the StackShade copy and hero illustration are newly written/designed.
        </p>
      </aside>

      {blog.sections.map((section) => (
        <section key={section.heading} className="space-y-5">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">{section.heading}</h2>
          <div className="space-y-5">{section.blocks.map((block, i) => <Block key={section.heading + i} block={block} />)}</div>
        </section>
      ))}

      <section className="space-y-5">
        <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Frequently asked questions</h2>
        <div className="space-y-3">
          {blog.faqs.map((faq) => (
            <details key={faq.q} className="rounded-2xl border border-border bg-card/20 px-4 py-3 open:bg-card/40">
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">{faq.q}</summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Keep building the mental model</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {blog.related.map((slug) => (
            <Link key={slug} href={"/blog/" + slug} className="rounded-2xl border border-border bg-card/20 p-4 transition-colors hover:border-foreground/40 hover:bg-card/40">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Related guide</span>
              <span className="mt-2 block text-sm font-semibold text-foreground">{slug.replace(/-/g, " ")}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">Sources & further reading</h2>
        <div className="space-y-2">
          {blog.sources.map((source) => (
            <a key={source[1]} href={source[1]} target="_blank" rel="noreferrer" className="block rounded-xl border border-border bg-card/20 px-4 py-3 text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">
              {source[0]}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
