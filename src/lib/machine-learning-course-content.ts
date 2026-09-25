import type { Course, CourseModule, Lesson } from "@/lib/courses-data";
import type { CourseLessonContent } from "@/lib/course-lesson-content";

const TOPIC_GUIDANCE: Record<string, { overview: string; mentalModel: string; artifact: string }> = {
  "What machine learning actually is": {
    overview: "Machine learning learns a function from examples so predictions can generalize to inputs the model has not seen. The central engineering question is whether the learned mapping will remain useful under the conditions where it is deployed.",
    mentalModel: "Think of a learned model as a parameterized function fθ(x). Training chooses θ using data and an objective; inference applies the learned function to new x.",
    artifact: "x → model fθ(x) → prediction → loss on labeled examples → update θ → repeat",
  },
  "The end-to-end ML workflow": {
    overview: "A robust ML project is a sequence of decisions: define the prediction target, collect and validate data, split correctly, establish a baseline, train candidates, evaluate with deployment-relevant metrics, analyze errors, and only then consider deployment.",
    mentalModel: "Treat ML as a feedback loop rather than a single training script.",
    artifact: "Problem → Data → Split → Baseline → Train → Validate → Error analysis → Test → Serve → Monitor → Retrain",
  },
  "Train/validation/test splits and why order matters": {
    overview: "Evaluation only means something when the validation and test sets represent information that would genuinely be unavailable at training time. Random splits work for many IID datasets; temporal, grouped and entity-correlated data often need different splitting strategies.",
    mentalModel: "The test set is a time capsule: once you look at it repeatedly, it stops behaving like unseen evidence.",
    artifact: "TRAIN: fit parameters + preprocessing\nVALIDATION: choose models/hyperparameters\nTEST: one final unbiased estimate",
  },
  "Log loss and probabilistic predictions": {
    overview: "Log loss evaluates predicted probabilities rather than only final class labels. Confident wrong predictions receive a much larger penalty than uncertain mistakes, which makes the metric useful when probability quality matters.",
    mentalModel: "A classifier is often a probability estimator plus a thresholding policy.",
    artifact: "Binary log loss = -[y log(p) + (1-y) log(1-p)]",
  },
  "Bias, variance and the generalization gap": {
    overview: "Underfitting and overfitting describe failures to generalize. Bias reflects systematic error from an overly constrained hypothesis family; variance reflects sensitivity to the particular training sample.",
    mentalModel: "Training performance answers 'did you fit this sample?'; validation performance asks 'did you learn a reusable rule?'",
    artifact: "High bias → underfit\nHigh variance → overfit\nGoal → low expected generalization error",
  },
  "Cross-validation: K-fold, stratified and grouped splits": {
    overview: "Cross-validation repeatedly trains and validates across different partitions of the training data. Stratification preserves class proportions for classification; grouped splits prevent related entities from leaking across folds.",
    mentalModel: "Each fold is a small simulation of the future: train on what you know, validate on what you pretend not to know.",
    artifact: "for fold in CV:\n  fit preprocessing + model on fold.train\n  score on fold.validation\nmean(scores), std(scores)",
  },
  "Backpropagation and the chain rule": {
    overview: "Backpropagation computes parameter gradients efficiently by applying the chain rule from the loss backward through the computation graph. The optimizer then uses those gradients to update parameters.",
    mentalModel: "Each operation receives a downstream responsibility signal and passes a local derivative backward.",
    artifact: "forward: x → z₁ → a₁ → z₂ → loss\nbackward: ∂loss/∂z₂ → ∂loss/∂a₁ → ∂loss/∂z₁ → ∂loss/∂W",
  },
  "Attention and the Transformer mental model": {
    overview: "Self-attention lets each token compute weighted interactions with other tokens. Transformers stack attention and feed-forward blocks with residual connections and normalization, enabling highly parallel sequence processing.",
    mentalModel: "For each token, ask: which other tokens matter to me right now, and how much should each contribute?",
    artifact: "Q = XWq, K = XWk, V = XWv\nAttention(Q,K,V) = softmax(QKᵀ / √dₖ)V",
  },
  "Training-serving skew, data drift and concept drift": {
    overview: "A model can fail after deployment even when its code is unchanged. Training-serving skew occurs when the production feature computation differs from training; data drift changes input distributions; concept drift changes the relationship between inputs and outcomes.",
    mentalModel: "Production ML is a moving target: monitor both the data entering the system and the quality of the predictions leaving it.",
    artifact: "Training distribution ≠ serving distribution → investigate pipeline, population and target relationship",
  },
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function buildMachineLearningLessonContent(
  course: Course,
  module: CourseModule,
  lesson: Lesson,
  moduleIndex: number,
  lessonIndex: number,
): CourseLessonContent {
  const guidance = TOPIC_GUIDANCE[lesson.title];
  const overview = guidance?.overview ??
    `${lesson.title} is studied here as part of the ${module.title} workflow. Focus on the problem it solves, the assumptions it makes, the mechanism that produces its output, and how you would know when it fails.`;
  const mentalModel = guidance?.mentalModel ??
    `Treat ${lesson.title} as a component in the ML loop. Identify the input, learned or chosen state, transformation, output and evaluation signal before reaching for an implementation.`;
  const artifact = guidance?.artifact ??
    `TOPIC: ${lesson.title}\nINPUT: define the data and assumptions\nMECHANISM: write the transformation or learning objective\nOUTPUT: define the prediction/representation\nCHECK: choose an evaluation signal`;
  const neighbors = module.lessons.map((x) => x.title).filter((x) => x !== lesson.title).slice(0, 3);

  return {
    slug: `m${moduleIndex + 1}-l${lessonIndex + 1}-${slugify(lesson.title)}`,
    title: lesson.title,
    eyebrow: `MACHINE LEARNING • ${module.phase}`,
    overview,
    mentalModel,
    analogy: {
      title: "A useful picture",
      body: "Imagine an ML system as a factory. Data is the raw material, preprocessing is quality control, the model is the learned transformation, evaluation is inspection, and deployment is the production line. A failure anywhere in that chain can invalidate the final prediction.",
    },
    neuroscience: {
      title: "Learn by reconstructing the pipeline",
      body: "After reading, close the page and redraw the data → model → evaluation flow from memory. Then answer the recall questions without looking. StackShade's learning loop is designed around retrieval rather than passive rereading.",
    },
    deepDive: [
      {
        title: "Problem and assumptions",
        body: overview + " Before implementing anything, state what information is available at prediction time, what the target means, and which assumptions make the evaluation believable.",
      },
      {
        title: "Mechanism",
        body: mentalModel + " Reduce the mechanism to a small sequence of transformations. If you cannot explain what changes after one training step or prediction step, the abstraction is still too high-level.",
      },
      {
        title: "Failure modes",
        body: "Look for leakage, distribution mismatch, unstable evaluation, excessive model capacity, poor labels, class imbalance or a metric that does not reflect the real objective. A model can be mathematically correct and still be operationally wrong.",
      },
    ],
    flow: [
      { label: "Frame", detail: "Define target, features, prediction time and success metric." },
      { label: "Prepare", detail: "Split data correctly and learn preprocessing only from training data." },
      { label: "Learn", detail: "Fit parameters against an explicit loss or objective." },
      { label: "Evaluate", detail: "Measure generalization and inspect failure cases, not just one headline score." },
    ],
    artifact: {
      title: "ML reconstruction card",
      language: lesson.title.toLowerCase().includes("python") ? "python" : "text",
      code: artifact,
      explanation: "Recreate this artifact from memory, then adapt it to a small dataset. The goal is to connect the concept to an observable computation.",
    },
    mistakes: [
      "Tuning before establishing a trustworthy baseline.",
      "Letting validation/test information influence preprocessing or feature selection.",
      "Optimizing a convenient metric instead of the metric tied to the real decision.",
      "Assuming a model's predictive importance proves causality.",
    ],
    recall: [
      { question: `What problem does ${lesson.title} solve?`, answer: guidance?.overview ?? "State the input, constraint, mechanism and desired outcome in your own words." },
      { question: "What should you inspect before trusting the result?", answer: "Check the split strategy, preprocessing boundaries, metric choice, error distribution and whether the deployment data matches the assumptions made during training." },
      ...module.recall.slice(0, 2).map((item) => ({ question: item.q, answer: item.a })),
    ].slice(0, 4),
    feynman: module.feynman,
    examAngle: "Answer with problem → assumptions → mechanism → metric → failure mode. For implementation questions, also explain the data split and what evidence would convince you that the result generalizes.",
    next: neighbors,
  };
}
