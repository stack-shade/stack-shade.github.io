# Natural Language Processing Course Architecture

## Why this structure

The course is a vertical learning path rather than a list of disconnected NLP technologies.

```
Language
  ↓
Text as data
  ↓
Linguistic structure
  ↓
Probability & classical models
  ↓
Representations
  ↓
Neural sequence models
  ↓
Attention
  ↓
Transformers
  ↓
Pretraining
  ↓
Adaptation + RAG + tools
  ↓
Evaluation + safety
  ↓
Production NLP
```

The structure combines university-style fundamentals with practitioner tooling.

## Source architecture

The 2026 Stanford CS224N course covers word vectors, neural foundations, dependency parsing, self-attention/Transformers, LLM benchmarking/evaluation and broader NLP risks. The August 2026 Jurafsky–Martin third-edition draft updates the sequence around tokens, language models, Transformers/pretraining/decoding and interpretability. Hugging Face's course moves from Transformers into Datasets, Tokenizers, classical NLP tasks and advanced LLM training workflows. spaCy's documentation models practical NLP as a processing pipeline with tokenization, tagging, parsing, entities and lemmatization.

## Modules

| Module | Role |
|---|---|
| Foundations | Make text computable |
| Linguistics | Provide structural language concepts |
| Classical NLP | Establish probability and sequence modeling |
| Representations | Turn language into geometry |
| Neural NLP | Introduce learned sequence representations |
| Attention | Introduce dynamic context selection |
| Transformers | Build the modern architecture |
| LLM systems | Connect pretraining to applications |
| Evaluation & safety | Measure reliability |
| Production | Engineer the complete system |

## Capstone

Build a grounded NLP assistant:

`documents → chunking → embeddings → retrieval → reranking → context → LLM → citations → evaluation`

The capstone must include:
- versioned evaluation data;
- retrieval tests;
- generation tests;
- latency/cost observation;
- failure analysis;
- a written architecture explanation.
