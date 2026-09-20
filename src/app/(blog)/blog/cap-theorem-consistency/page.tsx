import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("cap-theorem-consistency")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function CapTheoremPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Distributed systems become difficult when data is split across machines that can
        fail independently and communicate over networks. CAP is a useful way to reason
        about one specific tradeoff: what guarantees a system can provide when a network
        partition prevents nodes from communicating reliably.
      </p>

      <h2>The three terms</h2>
      <ul>
        <li><strong>Consistency:</strong> reads behave according to a defined ordering of writes.</li>
        <li><strong>Availability:</strong> a non-failing node returns a response to a request.</li>
        <li><strong>Partition tolerance:</strong> the system continues operating despite a communication partition.</li>
      </ul>

      <h2>The important nuance</h2>
      <p>
        CAP is not a menu where an engineer simply picks two letters during normal
        operation. When a partition occurs, a distributed system must choose whether to
        reject or delay some operations in order to preserve stronger consistency, or
        continue serving operations with weaker consistency guarantees.
      </p>

      <h2>A simple example</h2>
      <p>
        Imagine two replicas of an account service. A network partition means replica A
        cannot reach replica B. A client asks A to withdraw money while another client
        updates B. If the system continues accepting both operations independently, it
        may temporarily allow states that cannot be presented as one globally ordered
        history.
      </p>

      <h2>Consistency is a spectrum</h2>
      <p>
        Real systems often expose more than “strong” or “eventual” consistency.
        Linearizability gives operations a behavior close to a single global timeline.
        Eventual consistency allows replicas to converge after updates propagate.
        Session-level guarantees can provide useful properties for a single user without
        imposing the cost of global ordering everywhere.
      </p>

      <h2>Availability has context too</h2>
      <p>
        Saying a system is “available” is incomplete without defining the failure model,
        timeout behavior, and which operations are allowed. A system can return quickly
        but still provide stale or rejected results depending on its contract.
      </p>

      <h2>Design questions to ask</h2>
      <ol>
        <li>What must never happen, even during a failure?</li>
        <li>Can temporary stale reads be tolerated?</li>
        <li>Which operations can safely be retried?</li>
        <li>How are conflicting writes detected or merged?</li>
        <li>What happens when a replica or region becomes unreachable?</li>
      </ol>

      <h2>How this connects to system design</h2>
      <p>
        CAP becomes useful when you connect it to replication, quorum reads and writes,
        failover, leader election, and client retry behavior. Our
        <Link href="/blog/system-design-internals" className="underline ml-1">
          distributed systems deep dive
        </Link>
        explores those mechanisms from an architecture perspective.
      </p>

      <h2>Key takeaway</h2>
      <p>
        CAP is best used as a failure-mode reasoning tool. It does not say that one
        database is universally better than another; it asks what behavior your product
        can accept when the network itself stops cooperating.
      </p>
    </ArticleShell>
  );
}
