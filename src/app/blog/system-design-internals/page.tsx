import React from "react";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Database, 
  Network, 
  Cpu, 
  GitBranch, 
  Layers 
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { LoadBalancerSimulator } from "@/components/load-balancer-simulator";

export const metadata: Metadata = {
  title: "Scaling High-Throughput Distributed Systems: A Visual Deep Dive",
  description: "Learn how to scale backend clusters using Layer 4/7 load balancers, caching strategies, consistent hashing rings, and event-driven architectures.",
  alternates: {
    canonical: "https://stack-shade.github.io/blog/system-design-internals",
  },
  openGraph: {
    title: "Scaling High-Throughput Distributed Systems: A Visual Deep Dive | StackShade Blog",
    description: "Learn how to scale backend clusters using Layer 4/7 load balancers, caching strategies, consistent hashing rings, and event-driven architectures.",
    url: "https://stack-shade.github.io/blog/system-design-internals",
    siteName: "StackShade",
    images: [
      {
        url: "https://stack-shade.github.io/blog/system-design-banner.png",
        width: 1200,
        height: 630,
        alt: "Scaling Distributed Systems Visual Diagram",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2026-07-18T00:00:00.000Z",
    authors: ["Shaswat Raj"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaling High-Throughput Distributed Systems: A Visual Deep Dive | StackShade Blog",
    description: "Learn how to scale backend clusters using Layer 4/7 load balancers, caching strategies, consistent hashing rings, and event-driven architectures.",
    images: ["https://stack-shade.github.io/blog/system-design-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ArticlePage() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-foreground/20 selection:text-foreground bg-background text-foreground overflow-hidden">
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Scaling High-Throughput Distributed Systems: A Visual Deep Dive",
            "description": "Learn how to scale backend clusters using Layer 4/7 load balancers, caching strategies, consistent hashing rings, and event-driven architectures.",
            "image": "https://stack-shade.github.io/blog/system-design-banner.png",
            "datePublished": "2026-07-18T00:00:00.000Z",
            "author": {
              "@type": "Person",
              "name": "Shaswat Raj",
              "url": "https://sh20raj.github.io/"
            },
            "publisher": {
              "@type": "Organization",
              "name": "StackShade",
              "logo": {
                "@type": "ImageObject",
                "url": "https://stack-shade.github.io/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://stack-shade.github.io/blog/system-design-internals"
            }
          })
        }}
      />

      {/* Navbar */}
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back Link */}
        <div className="mb-10">
          <a 
            href="/blog" 
            className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Articles
          </a>
        </div>

        {/* Article Meta */}
        <article className="space-y-12">
          {/* Header */}
          <header className="space-y-6">
            <Badge variant="outline" className="border-border text-foreground uppercase text-[10px] tracking-wider font-semibold">
              Advanced Architecture
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Scaling High-Throughput Distributed Systems: A Visual Deep Dive
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono border-y border-border/60 py-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                Shaswat Raj
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                July 18, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                12 min read
              </span>
            </div>
          </header>

          {/* Banner */}
          <div className="border border-border rounded-2xl overflow-hidden aspect-video relative bg-muted/10">
            <img 
              src="/blog/system-design-banner.png" 
              alt="System Design Architecture Diagram" 
              className="object-cover w-full h-full"
            />
          </div>

          {/* Article Content */}
          <div className="space-y-10 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              When a software system transitions from handling a few hundred requests a second to millions, the primary bottleneck shifts from writing efficient code to coordinate resource communications. Scaling is, at its core, the study of managing bottlenecks, reducing latency, and ensuring data consensus across network boundaries.
            </p>
            <p>
              In this visual deep dive, we will break down the crucial layers of high-scale distributed systems: load balancers, cache consistency patterns, consistent hashing rings, messaging guarantees, and consensus algorithms.
            </p>

            <hr className="border-border/60" />

            {/* Section 1: Load Balancing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Network className="w-6 h-6 text-foreground" />
                1. Load Balancing: Layer 4 vs Layer 7 Routing
              </h2>
              <p>
                Load balancers act as traffic cops, distributing requests across web servers. However, they route traffic at different abstraction levels of the OSI model:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <Card className="bg-card/20 border-border">
                  <CardHeader>
                    <Badge variant="outline" className="w-max mb-1">Layer 4 (Transport)</Badge>
                    <CardTitle className="text-base font-bold">L4 Routing (TCP/UDP)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2 text-muted-foreground">
                    <p>
                      <strong>How it works:</strong> Operates at the transport layer, inspecting packet IP addresses and port numbers. It does not parse the application payloads.
                    </p>
                    <p>
                      <strong>Pros:</strong> Extremely fast, low CPU consumption, secures TCP connections directly.
                    </p>
                    <p>
                      <strong>Cons:</strong> Cannot route based on HTTP paths, cookies, or headers. No smart SSL termination.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/20 border-border">
                  <CardHeader>
                    <Badge variant="outline" className="w-max mb-1">Layer 7 (Application)</Badge>
                    <CardTitle className="text-base font-bold">L7 Routing (HTTP/HTTPS)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2 text-muted-foreground">
                    <p>
                      <strong>How it works:</strong> Operates at the application layer. Parses full HTTP headers, cookies, query parameters, and payload data.
                    </p>
                    <p>
                      <strong>Pros:</strong> Smart routing (e.g., routing <code>/api</code> to service A, <code>/static</code> to CDN), SSL termination, header injection.
                    </p>
                    <p>
                      <strong>Cons:</strong> Higher latency, CPU intensive (decrypts SSL packets to read payloads).
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* L4 vs L7 Diagram */}
              <div className="border border-border/80 rounded-xl p-4 bg-muted/5 flex flex-col items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">Layer 4 vs Layer 7 Architecture Flow</span>
                <svg viewBox="0 0 600 200" className="w-full max-w-lg text-foreground fill-none stroke-current" strokeWidth="1.5">
                  {/* L4 Path */}
                  <text x="10" y="45" fontSize="10" className="font-mono stroke-none fill-muted-foreground">Client Packets</text>
                  <rect x="10" y="60" width="70" height="35" rx="5" />
                  <text x="45" y="80" fontSize="10" textAnchor="middle" className="stroke-none fill-foreground">Clients</text>
                  
                  <path d="M 80 77 L 160 77" strokeDasharray="3 3" />
                  <polygon points="160,77 155,74 155,80" className="fill-foreground" />
                  
                  <rect x="160" y="30" width="100" height="35" rx="5" />
                  <text x="210" y="52" fontSize="9" textAnchor="middle" className="stroke-none fill-foreground">L4 Load Balancer</text>
                  <text x="210" y="61" fontSize="7" textAnchor="middle" className="stroke-none fill-muted-foreground">IP/TCP Headers Only</text>
                  
                  <path d="M 260 47 L 380 47" />
                  <polygon points="380,47 375,44 375,50" className="fill-foreground" />
                  
                  {/* L7 Path */}
                  <path d="M 80 77 L 160 137" strokeDasharray="3 3" />
                  <polygon points="160,137 154,133 158,139" className="fill-foreground" />

                  <rect x="160" y="120" width="100" height="35" rx="5" />
                  <text x="210" y="142" fontSize="9" textAnchor="middle" className="stroke-none fill-foreground">L7 Load Balancer</text>
                  <text x="210" y="151" fontSize="7" textAnchor="middle" className="stroke-none fill-muted-foreground">Parses HTTP Headers</text>
                  
                  <path d="M 260 137 L 380 137" />
                  <polygon points="380,137 375,134 375,140" className="fill-foreground" />

                  {/* Backend Servers */}
                  <rect x="380" y="30" width="110" height="35" rx="5" />
                  <text x="435" y="52" fontSize="9" textAnchor="middle" className="stroke-none fill-foreground">App Server Pool A</text>

                  <rect x="380" y="120" width="110" height="35" rx="5" />
                  <text x="435" y="142" fontSize="9" textAnchor="middle" className="stroke-none fill-foreground">App Server Pool B</text>
                </svg>
              </div>

              <p className="pt-2">
                Experiment below with how different load balancer algorithms distribute traffic to backends:
              </p>
              
              {/* Simulator Component */}
              <LoadBalancerSimulator />
            </section>

            <hr className="border-border/60" />

            {/* Section 2: Caching */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Cpu className="w-6 h-6 text-foreground" />
                2. Caching Strategies: Cache-Aside vs Write-Behind
              </h2>
              <p>
                Caching is the single most effective way to optimize database load, but it introduces the hardest problem in computer science: cache invalidation.
              </p>

              <div className="space-y-4">
                <div className="border border-border rounded-xl p-5 bg-background/25">
                  <h4 className="font-bold text-foreground mb-1 text-sm sm:text-base">A. Cache-Aside (Lazy Loading)</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The application queries the cache first. If there is a cache miss, it reads the data from the database, writes it to the cache, and returns it to the client.
                    <br />
                    <em>Tradeoff:</em> Cache misses suffer double-query latency. Data can become stale if updates go directly to the DB without purging cache.
                  </p>
                </div>

                <div className="border border-border rounded-xl p-5 bg-background/25">
                  <h4 className="font-bold text-foreground mb-1 text-sm sm:text-base">B. Write-Behind (Write-Back)</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The application writes data directly to the cache. An asynchronous worker or queue subsequently syncs this cache change back to the database.
                    <br />
                    <em>Tradeoff:</em> Extremely low write latency, but if the cache crashes before the data syncs to the DB, data is lost.
                  </p>
                </div>
              </div>

              <div className="border border-border rounded-xl p-4 bg-muted/5 space-y-4">
                <h4 className="text-sm font-bold text-foreground">Advanced Bug: The Cache Stampede (Thundering Herd)</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  When a hot cache key expires, thousands of concurrent requests might hit the cache simultaneously, see a miss, and query the database at the exact same moment. This can easily trigger database lockouts.
                </p>
                <div className="bg-background/40 border border-border p-4 rounded-lg font-mono text-xs text-foreground">
                  <span className="text-muted-foreground">// Mitigating Cache Stampede using Single-Flight / Mutex Locking</span>
                  <br />
                  <span className="text-violet-400">func</span> <span className="text-cyan-400">FetchHotKey</span>(key string) (Data, error) &#123;
                  <br />
                  &nbsp;&nbsp;val, ok := Cache.Get(key)
                  <br />
                  &nbsp;&nbsp;<span className="text-violet-400">if</span> ok &#123; <span className="text-violet-400">return</span> val, nil &#125;
                  <br />
                  <br />
                  &nbsp;&nbsp;<span className="text-muted-foreground">// Lock so only 1 thread fetches from DB</span>
                  <br />
                  &nbsp;&nbsp;Mutex.Lock(key)
                  <br />
                  &nbsp;&nbsp;<span className="text-violet-400">defer</span> Mutex.Unlock(key)
                  <br />
                  <br />
                  &nbsp;&nbsp;<span className="text-muted-foreground">// Double-check cache inside lock</span>
                  <br />
                  &nbsp;&nbsp;val, ok = Cache.Get(key)
                  <br />
                  &nbsp;&nbsp;<span className="text-violet-400">if</span> ok &#123; <span className="text-violet-400">return</span> val, nil &#125;
                  <br />
                  <br />
                  &nbsp;&nbsp;dbVal := Database.Query(key)
                  <br />
                  &nbsp;&nbsp;Cache.Set(key, dbVal, expire)
                  <br />
                  &nbsp;&nbsp;<span className="text-violet-400">return</span> dbVal, nil
                  <br />
                  &#125;
                </div>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Section 3: Consistent Hashing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Database className="w-6 h-6 text-foreground" />
                3. Sharding & Consistent Hashing Rings
              </h2>
              <p>
                When a database grows too large for a single machine, we shard (partition) it. However, simple sharding algorithms like <code>Hash(key) % N</code> (where N is the number of database servers) have a critical flaw: if N changes (adding/removing a node), almost all keys map to new servers. This triggers a massive database query cascade as cache hit rates drop to zero.
              </p>
              <p>
                <strong>Consistent Hashing</strong> solves this by mapping both servers and keys onto a circular ring (hash ring):
              </p>

              {/* Hash Ring SVG Diagram */}
              <div className="border border-border/80 rounded-xl p-4 bg-muted/5 flex flex-col items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">The 360° Consistent Hashing Ring</span>
                <svg viewBox="0 0 300 300" className="w-64 h-64 text-foreground fill-none stroke-current" strokeWidth="1.5">
                  {/* Circle */}
                  <circle cx="150" cy="150" r="100" strokeDasharray="3 3" />
                  
                  {/* Nodes */}
                  <circle cx="150" cy="50" r="8" className="fill-foreground" />
                  <text x="150" y="38" fontSize="8" textAnchor="middle" className="stroke-none fill-foreground font-semibold font-mono">Node A</text>

                  <circle cx="236" cy="200" r="8" className="fill-foreground" />
                  <text x="250" y="204" fontSize="8" className="stroke-none fill-foreground font-semibold font-mono">Node B</text>

                  <circle cx="64" cy="200" r="8" className="fill-foreground" />
                  <text x="50" y="204" fontSize="8" textAnchor="end" className="stroke-none fill-foreground font-semibold font-mono">Node C</text>

                  {/* Keys */}
                  <circle cx="200" cy="70" r="4" className="fill-muted-foreground" />
                  <text x="210" y="73" fontSize="8" className="stroke-none fill-muted-foreground font-mono">Key 1 (routes to B)</text>
                  
                  <circle cx="95" cy="90" r="4" className="fill-muted-foreground" />
                  <text x="90" y="85" fontSize="8" textAnchor="end" className="stroke-none fill-muted-foreground font-mono">Key 2 (routes to A)</text>

                  {/* Direction arrows */}
                  <path d="M 200 70 A 100 100 0 0 1 236 200" strokeDasharray="2 2" />
                  <polygon points="236,200 231,194 227,198" className="fill-foreground" />

                  <path d="M 95 90 A 100 100 0 0 1 150 50" strokeDasharray="2 2" />
                  <polygon points="150,50 144,55 149,57" className="fill-foreground" />
                </svg>
              </div>

              <p>
                Keys are hashed and mapped to a position on the ring. The system traverses clockwise to find the first server node. When a node is added or removed, only a fraction of keys (roughly <code>K/N</code>) need to be remapped to other nodes, leaving the rest of the database cluster unaffected.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 4: Message Queues */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Layers className="w-6 h-6 text-foreground" />
                4. Message Queues & Event Delivery Guarantees
              </h2>
              <p>
                Event-driven microservices rely on message brokers like Kafka or RabbitMQ. When designing event pipelines, you must choose a delivery guarantee:
              </p>

              <div className="space-y-4">
                <div className="border border-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-foreground text-sm sm:text-base">1. At-Most-Once Delivery</span>
                    <Badge variant="outline">No Retries</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Messages are dispatched without confirmation. If a network blip occurs or a worker crashes, the event is permanently lost.
                  </p>
                </div>

                <div className="border border-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-foreground text-sm sm:text-base">2. At-Least-Once Delivery</span>
                    <Badge variant="outline">Retries + Idempotency</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    The producer keeps retrying until it receives an acknowledgment. This guarantees no message loss, but can deliver duplicates.
                    <br />
                    <strong>Architectural Solution:</strong> Workers must be <em>idempotent</em> (handling the same event twice results in the same state) by using unique idempotency keys inside a relational database table (e.g., <code>transaction_id</code> under a UNIQUE constraint).
                  </p>
                </div>

                <div className="border border-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-foreground text-sm sm:text-base">3. Exactly-Once Delivery</span>
                    <Badge variant="outline">Transactions</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Guarantees that a message is processed exactly once by using transactional coordination (like Kafka's transaction API) between producer, broker, and consumer database. This is slow and complex, but crucial for financial structures.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Section 5: Distributed Consensus */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <GitBranch className="w-6 h-6 text-foreground" />
                5. Distributed Consensus & Replication Log
              </h2>
              <p>
                To avoid a single point of failure, data must be replicated across servers. But how do nodes agree on the state of data? This is solved by distributed consensus protocols like **Raft** or **Paxos**.
              </p>
              <p>
                In Raft, one node is elected as the **Leader**, and all client writes go directly to it. The Leader appends the command to its log and broadcasts it to **Follower** nodes. Once a majority (quorum) of followers acknowledge the write, the Leader commits it and notifies the clients.
              </p>
              <p>
                If the Leader crashes, the followers detect the missing heartbeat and elect a new leader automatically.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Conclusion */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-foreground" />
                Summary & Key Takeaways
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                <li>Choose <strong>Layer 4 Load Balancing</strong> for high packet speeds; choose <strong>Layer 7 Load Balancing</strong> for smart Application-routing.</li>
                <li>Mitigate <strong>Cache Stampede</strong> by implementing a single-flight mutex locking strategy around database calls.</li>
                <li>Leverage <strong>Consistent Hashing Rings</strong> when sharding relational or key-value database pools to ensure minimal keys remap during scaling events.</li>
                <li>Always design for <strong>At-Least-Once event streams</strong> by implementing idempotent workers on consumer clusters.</li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t bg-background text-center mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} StackShade. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
