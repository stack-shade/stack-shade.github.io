import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, Database, Gauge, Languages, Network, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleShell } from "@/components/article-shell";
import { NlpLearningVisuals } from "@/components/nlp-learning-visuals";
import { buildArticleMetadata, getArticle } from "@/lib/articles";

const article = getArticle("nlp-from-text-to-transformers")!;

export const metadata: Metadata = buildArticleMetadata(article);

const architecture = [
  ["01", "Text", "Documents, messages, speech transcripts and other language-bearing input."],
  ["02", "Tokenization", "Convert text into model units such as words, subwords or characters."],
  ["03", "Representation", "Sparse features, embeddings or contextual representations encode information."],
  ["04", "Model", "Statistical models, sequence models or Transformers transform the representation."],
  ["05", "Task", "Classify, extract, rank, retrieve, translate, summarize or generate."],
  ["06", "System", "Add retrieval, tools, evaluation, safety, monitoring and product constraints."],
];

export default function NlpArticlePage() {
  return (
    <ArticleShell article={article}>
      <p>
        Natural Language Processing looks intimidating because it contains several disciplines at once:
        linguistics, probability, machine learning, deep learning, information retrieval and systems engineering.
        The cleanest way to learn it is to follow one invariant question:
        <strong> how does human language become a representation a machine can compute over?</strong>
      </p>
      <p>
        This article follows the same learning path used in the StackShade NLP course: foundations first,
        representations second, neural sequence models third, Transformers fourth, and modern LLM systems
        only after the underlying mechanics are visible.
      </p>

      <NlpLearningVisuals />

      <hr className="border-border/60" />

      <section className="space-y-5">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <BrainCircuit className="h-6 w-6" />
          The complete NLP architecture
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {architecture.map(([number, title, body]) => (
            <Card key={number} className="border-border/70 bg-card/20">
              <CardContent className="flex gap-4 p-5">
                <div className="font-mono text-xs text-muted-foreground">{number}</div>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">1. Text is not yet a model input</h2>
        <p>
          Computers receive bytes. NLP systems need discrete or continuous representations. Before a model can
          predict anything, the text must pass through choices about Unicode normalization, sentence boundaries,
          tokenization and special symbols.
        </p>
        <p>
          This is why preprocessing is not merely janitorial work. Removing punctuation may help one task and hurt
          another. Lowercasing can reduce vocabulary size while discarding a capitalization signal. Aggressive
          stemming can improve recall while damaging precise terminology.
        </p>
        <div className="rounded-xl border border-border bg-muted/10 p-5 font-mono text-xs leading-7">
          raw text → normalized text → tokens → token IDs → model inputs
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <Languages className="h-6 w-6" /> 2. Linguistic structure still matters
        </h2>
        <p>
          Part-of-speech tags, named entities, dependency relations and semantic roles remain useful mental models
          even when a modern neural model learns their signals implicitly. They give engineers a vocabulary for
          explaining ambiguity and debugging data.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Syntax", "How words relate structurally."],
            ["Semantics", "What the utterance means."],
            ["Pragmatics", "How context changes meaning."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border border-border p-4">
              <div className="text-sm font-bold">{title}</div>
              <div className="mt-1 text-xs leading-5 text-muted-foreground">{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">3. Classical NLP: probability before deep learning</h2>
        <p>
          N-gram language models, Naive Bayes, logistic regression and hidden Markov models are worth learning
          because they make the core ideas explicit: probability distributions, conditional dependence, feature
          representations, sequence state and decoding.
        </p>
        <p>
          The historical progression is not “old methods were wrong.” It is that later models learned richer
          representations and dependencies with less hand-crafted feature engineering.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <Network className="h-6 w-6" /> 4. Representation became geometry
        </h2>
        <p>
          Bag-of-words and TF-IDF represent text with sparse counts. Word embeddings turned words into dense vectors.
          Contextual representations later made the vector depend on surrounding text.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ["Sparse", "TF-IDF", "Useful, interpretable baseline."],
            ["Static dense", "Word2Vec", "Compact distributional geometry."],
            ["Contextual", "Transformer", "Representation changes with context."],
          ].map(([kind, name, body]) => (
            <div key={kind} className="rounded-xl border border-border bg-background/30 p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{kind}</div>
              <div className="mt-1 font-bold">{name}</div>
              <div className="mt-1 text-xs leading-5 text-muted-foreground">{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">5. RNNs, then the problem that attention solved</h2>
        <p>
          RNNs process sequences recurrently. Their hidden state is a compressed summary of what has already been read.
          That sequential dependency is conceptually elegant but creates optimization and long-range dependency problems.
          Attention changed the architecture by allowing a representation to access a weighted set of context positions
          directly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">6. Self-attention and the Transformer block</h2>
        <p>
          The key computation is a query–key compatibility score followed by a weighted combination of values:
          <code>softmax(QKᵀ / √d<sub>k</sub>)V</code>. Multi-head attention repeats this idea in parallel learned
          subspaces. Residual paths, normalization and position information turn the attention operation into a
          trainable stack rather than an isolated trick.
        </p>
        <div className="rounded-2xl border border-border bg-background/30 p-5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            {["Embeddings", "Position", "Attention", "Residual + Norm", "Feed Forward", "Residual + Norm"].map((x, i) => (
              <div key={x} className="flex items-center gap-2">
                <div className="rounded-lg border border-border bg-card/40 px-3 py-2">{x}</div>
                {i < 5 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <Sparkles className="h-6 w-6" /> 7. Language-model pretraining
        </h2>
        <p>
          Modern language models learn from large corpora using self-supervised objectives. Autoregressive language
          models predict the next token; masked-language models reconstruct hidden tokens. The data mixture, tokenizer,
          objective and optimization setup are part of the model's effective learning environment.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <Search className="h-6 w-6" /> 8. RAG changes the application architecture
        </h2>
        <p>
          A production LLM system often needs information outside the model's parameters. Retrieval-Augmented
          Generation adds an external retrieval stage so responses can be grounded in selected documents. That creates
          two separate quality questions: <strong>did we retrieve the right evidence?</strong> and
          <strong> did the model use it correctly?</strong>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <Gauge className="h-6 w-6" /> 9. Evaluation is part of the architecture
        </h2>
        <p>
          Accuracy, precision, recall and F1 are useful for many classification tasks. BLEU and ROUGE can provide
          signals for some generation settings, but modern NLP evaluation often needs task-specific test sets,
          human judgment, robustness tests, grounding checks and production telemetry.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <ShieldCheck className="h-6 w-6" /> 10. Reliability and safety
        </h2>
        <p>
          Fluent language is not evidence of correctness. Production systems need controls for hallucination,
          data leakage, prompt injection, harmful content, bias, provenance and model drift. The right control
          depends on where the risk enters the system.
        </p>
      </section>

      <section className="rounded-2xl border border-foreground/20 bg-muted/10 p-6">
        <h2 className="text-2xl font-black">The learning loop we use in the course</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-6">
          {["Predict", "Visualize", "Explain", "Retrieve", "Apply", "Revisit"].map((step, i) => (
            <div key={step} className="rounded-xl border border-border bg-background/30 p-4 text-center">
              <div className="font-mono text-[10px] text-muted-foreground">0{i + 1}</div>
              <div className="mt-1 text-sm font-bold">{step}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          The course uses retrieval practice, spaced review, chunking, elaboration, generation,
          self-explanation, interleaving and dual coding. The aim is to make you reconstruct the mechanism,
          not recognize it from familiar wording.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Where to go next</h2>
        <p>
          The dedicated StackShade NLP course turns this architecture into a structured 10-week path with 60 lessons.
          Every lesson has a screen-recordable presentation deck with a shared design system, keyboard navigation,
          fullscreen mode, presenter notes, animation, active recall and a closing teach-back challenge.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Foundations</Badge>
          <Badge variant="outline">Classical NLP</Badge>
          <Badge variant="outline">Embeddings</Badge>
          <Badge variant="outline">RNNs</Badge>
          <Badge variant="outline">Attention</Badge>
          <Badge variant="outline">Transformers</Badge>
          <Badge variant="outline">LLMs</Badge>
          <Badge variant="outline">RAG</Badge>
          <Badge variant="outline">Evaluation</Badge>
          <Badge variant="outline">Production</Badge>
        </div>
      </section>
    </ArticleShell>
  );
}
