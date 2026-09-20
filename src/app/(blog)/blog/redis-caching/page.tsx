import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("redis-caching")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function RedisCachingPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Redis is commonly introduced as a fast key-value store, but its real value in
        application architecture is more specific: it gives a service a very fast place
        to keep data that is cheaper to access than recomputing it or repeatedly reading
        a primary database.
      </p>

      <h2>What a cache actually does</h2>
      <p>
        A cache stores a copy of data closer to the code that needs it. A request checks
        the cache first. When the value is present, the application avoids an expensive
        database query or downstream API call. When it is absent, the application loads
        the source of truth and may populate the cache.
      </p>

      <h2>Cache-aside: the common pattern</h2>
      <p>
        In cache-aside, the application owns cache reads and writes. On a miss, it reads
        from the database and then stores the result in Redis with an expiry. This is
        simple and works well when the cache is an optimization rather than the canonical
        source of truth.
      </p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-muted/20 p-4 text-sm"><code>{`value = redis.get(key)

if value is missing:
    value = database.get(id)
    redis.set(key, value, ttl=300)

return value`}</code></pre>

      <h2>TTL is a policy, not a magic number</h2>
      <p>
        A five-minute TTL is not automatically correct. The right value depends on how
        quickly data changes, how expensive stale data is, and how much database load the
        application needs to absorb. Short TTLs reduce staleness but create more misses.
      </p>

      <h2>Cache invalidation</h2>
      <p>
        When data changes, cached copies can become stale. One strategy is to delete or
        update the key whenever the source data changes. Another is to accept bounded
        staleness and rely on TTL expiration. The correct approach depends on the product
        requirement.
      </p>

      <h2>Hot keys and stampedes</h2>
      <p>
        A very popular key can become a hot spot. Worse, when a popular key expires,
        many requests can miss at once and all hit the database. This cache stampede can
        overwhelm the system precisely when traffic is high.
      </p>

      <p>
        Common protections include request coalescing, randomized TTLs, stale-while-
        revalidate behavior, and proactive refresh of very hot data.
      </p>

      <h2>What Redis stores</h2>
      <p>
        Redis supports strings as well as structures such as lists, sets, sorted sets,
        hashes, and streams. The data structure should match the operation you need.
        For example, sorted sets are useful for ranked collections, while hashes can
        represent compact object-like records.
      </p>

      <h2>Cache consistency questions</h2>
      <ul>
        <li>Can users temporarily see an older value?</li>
        <li>Which service is the source of truth?</li>
        <li>What happens if Redis becomes unavailable?</li>
        <li>How is a cache entry invalidated after a write?</li>
      </ul>

      <h2>When not to add Redis</h2>
      <p>
        A cache is not free. It adds another network hop, another failure mode, another
        data lifecycle, and operational overhead. Start by measuring the actual bottleneck.
        If the database query is already fast and traffic is low, adding a distributed
        cache may provide little value.
      </p>

      <p>
        This is the same performance mindset used in
        <Link href="/blog/database-indexes-btree" className="underline ml-1">
          database indexing
        </Link>:
        optimize the workload you can actually measure.
      </p>
    </ArticleShell>
  );
}
