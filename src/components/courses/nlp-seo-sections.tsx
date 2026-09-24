import Link from "next/link";
import type { Course } from "@/lib/courses-data";
import { courseStats } from "@/lib/courses-data";
import { presentationLessonSlug } from "@/lib/course-presentation";

const FAQ = [
  ["What is Natural Language Processing?", "Natural Language Processing is the field of building systems that process, represent, understand, retrieve, classify, translate and generate human language."],
  ["What does this NLP course teach?", "It covers text processing, linguistic analysis, classical NLP, embeddings, neural sequence models, attention, Transformers, pretrained language models, semantic search, RAG, fine tuning, evaluation, safety and production systems."],
  ["Is this NLP course suitable for beginners?", "Yes. The first modules establish text processing and representation foundations before moving into probability, neural sequence models and Transformers."],
  ["What projects can I build from this NLP course?", "Projects include text classifiers, linguistic analysis tools, chatbots, semantic search systems, citation grounded RAG assistants, adapted language models and a production NLP capstone."],
  ["Which tools are used in the NLP course?", "The curriculum includes Python, regex, NLTK, spaCy, Gensim, fastText, PyTorch and Hugging Face, plus retrieval and deployment concepts."],
] as const;

const REFERENCES = [
  ["Stanford CS224N", "Deep learning for natural language processing, sequence models, attention, Transformers and LLMs.", "https://web.stanford.edu/class/cs224n/"],
  ["Hugging Face Learn", "Transformers, tokenizers, datasets, fine tuning and practical LLM workflows.", "https://huggingface.co/learn/llm-course/chapter1/1"],
  ["spaCy Documentation", "NLP pipelines, tokenization, linguistic annotations and named entities.", "https://spacy.io/usage"],
  ["NLTK Documentation", "Classical NLP algorithms, corpora, tokenization and educational tooling.", "https://www.nltk.org/"],
] as const;

export function NlpSeoSections({ course }: { course: Course }) {
  const stats = courseStats(course);

  return (
    <>
      <section id="syllabus-index" className="mt-10 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="lesson-kicker">SEMANTIC SYLLABUS</span>
            <h2 className="mt-1 text-xl font-black">Natural Language Processing syllabus</h2>
            <p className="mt-2 max-w-3xl text-xs leading-6 text-muted-foreground">
              16 modules and 97 lessons covering NLP foundations, linguistic analysis, classical representations, neural sequence models, Transformers, pretrained models, semantic search, RAG, fine tuning, evaluation, safety and production engineering.
            </p>
          </div>
          <a href="#faq" className="font-mono text-[9px] text-muted-foreground hover:text-foreground">FAQ ↓</a>
        </div>

        <div className="mt-5 grid gap-2 lg:grid-cols-2">
          {course.modules.map((module, moduleIndex) => (
            <details key={module.title} className="rounded-xl border border-border bg-background/20 p-3" open={moduleIndex < 2}>
              <summary className="cursor-pointer list-none">
                <span className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border font-mono text-[9px]">{String(moduleIndex + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">{module.title}</span>
                    <span className="mt-1 block text-[10px] leading-5 text-muted-foreground">{module.hook}</span>
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">{module.lessons.length} topics</span>
                </span>
              </summary>
              <ol className="mt-3 space-y-1 border-t border-border/60 pt-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lesson.title}>
                    <Link
                      href={"/courses/" + course.slug + "/" + presentationLessonSlug(moduleIndex, lessonIndex, lesson.title)}
                      className="flex items-start gap-2 rounded-lg px-2 py-2 text-[11px] leading-5 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    >
                      <span className="font-mono text-[8px] opacity-50">{moduleIndex + 1}.{lessonIndex + 1}</span>
                      <span>{lesson.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-8 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <span className="lesson-kicker">FAQ</span>
        <h2 className="mt-1 text-xl font-black">Natural Language Processing course questions</h2>
        <div className="mt-4 grid gap-2">
          {FAQ.map(([question, answer]) => (
            <details key={question} className="rounded-xl border border-border bg-background/20 px-4 py-3">
              <summary className="cursor-pointer text-sm font-bold">{question}</summary>
              <p className="mt-2 border-t border-border/60 pt-2 text-xs leading-6 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="further-reading" className="mt-8 rounded-2xl border border-border bg-card/25 p-5 sm:p-6">
        <span className="lesson-kicker">FURTHER READING</span>
        <h2 className="mt-1 text-xl font-black">Technical references</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REFERENCES.map(([title, description, href]) => (
            <a key={title} href={href} target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-background/25 p-4 transition hover:border-foreground/25">
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{description}</p>
            </a>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Natural Language Processing course syllabus",
            numberOfItems: stats.lessons,
            itemListElement: course.modules.flatMap((module, moduleIndex) =>
              module.lessons.map((lesson, lessonIndex) => ({
                "@type": "ListItem",
                position: course.modules.slice(0, moduleIndex).reduce((sum, item) => sum + item.lessons.length, 0) + lessonIndex + 1,
                name: lesson.title,
                url: "https://stack-shade.github.io/courses/" + course.slug + "/" + presentationLessonSlug(moduleIndex, lessonIndex, lesson.title),
              })),
            ),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }),
        }}
      />
    </>
  );
}
