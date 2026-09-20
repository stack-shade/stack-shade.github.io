export interface NlpTopicGuide {
  overview: string;
  mentalModel: string;
  deepDive: { title: string; body: string }[];
  flow: { label: string; detail: string }[];
  artifact: { language: string; value: string; explanation: string };
  mistakes: string[];
  recall: { question: string; answer: string }[];
  feynman: string;
  examAngle: string;
}

const G = (
  overview: string,
  mentalModel: string,
  deepDive: { title: string; body: string }[],
  flow: { label: string; detail: string }[],
  artifact: { language: string; value: string; explanation: string },
  mistakes: string[],
  recall: { question: string; answer: string }[],
  feynman: string,
  examAngle: string,
): NlpTopicGuide => ({ overview, mentalModel, deepDive, flow, artifact, mistakes, recall, feynman, examAngle });

export const NLP_TOPIC_GUIDES: Record<string, NlpTopicGuide> = {
  "what-nlp-actually-solves": G(
    "Natural Language Processing is the engineering and scientific field concerned with enabling computers to process human language. It spans symbolic methods, probabilistic models, machine learning, neural networks and language models.",
    "Think of NLP as a translation layer between messy human communication and machine-operable representations. The engineering goal is not simply to make text 'readable'; it is to preserve the information needed for a specific task.",
    [
      { title: "Tasks", body: "NLP systems can classify, extract, retrieve, rank, translate, summarize, answer questions, generate text and support interactive applications. The task determines the data, model, loss and evaluation strategy." },
      { title: "Levels of language", body: "Useful abstractions include tokens, morphology, syntax, semantics, discourse and pragmatics. Modern neural systems learn many of these patterns implicitly, but the distinctions remain valuable for analysis and debugging." },
      { title: "System mindset", body: "A real NLP product is not just a model: data collection, preprocessing, retrieval, inference, post-processing, evaluation, safety and monitoring all affect user-visible behavior." },
    ],
    [
      { label: "Human language", detail: "Ambiguous, contextual, variable and noisy." },
      { label: "Representation", detail: "Text becomes tokens, spans, features, vectors or structured state." },
      { label: "Model", detail: "A statistical or neural system maps representations to predictions or generated text." },
      { label: "Evaluation", detail: "Measure the behavior against a task-specific definition of success." },
      { label: "Product", detail: "Wrap the model in retrieval, interfaces, monitoring and safeguards." },
    ],
    {
      language: "text",
      value: "text → tokens → representation → model → output → evaluation",
      explanation: "This is the core abstraction for the entire course. Every later topic is one refinement of one of these boxes.",
    },
    [
      "Treat NLP as only chatbot development.",
      "Assume one universal metric can evaluate every NLP task.",
      "Forget that data and task definition often dominate model quality.",
    ],
    [
      { question: "Why is NLP broader than LLMs?", answer: "LLMs are a modern subset of NLP systems. NLP also includes classical statistical methods, information extraction, parsing, speech/language interfaces, retrieval and many task-specific models." },
      { question: "What determines whether an NLP model is useful?", answer: "Its behavior relative to a clearly defined task, data distribution, constraints and evaluation criteria." },
    ],
    "Explain NLP to a junior developer using only the pipeline: input → representation → model → decision/output → evaluation. Then give three different examples.",
    "Exams and interviews often test task identification, model-family selection and the difference between language representation, modeling and evaluation.",
  ),
  "tokenization-words-subwords-characters": G(
    "Tokenization converts raw text into discrete units that a model or downstream algorithm can process. Word, character and subword tokenizers make different trade-offs in vocabulary size, sequence length and handling of rare or unseen words.",
    "Imagine cutting Lego instructions into pieces. Large pieces are efficient when they recur often; tiny pieces let you represent almost anything but create longer sequences.",
    [
      { title: "Word tokens", body: "Word tokenization is intuitive but struggles with vocabulary growth, spelling variants and unseen words." },
      { title: "Subword tokens", body: "Subword methods such as BPE, WordPiece and Unigram decompose text into reusable pieces, reducing out-of-vocabulary problems while keeping sequences manageable." },
      { title: "Context after tokenization", body: "Tokenization is not semantic understanding. It defines the units supplied to a model; the model must learn relationships among them." },
    ],
    [
      { label: "Raw text", detail: "A sentence contains spaces, punctuation, emojis, morphology and domain symbols." },
      { label: "Tokenizer", detail: "Apply normalization and segmentation rules." },
      { label: "Subwords", detail: "Represent rare words as reusable pieces." },
      { label: "Token IDs", detail: "Map pieces to integer vocabulary identifiers." },
      { label: "Model input", detail: "Add attention masks and any special tokens required by the architecture." },
    ],
    {
      language: "text",
      value: "unbelievable → un + believe + able\ninput ids → [421, 892, 77]",
      explanation: "The exact segmentation depends on the tokenizer vocabulary and rules. The invariant is that the model consumes token IDs, not raw Unicode strings.",
    },
    [
      "Assume every tokenizer splits on whitespace only.",
      "Treat token IDs as semantic scores.",
      "Forget that longer token sequences increase computational cost in attention-based models.",
    ],
    [
      { question: "Why do modern LLMs commonly use subword tokenization?", answer: "It provides an efficient compromise between vocabulary size and coverage of rare, new and morphologically complex words." },
      { question: "What is an attention mask for?", answer: "It tells the model which positions should participate in attention or loss computation under the architecture's rules." },
    ],
    "Take three words with prefixes, suffixes and spelling variants and predict how a subword tokenizer might split them. Then explain why your prediction could be wrong.",
    "Know word vs character vs subword trade-offs and why tokenization affects both model behavior and compute.",
  ),
  "n-gram-language-models": G(
    "An n-gram language model estimates the probability of the next token using a limited history. It is a clean foundation for understanding language modeling, smoothing, perplexity and why longer context became important.",
    "An n-gram model is like predictive text with a fixed memory window: it only remembers the last few words.",
    [
      { title: "Chain rule", body: "The probability of a sequence can be decomposed into conditional probabilities. N-gram models approximate each conditional by keeping only a recent context of fixed width." },
      { title: "Data sparsity", body: "As n grows, many possible n-grams are never observed. Smoothing redistributes some probability mass so unseen events do not force a zero-probability sequence." },
      { title: "Perplexity", body: "Perplexity summarizes how surprised a model is by held-out data. Lower perplexity generally indicates better predictive fit under the same evaluation setup." },
    ],
    [
      { label: "Corpus", detail: "Count observed n-grams." },
      { label: "Estimate", detail: "Turn counts into conditional probabilities." },
      { label: "Smooth", detail: "Assign sensible probability to unseen combinations." },
      { label: "Score", detail: "Multiply/log-sum conditional probabilities over a sequence." },
      { label: "Evaluate", detail: "Compare predictive uncertainty on held-out data." },
    ],
    {
      language: "text",
      value: "P(w3 | w1,w2) ≈ count(w1,w2,w3) / count(w1,w2)",
      explanation: "This maximum-likelihood estimate illustrates the core idea. Smoothing modifies it so unseen n-grams do not collapse the entire sequence probability.",
    },
    [
      "Say an n-gram sees unlimited context.",
      "Ignore zero counts.",
      "Compare perplexity across completely different tokenizations without accounting for the evaluation setup.",
    ],
    [
      { question: "What is the core limitation of n-grams?", answer: "They have a fixed context window and suffer badly from sparsity as the context length grows." },
      { question: "Why is smoothing necessary?", answer: "Because unseen n-grams would otherwise receive zero probability and make sequence scoring brittle." },
    ],
    "Explain why increasing n seems attractive, then explain why the training data requirement explodes.",
    "Great for probability derivations, smoothing comparisons, language-model fundamentals and historical context for neural language models.",
  ),
  "word-embeddings-distributional-semantics": G(
    "Dense word embeddings represent tokens as vectors whose geometry reflects statistical patterns in their contexts. They replaced sparse one-hot representations with continuous spaces that support useful similarity relationships.",
    "Imagine every word as a point on a map. Words used in similar neighborhoods end up closer together.",
    [
      { title: "Distributional hypothesis", body: "Words appearing in similar contexts tend to have related meanings. Algorithms exploit this regularity rather than receiving dictionary definitions." },
      { title: "Sparse to dense", body: "A one-hot vector treats every vocabulary item as orthogonal. Dense embeddings let models represent graded similarity through compact continuous dimensions." },
      { title: "Static limitation", body: "Traditional word embeddings assign one vector per word type, so polysemous words such as 'bank' receive one blended representation rather than a context-specific one." },
    ],
    [
      { label: "Context", detail: "Collect neighboring words." },
      { label: "Learning objective", detail: "Adjust vector parameters to predict or distinguish context." },
      { label: "Geometry", detail: "Similar distributional behavior produces nearby vectors." },
      { label: "Use", detail: "Feed vectors into classification, search, clustering or downstream models." },
    ],
    {
      language: "text",
      value: "king → [0.12, -0.44, …]\nqueen → [0.10, -0.39, …]\ncosine(king, queen) → high",
      explanation: "Vector dimensions are learned features, not human-labeled axes like 'royalty'. Similarity is an emergent property of training.",
    },
    [
      "Interpret every embedding dimension as a human concept.",
      "Assume static embeddings solve contextual ambiguity.",
      "Confuse cosine similarity with causal relatedness.",
    ],
    [
      { question: "Why are embeddings useful?", answer: "They give models compact continuous representations where statistical similarity can be captured geometrically." },
      { question: "Why are classic embeddings called static?", answer: "The same word type receives the same vector regardless of its sentence context." },
    ],
    "Explain how the word 'bank' creates a problem for static embeddings and how contextual models address it.",
    "Know distributional semantics, sparse-vs-dense representations, cosine similarity and the limits of static vectors.",
  ),
  "rnn-hidden-state-over-time": G(
    "An RNN processes a sequence one step at a time while carrying a hidden state that acts as a learned summary of prior context.",
    "An RNN is a reader carrying a notebook through a sentence, rewriting the summary after every new word.",
    [
      { title: "Recurrence", body: "At each timestep the model combines the current input with the previous hidden state to produce a new hidden state." },
      { title: "Shared parameters", body: "The same recurrent cell parameters are reused at every position, which makes the model sequence-length agnostic." },
      { title: "Training through time", body: "Backpropagation through time unrolls the recurrence. Repeated multiplication through many timesteps creates gradient-vanishing and gradient-exploding challenges." },
    ],
    [
      { label: "Token t", detail: "Embed the current token." },
      { label: "Previous state", detail: "Retrieve compressed context from earlier tokens." },
      { label: "Cell", detail: "Combine input and state." },
      { label: "New state", detail: "Carry the summary forward." },
      { label: "Output", detail: "Predict a label or next-token distribution." },
    ],
    {
      language: "text",
      value: "h_t = f(x_t, h_{t-1})\ny_t = g(h_t)",
      explanation: "The recurrence equation is the reusable mental model. LSTMs and GRUs add gating around this basic idea.",
    },
    [
      "Say each token gets an independent network.",
      "Assume the hidden state stores the entire history perfectly.",
      "Forget the sequential dependency that limits parallel training and inference.",
    ],
    [
      { question: "Why is an RNN sequential?", answer: "The state at time t depends on the state at time t−1, so later computation depends on earlier steps." },
      { question: "What causes long-context difficulty?", answer: "Repeated transformations can make gradients decay or explode, making distant dependencies difficult to preserve or learn." },
    ],
    "Draw an RNN unrolled for five tokens and label exactly what changes and what is shared.",
    "Common exam targets: recurrence equations, hidden state, BPTT and vanishing/exploding gradients.",
  ),
  "attention-alignment-visualizer": G(
    "Attention creates soft alignment between one representation and a set of candidate representations. It lets a model assign different weights to different context positions for the current computation.",
    "Imagine highlighting a few words in a paragraph before answering a question. The highlights are attention weights.",
    [
      { title: "Query, key, value", body: "A query represents what the current position is looking for. Keys describe candidate positions. Values carry the information aggregated after compatibility is computed." },
      { title: "Soft weighting", body: "Compatibility scores are normalized into weights, commonly with softmax. The output is a weighted combination of value vectors." },
      { title: "Why it matters", body: "The model can route information dynamically instead of relying on one fixed-size recurrent summary." },
    ],
    [
      { label: "Query", detail: "Current representation asks: which context matters?" },
      { label: "Keys", detail: "Context positions expose compatibility features." },
      { label: "Scores", detail: "Compute pairwise relevance." },
      { label: "Softmax", detail: "Turn scores into normalized attention weights." },
      { label: "Values", detail: "Take the weighted sum to form the attended representation." },
    ],
    {
      language: "text",
      value: "Attention(Q,K,V) = softmax(QKᵀ / √d_k)V",
      explanation: "The scaling factor controls score magnitude before softmax. This compact equation is the backbone of Transformer self-attention.",
    },
    [
      "Call attention a hard lookup.",
      "Assume attention weights are automatically explanations.",
      "Forget that attention cost grows with pairwise token interactions in standard full self-attention.",
    ],
    [
      { question: "What does softmax do in attention?", answer: "It converts compatibility scores into normalized weights that sum to one across the attended positions." },
      { question: "Why divide by √d_k?", answer: "To keep dot-product magnitudes in a more stable range as key/query dimensionality grows, helping softmax avoid overly extreme saturation." },
    ],
    "Point at one token and explain why it would attend strongly to one context word but weakly to another.",
    "Be able to derive the conceptual Q/K/V pipeline and explain self-attention without treating it as magic.",
  ),
  "self-attention-q-k-v": G(
    "Self-attention lets every token compute a context-aware representation by comparing its query with the keys of all tokens and aggregating their values.",
    "Every word in a room can ask every other word, 'Are you relevant to what I am doing right now?'",
    [
      { title: "Linear projections", body: "The same input matrix is projected into query, key and value spaces. These learned transformations give the model separate roles for matching and information aggregation." },
      { title: "Pairwise interaction", body: "Each query compares with every key. The resulting matrix describes how strongly each position attends to the others." },
      { title: "Context mixing", body: "The weighted values create a new representation where a token can incorporate information from distant positions in parallel." },
    ],
    [
      { label: "Input embeddings", detail: "Represent token positions." },
      { label: "Project", detail: "Create Q, K and V matrices." },
      { label: "Score", detail: "Compute QKᵀ." },
      { label: "Normalize", detail: "Scale and softmax the scores." },
      { label: "Aggregate", detail: "Multiply by V and project the result." },
    ],
    {
      language: "text",
      value: "X → Q=XW_Q, K=XW_K, V=XW_V\nA = softmax(QKᵀ / √d_k)\nY = AV",
      explanation: "This is the core computational path of self-attention. Multi-head attention repeats the idea in parallel learned subspaces.",
    },
    [
      "Assume Q, K and V are three different input sequences.",
      "Forget that self-attention can connect distant tokens directly.",
      "Say attention removes the need for positional information.",
    ],
    [
      { question: "What makes it 'self'-attention?", answer: "Queries, keys and values are all derived from the same input sequence." },
      { question: "What makes attention contextual?", answer: "Each token's output is a weighted combination of information from other positions in the same sequence." },
    ],
    "Take the sentence 'The animal didn't cross the street because it was tired' and explain which tokens a model may need to relate.",
    "This is a core derivation topic for Transformer interviews and exams.",
  ),
  "pretraining-data-objective-design": G(
    "Pretraining is where a model learns general representations from large corpora using a self-supervised objective. The objective, data mixture and sampling policy shape what capabilities and biases can emerge.",
    "Think of pretraining as building a giant practice environment where the text itself provides the answers the model is asked to predict or reconstruct.",
    [
      { title: "Self-supervision", body: "The training signal can be created from raw text, avoiding manual labels for the main pretraining objective." },
      { title: "Data mixture", body: "Different sources vary in quality, duplication, language, domain and risk. Data curation therefore affects the resulting model." },
      { title: "Objective shapes behavior", body: "Autoregressive next-token prediction and masked-token reconstruction expose models to different prediction contexts and inductive pressures." },
    ],
    [
      { label: "Collect", detail: "Aggregate text from selected sources." },
      { label: "Filter", detail: "Remove or downweight low-quality, duplicated or disallowed content." },
      { label: "Tokenize", detail: "Convert text to model vocabulary IDs." },
      { label: "Objective", detail: "Construct prediction or reconstruction targets." },
      { label: "Optimize", detail: "Update model parameters against the training loss." },
    ],
    {
      language: "text",
      value: "tokens → context/target pairs → model logits → loss → gradients → updated weights",
      explanation: "This is the pretraining loop in one line. The scale can be enormous, but the learning signal is still repeated prediction against target tokens.",
    },
    [
      "Assume scale automatically fixes poor data.",
      "Treat pretraining loss as a complete product-quality metric.",
      "Forget leakage, duplication and evaluation contamination.",
    ],
    [
      { question: "Why is data curation part of model architecture?", answer: "Because the training distribution defines what the model observes, and therefore influences representations, capabilities, failure modes and biases." },
      { question: "What is self-supervision?", answer: "A learning setup in which the training targets can be generated from the raw input itself rather than requiring manual labels." },
    ],
    "Explain why two identical Transformer architectures can behave differently when trained on different data mixtures.",
    "Useful for discussing language-model training pipelines, data quality and objective design.",
  ),
  "retrieval-augmented-generation": G(
    "Retrieval-augmented generation (RAG) adds external retrieval to a generative model so responses can be grounded in selected documents or knowledge stores.",
    "Instead of asking a student to memorize the entire library, give them a search index and require them to cite the relevant pages before answering.",
    [
      { title: "Indexing", body: "Source documents are chunked, transformed into searchable representations, metadata-tagged and stored in a retrieval system." },
      { title: "Retrieval", body: "A query is transformed into a representation and matched against stored items using lexical, dense or hybrid retrieval." },
      { title: "Generation", body: "Retrieved evidence is inserted into a controlled model context. The model then produces an answer conditioned on that evidence and the user's request." },
    ],
    [
      { label: "Question", detail: "User asks a knowledge-intensive query." },
      { label: "Retrieve", detail: "Find relevant chunks or records." },
      { label: "Rerank", detail: "Optionally reorder candidates using a more precise scorer." },
      { label: "Ground", detail: "Construct a context containing the selected evidence." },
      { label: "Generate", detail: "Model answers using the retrieved context and system instructions." },
    ],
    {
      language: "text",
      value: "docs → chunks → embeddings/index\nquery → retrieval → reranking → context → LLM → answer + citations",
      explanation: "RAG is a system pattern. Its quality depends on chunking, retrieval, reranking, context construction, prompt design and evaluation—not simply on the language model.",
    },
    [
      "Assume RAG guarantees factuality.",
      "Ignore retrieval recall and ranking quality.",
      "Stuff the entire knowledge base into the prompt.",
    ],
    [
      { question: "Why can RAG still hallucinate?", answer: "The retriever can return irrelevant or incomplete evidence, the model can misinterpret it, or the generation process can introduce unsupported claims." },
      { question: "What should be evaluated separately?", answer: "At least retrieval quality and answer quality; otherwise a bad retriever can be hidden behind a strong generator or vice versa." },
    ],
    "Draw RAG as two pipelines—offline indexing and online retrieval/generation—and explain why mixing them mentally causes architecture mistakes.",
    "Strong interview topic for modern NLP systems: discuss retrieval, reranking, grounding, citations and evaluation separately.",
  ),
  "classification-metrics-precision-recall-f1": G(
    "Classification evaluation turns model outputs into evidence about task behavior. Precision, recall and F1 summarize different trade-offs; the right metric depends on the cost of errors and the class distribution.",
    "Imagine a security alarm. Precision asks 'when I sounded the alarm, how often was there actually a problem?' Recall asks 'of all real problems, how many did I catch?'",
    [
      { title: "Precision", body: "Precision = TP / (TP + FP). It matters when false positives are costly." },
      { title: "Recall", body: "Recall = TP / (TP + FN). It matters when missing a positive case is costly." },
      { title: "F1", body: "F1 is the harmonic mean of precision and recall, useful when you want a single summary that penalizes imbalance between the two." },
    ],
    [
      { label: "Predictions", detail: "Model labels examples positive or negative." },
      { label: "Confusion matrix", detail: "Count TP, FP, TN and FN." },
      { label: "Metric", detail: "Compute precision, recall or F1." },
      { label: "Threshold", detail: "Adjust the decision threshold if the operational trade-off changes." },
      { label: "Deploy", detail: "Choose the metric aligned with actual user and business costs." },
    ],
    {
      language: "text",
      value: "precision = TP/(TP+FP)\nrecall    = TP/(TP+FN)\nF1 = 2PR/(P+R)",
      explanation: "These are not abstract formulas: each numerator/denominator answers a different operational question about errors.",
    },
    [
      "Assume the highest accuracy is always the best model.",
      "Forget class imbalance.",
      "Use F1 without asking whether precision or recall is more costly.",
    ],
    [
      { question: "When is recall especially important?", answer: "When false negatives are more costly than false positives, such as a detection system where missing a true positive is dangerous." },
      { question: "Why is F1 harmonic rather than arithmetic?", answer: "The harmonic mean penalizes situations where one of precision or recall is much lower than the other." },
    ],
    "Create a fake confusion matrix for spam detection and explain which metric you would optimize if legitimate mail must never be blocked.",
    "Expect confusion-matrix arithmetic, metric selection and class-imbalance reasoning.",
  ),
};

export function getNlpTopicGuide(slug: string): NlpTopicGuide | undefined {
  return NLP_TOPIC_GUIDES[slug];
}

export function nlpTopicSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
