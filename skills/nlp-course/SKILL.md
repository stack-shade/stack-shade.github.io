---
name: nlp-course-authoring
description: Author and maintain the StackShade Natural Language Processing course, rich topic guides, teaching presentations, visualizations, neuroscience-informed learning loops, evaluation labs and production NLP material.
---

# NLP Course Authoring Skill

## Mission

Teach NLP from first principles to production systems without treating modern LLMs as magic.

The canonical progression is:

1. language and text as data;
2. linguistic structure;
3. classical probability/statistics;
4. representations and embeddings;
5. neural sequence models;
6. attention;
7. Transformers;
8. language-model pretraining;
9. adaptation, RAG and tool use;
10. evaluation, safety and production.

This ordering is intentionally aligned with contemporary university NLP teaching and modern practitioner curricula: Stanford CS224N emphasizes foundations, word vectors, neural models, attention/Transformers, LLM evaluation and broader-impact topics; the 2026 Jurafsky–Martin draft places tokens, language models, Transformers/pretraining and interpretability into a modern sequence; Hugging Face combines Transformers, Datasets, Tokenizers, classical NLP tasks and advanced LLM workflows; spaCy presents NLP as an explicit processing pipeline. 

## Files

- `src/lib/courses-data.ts`: canonical curriculum and lesson metadata.
- `src/lib/nlp-course-content.ts`: rich topic guides used by the presentation system.
- `src/lib/course-presentation.ts`: shared deck generator.
- `src/lib/presentation-design-system.ts`: centralized slide tokens.
- `src/components/courses/course-presentation-player.tsx`: shared presentation UI.
- `src/components/nlp-learning-visuals.tsx`: reusable article visualizations.
- `src/app/(blog)/blog/nlp-from-text-to-transformers/page.tsx`: flagship explanatory article.
- `skills/course-authoring/SKILL.md`: generic course authoring rules.

## Topic design

Every topic should have:

- a concrete learner outcome;
- a technical mechanism;
- a compact mental model;
- an observable artifact;
- a worked example;
- misconceptions;
- recall questions;
- a teach-back challenge;
- one clear connection to the next topic.

Avoid writing lessons as encyclopedic definitions. A learner should be able to predict the next step in a process before seeing it.

## Model selection teaching rule

Never teach a model family as universally superior.

Frame decisions around:

- task;
- data size and quality;
- latency/cost constraints;
- interpretability needs;
- context length;
- adaptation requirements;
- evaluation evidence.

## Tokenization rule

Whenever tokenization appears, distinguish:

- whitespace/word tokenization;
- character tokenization;
- subword tokenization;
- vocabulary IDs;
- special tokens;
- attention masks.

Do not claim that token IDs have semantic meaning by themselves.

## Embeddings rule

Distinguish:

- sparse lexical features;
- static word embeddings;
- contextual token representations;
- sentence/document embeddings.

Explain what the vector represents and what similarity measure is actually being used.

## Transformer rule

Teach Transformers in this order:

1. sequence representation;
2. positional information;
3. Q/K/V projections;
4. attention scores;
5. scaling and softmax;
6. weighted values;
7. multi-head attention;
8. residual paths;
9. normalization;
10. feed-forward block;
11. masking;
12. stacked depth.

Never jump directly to a full Transformer diagram without first showing one attention calculation.

## LLM systems rule

Separate the model from the application architecture.

A modern application may contain:

`user → policy → retrieval → reranking → prompt/context → model → validation → output`

The model is one component, not the entire system.

## RAG rule

Always split evaluation into:

- retrieval quality;
- context quality;
- generation quality;
- grounding/citation quality;
- latency/cost;
- failure cases.

Never claim RAG guarantees factuality.

## Evaluation rule

Metrics answer questions; they do not define truth.

For classification, explicitly discuss precision, recall, F1, thresholding and class imbalance.

For generation, distinguish automatic metrics from human/task-specific evaluation.

For modern LLMs include:

- benchmark contamination concerns;
- robustness;
- hallucination/grounding;
- safety;
- distribution shift;
- task-specific evaluation.

## Learning-science loop

Use:

**Predict → Visualize → Explain → Retrieve → Apply → Revisit**

Useful techniques:

- retrieval practice;
- spaced review;
- chunking;
- elaboration;
- generation before solution;
- self-explanation;
- interleaving;
- dual coding;
- worked-example fading.

Do not make unsupported claims about fixed percentage improvements.

## Presentation mode

Every lesson automatically gets a 12-slide presentation using the shared presentation engine.

Do not create separate slide components for individual lessons unless a genuinely new interaction pattern is required.

Use data to customize a deck. Keep rendering in the central player.

## Definition of done

A new NLP lesson is complete when:

- curriculum metadata exists;
- rich topic content exists when the concept is core;
- presentation generation works;
- the learner can see the mechanism visually;
- there is an artifact;
- recall is explicit;
- the topic connects to its neighbors;
- the material is technically precise;
- mobile and fullscreen presentation both work.
