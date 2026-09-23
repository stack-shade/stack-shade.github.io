
import type { Course, CourseModule, Lesson } from "@/lib/courses-data";
import type { CNLesson } from "@/lib/computer-networks-lessons";

export interface CourseLessonContent {
  slug: string;
  title: string;
  eyebrow: string;
  visual?: string;
  overview: string;
  mentalModel: string;
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

export function getLessonContent(
  course: Course,
  module: CourseModule,
  lesson: Lesson,
  moduleIndex: number,
  lessonIndex: number,
  rich?: CNLesson,
): CourseLessonContent {
  return rich ? fromComputerNetworkLesson(rich) : buildGenericLessonContent(course, module, lesson, moduleIndex, lessonIndex);
}
