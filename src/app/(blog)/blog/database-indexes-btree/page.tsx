import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("database-indexes-btree")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function DatabaseIndexesPage() {
  return (
    <ArticleShell article={article}>
      <p>
        A database index is an extra data structure that helps a database find rows
        without scanning an entire table. The tradeoff is important: an index can
        dramatically reduce read work, but it consumes memory and storage and adds work
        to inserts, updates, and deletes.
      </p>

      <h2>Table scan vs indexed lookup</h2>
      <p>
        Imagine a users table with ten million rows and a query filtering by email.
        Without an appropriate index, the database may inspect row after row. An index
        lets it navigate a smaller structure to locate matching keys and then fetch the
        required table rows.
      </p>

      <h2>Why B-trees are so common</h2>
      <p>
        B-trees keep keys ordered while keeping the tree relatively shallow. Each node
        can contain many keys, which reduces the number of levels that must be visited.
        Database pages map naturally onto this structure, making B-trees a practical
        choice for equality, range, and ordered queries.
      </p>

      <h2>Equality and range queries</h2>
      <p>
        An index on <code>created_at</code> can help answer queries such as
        “show orders created after Tuesday” because the keys are ordered. This is one
        reason indexes are useful for sorting, range predicates, and prefix-compatible
        access patterns.
      </p>

      <h2>Composite indexes</h2>
      <p>
        A composite index stores multiple columns in a defined order. For a query like
        <code>WHERE tenant_id = ? AND created_at &gt; ?</code>, an index beginning with
        <code>tenant_id, created_at</code> can be a strong fit. Column order matters
        because the database navigates the index from the leading columns.
      </p>

      <h2>Covering indexes</h2>
      <p>
        Sometimes the index contains every column needed by a query. The database can
        then answer the request using the index alone, avoiding additional table lookups.
        This can reduce random I/O, but wider indexes cost more storage and make writes
        more expensive.
      </p>

      <h2>When an index hurts</h2>
      <ul>
        <li>Every additional index adds write and maintenance cost.</li>
        <li>Low-selectivity columns may not benefit much from a traditional index.</li>
        <li>Large or unused indexes consume storage and memory.</li>
        <li>An index that does not match the query shape can be effectively ignored.</li>
      </ul>

      <h2>Use the query planner</h2>
      <p>
        Do not choose indexes by intuition alone. PostgreSQL, MySQL, and other systems
        expose query plans. In PostgreSQL, <code>EXPLAIN (ANALYZE, BUFFERS)</code> can
        reveal whether an index was used and where the query spent time.
      </p>

      <pre className="overflow-x-auto rounded-xl border border-border bg-muted/20 p-4 text-sm"><code>{`CREATE INDEX idx_orders_tenant_created
ON orders (tenant_id, created_at);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total
FROM orders
WHERE tenant_id = 42
  AND created_at >= '2026-09-01';`}</code></pre>

      <h2>A useful mental model</h2>
      <p>
        Think of an index as a library catalog. The catalog costs space and has to be
        updated when books move, but it saves you from walking every shelf. Good database
        design balances lookup speed, write cost, memory, and the workload's real query
        patterns.
      </p>

      <p>
        For the next layer of performance, connect indexes with
        <Link href="/blog/redis-caching" className="underline ml-1">
          caching strategies
        </Link>
        and
        <Link href="/blog/cap-theorem-consistency" className="underline ml-1">
          distributed consistency
        </Link>.
      </p>
    </ArticleShell>
  );
}
