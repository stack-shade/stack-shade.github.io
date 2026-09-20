import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("kafka-event-driven")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function KafkaEventDrivenPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Event-driven architecture lets services communicate by publishing events instead
        of requiring every consumer to be online at the exact same moment. Apache Kafka
        is a distributed event streaming platform commonly used when teams need durable,
        high-throughput streams that can be consumed independently by multiple services.
      </p>

      <h2>Event vs command</h2>
      <p>
        An event describes something that already happened: “OrderCreated” or
        “PaymentCaptured.” A command asks another component to do something. Keeping
        those meanings clear makes systems easier to reason about and prevents event
        topics from becoming disguised remote procedure calls.
      </p>

      <h2>Topics and partitions</h2>
      <p>
        Kafka stores records in topics, and topics are divided into partitions.
        Partitions provide the unit of parallelism and ordering. Records in the same
        partition are ordered, while records across different partitions should not be
        assumed to have one global order.
      </p>

      <h2>Producers</h2>
      <p>
        A producer writes records to a topic. Partitioning can use a key, which helps
        route related records to the same partition. For example, using customer ID as
        a key can preserve per-customer ordering while allowing different customers to
        be processed in parallel.
      </p>

      <h2>Consumers and consumer groups</h2>
      <p>
        Consumers read records. A consumer group shares the work of a topic across its
        members. When a member joins or leaves, partitions may be reassigned. Different
        groups can read the same events independently, allowing analytics, search
        indexing, notifications, and billing to evolve separately.
      </p>

      <h2>Offsets and replay</h2>
      <p>
        Kafka consumers track offsets so processing can resume. Because data can remain
        on disk for a configured retention period, a consumer can often replay older
        events. This is different from a transient queue where a message disappears as
        soon as it is acknowledged.
      </p>

      <h2>Delivery semantics</h2>
      <p>
        Exactly-once behavior is a system-level property, not a simple checkbox.
        Depending on the design, applications may use at-most-once, at-least-once, or
        stronger transactional patterns. At-least-once delivery is common, which means
        consumers should make important operations idempotent.
      </p>

      <h2>Failure handling</h2>
      <ul>
        <li>Design consumers so retries do not duplicate irreversible side effects.</li>
        <li>Track processing failures separately from successful events.</li>
        <li>Monitor consumer lag, partition health, throughput, and error rates.</li>
        <li>Choose retention and partition counts based on workload rather than guesses.</li>
      </ul>

      <h2>When event-driven architecture helps</h2>
      <p>
        It is especially useful when many independent consumers need the same facts,
        when workloads should be decoupled in time, or when events need to be replayed
        for rebuilding a derived system. It also introduces operational complexity, so
        a simple synchronous API is often better for simple request-response workflows.
      </p>

      <p>
        Kafka becomes easier to understand once you connect it to the bigger distributed
        system. Compare that model with our
        <Link href="/blog/cap-theorem-consistency" className="underline ml-1">
          consistency and failure guide
        </Link>
        and
        <Link href="/blog/system-design-internals" className="underline ml-1">
          scaling architecture deep dive
        </Link>.
      </p>
    </ArticleShell>
  );
}
