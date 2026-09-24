export type NlpLessonFocus = string;

export const NLP_LESSON_FOCUS: NlpLessonFocus[][] = [
  [
    "NLP defines the boundary between human language and machine processing: identify the task, represent the text, make a prediction, and evaluate it.",
    "NLP advances when data, compute, representation learning and pretrained models make more context and linguistic variation learnable at scale.",
    "Regex expresses deterministic character patterns, making it useful for extraction and validation when the required rule can be stated explicitly.",
    "Rule-based, statistical machine-learning and neural approaches differ mainly in where the behavior is encoded: by humans, by features and parameters, or by learned representations.",
    "NLP tasks have different output shapes: labels, token spans, rankings, structured records, target sequences or generated text.",
    "An NLP pipeline is an ordered chain from raw text through normalization, tokenization, representation, inference, post-processing and evaluation."
  ],
  [
    "spaCy and NLTK expose overlapping NLP capabilities, but spaCy emphasizes integrated document processing while NLTK is especially useful for learning and experimentation.",
    "spaCy tokenization creates a Doc of Token objects using language-aware prefix, suffix, infix and special-case rules.",
    "A spaCy pipeline runs components after tokenization so the same Doc can accumulate sentence, POS, dependency and entity annotations.",
    "Choosing an NLP abstraction means matching library design, pretrained components, speed, customization and deployment needs to the task.",
    "A spaCy Doc lets you inspect token text, lemmas, POS tags, dependencies, sentences and entity spans to debug linguistic assumptions.",
    "A reusable preprocessing function should define normalization and filtering once, apply it consistently, and have tests for punctuation, Unicode, URLs and empty inputs."
  ],
  [
    "Stemming and lemmatization reduce surface variation, but stemming is usually heuristic while lemmatization aims for a valid linguistic base form.",
    "POS tagging predicts grammatical roles from a token and its context, so the same word can receive different tags in different sentences.",
    "Named Entity Recognition identifies text spans such as people, organizations and locations and assigns semantic labels to them.",
    "Sentence segmentation, stopword handling and normalization shape the information available to downstream models and therefore must be task-dependent.",
    "A side-by-side stemming and lemmatization experiment exposes where crude truncation differs from linguistically informed normalization.",
    "A linguistic annotation lab becomes useful when tokenization, POS tagging and NER are combined into one table that makes errors inspectable."
  ],
  [
    "Text representation maps language into numerical features, and the best representation depends on which information the downstream algorithm must preserve.",
    "Label and one-hot encoding represent categorical outcomes without creating a false numeric ordering between categories.",
    "Bag of Words converts a document into sparse word-count features, trading away most word order for a simple and effective representation.",
    "Stopword removal can reduce feature dimensionality but can also delete negation or other task-relevant signals.",
    "N-gram features add short-range word order to sparse representations, making phrases such as not good directly observable.",
    "TF-IDF increases the weight of terms that are important within a document and relatively uncommon across the corpus."
  ],
  [
    "Word embeddings place words in a dense vector space where distributional similarity can be represented geometrically.",
    "spaCy vector features make lexical similarity and document representations convenient when the loaded pipeline provides pretrained vectors.",
    "A news classifier can use pretrained spaCy vectors as dense document features and learn a lightweight supervised decision boundary on top.",
    "Gensim provides practical tools for training, querying and reusing keyed word-vector models and nearest-neighbor relationships.",
    "Comparing Gensim embeddings with a TF-IDF baseline shows where dense semantic features help and where sparse lexical features remain stronger.",
    "fastText builds word representations from character n-grams, helping rare words and morphological variants share useful subword information.",
    "fastText text classification combines efficient subword representations with supervised learning for fast large-scale categorization."
  ],
  [
    "A chatbot is a system workflow: interpret the message, manage state, retrieve or call tools when needed, generate a response and handle failures.",
    "Intent and entity based chatbots turn natural language into structured actions by classifying the goal and extracting the fields required to fulfill it.",
    "LLM-assisted log classification can combine regex for stable signatures, learned classifiers for recurring patterns and generative reasoning for ambiguous cases.",
    "The modern NLP path moves from rules and sparse features to learned representations, sequence models, attention, Transformers and grounded applications.",
    "A chatbot becomes easier to debug when message handling, context, retrieval, model inference and response validation have explicit interfaces.",
    "Classical and LLM workflows should be compared using task quality, latency, cost, determinism, maintenance and failure behavior rather than demo polish."
  ],
  [
    "Naive Bayes treats words or other features as probabilistic evidence and chooses the class with the highest estimated posterior.",
    "Logistic regression learns a linear decision boundary over text features and can produce calibrated class probabilities when trained appropriately.",
    "N-gram language models estimate next-token probabilities from a limited history and require smoothing because many valid sequences are unseen.",
    "Minimum edit distance measures the cheapest sequence of insertions, deletions and substitutions needed to turn one string into another.",
    "Hidden Markov Models combine hidden states, transition probabilities and emission probabilities, while Viterbi finds the most likely state sequence.",
    "Classical NLP baselines reveal when simple models are enough and provide interpretable reference points for larger neural systems."
  ],
  [
    "Neural NLP learns continuous representations and task parameters jointly, using a loss function to turn prediction errors into gradient updates.",
    "An RNN carries a hidden state forward through a sequence so earlier tokens can influence representations of later tokens.",
    "RNN language modeling predicts the next token sequentially, and teacher forcing feeds the true previous token during training.",
    "LSTM and GRU gates regulate information flow through recurrent state, helping sequence models preserve useful dependencies over longer spans.",
    "Bidirectional recurrent models combine left-to-right and right-to-left context when the complete input sequence is available.",
    "A PyTorch text classifier makes the neural loop concrete: dataset, batching, forward pass, loss, backpropagation, validation and checkpointing."
  ],
  [
    "Sequence-to-sequence models map a source sequence to a target sequence, making them natural for translation, summarization and structured generation.",
    "Bahdanau attention lets the decoder compute a context vector by weighting encoder states differently for each generated token.",
    "Visualizing an attention matrix makes source-target alignment visible instead of treating attention as an opaque tensor operation.",
    "Scaled dot-product attention computes query-key compatibility, scales the scores by key dimension and uses softmax weights over values.",
    "Self-attention connects positions within a sequence, while cross-attention lets one sequence attend to representations produced by another.",
    "Implementing attention in PyTorch exposes tensor shapes, masking and weighted aggregation that higher-level libraries usually hide."
  ],
  [
    "Self-attention lets each token gather information from other tokens through query, key and value projections.",
    "An attention matrix shows which keys receive weight for each query, giving a compact view of token-to-token information flow.",
    "Causal masks block future positions and padding masks ignore invalid positions before softmax turns attention scores into weights.",
    "Multi-head attention uses multiple projection spaces so different heads can capture different relationships before their outputs are combined.",
    "A Transformer block combines attention, residual connections, normalization and a feed-forward network to repeatedly refine contextual representations.",
    "A mini Transformer implementation should make embeddings, positions, QKV projections, masks, attention, MLP layers and output logits inspectable."
  ],
  [
    "BERT, GPT and T5 share Transformer foundations but differ in architecture and pretraining objective, which shapes what they are naturally good at.",
    "BPE, WordPiece and Unigram are subword tokenization strategies that trade vocabulary size, sequence length and rare-word coverage.",
    "A tokenizer maps raw text to token pieces, IDs and structural masks that the model can consume.",
    "Hugging Face Transformers provides a common interface for tokenizers, pretrained models, configurations and task pipelines.",
    "Reproducible fine-tuning requires versioned datasets, deterministic preprocessing, explicit training configuration, evaluation splits and saved artifacts.",
    "Fine-tuning BERT adapts pretrained representations to a supervised classification task using a task head and task-specific loss."
  ],
  [
    "Transformer token classification predicts a label for each model position and then reconstructs entity spans from the predicted token labels.",
    "Supervised text classification learns label boundaries from examples, while zero-shot classification scores candidate labels without a task-specific training head.",
    "Generative summarization conditions a target sequence on a source document and balances compression against preservation of salient information.",
    "Machine translation learns a mapping across languages while handling different word order, morphology, ambiguity and phrase boundaries.",
    "Question answering can extract an answer span from trusted context or generate an answer conditioned on supplied or retrieved evidence.",
    "A multi-task NLP demo can expose several task pipelines through one interface while keeping preprocessing and evaluation task-specific."
  ],
  [
    "Contextual embeddings change with surrounding text, allowing the same token to receive different representations in different semantic contexts.",
    "Vector search retrieves semantically related text by embedding queries and documents into the same space and comparing their geometry.",
    "Chunking determines the retrieval unit, so boundaries, token budgets and metadata directly affect recall and citation quality.",
    "RAG retrieval produces candidates, reranking refines their order and context assembly decides what evidence enters the generation prompt.",
    "Grounded RAG connects generated claims to retrieved evidence, citations and abstention behavior instead of treating the model as an isolated knowledge source.",
    "A citation-grounded assistant follows ingest, chunk, embed, retrieve, rerank, generate, cite and evaluate stages over a controlled document set."
  ],
  [
    "Prompting changes instructions and format, fine-tuning changes learned parameters, and RAG supplies external knowledge at inference time.",
    "Supervised fine-tuning trains a pretrained model on examples of desired behavior, using target tokens as the learning signal.",
    "LoRA learns low-rank parameter updates while freezing most base-model weights, reducing the trainable parameter count and storage cost.",
    "Domain adaptation continues language-model training on in-domain text so specialized vocabulary and patterns become more familiar.",
    "Quantization reduces numerical precision to lower memory requirements and often improve inference efficiency with an acceptable quality trade-off.",
    "A focused LoRA experiment should define a narrow dataset, base model, evaluation set and success criterion before training adapters."
  ],
  [
    "Accuracy, precision, recall, F1 and calibration answer different evaluation questions and should be selected according to the cost of errors.",
    "BLEU and ROUGE measure lexical overlap with references, so they are useful signals but incomplete measures of semantic quality or factuality.",
    "Semantic evaluation and LLM-as-judge approaches can assess richer qualities, but the evaluator itself requires calibration and validation.",
    "Hallucination, grounding, robustness and uncertainty represent different reliability dimensions and need different tests.",
    "Bias and fairness failures can arise from data coverage, labels, sampling and model behavior, so evaluation should inspect meaningful slices.",
    "An evaluation harness makes regression testing repeatable by storing cases, metrics, qualitative checks and model-version comparisons."
  ],
  [
    "Clean train, validation and test boundaries prevent leakage and make reported NLP performance more trustworthy.",
    "Batching, caching, latency, throughput and inference cost interact, so production optimization must consider the full request lifecycle.",
    "Model serving packages inference behind a stable interface with explicit resource limits, batching, precision choices, timeouts and failure handling.",
    "Observability connects production behavior to improvement through safe logs, latency metrics, error analysis, retrieval traces and drift monitoring.",
    "A production grounded assistant must connect data ingestion, retrieval, generation, evaluation, safety and observability into one operational system.",
    "An architecture review tests whether every component, interface and trade-off can be defended against requirements, failure modes and operating constraints."
  ]
];
