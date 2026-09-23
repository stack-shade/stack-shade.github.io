
import { ArrowRight, BrainCircuit, CheckCircle2, Lightbulb, Quote, Sparkles } from "lucide-react";
import type { Course, CourseModule, Lesson } from "@/lib/courses-data";
import type { CourseLessonContent } from "@/lib/course-lesson-content";
import { Card, CardContent } from "@/components/ui/card";

function ArticleDiagram({ title, flow }: { title: string; flow: CourseLessonContent["flow"] }) {
  const nodes = flow.slice(0, 4);
  const width = 960;
  const height = 250;
  const nodeW = 180;
  const gap = 45;
  const startX = 35;

  return (
    <figure className="lesson-figure">
      <div className="lesson-figure-head">
        <div>
          <span className="lesson-kicker">VISUAL RECONSTRUCTION</span>
          <h3>{title}</h3>
        </div>
        <span className="lesson-figure-index">{nodes.length} stages</span>
      </div>
      <div className="lesson-svg-wrap">
        <svg viewBox={"0 0 " + width + " " + height} role="img" aria-label={title} className="lesson-svg">
          <defs>
            <linearGradient id="flowLine" x1="0" x2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity=".15" />
              <stop offset="50%" stopColor="currentColor" stopOpacity=".7" />
              <stop offset="100%" stopColor="currentColor" stopOpacity=".15" />
            </linearGradient>
          </defs>
          {nodes.map((node, i) => {
            const x = startX + i * (nodeW + gap);
            return (
              <g key={node.label} className="lesson-svg-node">
                {i < nodes.length - 1 && (
                  <path
                    d={
                      "M " +
                      (x + nodeW) +
                      " 125 C " +
                      (x + nodeW + 18) +
                      " 125, " +
                      (x + nodeW + gap - 18) +
                      " 125, " +
                      (x + nodeW + gap) +
                      " 125"
                    }
                    stroke="url(#flowLine)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="7 7"
                  >
                    <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.8s" repeatCount="indefinite" />
                  </path>
                )}
                <rect x={x} y="58" width={nodeW} height="134" rx="24" fill="currentColor" fillOpacity=".035" stroke="currentColor" strokeOpacity=".14" />
                <circle cx={x + 24} cy="84" r="7" fill="currentColor" fillOpacity=".7" />
                <text x={x + 42} y="89" className="lesson-svg-step">{String(i + 1).padStart(2, "0")}</text>
                <text x={x + 20} y="122" className="lesson-svg-label">{node.label}</text>
                <foreignObject x={x + 20} y="136" width={nodeW - 40} height="42">
                  <div xmlns="http://www.w3.org/1999/xhtml" className="lesson-svg-detail">{node.detail}</div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>Trace the mechanism from left to right. Try drawing the same flow without looking.</figcaption>
    </figure>
  );
}

function MarkdownSection({ title, body, index }: { title: string; body: string; index: number }) {
  return (
    <section className="lesson-prose-block" id={"section-" + (index + 1)}>
      <div className="lesson-section-marker">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  );
}

function RecallCard({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="lesson-recall">
      <summary>
        <span>{question}</span>
        <span className="lesson-recall-action">Reveal answer</span>
      </summary>
      <div className="lesson-recall-answer">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <p>{answer}</p>
      </div>
    </details>
  );
}

export function LessonArticle({
  course,
  module,
  lesson,
  content,
}: {
  course: Course;
  module: CourseModule;
  lesson: Lesson;
  content: CourseLessonContent;
}) {
  return (
    <article className="lesson-article">
      <div className="lesson-article-grid">
        <aside className="lesson-outline">
          <div className="lesson-outline-card">
            <span className="lesson-kicker">ON THIS PAGE</span>
            <a href="#mental-model">Mental model</a>
            <a href="#mechanism">Mechanism</a>
            <a href="#visual">Visual model</a>
            <a href="#artifact">Artifact</a>
            <a href="#recall">Active recall</a>
            <a href="#practice">Teach-back</a>
          </div>
        </aside>

        <div className="lesson-article-body">
          <div className="lesson-lede">
            <div className="lesson-lede-kicker"><Sparkles className="h-4 w-4" /> Article companion</div>
            <p>{content.overview}</p>
          </div>

          <section id="mental-model" className="lesson-callout lesson-callout-featured">
            <div className="lesson-callout-icon"><Lightbulb className="h-5 w-5" /></div>
            <div>
              <span className="lesson-kicker">MENTAL MODEL</span>
              <h2>Remember the shape, not the sentence</h2>
              <blockquote>“{content.mentalModel}”</blockquote>
            </div>
          </section>

          <div id="mechanism">
            {content.deepDive.map((section, index) => (
              <MarkdownSection key={section.title} title={section.title} body={section.body} index={index} />
            ))}
          </div>

          <section id="visual" className="lesson-section">
            <div className="lesson-section-header">
              <span className="lesson-kicker">DUAL CODING</span>
              <h2>See the mechanism before you memorize it</h2>
              <p>One diagram, one causal story, one reconstruction task.</p>
            </div>
            <ArticleDiagram title={lesson.title + " — causal map"} flow={content.flow} />
          </section>

          <section className="lesson-section">
            <div className="lesson-section-header">
              <span className="lesson-kicker">STEP BY STEP</span>
              <h2>Walk the system</h2>
            </div>
            <div className="lesson-flow-list">
              {content.flow.map((item, index) => (
                <div key={item.label} className="lesson-flow-item">
                  <span className="lesson-flow-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.detail}</p>
                  </div>
                  {index < content.flow.length - 1 && <ArrowRight className="hidden shrink-0 text-muted-foreground sm:block" />}
                </div>
              ))}
            </div>
          </section>

          <section id="artifact" className="lesson-section">
            <div className="lesson-section-header">
              <span className="lesson-kicker">CONCRETE ARTIFACT</span>
              <h2>{content.artifact.title}</h2>
              <p>{content.artifact.explanation}</p>
            </div>
            <div className="lesson-code-shell">
              <div className="lesson-code-bar">
                <span>{content.artifact.language}</span>
                <span>copy → rebuild → modify</span>
              </div>
              <pre><code>{content.artifact.code}</code></pre>
            </div>
          </section>

          <section className="lesson-section">
            <div className="lesson-section-header">
              <span className="lesson-kicker">MISCONCEPTIONS</span>
              <h2>What usually goes wrong</h2>
            </div>
            <div className="lesson-mistake-grid">
              {content.mistakes.map((mistake) => (
                <Card key={mistake} className="lesson-mistake-card">
                  <CardContent className="p-4 sm:p-5">
                    <Quote className="mb-3 h-4 w-4 text-muted-foreground" />
                    <p>{mistake}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="recall" className="lesson-section">
            <div className="lesson-section-header">
              <span className="lesson-kicker">RETRIEVAL PRACTICE</span>
              <h2>Close the tab. Rebuild it from memory.</h2>
              <p>Read the question, answer aloud, then reveal.</p>
            </div>
            <div className="space-y-3">
              {content.recall.map((item) => (
                <RecallCard key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </section>

          <section id="practice" className="lesson-practice-grid">
            <Card className="lesson-practice-card">
              <CardContent className="p-5 sm:p-6">
                <BrainCircuit className="mb-3 h-5 w-5" />
                <span className="lesson-kicker">FEYNMAN</span>
                <h2>Teach it back in plain English</h2>
                <p>{content.feynman}</p>
              </CardContent>
            </Card>
            <Card className="lesson-practice-card">
              <CardContent className="p-5 sm:p-6">
                <Lightbulb className="mb-3 h-5 w-5" />
                <span className="lesson-kicker">EXAM / INTERVIEW</span>
                <h2>What a strong answer sounds like</h2>
                <p>{content.examAngle}</p>
              </CardContent>
            </Card>
          </section>

          <section className="lesson-endnote">
            <span className="lesson-kicker">NEXT CONNECTION</span>
            <h2>Make this idea travel.</h2>
            <p>{content.next.length ? "Connect it next to: " + content.next.join(" • ") + "." : "Return to " + course.title + " and pick the next topic."}</p>
          </section>
        </div>
      </div>
    </article>
  );
}
