# Stack Shade

<p align="center">
  <strong>Learn Faster. Understand Deeper. Remember Longer. Build Like Real Engineers.</strong>
</p>

<p align="center">
  A visual-first learning platform for computer science, software engineering, and modern web development.
</p>

<p align="center">
  <a href="https://stack-shade.github.io/">Website</a>
  ·
  <a href="https://www.youtube.com/@StackShade">YouTube</a>
  ·
  <a href="https://github.com/stack-shade/stack-shade.github.io">Source</a>
  ·
  <a href="https://sh20raj.github.io/">Creator</a>
</p>

<p align="center">
  <a href="https://github.com/stack-shade/stack-shade.github.io/actions/workflows/deploy.yml">
    <img src="https://github.com/stack-shade/stack-shade.github.io/actions/workflows/deploy.yml/badge.svg" alt="Build & Deploy">
  </a>
  <a href="https://github.com/stack-shade/stack-shade.github.io/stargazers">
    <img src="https://img.shields.io/github/stars/stack-shade/stack-shade.github.io?style=flat&logo=github" alt="GitHub stars">
  </a>
  <a href="https://github.com/stack-shade/stack-shade.github.io/network/members">
    <img src="https://img.shields.io/github/forks/stack-shade/stack-shade.github.io?style=flat&logo=github" alt="GitHub forks">
  </a>
  <a href="https://github.com/stack-shade/stack-shade.github.io/commits/main">
    <img src="https://img.shields.io/github/last-commit/stack-shade/stack-shade.github.io?style=flat" alt="Last commit">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.5-000000?logo=next.js&logoColor=white" alt="Next.js 15.3.5">
  <img src="https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react&logoColor=black" alt="React 19.2.7">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Bun-1.x-FBF0DF?logo=bun&logoColor=black" alt="Bun">
  <img src="https://img.shields.io/badge/GitHub%20Pages-deployed-222222?logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

---

## What is Stack Shade?

**Stack Shade** turns difficult engineering concepts into visual, structured learning experiences.

The idea is simple: instead of memorizing isolated definitions, learners should be able to **see the system, trace what happens, explain why it happens, and reproduce it from memory**.

The platform combines:

- Visual explanations for abstract engineering concepts
- Pattern-based learning instead of random problem grinding
- Active recall and Feynman-style explanations
- Worked examples and practical debugging scenarios
- Interactive learning experiences where useful
- Course roadmaps that connect fundamentals to real engineering work

---

## 📚 Learning Library

### 🧠 Computer Science & Problem Solving
- **DSA Patterns** — recurring patterns, reusable templates, mistake-driven practice, and interview preparation.

### 🌐 Systems & Networking
- **Computer Networks** — OSI/TCP-IP, encapsulation, DNS, TCP, HTTP, TLS, troubleshooting, packet analysis, and practical network tooling.

### 🤖 AI & Language
- **Natural Language Processing** — tokenization, language models, embeddings, RNNs, attention, Transformers, RAG, and evaluation.

### ⚡ Modern Web Engineering
- **Next.js Full Stack** — App Router, Server Components, rendering, caching, server actions, authentication, databases, and production deployment.

### 🚀 DevOps & Engineering Practice
- **DevOps & Git** — Git internals, Linux, CI/CD, Docker, Kubernetes, cloud infrastructure, IaC, and observability.

---

## 🧩 The Learning Method

Stack Shade is built around a repeatable learning loop:

```text
Understand
   ↓
Visualize
   ↓
Predict
   ↓
Explain
   ↓
Practice
   ↓
Recall
   ↓
Apply
```

The goal is not simply finishing lessons. The goal is being able to reconstruct the idea without the lesson open.

---

## ✨ Inside a Typical Lesson

| Stage | Purpose |
| --- | --- |
| **Mental model** | Build intuition before technical detail |
| **Core concept** | Establish the mechanism and terminology |
| **Causal flow** | Trace what happens step by step |
| **Artifact** | Inspect code, packets, commands, formulas, or diagrams |
| **Worked example** | Apply the concept to a realistic scenario |
| **Pitfalls** | Correct common misconceptions |
| **Active recall** | Retrieve the idea from memory |
| **Challenge** | Teach it back or solve a new case |
| **Compression** | Reduce the lesson to the ideas worth remembering |

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | **Next.js 15 + App Router** |
| UI | **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 4** |
| Components | **Base UI / shadcn ecosystem** |
| Icons | **Lucide React** |
| Package manager | **Bun** |
| Static export | **Next.js output: export** |
| Hosting | **GitHub Pages** |
| CI/CD | **GitHub Actions** |

---

## 🚀 Run Locally

### Prerequisites

Install [Bun](https://bun.sh/).

### Install

```bash
git clone https://github.com/stack-shade/stack-shade.github.io.git
cd stack-shade.github.io
bun install
```

### Start development

```bash
bun run dev
```

Open **http://localhost:3000**.

### Production build

```bash
bun run build
```

The static export is generated in:

```text
out/
```

---

## 🔄 Deployment

Deployment is automated through **GitHub Actions → GitHub Pages**.

Every push to `main` or `master` can trigger the workflow:

1. Checkout repository
2. Install Bun
3. Install dependencies with the frozen lockfile
4. Build the static Next.js site
5. Upload the `out/` directory
6. Deploy to GitHub Pages

Workflow:

[.github/workflows/deploy.yml](.github/workflows/deploy.yml)

---

## 📁 Project Structure

```text
.
├── src/
│   ├── app/                  # App Router pages and routes
│   ├── components/           # Reusable UI components
│   └── lib/                  # Course data, lesson content, utilities
├── public/                   # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── next.config.ts            # Static export configuration
├── package.json              # Scripts and dependencies
└── README.md
```

---

## 🌐 Useful Links

| Resource | Link |
| --- | --- |
| 🌍 Website | [stack-shade.github.io](https://stack-shade.github.io/) |
| ▶️ YouTube | [youtube.com/@StackShade](https://www.youtube.com/@StackShade) |
| 📝 StackShade HQ | [Notion](https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link) |
| 👤 Creator Portfolio | [sh20raj.github.io](https://sh20raj.github.io/) |
| 💻 Repository | [stack-shade/stack-shade.github.io](https://github.com/stack-shade/stack-shade.github.io) |

---

## 🤝 Contributing

Found a bug, unclear explanation, broken lesson, or something that can be taught better?

Contributions are welcome.

Useful contributions include:

- fixing a typo or technical mistake
- improving an explanation
- adding an example or lesson
- improving UI/UX
- fixing accessibility or performance issues
- proposing new learning modules

For larger changes, opening an issue first is recommended.

---

## 👨‍💻 Creator

Built and maintained by **[Shaswat Raj](https://github.com/SH20RAJ)**.

> Complex engineering should not feel complex forever.

<p align="center">
  <a href="https://www.youtube.com/@StackShade">
    <img src="https://img.shields.io/badge/Watch%20Stack%20Shade%20on%20YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Stack Shade on YouTube">
  </a>
  <a href="https://stack-shade.github.io/">
    <img src="https://img.shields.io/badge/Explore%20Stack%20Shade-111111?style=for-the-badge&logo=github&logoColor=white" alt="Explore Stack Shade">
  </a>
</p>
