import type { Course, CourseModule, Lesson } from "@/lib/courses-data";
import { getComputerNetworkLesson } from "@/lib/computer-networks-lessons";
import { getNlpTopicGuide, nlpTopicSlug } from "@/lib/nlp-course-content";

export type PresentationSlideKind =
  | "title"
  | "objective"
  | "mental-model"
  | "concept"
  | "flow"
  | "visual"
  | "artifact"
  | "pitfalls"
  | "example"
  | "recall"
  | "challenge"
  | "summary";

export interface PresentationSlide {
  kind: PresentationSlideKind;
  eyebrow: string;
  title: string;
  body?: string;
  bullets?: string[];
  flow?: { label: string; detail: string }[];
  code?: { language: string; value: string };
  accent?: string;
  notes?: string;
}

export interface CoursePresentation {
  course: Course;
  module: CourseModule;
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
  lessonSlug: string;
  slides: PresentationSlide[];
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function presentationLessonSlug(moduleIndex: number, lessonIndex: number, title: string) {
  return `m${moduleIndex + 1}-l${lessonIndex + 1}-${slugify(title)}`;
}

function genericArtifact(course: Course, module: CourseModule, lesson: Lesson) {
  const typeLabel = lesson.type === "interactive"
    ? "INTERACTIVE"
    : lesson.type.toUpperCase();

  return {
    language: "text",
    value:
      `TOPIC: ${lesson.title}\nTYPE: ${typeLabel}\nDURATION: ${lesson.duration}\nMODULE: ${module.title}\n\nTEACHING MOVE\n1. Predict\n2. Explain\n3. Demonstrate\n4. Retrieve\n5. Apply`,
  };
}

function buildSlides(course: Course, module: CourseModule, lesson: Lesson): PresentationSlide[] {
  const linkedLessonSlug =
    course.slug === "computer-networks" && lesson.href
      ? lesson.href.split("/").filter(Boolean).at(-1)
      : undefined;
  const rich =
    course.slug === "computer-networks"
      ? getComputerNetworkLesson(linkedLessonSlug ?? slugify(lesson.title))
      : course.slug === "natural-language-processing"
        ? getNlpTopicGuide(nlpTopicSlug(lesson.title))
        : undefined;

  const neighboring = module.lessons
    .filter((candidate) => candidate.title !== lesson.title)
    .slice(0, 4)
    .map((candidate) => candidate.title);

  const recall = rich?.recall ?? module.recall;
  const recallA = recall[0];
  const recallB = recall[1] ?? recall[0];
  const artifact = rich?.artifact ?? genericArtifact(course, module, lesson);

  const slides: PresentationSlide[] = [
    {
      kind: "title",
      eyebrow: `${course.title} • ${module.phase}`,
      title: lesson.title,
      body: rich?.overview ?? module.hook,
      accent: course.category,
      notes: `Open with the learner outcome, not the definition. Ask: "What do you already predict about this topic?"`,
    },
    {
      kind: "objective",
      eyebrow: "01 • Learning target",
      title: "By the end of this topic, you should be able to…",
      bullets: rich
        ? [
            `Explain ${lesson.title} without reading notes.`,
            "Reconstruct the process or model from memory.",
            "Use the concept on a realistic scenario.",
            "Spot the common misconception before it causes an error.",
          ]
        : [
            `Explain the core idea behind ${lesson.title}.`,
            `Connect it to the module: ${module.title}.`,
            "Apply the idea to at least one concrete scenario.",
            "Teach it back in simple language.",
          ],
      notes: "Keep this slide up briefly. It sets a retrieval target for the entire recording.",
    },
    {
      kind: "mental-model",
      eyebrow: "02 • Mental model",
      title: rich ? "Remember it as a system" : module.hook,
      body: rich?.mentalModel ?? module.feynman,
      notes: "Use the analogy only to create a scaffold. Immediately connect the metaphor back to the technical model.",
    },
    {
      kind: "concept",
      eyebrow: "03 • Core concept",
      title: rich?.deepDive[0]?.title ?? lesson.title,
      body: rich?.deepDive[0]?.body ?? `Place ${lesson.title} in the larger system: ${module.title}. The key question is what problem this concept solves and what assumptions it makes.`,
      bullets: rich?.deepDive.slice(1, 3).map((section) => `${section.title}: ${section.body}`) ?? [
        `Role: ${lesson.type}`,
        `Module hook: ${module.hook}`,
        `Nearby topics: ${neighboring.join(" • ")}`,
      ],
      notes: "Teach the mechanism. Avoid reading paragraphs word-for-word; use the slide as a visual anchor.",
    },
    {
      kind: "flow",
      eyebrow: "04 • Causal flow",
      title: "What happens, step by step",
      flow: rich?.flow ?? [
        { label: "Start", detail: `Identify the problem addressed by ${lesson.title}.` },
        { label: "Mechanism", detail: "Walk through the core operation and the state that changes." },
        { label: "Evidence", detail: "Show the artifact, output, packet, formula or code that makes the mechanism observable." },
        { label: "Result", detail: "Explain the resulting behavior and the boundary conditions." },
      ],
      notes: "Animate one step at a time during the recording. Do not reveal all details before the learner has predicted the next step.",
    },
    {
      kind: "visual",
      eyebrow: "05 • Visual reasoning",
      title: rich ? "See the structure before the details" : "Build the picture first",
      bullets: rich
        ? rich.flow.slice(0, 4).map((step) => `${step.label} → ${step.detail}`)
        : [
            `Problem → ${lesson.title}`,
            `Mechanism → the rule or process inside the topic`,
            "Observation → what a learner can see, calculate or measure",
            "Outcome → what changes after the mechanism runs",
          ],
      notes: "This is the moment to point at the visual rather than reading the text. Ask the learner what they expect next.",
    },
    {
      kind: "artifact",
      eyebrow: "06 • Artifact",
      title: artifact.language === "bash" ? "Command-line evidence" : "The thing you can inspect",
      code: artifact,
      body: rich?.artifact.explanation ?? "Keep a concrete artifact visible while you explain the mechanism. It gives the learner a stable reference point for later retrieval.",
      notes: "For recording: reveal the artifact after explaining the idea, then zoom in on the two or three fields that matter.",
    },
    {
      kind: "example",
      eyebrow: "07 • Worked example",
      title: rich ? "Run the idea on a concrete case" : `Example: ${lesson.title}`,
      body: rich?.examAngle ?? `Take one realistic scenario involving ${lesson.title}. State the input, walk through the mechanism, and predict the output before revealing it.`,
      bullets: rich?.mistakes.slice(0, 2).map((mistake) => `Watch out: ${mistake}`) ?? [
        "State the inputs explicitly.",
        "Explain each decision before showing the result.",
        "Check the result against the original constraint.",
      ],
      notes: "Do not jump straight to the answer. Pause so the learner can predict.",
    },
    {
      kind: "pitfalls",
      eyebrow: "08 • Misconceptions",
      title: "The traps that make this topic feel harder than it is",
      bullets: rich?.mistakes ?? [
        `Memorizing ${lesson.title} without understanding its purpose.`,
        "Confusing a model with the implementation behind it.",
        "Skipping the edge case that changes the result.",
      ],
      notes: "These make excellent cut points for your video: show the incorrect mental model, then replace it with the correct one.",
    },
    {
      kind: "recall",
      eyebrow: "09 • Active recall",
      title: recallA?.q ?? `What is the core idea behind ${lesson.title}?`,
      body: "Pause the recording. Answer from memory before revealing the answer.",
      bullets: recallA ? [`Answer: ${recallA.a}`] : ["Recall the purpose, mechanism, one example and one failure mode."],
      notes: "Leave a deliberate silence in the recording. Retrieval is the lesson, not an optional quiz at the end.",
    },
    {
      kind: "challenge",
      eyebrow: "10 • Challenge",
      title: recallB?.q ?? "Teach it back",
      body: rich?.feynman ?? module.feynman,
      bullets: recallB ? [`Answer: ${recallB.a}`] : ["Explain the topic to an intelligent beginner without using the slide text."],
      notes: "Ask the learner to explain before revealing your explanation. This becomes an ideal chapter marker in the final video.",
    },
    {
      kind: "summary",
      eyebrow: "11 • Compress the idea",
      title: "If you remember only five things…",
      bullets: rich
        ? [
            rich.overview,
            rich.deepDive[0]?.title ?? lesson.title,
            rich.flow[0]?.detail ?? "Know the first causal step.",
            rich.mistakes[0] ? `Avoid: ${rich.mistakes[0]}` : "Know the most common failure mode.",
            rich.examAngle,
          ]
        : [
            `Problem: ${module.hook}`,
            `Mechanism: ${lesson.title}`,
            "Evidence: the artifact you inspected.",
            "Trap: the misconception you just corrected.",
            "Transfer: where you would use this next.",
          ],
      notes: "This is the compression phase. Speak the summary from memory rather than reading it.",
    },
    {
      kind: "summary",
      eyebrow: "12 • Next move",
      title: "Connect this topic to the next one",
      body: neighboring.length
        ? `The next useful connections in this module are: ${neighboring.join(" • ")}.`
        : `Next, return to the course and continue from ${module.title}.`,
      bullets: [
        "Mark the lesson complete.",
        "Recreate the key diagram or flow without notes.",
        "Schedule a spaced revisit instead of rereading immediately.",
      ],
      notes: "Close by creating a bridge. The next video should feel like the consequence of this one.",
    },
  ];

  return slides;
}

export function buildCoursePresentation(
  course: Course,
  moduleIndex: number,
  lessonIndex: number
): CoursePresentation | null {
  const courseModule = course.modules[moduleIndex];
  const lesson = courseModule?.lessons[lessonIndex];
  if (!courseModule || !lesson) return null;

  return {
    course,
    module: courseModule,
    lesson,
    moduleIndex,
    lessonIndex,
    lessonSlug: presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
    slides: buildSlides(course, courseModule, lesson),
  };
}

export function getPresentationBySlug(course: Course, lessonSlug: string) {
  for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex += 1) {
    for (let lessonIndex = 0; lessonIndex < course.modules[moduleIndex].lessons.length; lessonIndex += 1) {
      const lesson = course.modules[moduleIndex].lessons[lessonIndex];
      if (presentationLessonSlug(moduleIndex, lessonIndex, lesson.title) === lessonSlug) {
        return buildCoursePresentation(course, moduleIndex, lessonIndex);
      }
    }
  }
  return null;
}

export function getAllPresentationParams(courses: Course[]) {
  return courses.flatMap((course) =>
    course.modules.flatMap((module, moduleIndex) =>
      module.lessons.map((lesson, lessonIndex) => ({
        slug: course.slug,
        lesson: presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
      }))
    )
  );
}
