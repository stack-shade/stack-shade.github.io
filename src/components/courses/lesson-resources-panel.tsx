import { ExternalLink, FileDown, BookOpenCheck } from "lucide-react";

type Props = {
  courseSlug: string;
  lessonTitle: string;
  previousLessonTitle: string | null;
};

type Resource = {
  title: string;
  kind: string;
  description: string;
  href: string;
  icon: "doc" | "pdf" | "book";
};

export default function LessonResourcesPanel({ courseSlug, lessonTitle, previousLessonTitle }: Props) {
  const resources: Resource[] =
    courseSlug === "system-design-fundamentals" && lessonTitle === "Vertical vs Horizontal Scaling"
      ? [
          {
            title: "AWS: Horizontal scaling",
            kind: "Official guide",
            description: "A concise definition of horizontal vs vertical scaling and why multiple smaller resources can improve aggregate workload availability.",
            href: "https://wa.aws.amazon.com/wellarchitected/2020-07-02T19-33-23/wat.concept.horizontal-scaling.en.html",
            icon: "doc",
          },
          {
            title: "AWS Well-Architected Reliability Pillar",
            kind: "PDF",
            description: "Reliability guidance covering horizontal scaling, automatic scaling, capacity planning and failure-aware architecture.",
            href: "https://docs.aws.amazon.com/pdfs/wellarchitected/latest/reliability-pillar/wellarchitected-reliability-pillar.pdf",
            icon: "pdf",
          },
          {
            title: "Amazon EC2 Auto Scaling",
            kind: "Official docs",
            description: "Study how minimum, desired and maximum capacity interact with dynamic, scheduled and predictive scaling.",
            href: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/",
            icon: "doc",
          },
          {
            title: "Cloudflare Load Balancing reference architecture",
            kind: "Reference architecture",
            description: "See how a load balancer distributes traffic across healthy endpoints and supports scaling, failover and geographic routing.",
            href: "https://developers.cloudflare.com/reference-architecture/architectures/load-balancing/",
            icon: "doc",
          },
          {
            title: "Google SRE: Capacity Planning",
            kind: "Engineering practice",
            description: "Connect demand forecasting, load testing and provisioning to real service capacity rather than theoretical machine size.",
            href: "https://sre.google/sre-book/introduction/",
            icon: "book",
          },
          {
            title: "Learning science: spacing + retrieval practice",
            kind: "Research review",
            description: "Why the Practice tab asks you to retrieve the mechanism instead of rereading it repeatedly.",
            href: "https://www.nature.com/articles/s44159-022-00089-1.pdf",
            icon: "pdf",
          },
        ]
      : [
          {
            title: "AWS Well-Architected Framework",
            kind: "Reference",
            description: "Use as a general reference for reliability, scaling and failure-aware cloud architecture.",
            href: "https://docs.aws.amazon.com/wellarchitected/latest/framework/",
            icon: "doc",
          },
          {
            title: "Google SRE Book",
            kind: "Engineering practice",
            description: "Capacity planning, load balancing, availability and production system design.",
            href: "https://sre.google/sre-book/",
            icon: "book",
          },
          {
            title: "Previous topic: " + (previousLessonTitle ?? "none"),
            kind: previousLessonTitle ? "Course context" : "Course start",
            description: previousLessonTitle
              ? "Use the previous lesson as the bridge into this concept."
              : "This is the first topic in the course, so there is no previous lesson yet.",
            href: "/courses/" + courseSlug,
            icon: "doc",
          },
        ];

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-card/25 p-4 sm:p-5">
        <span className="lesson-kicker">RESOURCES</span>
        <h2 className="mt-1 text-xl font-black">Docs, PDFs and references</h2>
        <p className="mt-2 max-w-2xl text-xs leading-6 text-muted-foreground">
          Use these after the article, not instead of it. The first group is curated for this exact topic.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {resources.map((resource) => {
          const Icon = resource.icon === "pdf" ? FileDown : resource.icon === "book" ? BookOpenCheck : ExternalLink;
          return (
            <a
              key={resource.title}
              href={resource.href}
              target={resource.href.startsWith("http") ? "_blank" : undefined}
              rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-2xl border border-border bg-card/25 p-4 transition hover:border-foreground/25"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono text-[8px] text-muted-foreground">{resource.kind}</span>
                  <h3 className="mt-1 text-sm font-bold">{resource.title}</h3>
                </div>
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{resource.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 font-mono text-[8px] text-muted-foreground group-hover:text-foreground">
                Open resource <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
