import type { Metadata } from "next";
import { ArticleShell } from "@/components/article-shell";
import { buildArticleMetadata, getArticle } from "@/lib/articles";
import { JevArchitecture, JevDecisionLab } from "@/components/jev-artifacts";

const article = getArticle("jev-model-explained")!;
export const metadata: Metadata = buildArticleMetadata(article);

export default function JevModelExplainedPage() {
  return (
    <ArticleShell article={article}>
      <p>
        Many AI applications use a language model for every intelligent task. But a large class
        of production operations are smaller than a conversation: classify, route, score, verify,
        gate, retry, escalate, or choose a tool.
      </p>
      <p>
        <strong>Jev</strong> is TypeSafe AI's first public System One model. Its core idea is:
        pass application state plus typed questions, then consume typed probabilistic decisions
        in ordinary software.
      </p>
      <JevArchitecture />
      <section>
        <h2>The writer vs. switchboard analogy</h2>
        <p>
          Imagine ten thousand customer messages arriving at a company. A writer can explain each
          message in prose. A switchboard operator mainly needs to decide where each message goes.
          The first job is generation; the second is decision-making.
        </p>
        <p>
          This is the useful mental model for Jev: keep a general LLM for open-ended generation,
          while a decision layer can handle a narrow branch of the workflow.
        </p>
      </section>
      <section>
        <h2>Jev in one diagram</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{String.raw`Application state
      │
      ├── question: Choice / Score / Noul
      │
      ▼
     Jev
      │
      ├── typed answer
      ├── probabilities
      └── confidence
      │
      ▼
 application policy
      │
      ├── automate
      ├── verify
      └── escalate`}</code></pre>
      </section>
      <section>
        <h2>The three question primitives</h2>
        <div className="not-prose my-6 grid gap-3 md:grid-cols-3">
          {[
            ["Choice", "Which one?", "Select from a predefined set of options."],
            ["Score", "How much?", "Return a rating on an ordered scale."],
            ["Noul", "Is it true?", "Answer a yes/no question with probability."],
          ].map(([name, question, detail]) => (
            <div key={name} className="rounded-2xl border border-border bg-card/20 p-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{name}</div>
              <h3 className="mt-2 text-xl font-black text-foreground">{question}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
        <JevDecisionLab />
      </section>
      <section>
        <h2>Why not just ask GPT or Claude?</h2>
        <p>
          You can. A general-purpose LLM can classify text and produce JSON. The architectural
          difference is what the model is optimized to produce and how much parsing and validation
          the application needs before acting.
        </p>
        <div className="not-prose my-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/20 p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Text-generation path</div>
            <pre className="mt-3 whitespace-pre-wrap text-xs leading-6 text-foreground">{String.raw`Prompt
 ↓
LLM
 ↓
generated text / JSON
 ↓
parse + validate
 ↓
decision`}</pre>
          </div>
          <div className="rounded-2xl border border-border bg-card/20 p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Decision path</div>
            <pre className="mt-3 whitespace-pre-wrap text-xs leading-6 text-foreground">{String.raw`State + question
 ↓
Jev
 ↓
typed decision
 ↓
application policy`}</pre>
          </div>
        </div>
      </section>
      <section>
        <h2>AI agents are decision loops</h2>
        <p>
          An agent repeatedly decides what to inspect, which tool to call, whether to retry,
          whether the result is sufficient, whether to escalate, and whether to stop.
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{String.raw`observe state
    ↓
choose action
    ↓
execute tool
    ↓
inspect result
    ↓
retry / continue / escalate / stop
    ↓
repeat`}</code></pre>
      </section>
      <section>
        <h2>Confidence changes automation</h2>
        <p>
          TypeSafe says Jev returns probabilities and confidence with its decisions. Applications
          can then define their own policies for uncertain cases rather than treating every answer
          as equally reliable.
        </p>
        <div className="not-prose my-6 grid gap-3 md:grid-cols-3">
          {[
            ["High confidence", "Automate", "Only after evaluation supports the threshold."],
            ["Uncertain", "Verify", "Use another model, rules, or review."],
            ["Low confidence", "Escalate", "Ask a human or stronger verification path."],
          ].map(([title, action, detail]) => (
            <div key={title} className="rounded-2xl border border-border bg-card/20 p-4">
              <div className="font-mono text-[9px] text-muted-foreground">{title}</div>
              <div className="mt-2 text-base font-bold text-foreground">{action}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Where decision models can fit</h2>
        <h3>Customer support</h3>
        <p>Route tickets to billing, sales, engineering, account teams, or human review.</p>
        <h3>Search and ranking</h3>
        <p>Score or select candidates before an LLM writes the final synthesis.</p>
        <h3>Moderation</h3>
        <p>Classify content and send uncertain cases through another check.</p>
        <h3>Fraud and risk</h3>
        <p>Turn transaction context into a risk score or review branch, with domain-specific controls.</p>
        <h3>Coding agents</h3>
        <p>Decide whether to retry a tool, switch strategy, escalate, or stop after an execution result.</p>
      </section>
      <section>
        <h2>Is this just JSON mode?</h2>
        <p>
          Not quite. Structured-output features make a general-purpose model emit data that matches
          a schema. TypeSafe's pitch is that Jev is natively oriented around typed decisions:
          Choice, Score and Noul questions, probabilities, confidence, and parallel decision
          sampling.
        </p>
        <p>
          Its public workflow evaluations also decompose tasks into narrow questions and deterministic
          programmatic rules rather than asking one prompt to do everything.
        </p>
      </section>
      <section>
        <h2>Speed and cost: read the fine print</h2>
        <p>
          TypeSafe currently reports Jev responses around <strong>70–500 ms</strong> and input
          pricing of <strong>$0.042 per million tokens</strong>. These are vendor-published
          figures, not a universal benchmark; actual results depend on workload and system design.
        </p>
        <p>
          TypeSafe also publishes larger relative speed and cost improvements for its own workflow
          evaluations. Read those numbers together with the evaluation methodology.
        </p>
      </section>
      <section>
        <h2>The important limitation</h2>
        <blockquote>
          <p><strong>Typed does not mean correct. Confident does not mean certain.</strong></p>
        </blockquote>
        <p>
          A structured interface solves an integration problem; it does not eliminate model error.
          Production systems still need evaluation, monitoring, fallbacks, sensible thresholds,
          deterministic rules where appropriate, and human review for high-impact decisions.
        </p>
      </section>
      <section>
        <h2>The bigger idea: make decide() a first-class primitive</h2>
        <p>
          Traditional software already has primitives such as <code>if</code>, <code>sort</code>,
          <code>search</code>, and <code>query</code>. AI added powerful generation capabilities.
          Decision-oriented models suggest making intelligent branching a composable operation.
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/20 p-4 text-sm leading-7"><code>{String.raw`retrieve()
decide()
generate()
verify()
execute()`}</code></pre>
      </section>
      <section>
        <h2>Takeaway</h2>
        <p>
          The interesting question is not whether Jev replaces general-purpose LLMs. It is where
          software is currently forcing a language generator to make a small decision.
        </p>
        <div className="not-prose my-8 rounded-2xl border border-border bg-card/20 p-5 text-2xl font-black text-foreground">
          LLMs generate. Jev decides. Code executes.
        </div>
      </section>
      <section>
        <h2>Sources and further reading</h2>
        <ul>
          <li><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" rel="noreferrer">TypeSafe AI — Introducing System One Models &amp; Jev</a></li>
          <li><a href="https://api.typesafe.ai/docs" rel="noreferrer">TypeSafe API documentation</a></li>
          <li><a href="https://evals.typesafe.ai/" rel="noreferrer">TypeSafe workflow evaluations</a></li>
          <li><a href="https://madewithjev.com/what-is-jev" rel="noreferrer">Made with Jev — What is Jev?</a></li>
        </ul>
      </section>
    </ArticleShell>
  );
}