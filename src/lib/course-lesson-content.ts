
import type { Course, CourseModule, Lesson } from "@/lib/courses-data";
import type { CNLesson } from "@/lib/computer-networks-lessons";

export interface CourseLessonContent {
  slug: string;
  title: string;
  eyebrow: string;
  visual?: string;
  overview: string;
  mentalModel: string;
  analogy?: { title: string; body: string };
  neuroscience?: { title: string; body: string };
  deepDive: { title: string; body: string }[];
  flow: { label: string; detail: string }[];
  artifact: { title: string; language: string; code: string; explanation: string };
  mistakes: string[];
  recall: { question: string; answer: string }[];
  feynman: string;
  examAngle: string;
  next: string[];
}

export function fromComputerNetworkLesson(content: CNLesson): CourseLessonContent {
  return {
    slug: content.slug,
    title: content.title,
    eyebrow: content.eyebrow,
    visual: content.visual,
    overview: content.overview,
    mentalModel: content.mentalModel,
    deepDive: content.deepDive,
    flow: content.flow,
    artifact: content.artifact,
    mistakes: content.mistakes,
    recall: content.recall,
    feynman: content.feynman,
    examAngle: content.examAngle,
    next: content.next,
  };
}

function typeLabel(type: Lesson["type"]) {
  switch (type) {
    case "video": return "video lesson";
    case "article": return "reading lesson";
    case "interactive": return "interactive lesson";
    case "practice": return "practice problem";
    case "project": return "project lesson";
    case "quiz": return "retrieval lesson";
  }
}

export function buildGenericLessonContent(
  course: Course,
  module: CourseModule,
  lesson: Lesson,
  moduleIndex: number,
  lessonIndex: number,
): CourseLessonContent {
  const neighbors = module.lessons
    .map((item) => item.title)
    .filter((title) => title !== lesson.title)
    .slice(0, 4);

  const next = course.modules
    .flatMap((item) => item.lessons)
    .map((item) => item.title)
    .filter((title) => title !== lesson.title)
    .slice(0, 4);

  const overview =
    "This topic is a " +
    typeLabel(lesson.type) +
    " inside the " +
    module.title +
    " module. The goal is not to memorize the title: reconstruct the problem it solves, the mechanism that makes it work, and the signal that tells you when to use it.";

  const mentalModel =
    module.hook ||
    ("Treat " +
      lesson.title +
      " as a tool in a larger system. First identify the input, then the transformation, then the constraint or decision, and finally the observable result.");

  return {
    slug:
      "m" +
      (moduleIndex + 1) +
      "-l" +
      (lessonIndex + 1) +
      "-" +
      lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    title: lesson.title,
    eyebrow: course.category + " • Topic " + String(lessonIndex + 1).padStart(2, "0"),
    overview,
    mentalModel,
    analogy: {
      title: "One concrete picture",
      body:
        "Translate the mechanism into a physical system you already understand. Ask what plays the role of the input, the worker, the bottleneck and the observable result. A good analogy should preserve the causal relationship, not merely resemble the vocabulary.",
    },
    neuroscience: {
      title: "Learn this by reconstruction, not rereading",
      body:
        "The page separates explanation, visualization and retrieval so you have to reconstruct the mechanism. Research on learning supports spacing and retrieval practice as effective ways to strengthen later retention; use the question cards after the explanation rather than immediately rereading the same paragraph.",
    },
    deepDive: [
      {
        title: "What problem does this solve?",
        body:
          "Start from the engineering problem rather than the definition. " +
          lesson.title +
          " exists because a system needs a reliable way to handle a recurring constraint inside " +
          module.title +
          ". Ask what would become slow, ambiguous, unsafe, or impossible without it.",
      },
      {
        title: "How the mechanism works",
        body:
          "Break the idea into observable steps. The useful mental model is: input → transformation → decision or state change → output. Keep each step small enough that you can redraw it from memory. The surrounding module is the context: " +
          module.hook,
      },
      {
        title: "When to reach for it",
        body: neighbors.length
          ? "Use nearby concepts as contrasts. In this module, compare " +
            lesson.title +
            " with " +
            neighbors.slice(0, 3).join(", ") +
            ". The distinction matters because good engineering choices depend on the constraints, not on memorizing isolated definitions."
          : "Ask which input pattern, constraint, or failure signal points you toward " +
            lesson.title +
            ". Then name one situation where using it would be unnecessary or harmful.",
      },
    ],
    flow: [
      { label: "Frame", detail: "State the problem and the constraints before naming the technique." },
      { label: "Transform", detail: "Apply the core mechanism of " + lesson.title + " and track what state changes." },
      { label: "Observe", detail: "Inspect the artifact, output, invariant, or behavior produced by the mechanism." },
      { label: "Transfer", detail: "Explain where the same idea appears elsewhere in " + course.title + "." },
    ],
    artifact: {
      title: "Reconstruction card",
      language: "text",
      code: [
        "TOPIC: " + lesson.title,
        "MODULE: " + module.title,
        "TYPE: " + typeLabel(lesson.type),
        "",
        "PROMPT",
        "What problem does it solve?",
        "What changes step by step?",
        "What evidence proves it worked?",
        "When would you choose something else?",
      ].join("\n"),
      explanation: "Use the card as a generative note, not a summary to copy. Fill it from memory after the explanation.",
    },
    mistakes: [
      "Memorizing " + lesson.title + " without naming the problem it solves.",
      "Skipping the mechanism and jumping from definition straight to the answer.",
      "Confusing a familiar example with the general rule.",
      "Treating a classroom simplification as a universal production rule.",
    ],
    recall: [
      {
        question: "What problem is " + lesson.title + " designed to solve?",
        answer:
          "It addresses a recurring constraint inside " +
          module.title +
          ". A strong answer names the input, the core mechanism, and the result rather than repeating the title.",
      },
      {
        question: "What are the four stages of the mental model?",
        answer: "Frame the problem → transform the input/state → observe the evidence → transfer the idea to a new scenario.",
      },
      ...module.recall.slice(0, 2).map((item) => ({ question: item.q, answer: item.a })),
    ].slice(0, 4),
    feynman:
      module.feynman ||
      ("Explain " +
        lesson.title +
        " to an intelligent beginner using one analogy, one concrete example, and one boundary case."),
    examAngle:
      "A strong exam or interview answer should connect purpose → mechanism → example → limitation. For " +
      lesson.title +
      ", be ready to reconstruct the process without notes and distinguish it from a nearby concept.",
    next,
  };
}


function richSystemDesignScalingLesson(
  course: Course,
  module: CourseModule,
  lesson: Lesson,
  moduleIndex: number,
  lessonIndex: number,
): CourseLessonContent {
  return {
    slug:
      "m" +
      (moduleIndex + 1) +
      "-l" +
      (lessonIndex + 1) +
      "-vertical-vs-horizontal-scaling",
    title: "Vertical vs Horizontal Scaling",
    eyebrow: "SYSTEM DESIGN • FOUNDATIONS",
    overview:
      "Scaling means increasing a system's ability to serve demand while keeping the useful work correct and predictable. The first question is deceptively simple: do we make one machine bigger, or do we run more machines? That choice changes cost, failure modes, architecture, deployment strategy and the kinds of bottlenecks you will meet next.",
    mentalModel:
      "Vertical scaling changes the capacity of one worker. Horizontal scaling changes the number of workers. The moment you add workers, you also inherit the engineering problem of coordinating, routing and sharing state between them.",
    analogy: {
      title: "One giant restaurant vs several identical kitchens",
      body:
        "Imagine a restaurant receiving 100 orders an hour. Vertical scaling is replacing one kitchen with a much larger kitchen: more burners, more cooks, more refrigeration. Horizontal scaling is opening three smaller kitchens and using a dispatcher to send each order to an available kitchen. The first approach is simpler because one kitchen sees everything. The second gives you more aggregate capacity and lets one kitchen fail without stopping the whole service—but now the dispatcher, shared ingredients, order state and synchronization all matter.",
    },
    neuroscience: {
      title: "Why this lesson forces reconstruction",
      body:
        "This page is deliberately organized around a mental model, a visual flow, an example and retrieval questions. Learning research consistently finds that retrieval practice and spaced practice improve later retention more than repeated study alone; retrieval is an active act of reconstruction, not just a read operation. So after reading the scaling explanation, close the page and redraw the architecture before revealing the answers.",
    },
    deepDive: [
      {
        title: "1. Start with the thing that actually scales",
        body:
          "Do not say 'we need to scale' without naming the constrained resource. A web service may be CPU-bound, memory-bound, I/O-bound, connection-bound, limited by a database, limited by a lock, or limited by a downstream dependency. Let safe capacity per instance be q_safe requests/second and peak demand be Q_peak. A first approximation for the number of horizontal replicas is N = ceil(Q_peak / q_safe), then add headroom and redundancy. The important idea is that scaling is capacity engineering, not a button in a cloud console.",
      },
      {
        title: "2. Vertical scaling: make one machine stronger",
        body:
          "Vertical scaling, or scaling up, increases resources on one machine: more CPU cores, more RAM, faster storage or a stronger network interface. It is architecturally attractive because the application can often remain a single process or a small number of processes with the same shared-memory model. The trade-off is that capacity eventually hits a hardware or provider ceiling, upgrades can become expensive, and one machine remains a large failure domain. Vertical scaling can also expose diminishing returns: a workload with a serial bottleneck will not become four times faster just because the machine has four times the theoretical compute.",
      },
      {
        title: "3. Horizontal scaling: make the fleet wider",
        body:
          "Horizontal scaling, or scaling out, adds more machines or instances and distributes work across them. For a stateless HTTP service, the common shape is client → load balancer → replica 1/2/3/… . If one replica can safely process 100 QPS and the peak is 350 QPS, four replicas provide about 400 QPS of theoretical aggregate capacity before overhead and headroom. Real systems need margins for uneven load, warm-up time, background work and failures, so the design target should be below the theoretical maximum rather than exactly at it.",
      },
      {
        title: "4. Why horizontal scaling changes the architecture",
        body:
          "The difficulty moves from 'make one box faster' to 'make many boxes behave like one service.' Requests must be routed. Instances need health checks. Deployments need coordination. Sessions cannot safely live only in one process if a later request can reach another replica, so session state often moves to a shared store or the client. Local memory caches become per-instance caches. Files written to local disks may disappear when an instance is replaced. These are not side details—they are the price of distributed execution.",
      },
      {
        title: "5. The database often becomes the next bottleneck",
        body:
          "Adding API servers does not automatically multiply end-to-end capacity. If every replica performs the same reads and writes against one database, the database may become the new bottleneck. This is why scaling is usually applied layer by layer: scale the stateless application tier, observe the next saturated dependency, then choose an appropriate technique there—connection pooling, caching, read replicas, partitioning, batching, asynchronous work or a different data model. The system bottleneck is wherever demand meets the smallest effective capacity.",
      },
      {
        title: "6. Scaling and availability are connected—but not identical",
        body:
          "Horizontal scaling can improve availability when replicas fail independently, because traffic can be shifted away from unhealthy instances. But replicas only help if the surrounding dependencies are also redundant. Three app servers behind a single database with no failover still have a shared bottleneck and failure domain. AWS's Well-Architected guidance explicitly connects horizontal scaling with aggregate workload availability and recommends distributing requests across multiple smaller resources rather than depending on one large resource. citeturn466637search9",
      },
      {
        title: "7. A practical decision procedure",
        body:
          "Ask four questions in order. First, what is the bottleneck—CPU, memory, I/O, network, lock contention, database or downstream service? Second, can the workload be partitioned safely across independent workers? Third, what state must be shared, and where will that state live? Fourth, what happens when one worker disappears during a request burst or deployment? If the workload is naturally stateless, bursty and parallelizable, horizontal scaling becomes especially attractive. If the bottleneck is inside one process or shared-memory workload and the system is still small, vertical scaling can postpone distributed complexity. The correct decision follows the workload and failure model, not fashion.",
      },
    ],
    flow: [
      { label: "Demand", detail: "Measure QPS, latency, saturation and the dependency currently limiting safe capacity." },
      { label: "Diagnose", detail: "Identify the real bottleneck before choosing vertical or horizontal scaling." },
      { label: "Choose", detail: "Scale one worker up or distribute work across multiple workers with routing and health checks." },
      { label: "Validate", detail: "Load-test at peak assumptions, inject instance failures, and re-check the next bottleneck." },
    ],
    artifact: {
      title: "Scaling decision + architecture card",
      language: "architecture",
      code: [
        "CURRENT",
        "Client",
        "  ↓",
        "Load Balancer",
        "  ↓",
        "App-1  →  Database",
        "",
        "HORIZONTAL VERSION",
        "Client",
        "  ↓",
        "Load Balancer",
        "  ├── App-1 ─┐",
        "  ├── App-2 ─┼──→ Shared state / DB",
        "  └── App-3 ─┘",
        "",
        "CAPACITY CHECK",
        "N = ceil(Q_peak / Q_safe_per_replica)",
        "Target replicas = N + redundancy + headroom",
        "",
        "DECISION",
        "Bottleneck: __________",
        "State that must be shared: __________",
        "Failure if one replica dies: __________",
        "Next load test: __________",
      ].join("\n"),
      explanation:
        "Rebuild this card without looking at the article. Then change the assumptions: double Q_peak, make one replica fail, and assume the database has a fixed write limit. The goal is to expose where the bottleneck moves.",
    },
    mistakes: [
      "Assuming a four-times-bigger machine automatically produces four-times the throughput.",
      "Adding application replicas without checking database, cache, network or connection limits.",
      "Keeping user sessions or mutable application state only in one process after scaling out.",
      "Treating load balancing as the scaling mechanism itself; it distributes work but does not create compute capacity.",
      "Designing exactly at peak theoretical capacity instead of leaving headroom for skew, warm-up and failures.",
      "Calling a system 'highly available' because it has multiple app instances while a shared dependency remains a single failure domain.",
    ],
    recall: [
      {
        question: "What is the difference between scaling up and scaling out?",
        answer:
          "Scaling up increases the resources available to one machine. Scaling out increases the number of machines or instances and distributes work across them.",
      },
      {
        question: "Why can horizontal scaling force you to externalize state?",
        answer:
          "A later request may land on a different replica, so state stored only in one process or local disk is no longer reliably visible to every request handler.",
      },
      {
        question: "If one replica handles 100 QPS safely and peak demand is 350 QPS, what is the first replica-count estimate?",
        answer:
          "ceil(350 / 100) = 4 replicas before adding any explicit redundancy or headroom.",
      },
      {
        question: "Why doesn't adding app servers necessarily increase total system capacity?",
        answer:
          "Another layer can become the bottleneck—for example a database with a fixed write capacity, a shared cache or a downstream API.",
      },
    ],
    feynman:
      "Explain the choice using one picture: one large kitchen versus several smaller kitchens plus a dispatcher. Then explain why several kitchens require a shared way to handle orders, health checks and inventory.",
    examAngle:
      "A strong system-design answer defines both models, gives one concrete architecture, quantifies the capacity estimate, explains the state-management consequence, and identifies the next bottleneck and failure mode.",
    next: [
      "Latency, throughput, bandwidth — with real numbers",
      "Availability, nines, and single points of failure",
    ],
  };
}

export function getLessonContent(
  course: Course,
  module: CourseModule,
  lesson: Lesson,
  moduleIndex: number,
  lessonIndex: number,
  rich?: CNLesson,
): CourseLessonContent {
  if (rich) return fromComputerNetworkLesson(rich);
  if (
    course.slug === "system-design-fundamentals" &&
    lesson.title.toLowerCase() === "vertical vs horizontal scaling"
  ) {
    return richSystemDesignScalingLesson(course, module, lesson, moduleIndex, lessonIndex);
  }
  return buildGenericLessonContent(course, module, lesson, moduleIndex, lessonIndex);
}
