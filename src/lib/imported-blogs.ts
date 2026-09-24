import type { Article } from "@/lib/articles";

export interface ImportedBlock {
  type: "p" | "bullets" | "code" | "flow" | "callout";
  text?: string;
  items?: string[];
  language?: string;
  code?: string;
  title?: string;
  nodes?: string[];
  tone?: "info" | "tip" | "warning";
}
export interface ImportedSection { heading: string; blocks: ImportedBlock[]; }
export interface ImportedBlog {
  slug: string; title: string; sourceTitle: string; sourceDate: string; sourceUrl: string;
  category: string; tags: string[]; playlist: string; readTime: string; description: string;
  intro: string; answer: string; banner: string; bannerAlt: string; author: string;
  sections: ImportedSection[]; faqs: [string, string][]; related: string[];
  sources: [string, string][];
}
export const IMPORTED_BLOGS = [
  {
    "slug": "elasticsearch-change-heap-size",
    "title": "Elasticsearch Heap Size Explained: Safer Memory Tuning for Local and Docker Setups",
    "sourceTitle": "Change the heap size for Elasticsearch",
    "sourceDate": "August 21, 2025",
    "sourceUrl": "https://imadsaddik.com/blogs/elasticsearch-change-heap-size",
    "category": "Elasticsearch",
    "tags": [
      "elasticsearch",
      "java",
      "jvm",
      "docker",
      "memory"
    ],
    "playlist": "Data Systems, Inside Out",
    "readTime": "8 min read",
    "description": "Learn what Elasticsearch heap memory is, how JVM heap differs from total process memory, and how to tune a small local node without guessing.",
    "intro": "Elasticsearch is powerful enough to make a small laptop feel memory-starved. The important idea is that the JVM heap is only one part of Elasticsearch memory, so a good configuration balances heap, operating-system cache, and the rest of your workload.",
    "answer": "For small local development, set a deliberate Xms/Xmx value, persist it through Docker configuration, then verify actual memory behavior under your real indexing and search workload. Treat the source article's laptop numbers as an example, not a universal production setting.",
    "banner": "/blog/imported-elasticsearch-change-heap-size.svg",
    "bannerAlt": "Original StackShade diagram for Elasticsearch Heap Size Explained: Safer Memory Tuning for Local and Docker Setups",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Heap is a budget, not total Elasticsearch memory",
        "blocks": [
          {
            "type": "p",
            "text": "Elasticsearch runs on the JVM. The heap stores Java objects and important internal structures, while the process also relies on off-heap/native memory, file mappings, thread stacks, and the operating system page cache."
          },
          {
            "type": "flow",
            "nodes": [
              "JVM heap",
              "Native/process memory",
              "Filesystem cache",
              "Your other services"
            ]
          },
          {
            "type": "callout",
            "tone": "info",
            "title": "The useful question",
            "text": "How much memory can the whole machine spare while Elasticsearch remains responsive? A smaller heap can help a laptop, but an undersized heap can also increase garbage-collection pressure."
          }
        ]
      },
      {
        "heading": "2. Set the heap in persistent configuration",
        "blocks": [
          {
            "type": "p",
            "text": "For Docker, keep the JVM setting in a file or environment configuration so recreating the container does not erase your tuning."
          },
          {
            "type": "code",
            "language": "text",
            "code": "-Xms1g\n-Xmx1g",
            "title": "heap.options"
          },
          {
            "type": "code",
            "language": "yaml",
            "code": "services:\n  elasticsearch:\n    image: docker.elastic.co/elasticsearch/elasticsearch:latest\n    volumes:\n      - ./heap.options:/usr/share/elasticsearch/config/jvm.options.d/heap.options",
            "title": "Docker Compose example"
          }
        ]
      },
      {
        "heading": "3. Measure the result",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Compare docker stats or system process memory before and after the change.",
              "Run the same search and indexing workload that previously caused pressure.",
              "Watch garbage collection, latency, and out-of-memory symptoms.",
              "Leave headroom for your database, editor, browser, and other containers."
            ]
          },
          {
            "type": "p",
            "text": "The best development setting is the smallest sensible heap that stays stable under the workload you actually run."
          }
        ]
      }
    ],
    "faqs": [
      [
        "Does a smaller heap mean Elasticsearch uses only that much RAM?",
        "No. Heap is one component of total process memory."
      ],
      [
        "Should Xms and Xmx match?",
        "Equal initial and maximum heap values are commonly used for predictable JVM behavior, subject to the Elasticsearch version and workload."
      ],
      [
        "Is 1 GB enough for Elasticsearch?",
        "It may be enough for a tiny local index, but there is no universal value. Measure your workload."
      ]
    ],
    "related": [
      "database-indexes-btree",
      "redis-caching",
      "system-design-internals"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/elasticsearch-change-heap-size"
      ],
      [
        "Elastic — advanced configuration",
        "https://www.elastic.co/guide/en/elasticsearch/reference/current/advanced-configuration.html"
      ],
      [
        "Elastic — Docker",
        "https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html"
      ]
    ]
  },
  {
    "slug": "elasticsearch-collapse-search-results",
    "title": "Elasticsearch Field Collapsing: One Best Result per Group",
    "sourceTitle": "Collapse search results in Elasticsearch",
    "sourceDate": "August 20, 2025",
    "sourceUrl": "https://imadsaddik.com/blogs/elasticsearch-collapse-search-results",
    "category": "Elasticsearch",
    "tags": [
      "elasticsearch",
      "search",
      "collapse",
      "grouping"
    ],
    "playlist": "Data Systems, Inside Out",
    "readTime": "9 min read",
    "description": "A practical guide to field collapsing, representative hits, inner hits, sorting, and pagination trade-offs in Elasticsearch.",
    "intro": "Search results become noisy when several documents represent the same logical item. Field collapsing lets you group matching documents by a field and return one representative result per group.",
    "answer": "Think of collapse as presentation and retrieval control, not a merge operation: Elasticsearch keeps the documents, but the response exposes the top-ranked hit for each collapse key.",
    "banner": "/blog/imported-elasticsearch-collapse-search-results.svg",
    "bannerAlt": "Original StackShade diagram for Elasticsearch Field Collapsing: One Best Result per Group",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. The mental model",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Many matching documents",
              "Group by exact field",
              "Pick top-ranked hit",
              "Optionally expand"
            ]
          },
          {
            "type": "p",
            "text": "A product catalog can contain multiple variants, an article index can contain revisions, and an image archive can contain repeated observations. The grouping key needs to be an exact value such as a keyword or numeric identifier."
          }
        ]
      },
      {
        "heading": "2. Collapse a query",
        "blocks": [
          {
            "type": "code",
            "language": "json",
            "code": "{\n  \"query\": { \"match\": { \"title\": \"Andromeda galaxy\" } },\n  \"collapse\": { \"field\": \"object_id.keyword\" },\n  \"sort\": [{ \"_score\": \"desc\" }]\n}",
            "title": "Conceptual query"
          },
          {
            "type": "p",
            "text": "Sorting decides which document becomes the visible representative. Relevance is only one option: you can sort by recency, price, quality, or another business signal."
          }
        ]
      },
      {
        "heading": "3. Expand groups when necessary",
        "blocks": [
          {
            "type": "code",
            "language": "json",
            "code": "{\n  \"collapse\": {\n    \"field\": \"object_id.keyword\",\n    \"inner_hits\": {\n      \"name\": \"variants\",\n      \"size\": 3\n    }\n  }\n}",
            "title": "inner_hits idea"
          },
          {
            "type": "p",
            "text": "This gives the UI a compact top-level result while still allowing controlled detail for each group. Be careful: expanding many groups can become expensive."
          }
        ]
      },
      {
        "heading": "4. Pagination needs deliberate testing",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Test the exact collapse + sort combination you use in production.",
              "Measure latency on realistic shard counts and group cardinalities.",
              "Use the pagination mechanism supported by your Elasticsearch version and workload.",
              "Never assume a small demo dataset predicts production search behavior."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Does collapse merge or delete documents?",
        "No. It changes which hits are returned."
      ],
      [
        "Which field should I collapse on?",
        "A field with a stable exact value, commonly a keyword field."
      ],
      [
        "How is the winning document selected?",
        "The top-ranked document according to the query score and explicit sort."
      ]
    ],
    "related": [
      "database-indexes-btree",
      "elasticsearch-pre-filtering-with-knn-search",
      "nlp-from-text-to-transformers"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/elasticsearch-collapse-search-results"
      ],
      [
        "Elastic — Collapse search results",
        "https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html"
      ]
    ]
  },
  {
    "slug": "elasticsearch-pre-filtering-with-knn-search",
    "title": "Filtered kNN Search in Elasticsearch: Retrieval with Hard Constraints",
    "sourceTitle": "Pre-filtering with kNN search in Elasticsearch",
    "sourceDate": "August 12, 2025",
    "sourceUrl": "https://imadsaddik.com/blogs/elasticsearch-pre-filtering-with-knn-search",
    "category": "Vector Search",
    "tags": [
      "elasticsearch",
      "knn",
      "vector-search",
      "semantic-search",
      "retrieval"
    ],
    "playlist": "AI Systems, Demystified",
    "readTime": "10 min read",
    "description": "Understand why metadata filters belong inside vector retrieval when eligibility is a correctness constraint, and how to reason about recall versus latency.",
    "intro": "Semantic search rarely operates over every document. A multi-tenant app may need tenant isolation; a store may need category and inventory filters; a knowledge base may need permission checks.",
    "answer": "When a constraint defines which documents are eligible, treat filtering as part of retrieval instead of finding arbitrary neighbors first and deleting them later.",
    "banner": "/blog/imported-elasticsearch-pre-filtering-with-knn-search.svg",
    "bannerAlt": "Original StackShade diagram for Filtered kNN Search in Elasticsearch: Retrieval with Hard Constraints",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Pre-filtering versus post-filtering",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Query",
              "Embedding",
              "Eligibility filter",
              "kNN candidates",
              "Ranked results"
            ]
          },
          {
            "type": "p",
            "text": "Post-filtering can return fewer useful results because the nearest neighbors may mostly fail the business constraint. Pre-filtering keeps the eligible search space aligned with the query."
          }
        ]
      },
      {
        "heading": "2. Prepare the index correctly",
        "blocks": [
          {
            "type": "code",
            "language": "json",
            "code": "{\n  \"mappings\": {\n    \"properties\": {\n      \"embedding\": { \"type\": \"dense_vector\", \"dims\": 384 },\n      \"tenant\": { \"type\": \"keyword\" },\n      \"published_at\": { \"type\": \"date\" }\n    }\n  }\n}",
            "title": "Illustrative mapping"
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Dimension mismatch",
            "text": "The vector mapping must match the embedding model's output dimension exactly."
          }
        ]
      },
      {
        "heading": "3. Put the filter into kNN retrieval",
        "blocks": [
          {
            "type": "code",
            "language": "json",
            "code": "{\n  \"knn\": {\n    \"field\": \"embedding\",\n    \"query_vector\": [0.01, -0.02, 0.03],\n    \"k\": 10,\n    \"num_candidates\": 100,\n    \"filter\": { \"term\": { \"tenant\": \"acme\" } }\n  }\n}",
            "title": "Conceptual filtered kNN query"
          },
          {
            "type": "p",
            "text": "The exact API shape changes between Elasticsearch releases and search modes, so check the current documentation when implementing. The design principle remains: retrieval and eligibility should agree."
          }
        ]
      },
      {
        "heading": "4. Tune recall, latency, and safety",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Use a labelled evaluation set with known-good results.",
              "Increase candidate counts when recall is weak, then re-measure latency and memory.",
              "Treat tenant and permission filters as correctness conditions.",
              "Log the filter selectivity so surprising result counts are explainable."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Why can post-filtering return fewer results?",
        "Because many of the nearest vector candidates may be removed after retrieval."
      ],
      [
        "Do vector dimensions have to match exactly?",
        "Yes. The indexed vector shape must be compatible with the model output."
      ],
      [
        "What should I optimize first?",
        "Correct eligibility and recall first, then latency and memory."
      ]
    ],
    "related": [
      "nlp-from-text-to-transformers",
      "database-indexes-btree",
      "system-design-internals"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/elasticsearch-pre-filtering-with-knn-search"
      ],
      [
        "Elastic — kNN search",
        "https://www.elastic.co/guide/en/elasticsearch/reference/current/knn-search.html"
      ],
      [
        "Elastic — vector search",
        "https://www.elastic.co/guide/en/elasticsearch/reference/current/vector-search.html"
      ]
    ]
  },
  {
    "slug": "fix-kernel-panic-linux",
    "title": "Recovering Ubuntu After a Bad Kernel Update: A GRUB-First Playbook",
    "sourceTitle": "How to fix the kernel panic problem after installing a new version of the kernel",
    "sourceDate": "December 20, 2025",
    "sourceUrl": "https://imadsaddik.com/blogs/fix-kernel-panic-linux",
    "category": "Linux Troubleshooting",
    "tags": [
      "linux",
      "ubuntu",
      "kernel",
      "grub",
      "recovery"
    ],
    "playlist": "Linux Operations, Without the Mystery",
    "readTime": "8 min read",
    "description": "A careful recovery workflow for a failed Ubuntu kernel update: boot a known-good kernel, inspect packages, remove the broken version, and verify the system.",
    "intro": "A kernel panic can look catastrophic even when the underlying filesystem and user data are fine. If GRUB still has an older kernel, that fallback is often your safest first move.",
    "answer": "Boot the previous known-good kernel before deleting anything. Once Ubuntu is running normally, use the package manager to identify and remove the faulty kernel and refresh GRUB.",
    "banner": "/blog/imported-fix-kernel-panic-linux.svg",
    "bannerAlt": "Original StackShade diagram for Recovering Ubuntu After a Bad Kernel Update: A GRUB-First Playbook",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Use GRUB as a recovery selector",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Power on",
              "GRUB menu",
              "Advanced options",
              "Older kernel",
              "Working Ubuntu"
            ]
          },
          {
            "type": "p",
            "text": "Most Ubuntu installations keep more than one kernel. That redundancy is intentional and gives you a rollback path when a newer kernel fails to boot."
          }
        ]
      },
      {
        "heading": "2. Boot the previous kernel",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Open GRUB during startup using the method appropriate to your firmware.",
              "Choose Advanced options for Ubuntu.",
              "Select a previous kernel version that was known to work.",
              "Once the desktop loads, verify your files and network before changing packages."
            ]
          },
          {
            "type": "callout",
            "tone": "tip",
            "title": "Treat this as a diagnostic",
            "text": "If the old kernel works and the new one does not, the failure is likely tied to the newer boot path rather than your user data."
          }
        ]
      },
      {
        "heading": "3. Remove the faulty package carefully",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "dpkg -l 'linux-image*' | grep '^ii'",
            "title": "Inspect installed kernels"
          },
          {
            "type": "code",
            "language": "bash",
            "code": "sudo apt remove <linux-image-package> <linux-headers-package>\nsudo update-grub",
            "title": "Remove and regenerate"
          }
        ]
      },
      {
        "heading": "4. Keep a fallback and a recovery path",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Never remove the only kernel you know can boot.",
              "Keep provider or live-media recovery tools available.",
              "Install the next supported kernel only after understanding the failure.",
              "Back up important data independently of this boot issue."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Will a kernel panic erase my files?",
        "Not by itself. It can stop Linux from starting while the filesystem remains intact."
      ],
      [
        "Can I just delete files from /boot?",
        "Do not. Use the package manager so dependencies and boot metadata stay consistent."
      ],
      [
        "Is the older kernel safe forever?",
        "It is useful as a temporary fallback, but long-term you should return to a supported working kernel."
      ]
    ],
    "related": [
      "how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh",
      "how-to-configure-firewall-ufw-fail2ban-ubuntu"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/fix-kernel-panic-linux"
      ],
      [
        "Ubuntu — kernel management",
        "https://documentation.ubuntu.com/server/how-to/software/kernel/"
      ],
      [
        "Ubuntu — GRUB2",
        "https://help.ubuntu.com/community/Grub2"
      ]
    ]
  },
  {
    "slug": "how-to-check-battery-capacity-on-linux",
    "title": "Linux Battery Health: Design Capacity vs Current Full Charge",
    "sourceTitle": "How to check battery capacity on Linux",
    "sourceDate": "February 14, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-check-battery-capacity-on-linux",
    "category": "Linux Hardware",
    "tags": [
      "linux",
      "ubuntu",
      "battery",
      "upower",
      "hardware"
    ],
    "playlist": "Linux Operations, Without the Mystery",
    "readTime": "6 min read",
    "description": "Use UPower to inspect battery design capacity, current full charge capacity, and the difference between battery health and current charge.",
    "intro": "A battery at 80% charge is not the same thing as a battery with 80% health. Health is a comparison between the original design capacity and the capacity the battery can currently hold.",
    "answer": "Use UPower to locate the battery device, inspect its capacity fields, calculate the ratio, and then watch the trend over time.",
    "banner": "/blog/imported-how-to-check-battery-capacity-on-linux.svg",
    "bannerAlt": "Original StackShade diagram for Linux Battery Health: Design Capacity vs Current Full Charge",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Find the battery device",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "upower -e",
            "title": "List power devices"
          },
          {
            "type": "p",
            "text": "Look for a path containing battery_BAT0 or a similar name. Hardware naming varies, so inspect first instead of assuming a fixed path."
          }
        ]
      },
      {
        "heading": "2. Inspect capacity values",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "upower -i /org/freedesktop/UPower/devices/battery_BAT0",
            "title": "Read battery details"
          },
          {
            "type": "flow",
            "nodes": [
              "energy-full-design",
              "energy-full",
              "current charge percentage"
            ]
          },
          {
            "type": "p",
            "text": "Design capacity is the approximate new-battery reference. Current full capacity is what the battery reports it can hold today. Percentage is only the current state of charge."
          }
        ]
      },
      {
        "heading": "3. Calculate a practical health estimate",
        "blocks": [
          {
            "type": "code",
            "language": "text",
            "code": "health = energy-full / energy-full-design * 100",
            "title": "Capacity ratio"
          },
          {
            "type": "bullets",
            "items": [
              "Compare readings over weeks, not minutes.",
              "Treat firmware-reported numbers as estimates.",
              "Watch heat and vendor battery-care settings.",
              "Consider runtime, swelling, and safety—not one percentage alone."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Is battery percentage battery health?",
        "No. It is the current state of charge."
      ],
      [
        "Why do different tools show different values?",
        "Firmware reporting and different power-management interfaces can produce slightly different readings."
      ],
      [
        "Does this work on every laptop?",
        "Many Linux laptops expose battery data through UPower, but exact fields vary by hardware."
      ]
    ],
    "related": [
      "how-to-eliminate-laptop-thermal-throttling-with-high-static-pressure"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-check-battery-capacity-on-linux"
      ],
      [
        "UPower documentation",
        "https://upower.freedesktop.org/docs/"
      ]
    ]
  },
  {
    "slug": "how-to-configure-firewall-ufw-fail2ban-ubuntu",
    "title": "UFW + Fail2Ban on Ubuntu: Build a Smaller Public Attack Surface",
    "sourceTitle": "How to configure a firewall with UFW and Fail2Ban",
    "sourceDate": "January 29, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-configure-firewall-ufw-fail2ban-ubuntu",
    "category": "Server Security",
    "tags": [
      "ubuntu",
      "ufw",
      "fail2ban",
      "firewall",
      "ssh"
    ],
    "playlist": "Linux Operations, Without the Mystery",
    "readTime": "9 min read",
    "description": "A defensive baseline for Ubuntu servers: default-deny inbound traffic, allow only required services, protect SSH, and validate access before closing your session.",
    "intro": "A cloud server should not behave like an open switchboard. UFW controls which network traffic can enter, while Fail2Ban reacts to repeated abusive patterns seen in logs.",
    "answer": "The safest order is: establish a working SSH recovery path, allow SSH, enable UFW, expose only required application ports, then add Fail2Ban as a second layer.",
    "banner": "/blog/imported-how-to-configure-firewall-ufw-fail2ban-ubuntu.svg",
    "bannerAlt": "Original StackShade diagram for UFW + Fail2Ban on Ubuntu: Build a Smaller Public Attack Surface",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Establish the firewall policy",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo ufw status verbose\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow OpenSSH\nsudo ufw enable",
            "title": "Safe sequence"
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Allow SSH before enabling UFW",
            "text": "Otherwise you can lock yourself out of a remote server."
          }
        ]
      },
      {
        "heading": "2. Expose only the services you serve",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw status numbered",
            "title": "Web server example"
          },
          {
            "type": "p",
            "text": "Databases, development servers, and admin panels generally belong on private networking unless there is a specific reason to expose them."
          }
        ]
      },
      {
        "heading": "3. Add Fail2Ban",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo apt update\nsudo apt install fail2ban",
            "title": "Install Fail2Ban"
          },
          {
            "type": "code",
            "language": "ini",
            "code": "[sshd]\nenabled = true\nbackend = systemd\nmaxretry = 5\nbantime = 10m",
            "title": "Illustrative jail"
          },
          {
            "type": "p",
            "text": "Fail2Ban watches log events and can add temporary bans. It is not a replacement for strong keys, patching, or sensible network exposure."
          }
        ]
      },
      {
        "heading": "4. Validate before closing your SSH session",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Open a second SSH session and confirm it works.",
              "Inspect UFW rules after changes.",
              "Keep an out-of-band recovery console available.",
              "Treat repeated attacks as a signal to reduce the root cause, not just increase ban durations."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Does UFW replace Fail2Ban?",
        "No. They address different layers of the problem."
      ],
      [
        "Should I expose a database port publicly?",
        "Usually not. Prefer localhost, private networking, VPNs, or a controlled bastion."
      ],
      [
        "Can Fail2Ban replace a WAF?",
        "No. It can add temporary IP bans for specific log patterns, but it is not a full web application firewall."
      ]
    ],
    "related": [
      "how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh",
      "how-to-verify-your-server-firewall-rules-using-nmap",
      "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-configure-firewall-ufw-fail2ban-ubuntu"
      ],
      [
        "Ubuntu — UFW",
        "https://documentation.ubuntu.com/server/how-to/security/firewalls/"
      ],
      [
        "Fail2Ban",
        "https://github.com/fail2ban/fail2ban"
      ]
    ]
  },
  {
    "slug": "how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
    "title": "From IP Address to HTTPS: Connect a Domain, DNS, Nginx, and Let's Encrypt",
    "sourceTitle": "How to connect a custom domain and secure your server with SSL",
    "sourceDate": "April 6, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
    "category": "Web Deployment",
    "tags": [
      "dns",
      "ssl",
      "https",
      "letsencrypt",
      "certbot",
      "nginx"
    ],
    "playlist": "Web Mechanics",
    "readTime": "9 min read",
    "description": "A practical path from a raw server IP to a canonical HTTPS hostname with DNS records, Nginx, Certbot, and automated renewal.",
    "intro": "A domain name is only the first layer. DNS has to point to the correct infrastructure, Nginx has to answer for the hostname, and TLS needs a certificate that browsers can validate.",
    "answer": "Treat domain, DNS, HTTP routing, and TLS as one chain. Debug them in that order so you know whether the problem is naming, reachability, routing, or encryption.",
    "banner": "/blog/imported-how-to-connect-a-custom-domain-and-secure-your-server-with-ssl.svg",
    "bannerAlt": "Original StackShade diagram for From IP Address to HTTPS: Connect a Domain, DNS, Nginx, and Let's Encrypt",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Choose the correct DNS record",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Hostname",
              "A / AAAA / CNAME",
              "Server or target hostname",
              "Nginx"
            ]
          },
          {
            "type": "p",
            "text": "A maps to IPv4, AAAA maps to IPv6, and CNAME aliases one hostname to another. Remove stale conflicting records before debugging the application."
          }
        ]
      },
      {
        "heading": "2. Make Nginx answer for the hostname",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "server {\n  listen 80;\n  server_name example.com www.example.com;\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n  }\n}",
            "title": "Minimal HTTP server block"
          },
          {
            "type": "p",
            "text": "Your real proxy target may be a static root, application port, or Unix socket. Certbot needs the hostname to reach the correct server during validation."
          }
        ]
      },
      {
        "heading": "3. Issue and test the certificate",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo apt install certbot python3-certbot-nginx\nsudo certbot --nginx -d example.com -d www.example.com\nsudo certbot renew --dry-run",
            "title": "Certbot flow"
          },
          {
            "type": "p",
            "text": "Let's Encrypt provides certificates through ACME. The dry-run step checks whether automated renewal can work before an expiry becomes an incident."
          }
        ]
      },
      {
        "heading": "4. Make HTTPS the canonical path",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "http://example.com",
              "redirect",
              "https://example.com",
              "TLS",
              "application"
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Use one canonical hostname for SEO and analytics.",
              "Keep certificate renewal reachable.",
              "Validate redirect and certificate behavior from an external client.",
              "Monitor renewal rather than assuming automation never fails."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Is a CNAME a replacement for an A record?",
        "No. They serve different purposes and are used in different DNS designs."
      ],
      [
        "Are Let's Encrypt certificates free?",
        "Yes. The service issues certificates through ACME without charging for the certificates."
      ],
      [
        "Do I need to manually renew certificates?",
        "Normally Certbot can automate renewal, but you should test the renewal path."
      ]
    ],
    "related": [
      "dns-resolution-explained",
      "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers",
      "how-to-optimize-global-performance-with-a-cdn-and-nginx-caching"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-connect-a-custom-domain-and-secure-your-server-with-ssl"
      ],
      [
        "Let's Encrypt",
        "https://letsencrypt.org/"
      ],
      [
        "Certbot",
        "https://eff-certbot.readthedocs.io/en/stable/"
      ],
      [
        "MDN — TLS",
        "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security"
      ]
    ]
  },
  {
    "slug": "how-to-eliminate-laptop-thermal-throttling-with-high-static-pressure",
    "title": "Laptop Thermal Throttling: How to Test Whether High-Pressure Cooling Actually Helps",
    "sourceTitle": "How to eliminate laptop thermal throttling with high static pressure",
    "sourceDate": "May 18, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-eliminate-laptop-thermal-throttling-with-high-static-pressure",
    "category": "Hardware Performance",
    "tags": [
      "laptop",
      "cooling",
      "thermal",
      "benchmarking",
      "python"
    ],
    "playlist": "Performance, Measured",
    "readTime": "10 min read",
    "description": "A measurement-first guide to laptop cooling: establish a baseline, log temperature and power, test airflow changes, and compare sustained performance.",
    "intro": "Cooling experiments are easy to overclaim. A lower peak temperature looks impressive, but sustained clocks, fan noise, power, and workload performance tell you whether the machine actually benefits.",
    "answer": "Treat the source experiment as evidence for one laptop configuration. Re-run the methodology on your own chassis before concluding that a particular cooler will solve throttling.",
    "banner": "/blog/imported-how-to-eliminate-laptop-thermal-throttling-with-high-static-pressure.svg",
    "bannerAlt": "Original StackShade diagram for Laptop Thermal Throttling: How to Test Whether High-Pressure Cooling Actually Helps",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Baseline the machine",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Record CPU and GPU temperatures.",
              "Capture CPU and GPU power draw where possible.",
              "Log clock speed or FPS/throughput.",
              "Record ambient temperature and test duration."
            ]
          },
          {
            "type": "flow",
            "nodes": [
              "Workload",
              "Heat generated",
              "Cooling path",
              "Temperature",
              "Clock control"
            ]
          }
        ]
      },
      {
        "heading": "2. Why static pressure can matter",
        "blocks": [
          {
            "type": "p",
            "text": "A sealed laptop intake can respond differently to an open cooling pad. Higher static pressure may push more air through restrictive intake geometry, but the gain depends on seals, vents, fan curves, and how the chassis is designed."
          },
          {
            "type": "callout",
            "tone": "info",
            "title": "Measure the airflow path",
            "text": "An external fan helps only when its pressure actually becomes useful air moving through the laptop."
          }
        ]
      },
      {
        "heading": "3. Run a fair A/B test",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Warm the machine before comparing configurations.",
              "Use the same benchmark and duration.",
              "Repeat each condition to reduce run-to-run noise.",
              "Compare the final minutes, not only the cold-start spike."
            ]
          },
          {
            "type": "code",
            "language": "text",
            "code": "condition,ambient,avg_cpu,max_cpu,avg_gpu,max_gpu,cpu_power,gpu_power,sustained_clock,performance",
            "title": "Useful log columns"
          }
        ]
      },
      {
        "heading": "4. Define the win",
        "blocks": [
          {
            "type": "p",
            "text": "A strong result can mean lower sustained temperature, less clock throttling, more stable performance, or the same performance at lower power. One headline temperature number is not enough."
          }
        ]
      }
    ],
    "faqs": [
      [
        "What is thermal throttling?",
        "Automatic reduction of clock, voltage, or power when thermal or power limits are reached."
      ],
      [
        "Will a high-pressure cooler work on every laptop?",
        "No. Intake geometry determines whether external pressure can improve airflow."
      ],
      [
        "What else should I measure?",
        "Power, sustained clock speed, workload throughput, fan speed, and ambient temperature."
      ]
    ],
    "related": [
      "how-to-check-battery-capacity-on-linux"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-eliminate-laptop-thermal-throttling-with-high-static-pressure"
      ],
      [
        "HWiNFO",
        "https://www.hwinfo.com/"
      ],
      [
        "IETS",
        "https://www.ietstech.com/"
      ]
    ]
  },
  {
    "slug": "how-to-enforce-code-quality-locally-using-pre-commit-hooks",
    "title": "Pre-Commit Hooks: Catch Broken Code Before It Reaches CI",
    "sourceTitle": "How to enforce code quality locally using pre-commit hooks",
    "sourceDate": "May 1, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-enforce-code-quality-locally-using-pre-commit-hooks",
    "category": "Developer Productivity",
    "tags": [
      "git",
      "pre-commit",
      "automation",
      "python",
      "javascript",
      "ci"
    ],
    "playlist": "Tools Under the Hood",
    "readTime": "9 min read",
    "description": "Use Git pre-commit hooks for fast feedback on formatting, linting, YAML, secrets, and other cheap checks while keeping CI as the shared enforcement boundary.",
    "intro": "CI is essential, but discovering a trailing-whitespace issue or broken YAML only after a remote build is wasteful. Local hooks move inexpensive checks closer to the developer.",
    "answer": "Make pre-commit fast enough that the team leaves it enabled, pin hook revisions, and keep expensive integration work in CI.",
    "banner": "/blog/imported-how-to-enforce-code-quality-locally-using-pre-commit-hooks.svg",
    "bannerAlt": "Original StackShade diagram for Pre-Commit Hooks: Catch Broken Code Before It Reaches CI",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Understand the hook boundary",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Edit",
              "git commit",
              "pre-commit",
              "pass → commit",
              "fail → fix"
            ]
          },
          {
            "type": "p",
            "text": "Hooks are local automation. They do not guarantee every contributor has installed them, which is why CI remains the final shared gate."
          }
        ]
      },
      {
        "heading": "2. Install and configure",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "pip install pre-commit\npre-commit install",
            "title": "Install"
          },
          {
            "type": "code",
            "language": "yaml",
            "code": "repos:\n  - repo: https://github.com/pre-commit/pre-commit-hooks\n    rev: v5.0.0\n    hooks:\n      - id: end-of-file-fixer\n      - id: trailing-whitespace\n      - id: check-yaml",
            "title": "Example config"
          },
          {
            "type": "callout",
            "tone": "tip",
            "title": "Pin revisions",
            "text": "Pinned versions keep the developer experience reproducible and make updates deliberate."
          }
        ]
      },
      {
        "heading": "3. Add ecosystem-specific checks",
        "blocks": [
          {
            "type": "code",
            "language": "yaml",
            "code": "- repo: local\n  hooks:\n    - id: lint-frontend\n      name: lint frontend\n      entry: pnpm lint\n      language: system\n      pass_filenames: false",
            "title": "JavaScript hook idea"
          },
          {
            "type": "bullets",
            "items": [
              "Use formatters for changed files when possible.",
              "Run full type-check/build steps in CI if they are slow.",
              "Add secret scanning before credentials can reach Git history."
            ]
          }
        ]
      },
      {
        "heading": "4. Test and maintain the system",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "pre-commit run --all-files\ngit commit --no-verify",
            "title": "Test and emergency bypass"
          },
          {
            "type": "p",
            "text": "The bypass is useful when needed, but if developers use it constantly, treat that as a tooling-design failure: the hook is probably too slow, noisy, or flaky."
          }
        ]
      }
    ],
    "faqs": [
      [
        "Do hooks replace CI?",
        "No. They complement CI by improving local feedback."
      ],
      [
        "Should every test run on every commit?",
        "No. Keep the local layer fast and push expensive checks to CI."
      ],
      [
        "Can pre-commit run Node or shell tools?",
        "Yes. The framework can call local/system commands."
      ]
    ],
    "related": [
      "git-internals-explained",
      "nextjs-server-components"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-enforce-code-quality-locally-using-pre-commit-hooks"
      ],
      [
        "pre-commit",
        "https://pre-commit.com/"
      ],
      [
        "Git hooks",
        "https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks"
      ]
    ]
  },
  {
    "slug": "how-to-fix-soft-404-vulnerabilities-and-block-bots-in-nginx",
    "title": "Nginx SPA Security: Fix Soft 404s Without Breaking Client-Side Routing",
    "sourceTitle": "How to fix soft 404 vulnerabilities and block bots in Nginx",
    "sourceDate": "April 25, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-fix-soft-404-vulnerabilities-and-block-bots-in-nginx",
    "category": "Web Security",
    "tags": [
      "nginx",
      "security",
      "spa",
      "404",
      "bots"
    ],
    "playlist": "Web Mechanics",
    "readTime": "8 min read",
    "description": "Prevent SPA fallbacks from turning sensitive probes into HTTP 200 responses while preserving normal React/Vue/Angular client-side routing.",
    "intro": "A catch-all SPA fallback is useful because /dashboard or /settings should load index.html. The same fallback can be misleading when a scanner requests /.env or /.git/config and receives the app shell with status 200.",
    "answer": "Put explicit deny/fail rules before the catch-all, preserve the ACME path, and validate status codes from outside the server.",
    "banner": "/blog/imported-how-to-fix-soft-404-vulnerabilities-and-block-bots-in-nginx.svg",
    "bannerAlt": "Original StackShade diagram for Nginx SPA Security: Fix Soft 404s Without Breaking Client-Side Routing",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. See the trap",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Request /.env",
              "Nginx location /",
              "SPA fallback",
              "index.html + 200",
              "False success"
            ]
          },
          {
            "type": "p",
            "text": "The missing file never existed, but the response looks successful. That is a soft 404 problem and can confuse crawlers, scanners, and monitoring."
          }
        ]
      },
      {
        "heading": "2. Fail sensitive paths explicitly",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "location ~ /\\.(?!well-known) {\n  deny all;\n  access_log off;\n  log_not_found off;\n}\n\nlocation ~* /(\\.env|\\.git|wp-login\\.php|backups)(/|$) {\n  return 404;\n}",
            "title": "Illustrative protection"
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Preserve .well-known",
            "text": "ACME HTTP-01 validation may need /.well-known/acme-challenge/ reachable."
          }
        ]
      },
      {
        "heading": "3. Keep normal SPA routing",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "location / {\n  try_files $uri $uri/ /index.html;\n}",
            "title": "SPA fallback"
          },
          {
            "type": "code",
            "language": "bash",
            "code": "sudo nginx -t\nsudo systemctl reload nginx",
            "title": "Validate before reload"
          }
        ]
      },
      {
        "heading": "4. Verify the outside behavior",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "curl -I https://example.com/.env\ncurl -I https://example.com/does-not-exist",
            "title": "External checks"
          },
          {
            "type": "bullets",
            "items": [
              "Sensitive paths fail explicitly.",
              "Normal application routes still load.",
              "Status codes match the semantic result.",
              "Certificate-renewal paths remain reachable."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "What is a soft 404?",
        "A missing or invalid resource that still receives a success-looking status such as 200."
      ],
      [
        "Should I remove the SPA fallback?",
        "No. Fix the sensitive paths before the fallback."
      ],
      [
        "404 or 403 for sensitive files?",
        "Both can be used; consistency matters more than one universal choice."
      ]
    ],
    "related": [
      "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers",
      "how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
      "how-to-verify-your-server-firewall-rules-using-nmap"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-fix-soft-404-vulnerabilities-and-block-bots-in-nginx"
      ],
      [
        "Nginx docs",
        "https://nginx.org/en/docs/"
      ],
      [
        "MDN — 404",
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404"
      ]
    ]
  },
  {
    "slug": "how-to-fix-sticky-hover-states-on-mobile-using-css-hover-media-queries",
    "title": "Responsive Hover States: Stop :hover from Fighting Touchscreens",
    "sourceTitle": "How to fix sticky hover states on mobile using CSS hover media queries",
    "sourceDate": "August 29, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-fix-sticky-hover-states-on-mobile-using-css-hover-media-queries",
    "category": "Frontend UX",
    "tags": [
      "css",
      "mobile",
      "hover",
      "accessibility",
      "ui"
    ],
    "playlist": "Modern Frontend Mechanics",
    "readTime": "7 min read",
    "description": "Use capability queries such as hover: hover plus keyboard-friendly focus styles to keep interactive states predictable across mouse and touch devices.",
    "intro": "Hover is an input capability, not a universal UI state. Touchscreens may synthesize hover behavior, which can make a card or button look permanently active after a tap.",
    "answer": "Apply hover-only polish inside a hover-capable media query, then design separate focus, active, expanded, and pressed states for real interaction.",
    "banner": "/blog/imported-how-to-fix-sticky-hover-states-on-mobile-using-css-hover-media-queries.svg",
    "bannerAlt": "Original StackShade diagram for Responsive Hover States: Stop :hover from Fighting Touchscreens",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Understand the sticky-hover symptom",
        "blocks": [
          {
            "type": "code",
            "language": "css",
            "code": ".card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 30px rgb(0 0 0 / 18%);\n}",
            "title": "Problematic pattern"
          },
          {
            "type": "p",
            "text": "On pointer devices this works well. On touch devices the browser may emulate hover, creating a state that feels stuck or visually confusing."
          }
        ]
      },
      {
        "heading": "2. Scope hover to hover-capable devices",
        "blocks": [
          {
            "type": "code",
            "language": "css",
            "code": "@media (hover: hover) and (pointer: fine) {\n  .card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 12px 30px rgb(0 0 0 / 18%);\n  }\n}",
            "title": "Touch-aware fix"
          }
        ]
      },
      {
        "heading": "3. Give other inputs their own states",
        "blocks": [
          {
            "type": "code",
            "language": "css",
            "code": ".card:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 3px;\n}",
            "title": "Keyboard focus"
          },
          {
            "type": "bullets",
            "items": [
              "hover → pointer affordance",
              "focus-visible → keyboard navigation",
              "active → immediate press feedback",
              "aria-expanded / data-state → persistent component state"
            ]
          }
        ]
      },
      {
        "heading": "4. Test real devices",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Tap cards and buttons once and twice.",
              "Open and close menus with touch and keyboard.",
              "Check landscape and orientation changes.",
              "Use real touchscreen testing when the interaction is important."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Does :hover always stick on mobile?",
        "No. Behavior varies, but synthesized hover can produce awkward results."
      ],
      [
        "Is hover: hover enough?",
        "It is a capability check, not a complete accessibility strategy."
      ],
      [
        "Should hover be removed entirely?",
        "No. Keep it for devices that support it."
      ]
    ],
    "related": [
      "nextjs-server-components",
      "how-to-self-host-google-fonts-with-fontsource-to-improve-web-performance"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-fix-sticky-hover-states-on-mobile-using-css-hover-media-queries"
      ],
      [
        "MDN — hover media feature",
        "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover"
      ],
      [
        "MDN — focus-visible",
        "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible"
      ]
    ]
  },
  {
    "slug": "how-to-manually-deploy-a-vuejs-and-fastapi-application",
    "title": "Deploy Vue.js + FastAPI Manually: VM, Gunicorn, Supervisor, and Nginx",
    "sourceTitle": "How to manually deploy a Vue.js and FastAPI application",
    "sourceDate": "March 2, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-manually-deploy-a-vuejs-and-fastapi-application",
    "category": "Full-Stack Deployment",
    "tags": [
      "vue",
      "fastapi",
      "gunicorn",
      "supervisor",
      "ubuntu",
      "deployment"
    ],
    "playlist": "Linux Operations, Without the Mystery",
    "readTime": "11 min read",
    "description": "Deploy a Vue.js frontend and FastAPI backend on a Linux VM with a private API process, production build, and restartable service.",
    "intro": "A full-stack deployment is two application workloads plus the operational boundary between them. The frontend becomes static assets; the API needs a long-running production process; Nginx can sit in front of both.",
    "answer": "Build the application on a predictable server layout, bind FastAPI to localhost, use a production process manager, and serve the frontend through Nginx.",
    "banner": "/blog/imported-how-to-manually-deploy-a-vuejs-and-fastapi-application.svg",
    "bannerAlt": "Original StackShade diagram for Deploy Vue.js + FastAPI Manually: VM, Gunicorn, Supervisor, and Nginx",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Organize the VM",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "VM",
              "Nginx",
              "Vue dist",
              "FastAPI",
              "Data/services"
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Use a non-root deployment user.",
              "Keep secrets outside source control.",
              "Know the provider recovery console.",
              "Treat swap as a safety buffer, not extra RAM."
            ]
          }
        ]
      },
      {
        "heading": "2. Run FastAPI as a production process",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "python3 -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt\npip install gunicorn uvicorn",
            "title": "Environment"
          },
          {
            "type": "code",
            "language": "bash",
            "code": "gunicorn -w 2 -k uvicorn.workers.UvicornWorker app:app --bind 127.0.0.1:8000",
            "title": "Example process"
          },
          {
            "type": "p",
            "text": "Binding to 127.0.0.1 keeps the API private when Nginx runs on the same host."
          }
        ]
      },
      {
        "heading": "3. Build the Vue app",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "pnpm install\npnpm build",
            "title": "Production build"
          },
          {
            "type": "p",
            "text": "Serve the resulting static directory from Nginx rather than using a development server in production."
          }
        ]
      },
      {
        "heading": "4. Keep the API alive",
        "blocks": [
          {
            "type": "code",
            "language": "ini",
            "code": "[program:api]\ndirectory=/srv/app/backend\ncommand=/srv/app/backend/.venv/bin/gunicorn -w 2 -k uvicorn.workers.UvicornWorker app:app --bind 127.0.0.1:8000\nautostart=true\nautorestart=true",
            "title": "Supervisor pattern"
          },
          {
            "type": "bullets",
            "items": [
              "Log stdout and stderr.",
              "Restart on crash.",
              "Make the working directory explicit.",
              "Monitor memory and worker count."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Can I use uvicorn --reload in production?",
        "No. Reload mode is intended for development."
      ],
      [
        "Must FastAPI listen on 0.0.0.0?",
        "No. Localhost is often safer when Nginx is the only public entry point."
      ],
      [
        "Why use swap during builds?",
        "A small amount can absorb short memory spikes, but it is much slower than RAM."
      ]
    ],
    "related": [
      "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers",
      "how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
      "how-to-optimize-global-performance-with-a-cdn-and-nginx-caching"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-manually-deploy-a-vuejs-and-fastapi-application"
      ],
      [
        "FastAPI — deployment",
        "https://fastapi.tiangolo.com/deployment/"
      ],
      [
        "Gunicorn docs",
        "https://docs.gunicorn.org/en/stable/"
      ]
    ]
  },
  {
    "slug": "how-to-optimize-global-performance-with-a-cdn-and-nginx-caching",
    "title": "CDN + Nginx Caching: Serve Global Assets Without Making HTML Stale",
    "sourceTitle": "How to optimize global performance with a CDN and Nginx caching",
    "sourceDate": "April 20, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-optimize-global-performance-with-a-cdn-and-nginx-caching",
    "category": "Web Performance",
    "tags": [
      "cdn",
      "cloudflare",
      "nginx",
      "caching",
      "performance"
    ],
    "playlist": "Web Mechanics",
    "readTime": "10 min read",
    "description": "A practical cache hierarchy for SPAs: use a CDN for edge delivery, cache fingerprinted assets aggressively, and keep the HTML entry point revalidatable.",
    "intro": "Distance creates latency. A CDN can move static bytes closer to users, while Nginx controls origin behavior and cache headers.",
    "answer": "The key distinction is immutable assets versus the application shell. Cache hashed JS/CSS/images for a long time; keep HTML able to discover the newest asset filenames.",
    "banner": "/blog/imported-how-to-optimize-global-performance-with-a-cdn-and-nginx-caching.svg",
    "bannerAlt": "Original StackShade diagram for CDN + Nginx Caching: Serve Global Assets Without Making HTML Stale",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Think in layers",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Visitor",
              "CDN edge",
              "Origin Nginx",
              "Static assets / API"
            ]
          },
          {
            "type": "p",
            "text": "A CDN is most valuable when it can answer repeat requests at the edge. Your origin still needs sensible caching headers and routing."
          }
        ]
      },
      {
        "heading": "2. Cache fingerprinted assets aggressively",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "location ~* \\.(js|css|png|jpg|jpeg|gif|svg|webp|woff2)$ {\n  expires 1y;\n  add_header Cache-Control \"public, immutable\";\n}",
            "title": "Illustrative rule"
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Do not freeze index.html",
            "text": "A stale HTML shell can point users at an old asset graph after a deployment."
          }
        ]
      },
      {
        "heading": "3. Configure proxy-aware real IP handling",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "set_real_ip_from <trusted-proxy-cidr>;\nreal_ip_header CF-Connecting-IP;\nreal_ip_recursive on;",
            "title": "Conceptual configuration"
          },
          {
            "type": "p",
            "text": "Only trust forwarded client IP headers from known proxy networks. Otherwise attackers can spoof the header."
          }
        ]
      },
      {
        "heading": "4. Measure before and after",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Record origin latency before enabling the CDN.",
              "Inspect cache status and edge response times.",
              "Check that the origin is not being bypassed unintentionally.",
              "Re-run Lighthouse after the change."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Should HTML be cached for a year?",
        "Usually not for a frequently deployed application shell."
      ],
      [
        "Does a CDN always reduce latency?",
        "Not for every request. Cache misses, routing, TLS, and origin distance still matter."
      ],
      [
        "Why does real IP configuration matter?",
        "Logs, rate limits, and security controls need a trustworthy client address."
      ]
    ],
    "related": [
      "http1-http2-http3",
      "how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
      "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-optimize-global-performance-with-a-cdn-and-nginx-caching"
      ],
      [
        "Cloudflare cache docs",
        "https://developers.cloudflare.com/cache/"
      ],
      [
        "Nginx headers module",
        "https://nginx.org/en/docs/http/ngx_http_headers_module.html"
      ]
    ]
  },
  {
    "slug": "how-to-protect-your-home-server-from-power-outages-using-nut",
    "title": "UPS + NUT: Turn Battery Runtime into a Safe Server Shutdown",
    "sourceTitle": "How to protect your home server from power outages using NUT",
    "sourceDate": "April 26, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-protect-your-home-server-from-power-outages-using-nut",
    "category": "Self-Hosting",
    "tags": [
      "ups",
      "nut",
      "self-hosting",
      "linux",
      "automation"
    ],
    "playlist": "Self-Hosted Systems",
    "readTime": "10 min read",
    "description": "Use Network UPS Tools to monitor a UPS, expose status to other hosts, and trigger a graceful shutdown before the battery is exhausted.",
    "intro": "A UPS buys time; NUT turns that time into software policy. Without an automated shutdown path, a long outage can still end with corrupted services or a hard power loss.",
    "answer": "Think in layers: UPS hardware, driver, NUT server, monitoring policy, and service shutdown. Hardware-specific voltage and runtime thresholds must be measured for your device.",
    "banner": "/blog/imported-how-to-protect-your-home-server-from-power-outages-using-nut.svg",
    "bannerAlt": "Original StackShade diagram for UPS + NUT: Turn Battery Runtime into a Safe Server Shutdown",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Understand the NUT architecture",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Mains",
              "UPS",
              "NUT driver",
              "upsd",
              "upsmon",
              "Graceful shutdown"
            ]
          },
          {
            "type": "p",
            "text": "The driver speaks the UPS protocol, upsd publishes the state, and upsmon applies policy. This separation lets multiple machines consume the same UPS status."
          }
        ]
      },
      {
        "heading": "2. Design the shutdown policy",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Distinguish brief power loss from a sustained outage.",
              "Leave enough runtime for databases and services to stop cleanly.",
              "Base thresholds on measured runtime, not a generic battery percentage.",
              "Test the sequence before the first real outage."
            ]
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Hardware values differ",
            "text": "UPS models expose different protocols, fields, and safe shutdown thresholds."
          }
        ]
      },
      {
        "heading": "3. Make the network topology deliberate",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "UPS-connected host",
              "Private network",
              "Other servers",
              "Monitoring/dashboard"
            ]
          },
          {
            "type": "p",
            "text": "Keep NUT communication private and authenticated. A public UPS status endpoint is rarely necessary."
          }
        ]
      },
      {
        "heading": "4. Monitor useful signals",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Input power state",
              "Battery charge and estimated runtime",
              "Output load",
              "Recent shutdown events",
              "Driver/server health"
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Is a UPS enough by itself?",
        "No. You still need backups and reliable service shutdown."
      ],
      [
        "Can several servers share one UPS?",
        "Yes. NUT supports a primary server and networked monitors."
      ],
      [
        "How should I choose the shutdown threshold?",
        "Measure the actual time your workload needs to stop and add margin."
      ]
    ],
    "related": [
      "system-design-internals",
      "how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-protect-your-home-server-from-power-outages-using-nut"
      ],
      [
        "Network UPS Tools",
        "https://networkupstools.org/docs/"
      ],
      [
        "Ubuntu Server docs",
        "https://documentation.ubuntu.com/server/"
      ]
    ]
  },
  {
    "slug": "how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite",
    "title": "Replace Font Awesome Icon Fonts with Build-Time SVGs in Vite",
    "sourceTitle": "How to replace Font Awesome with compile-time inline SVGs in Vite",
    "sourceDate": "September 16, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite",
    "category": "Frontend Performance",
    "tags": [
      "vite",
      "svg",
      "iconify",
      "unplugin-icons",
      "performance"
    ],
    "playlist": "Modern Frontend Mechanics",
    "readTime": "8 min read",
    "description": "Reduce icon payloads by resolving SVG components at build time and shipping the icons your UI actually uses.",
    "intro": "Icon fonts made icons convenient, but a global font can ship thousands of glyphs for an interface that needs a few dozen. Build-time SVG components make the asset boundary explicit.",
    "answer": "The optimization is not 'SVG is always smaller'. The goal is to ship only the visual assets required by the rendered interface and remove unnecessary font/CSS requests.",
    "banner": "/blog/imported-how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite.svg",
    "bannerAlt": "Original StackShade diagram for Replace Font Awesome Icon Fonts with Build-Time SVGs in Vite",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Measure the icon-font cost",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Record transfer size of the icon CSS and font files.",
              "Count how many icons the product actually uses.",
              "Check for icon flicker or layout movement.",
              "Compare a production build, not just development mode."
            ]
          },
          {
            "type": "p",
            "text": "The source project measured more icon data than its UI needed. Your exact numbers will differ."
          }
        ]
      },
      {
        "heading": "2. Add build-time icons",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "pnpm add -D unplugin-icons @iconify-json/lucide",
            "title": "Install"
          },
          {
            "type": "code",
            "language": "ts",
            "code": "import Icons from 'unplugin-icons/vite'\n\nexport default defineConfig({\n  plugins: [Icons()]\n})",
            "title": "Vite plugin concept"
          }
        ]
      },
      {
        "heading": "3. Render only the icons you reference",
        "blocks": [
          {
            "type": "code",
            "language": "vue",
            "code": "<script setup lang=\"ts\">\nimport IconSearch from '~icons/lucide/search'\n</script>\n\n<IconSearch aria-hidden=\"true\" />",
            "title": "Vue example"
          },
          {
            "type": "bullets",
            "items": [
              "Use aria-hidden for decorative icons.",
              "Give icon-only buttons an accessible name.",
              "Remove the old Font Awesome CSS and font packages after migration."
            ]
          }
        ]
      },
      {
        "heading": "4. Re-run the performance test",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Compare first-load transfer size.",
              "Check the network waterfall.",
              "Verify all icons render at their final sizes.",
              "Check Core Web Vitals and visual stability."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Are inline SVGs always faster?",
        "No. Huge inline illustrations can be costly. The win comes from shipping the assets you actually need."
      ],
      [
        "Can Iconify work without a font?",
        "Yes. Tooling such as unplugin-icons can emit SVG components at build time."
      ],
      [
        "Should every icon be inline?",
        "Use inline SVGs for small UI icons and a separate asset strategy for larger artwork."
      ]
    ],
    "related": [
      "how-to-self-host-google-fonts-with-fontsource-to-improve-web-performance",
      "nextjs-server-components",
      "how-to-enforce-code-quality-locally-using-pre-commit-hooks"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite"
      ],
      [
        "unplugin-icons",
        "https://github.com/unplugin/unplugin-icons"
      ],
      [
        "Iconify",
        "https://iconify.design/"
      ],
      [
        "Vite",
        "https://vite.dev/guide/"
      ]
    ]
  },
  {
    "slug": "how-to-self-host-and-securely-manage-meilisearch",
    "title": "Self-Host Meilisearch Safely: Private Search, systemd, and Backups",
    "sourceTitle": "How to self-host and securely manage Meilisearch",
    "sourceDate": "March 21, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-self-host-and-securely-manage-meilisearch",
    "category": "Search Infrastructure",
    "tags": [
      "meilisearch",
      "self-hosting",
      "search",
      "systemd",
      "security"
    ],
    "playlist": "Self-Hosted Systems",
    "readTime": "9 min read",
    "description": "Run Meilisearch as a least-privilege service, keep its API private, connect through your backend, and decide whether the index is rebuildable before designing backups.",
    "intro": "Dedicated search engines are useful for typo-tolerant, ranked search, but they add an operational component. Self-hosting makes the service cheap and fast to your API, but it also makes you responsible for updates, storage, and recovery.",
    "answer": "The safe pattern is private search infrastructure: the browser talks to your application, the application authenticates and shapes search requests, and Meilisearch stays behind localhost or a private network.",
    "banner": "/blog/imported-how-to-self-host-and-securely-manage-meilisearch.svg",
    "bannerAlt": "Original StackShade diagram for Self-Host Meilisearch Safely: Private Search, systemd, and Backups",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Decide whether you need a search engine",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Exact filters → SQL is often enough.",
              "Fuzzy text search → a search engine becomes attractive.",
              "Heavy analytics → consider an analytical or Elasticsearch-style system.",
              "Small app → operational simplicity may matter more than feature count."
            ]
          }
        ]
      },
      {
        "heading": "2. Run Meilisearch with a dedicated account",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo useradd --system --home /var/lib/meilisearch --shell /usr/sbin/nologin meilisearch\nsudo mkdir -p /var/lib/meilisearch\nsudo chown -R meilisearch:meilisearch /var/lib/meilisearch",
            "title": "Service account"
          },
          {
            "type": "code",
            "language": "ini",
            "code": "[Service]\nUser=meilisearch\nExecStart=/usr/local/bin/meilisearch --db-path /var/lib/meilisearch\nRestart=on-failure",
            "title": "systemd concept"
          }
        ]
      },
      {
        "heading": "3. Keep secrets out of the frontend",
        "blocks": [
          {
            "type": "callout",
            "tone": "warning",
            "title": "Protect the master key",
            "text": "Do not put a production Meilisearch master key in a browser bundle or public repository."
          },
          {
            "type": "flow",
            "nodes": [
              "Browser",
              "Your API",
              "Private Meilisearch",
              "Index"
            ]
          }
        ]
      },
      {
        "heading": "4. Back up based on recovery cost",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Back up to storage separate from the live instance.",
              "Retain multiple recovery points.",
              "Test restores.",
              "If re-indexing from the primary DB is cheap, document that as a recovery path."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Should Meilisearch be public?",
        "Usually no. Keep it behind the application or private networking."
      ],
      [
        "Why use a dedicated Linux user?",
        "It limits what the service can access if the process is compromised."
      ],
      [
        "Do I always need backups?",
        "It depends on how expensive and slow your re-indexing process is."
      ]
    ],
    "related": [
      "elasticsearch-change-heap-size",
      "how-to-configure-firewall-ufw-fail2ban-ubuntu",
      "how-to-protect-your-home-server-from-power-outages-using-nut"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-self-host-and-securely-manage-meilisearch"
      ],
      [
        "Meilisearch docs",
        "https://www.meilisearch.com/docs/"
      ],
      [
        "systemd",
        "https://www.freedesktop.org/wiki/Software/systemd/"
      ]
    ]
  },
  {
    "slug": "how-to-self-host-google-fonts-with-fontsource-to-improve-web-performance",
    "title": "Self-Host Google Fonts with Fontsource: Fewer External Requests, More Control",
    "sourceTitle": "How to self-host Google Fonts with Fontsource to improve web performance",
    "sourceDate": "September 6, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-self-host-google-fonts-with-fontsource-to-improve-web-performance",
    "category": "Web Performance",
    "tags": [
      "fonts",
      "fontsource",
      "css",
      "lighthouse",
      "frontend"
    ],
    "playlist": "Modern Frontend Mechanics",
    "readTime": "7 min read",
    "description": "Move open-source web fonts into your application bundle so the browser does not need a separate font CDN request.",
    "intro": "Typography can introduce another origin and another dependency in the render path. Self-hosting makes font delivery part of the same deployment, while also simplifying privacy and caching decisions.",
    "answer": "Install the exact Fontsource family and weights you use, import them locally, keep a fallback stack, and measure whether the real production waterfall improves.",
    "banner": "/blog/imported-how-to-self-host-google-fonts-with-fontsource-to-improve-web-performance.svg",
    "bannerAlt": "Original StackShade diagram for Self-Host Google Fonts with Fontsource: Fewer External Requests, More Control",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Understand the request chain",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "HTML",
              "CSS",
              "Font request",
              "Font response",
              "Text paint"
            ]
          },
          {
            "type": "p",
            "text": "A third-party stylesheet can create extra DNS, connection, and request work. The cost is small on some networks and visible on others."
          }
        ]
      },
      {
        "heading": "2. Install only what you need",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "pnpm add @fontsource/inter",
            "title": "Install a font family"
          },
          {
            "type": "code",
            "language": "ts",
            "code": "import '@fontsource/inter/400.css'\nimport '@fontsource/inter/600.css'\nimport '@fontsource/inter/700.css'",
            "title": "Local imports"
          },
          {
            "type": "bullets",
            "items": [
              "Ship only used weights.",
              "Avoid importing the same family from multiple sources.",
              "Keep a system fallback."
            ]
          }
        ]
      },
      {
        "heading": "3. Variable fonts are not magic",
        "blocks": [
          {
            "type": "p",
            "text": "A variable font can replace several static weight files, but the single file can also be larger than one static cut. Compare actual transfer size and rendering behavior."
          }
        ]
      },
      {
        "heading": "4. Verify the migration",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "rg -n \"fonts.googleapis.com|@import.*font\" src public",
            "title": "Find remote font imports"
          },
          {
            "type": "bullets",
            "items": [
              "Check the network origin of font files.",
              "Re-test FCP/LCP in production.",
              "Confirm typography does not shift when the font arrives."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Does self-hosting always improve Lighthouse?",
        "Not automatically. Overall font size, CSS, caching, and layout determine the result."
      ],
      [
        "Do I need every weight?",
        "No. Keep only the weights your design uses."
      ],
      [
        "Can I keep a Google Fonts fallback?",
        "You can, but that reintroduces the external dependency."
      ]
    ],
    "related": [
      "how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite",
      "http1-http2-http3",
      "nextjs-server-components"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-self-host-google-fonts-with-fontsource-to-improve-web-performance"
      ],
      [
        "Fontsource",
        "https://fontsource.org/docs/introduction"
      ],
      [
        "web.dev — web fonts",
        "https://web.dev/learn/performance/optimize-web-fonts"
      ]
    ]
  },
  {
    "slug": "how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh",
    "title": "Secure Ubuntu Server Setup: SSH Keys, Non-Root Access, and Recovery",
    "sourceTitle": "How to set up a secure cloud server with Ubuntu and SSH",
    "sourceDate": "January 18, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh",
    "category": "Server Security",
    "tags": [
      "ubuntu",
      "ssh",
      "devops",
      "security",
      "linux"
    ],
    "playlist": "Linux Operations, Without the Mystery",
    "readTime": "9 min read",
    "description": "Set up a Linux VM with a recovery path, SSH keys, a non-root admin account, and disabled password/root login after verification.",
    "intro": "Server security starts before the application is deployed. A good baseline gives you a tested administrator account, a recovery console, and a minimal public surface.",
    "answer": "Never disable the old login path until the new one works from a second terminal. That one habit prevents many self-inflicted lockouts.",
    "banner": "/blog/imported-how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh.svg",
    "bannerAlt": "Original StackShade diagram for Secure Ubuntu Server Setup: SSH Keys, Non-Root Access, and Recovery",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Start with a recovery plan",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Know your provider's console or serial access.",
              "Record the server IP and region.",
              "Apply security updates.",
              "Keep a fallback administration path during hardening."
            ]
          }
        ]
      },
      {
        "heading": "2. Create and copy an SSH key",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "ssh-keygen -t ed25519 -C \"you@example.com\"\nssh-copy-id <user>@<server-ip>",
            "title": "Key setup"
          },
          {
            "type": "p",
            "text": "Protect the private key. The public key can be placed on servers; the private key should stay on your trusted device."
          }
        ]
      },
      {
        "heading": "3. Create a non-root admin",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo adduser <your-user>\nsudo usermod -aG sudo <your-user>",
            "title": "Account"
          },
          {
            "type": "bullets",
            "items": [
              "Copy the key to the new account.",
              "Open a second session with that user.",
              "Verify sudo access before changing root behavior."
            ]
          }
        ]
      },
      {
        "heading": "4. Disable weaker SSH paths after verification",
        "blocks": [
          {
            "type": "code",
            "language": "text",
            "code": "PermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes",
            "title": "Review sshd_config"
          },
          {
            "type": "code",
            "language": "bash",
            "code": "sudo sshd -t\nsudo systemctl reload ssh",
            "title": "Validate and reload"
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Keep your working session open",
            "text": "Only close it after the second SSH session has been tested."
          }
        ]
      }
    ],
    "faqs": [
      [
        "Can I disable password login immediately?",
        "Only after key-based access has been verified in a second session and you have recovery access."
      ],
      [
        "Why avoid direct root login?",
        "A non-root admin account creates a clearer privilege boundary."
      ],
      [
        "What if I lose my key?",
        "Use your provider recovery console or another controlled administrator key."
      ]
    ],
    "related": [
      "how-to-configure-firewall-ufw-fail2ban-ubuntu",
      "how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
      "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh"
      ],
      [
        "Ubuntu — OpenSSH",
        "https://documentation.ubuntu.com/server/how-to/security/openssh-server/"
      ],
      [
        "OpenSSH sshd_config",
        "https://man.openbsd.org/sshd_config"
      ]
    ]
  },
  {
    "slug": "how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers",
    "title": "Nginx Reverse Proxy for Vue + FastAPI: Routing, TLS, and Security Headers",
    "sourceTitle": "How to set up Nginx as a reverse proxy and configure security headers",
    "sourceDate": "March 16, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers",
    "category": "Reverse Proxy",
    "tags": [
      "nginx",
      "reverse-proxy",
      "security",
      "fastapi",
      "vue"
    ],
    "playlist": "Web Mechanics",
    "readTime": "10 min read",
    "description": "Make Nginx the public entry point for a static frontend and private FastAPI API, then layer security headers without breaking the application.",
    "intro": "The reverse proxy is the boundary where public HTTP meets your internal services. Keeping FastAPI on localhost simplifies exposure and lets Nginx own TLS, routing, and static delivery.",
    "answer": "Build the routing first, validate it, then add headers incrementally—especially CSP, which must reflect the resources the application actually uses.",
    "banner": "/blog/imported-how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers.svg",
    "bannerAlt": "Original StackShade diagram for Nginx Reverse Proxy for Vue + FastAPI: Routing, TLS, and Security Headers",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. The request architecture",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Browser",
              "Nginx :443",
              "Vue static files",
              "FastAPI :8000"
            ]
          },
          {
            "type": "p",
            "text": "The browser should not need to know the backend port. Nginx can serve files directly and proxy only API routes."
          }
        ]
      },
      {
        "heading": "2. Configure the routes",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "server {\n  listen 443 ssl;\n  server_name example.com;\n  root /var/www/app/dist;\n\n  location /api/ {\n    proxy_pass http://127.0.0.1:8000/;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-Proto $scheme;\n  }\n\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}",
            "title": "Conceptual server block"
          },
          {
            "type": "callout",
            "tone": "info",
            "title": "Watch the proxy_pass slash",
            "text": "Trailing-slash behavior changes how Nginx rewrites the upstream path. Test the actual API URL, not just Nginx startup."
          }
        ]
      },
      {
        "heading": "3. Add security headers carefully",
        "blocks": [
          {
            "type": "code",
            "language": "nginx",
            "code": "add_header X-Content-Type-Options \"nosniff\" always;\nadd_header Referrer-Policy \"strict-origin-when-cross-origin\" always;\nadd_header X-Frame-Options \"SAMEORIGIN\" always;",
            "title": "Baseline headers"
          },
          {
            "type": "p",
            "text": "Content Security Policy can block scripts, fonts, images, workers, or API requests if it is too strict. Start with a tested policy and tighten based on actual requirements."
          }
        ]
      },
      {
        "heading": "4. Validate the whole chain",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo nginx -t\nsudo systemctl reload nginx\ncurl -I https://example.com\ncurl -I https://example.com/api/health",
            "title": "External checks"
          },
          {
            "type": "bullets",
            "items": [
              "Frontend routes return the expected shell.",
              "API requests reach FastAPI.",
              "HTTPS is valid.",
              "The backend port is not public."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Why put FastAPI behind Nginx?",
        "It creates one public entry point for TLS, routing, static assets, and access controls."
      ],
      [
        "Should FastAPI bind to localhost?",
        "Often yes when Nginx is on the same server."
      ],
      [
        "Is CSP mandatory?",
        "No, but it is useful defense-in-depth when correctly configured."
      ]
    ],
    "related": [
      "how-to-connect-a-custom-domain-and-secure-your-server-with-ssl",
      "how-to-fix-soft-404-vulnerabilities-and-block-bots-in-nginx",
      "how-to-manually-deploy-a-vuejs-and-fastapi-application"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-set-up-nginx-as-a-reverse-proxy-and-configure-security-headers"
      ],
      [
        "Nginx docs",
        "https://nginx.org/en/docs/"
      ],
      [
        "MDN — Content Security Policy",
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"
      ]
    ]
  },
  {
    "slug": "how-to-verify-your-server-firewall-rules-using-nmap",
    "title": "Nmap from the Outside: Verify Which Ports Your Server Actually Exposes",
    "sourceTitle": "How to verify your server firewall rules using nmap",
    "sourceDate": "April 25, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-verify-your-server-firewall-rules-using-nmap",
    "category": "Security Validation",
    "tags": [
      "nmap",
      "firewall",
      "networking",
      "security"
    ],
    "playlist": "Linux Operations, Without the Mystery",
    "readTime": "6 min read",
    "description": "Validate public server exposure from another network using Nmap and learn how to read open, closed, and filtered results.",
    "intro": "A firewall rule is only a policy. The stronger question is what another machine can actually reach. An external Nmap scan tests that exposed surface.",
    "answer": "Scan systems you own or are authorized to test, prefer a genuinely external network, and compare the results with your intended service list.",
    "banner": "/blog/imported-how-to-verify-your-server-firewall-rules-using-nmap.svg",
    "bannerAlt": "Original StackShade diagram for Nmap from the Outside: Verify Which Ports Your Server Actually Exposes",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Scan from another machine",
        "blocks": [
          {
            "type": "callout",
            "tone": "warning",
            "title": "Authorization first",
            "text": "Run Nmap only against your own lab, server, or an explicitly authorized target."
          },
          {
            "type": "code",
            "language": "bash",
            "code": "nmap -Pn <server-ip>",
            "title": "Basic TCP scan"
          },
          {
            "type": "p",
            "text": "The -Pn option skips host-discovery assumptions and tells Nmap to treat the target as online."
          }
        ]
      },
      {
        "heading": "2. Read the port states",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "open",
              "closed",
              "filtered"
            ]
          },
          {
            "type": "bullets",
            "items": [
              "open → a reachable service is accepting connections.",
              "closed → the host is reachable but no service is listening there.",
              "filtered → filtering prevents Nmap from determining the port state."
            ]
          }
        ]
      },
      {
        "heading": "3. Avoid scanning the wrong endpoint",
        "blocks": [
          {
            "type": "p",
            "text": "When a hostname is behind a CDN or reverse proxy, the domain may resolve to the proxy rather than your origin. For origin exposure, scan the direct public address when authorized."
          },
          {
            "type": "code",
            "language": "bash",
            "code": "nmap -Pn -p 22,80,443 <server-ip>",
            "title": "Focused check"
          }
        ]
      },
      {
        "heading": "4. Turn the result into a checklist",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "List every expected public port.",
              "Investigate every unexpected open port.",
              "Repeat after firewall or reverse-proxy changes.",
              "Document why administrative ports are exposed."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Why scan externally?",
        "Because local firewall output does not prove what the internet can reach."
      ],
      [
        "What does filtered mean?",
        "Nmap cannot determine the state because a network control is blocking or dropping traffic."
      ],
      [
        "Can I scan a cloud server I own?",
        "Yes, as a defensive validation activity."
      ]
    ],
    "related": [
      "how-to-configure-firewall-ufw-fail2ban-ubuntu",
      "how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh",
      "how-to-fix-soft-404-vulnerabilities-and-block-bots-in-nginx"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-verify-your-server-firewall-rules-using-nmap"
      ],
      [
        "Nmap docs",
        "https://nmap.org/docs.html"
      ],
      [
        "Nmap reference guide",
        "https://nmap.org/book/man.html"
      ]
    ]
  },
  {
    "slug": "how-to-warp-and-angle-your-designs-in-inkscape",
    "title": "Inkscape Perspective Mockups: Warp Logos and Text to Match Angled or Curved Surfaces",
    "sourceTitle": "How to place text and logos in perspective in Inkscape",
    "sourceDate": "January 31, 2026",
    "sourceUrl": "https://imadsaddik.com/blogs/how-to-warp-and-angle-your-designs-in-inkscape",
    "category": "Design Tools",
    "tags": [
      "inkscape",
      "svg",
      "perspective",
      "design",
      "mockups"
    ],
    "playlist": "Visual Design Systems",
    "readTime": "8 min read",
    "description": "Use perspective transforms for flat planes and envelope-style deformation for curved surfaces so logos and text look physically attached to a mockup.",
    "intro": "A flat logo only looks realistic on a mockup when its geometry agrees with the surface beneath it. Start from the surface, then transform the artwork to fit.",
    "answer": "Perspective is excellent for planar quadrilaterals. Curved bottles, cylinders, or bent screens require a deformation approach that can bend the artwork.",
    "banner": "/blog/imported-how-to-warp-and-angle-your-designs-in-inkscape.svg",
    "bannerAlt": "Original StackShade diagram for Inkscape Perspective Mockups: Warp Logos and Text to Match Angled or Curved Surfaces",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Draw the surface first",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Target surface",
              "Guide shape",
              "Transform",
              "Logo/text",
              "Mockup"
            ]
          },
          {
            "type": "p",
            "text": "Keeping the original artwork intact gives you a safe source while the transformed duplicate becomes the mockup layer."
          }
        ]
      },
      {
        "heading": "2. Use perspective for planar faces",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Create a four-corner guide matching the visible plane.",
              "Apply Inkscape's perspective workflow.",
              "Check all four corners against the surface.",
              "Inspect at final display size."
            ]
          },
          {
            "type": "p",
            "text": "This is essentially a mapping from one quadrilateral to another."
          }
        ]
      },
      {
        "heading": "3. Switch to deformation for curves",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Create a guide that matches the curved silhouette.",
              "Use envelope-style deformation when a plane is not enough.",
              "Keep bend handles aligned to avoid sharp kinks.",
              "Convert editable text to paths only after keeping a live-text backup."
            ]
          },
          {
            "type": "callout",
            "tone": "info",
            "title": "Why perspective can fail",
            "text": "Perspective models a flat plane. A curved surface needs geometry that can bend."
          }
        ]
      },
      {
        "heading": "4. Validate the final SVG",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Zoom to 100% to find tiny gaps.",
              "Check clipping and masks.",
              "Confirm text remains legible.",
              "Export a final-size preview before publishing."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Why does perspective fail on a cylinder?",
        "A cylinder is curved, while a basic perspective transform models a plane."
      ],
      [
        "Should text be converted to paths?",
        "Often for precise deformation, but keep an editable text version separately."
      ],
      [
        "Can screenshots be warped too?",
        "Yes. The same geometry-based transform can be applied to screenshots and other artwork."
      ]
    ],
    "related": [
      "inkscape-clean-up-document",
      "how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/how-to-warp-and-angle-your-designs-in-inkscape"
      ],
      [
        "Inkscape documentation",
        "https://inkscape.org/doc/"
      ]
    ]
  },
  {
    "slug": "inkscape-clean-up-document",
    "title": "Clean Up Inkscape SVGs: Remove Hidden Baggage Without Breaking the Design",
    "sourceTitle": "How to remove hidden data from Inkscape files to reduce the file size",
    "sourceDate": "December 21, 2025",
    "sourceUrl": "https://imadsaddik.com/blogs/inkscape-clean-up-document",
    "category": "Design Optimization",
    "tags": [
      "inkscape",
      "svg",
      "optimization",
      "assets"
    ],
    "playlist": "Visual Design Systems",
    "readTime": "6 min read",
    "description": "Find hidden images, unused resources, and editor metadata that make SVG files larger than the visible artwork suggests.",
    "intro": "An SVG is a document, not just a picture. Hidden layers, embedded images, masks, and editor-specific resources can survive long after the visible design changes.",
    "answer": "The safe workflow is backup → inspect → clean → reopen → compare. File size is one signal; rendering fidelity matters just as much.",
    "banner": "/blog/imported-inkscape-clean-up-document.svg",
    "bannerAlt": "Original StackShade diagram for Clean Up Inkscape SVGs: Remove Hidden Baggage Without Breaking the Design",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. Find what the canvas hides",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Inspect Layers and Objects.",
              "Look for hidden images and unused layers.",
              "Check clipping paths and masks.",
              "Keep an editable source copy."
            ]
          }
        ]
      },
      {
        "heading": "2. Clean the document",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Duplicate source",
              "Inspect resources",
              "Run cleanup",
              "Save cleaned copy",
              "Visual compare"
            ]
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Preserve the editable original",
            "text": "Cleanup can remove editor-specific data that you may need later."
          }
        ]
      },
      {
        "heading": "3. Compare the output",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "ls -lh original.svg cleaned.svg",
            "title": "Size comparison"
          },
          {
            "type": "p",
            "text": "A smaller file is useful only if the artwork still behaves correctly. Test text, masks, clips, images, and exports."
          }
        ]
      },
      {
        "heading": "4. Optimize further when needed",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Use an SVG optimizer after the design tool.",
              "Keep the master source separate from the web-delivery SVG.",
              "Measure transfer size and parse/render cost on the final site."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Does cleanup always shrink SVGs?",
        "No. A simple file may have little unused data."
      ],
      [
        "Can hidden images be removed?",
        "Potentially, but check whether they are intentionally retained for editing."
      ],
      [
        "Should I also run SVGO?",
        "Often yes for web delivery, while keeping the editable design source intact."
      ]
    ],
    "related": [
      "how-to-warp-and-angle-your-designs-in-inkscape",
      "how-to-replace-font-awesome-with-compile-time-inline-svgs-in-vite"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/inkscape-clean-up-document"
      ],
      [
        "Inkscape docs",
        "https://inkscape.org/doc/"
      ],
      [
        "SVGO",
        "https://github.com/svg/svgo"
      ]
    ]
  },
  {
    "slug": "local-ai-stack-on-linux",
    "title": "Build a Local AI Stack on Linux: llama.cpp, Model Switching, Chat UI, Embeddings, and Speech",
    "sourceTitle": "How to build your own local AI stack on Linux with llama.cpp, llama-swap, LibreChat and more",
    "sourceDate": "December 27, 2025",
    "sourceUrl": "https://imadsaddik.com/blogs/local-ai-stack-on-linux",
    "category": "Local AI",
    "tags": [
      "linux",
      "llama.cpp",
      "gguf",
      "librechat",
      "llm",
      "whisper",
      "local-ai"
    ],
    "playlist": "AI Systems, Demystified",
    "readTime": "20 min read",
    "description": "A systems view of local inference: compile a runtime for your hardware, serve quantized models, manage multiple backends, connect a UI, add embeddings and speech, and automate operations.",
    "intro": "Running local AI is less about one magic binary and more about building a small stack. The runtime, model files, model manager, user interface, embedding model, speech layer, and operating-system services each solve a different problem.",
    "answer": "Start with a model that fits your hardware, keep network exposure narrow, and separate model lifecycle from application UX. The source setup used an NVIDIA GPU and Ubuntu, but the architecture generalizes.",
    "banner": "/blog/imported-local-ai-stack-on-linux.svg",
    "bannerAlt": "Original StackShade diagram for Build a Local AI Stack on Linux: llama.cpp, Model Switching, Chat UI, Embeddings, and Speech",
    "author": "Shaswat Raj",
    "sections": [
      {
        "heading": "1. The architecture",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "LibreChat",
              "llama-swap",
              "llama.cpp",
              "GGUF models",
              "CPU/GPU"
            ]
          },
          {
            "type": "p",
            "text": "The source setup also used embeddings, vision models, Whisper, systemd, scheduled updates, and configuration watchers. Think of these as composable services rather than one monolith."
          }
        ]
      },
      {
        "heading": "2. Build llama.cpp for your backend",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "sudo apt update\nsudo apt install build-essential cmake git\ngit clone https://github.com/ggml-org/llama.cpp.git\ncd llama.cpp\ncmake -B build -DGGML_CUDA=ON\ncmake --build build --config Release -j $(nproc)",
            "title": "CUDA-oriented build"
          },
          {
            "type": "callout",
            "tone": "warning",
            "title": "Hardware-specific flags",
            "text": "GPU architecture, GPU layer count, context length, and supported backends depend on your machine."
          }
        ]
      },
      {
        "heading": "3. Choose a model that fits",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Prefer quantized GGUF files when memory is constrained.",
              "Compare model size, quantization, context length, and GPU offload.",
              "Use runtime help output to understand the flags your installed version supports."
            ]
          },
          {
            "type": "code",
            "language": "bash",
            "code": "llama-cli --help\nllama-server --help",
            "title": "Discover current runtime options"
          }
        ]
      },
      {
        "heading": "4. Serve the model",
        "blocks": [
          {
            "type": "code",
            "language": "bash",
            "code": "llama-server \\\n  --model /path/to/model.gguf \\\n  --host 127.0.0.1 \\\n  --port 8080",
            "title": "Local API example"
          },
          {
            "type": "p",
            "text": "Bind to localhost when only local software needs the API. Containers or remote clients should use the smallest private-network boundary that fits the deployment."
          }
        ]
      },
      {
        "heading": "5. Add model switching and a UI",
        "blocks": [
          {
            "type": "flow",
            "nodes": [
              "Chat UI",
              "Model manager",
              "Inference server",
              "Model cache"
            ]
          },
          {
            "type": "p",
            "text": "A manager such as llama-swap can start different model backends on demand so the machine does not need every model resident in VRAM at once. LibreChat can sit above those services as the user-facing layer."
          }
        ]
      },
      {
        "heading": "6. Embeddings, vision, and speech",
        "blocks": [
          {
            "type": "bullets",
            "items": [
              "Embeddings power semantic retrieval and RAG.",
              "Vision models add image understanding when the runtime supports the required assets.",
              "Whisper-based services add speech-to-text.",
              "Keep service names and model identifiers consistent across configuration."
            ]
          },
          {
            "type": "flow",
            "nodes": [
              "Audio",
              "Whisper",
              "Text",
              "LLM",
              "Response"
            ]
          }
        ]
      },
      {
        "heading": "7. Operationalize the stack",
        "blocks": [
          {
            "type": "code",
            "language": "ini",
            "code": "[Service]\nExecStart=/usr/local/bin/your-service\nRestart=always\n\n[Install]\nWantedBy=multi-user.target",
            "title": "systemd pattern"
          },
          {
            "type": "bullets",
            "items": [
              "Back up configuration files.",
              "Log startup and model-load failures.",
              "Automate updates deliberately.",
              "Keep model storage separate from application code.",
              "Measure tokens/sec, prompt latency, VRAM use, and context limits."
            ]
          }
        ]
      }
    ],
    "faqs": [
      [
        "Why use GGUF?",
        "It is a common model format in the llama.cpp ecosystem and is designed for efficient local inference."
      ],
      [
        "Is a larger model always better?",
        "No. Task fit, quantization, context, and speed all matter."
      ],
      [
        "What does llama-swap add?",
        "It can manage multiple backends and switch models in and out to reduce memory pressure."
      ]
    ],
    "related": [
      "nlp-from-text-to-transformers",
      "elasticsearch-pre-filtering-with-knn-search",
      "how-to-set-up-a-secure-cloud-server-with-ubuntu-and-ssh",
      "how-to-configure-firewall-ufw-fail2ban-ubuntu"
    ],
    "sources": [
      [
        "Original guide by Imad Saddik",
        "https://imadsaddik.com/blogs/local-ai-stack-on-linux"
      ],
      [
        "llama.cpp",
        "https://github.com/ggml-org/llama.cpp"
      ],
      [
        "LibreChat",
        "https://www.librechat.ai/docs"
      ],
      [
        "llama-swap",
        "https://github.com/mostlygeek/llama-swap"
      ],
      [
        "whisper.cpp",
        "https://github.com/ggml-org/whisper.cpp"
      ]
    ]
  }
] as ImportedBlog[];
export const IMPORTED_ARTICLES: Article[] = IMPORTED_BLOGS.map((blog) => ({
  slug: blog.slug, title: blog.title, description: blog.description, category: blog.category,
  tags: blog.tags, playlist: blog.playlist, date: "2026-09-24", displayDate: "September 24, 2026",
  readTime: blog.readTime, banner: blog.banner, bannerAlt: blog.bannerAlt, author: blog.author
}));
export function getImportedBlog(slug: string) { return IMPORTED_BLOGS.find((blog) => blog.slug === slug); }
