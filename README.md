# StackShade — Visual Engineering

> Learn Faster, Understand Deeper, Remember Longer, and Build Like Real Engineers.

Welcome to the repository for **StackShade**'s official landing page: [stack-shade.github.io](http://stack-shade.github.io/).

StackShade is a visual engineering channel dedicated to helping developers master software architecture, computer science fundamentals, and full-stack development.

---

## 🔗 Quick Links

- 📺 **YouTube Channel**: [youtube.com/@StackShade](https://www.youtube.com/@StackShade)
- 📝 **StackShade HQ (Notion Workspace)**: [Access Notion Notes & Roadmaps](https://app.notion.com/p/StackShade-HQ-371cd0ed0c258079a542e0541158c51e?source=copy_link)
- 🌐 **Website**: [stack-shade.github.io](http://stack-shade.github.io/)
- 👤 **Creator Portfolio**: [sh20raj.github.io](https://sh20raj.github.io/)

---

## 📚 What We Cover

StackShade demystifies complex software engineering concepts through detailed visual tracing and diagrams:

- 🧩 **DSA Patterns**: Visualizing algorithmic strategies (Sliding Window, Two Pointers, Backtracking, Graphs) for intuitive problem-solving.
- 🏛️ **System Design**: Architectural breakdowns of distributed systems, caching, CDNs, load balancing, and replication.
- ⚙️ **Backend Engineering**: Practical server APIs, database internals (PostgreSQL indexes, Redis cache), event streaming (Kafka), and containerization (Docker).
- ⚡ **Next.js & Fullstack**: Core React Server Components, hydration flow, server action strategies, and high-performance UI optimization.
- 🤖 **AI Engineering**: Retrieval-Augmented Generation (RAG), LLM streaming integrations, and modern AI Agent workflows.

---

## 🛠️ Technology Stack

The landing page is built with:

1. **Framework**: [Next.js 15](https://nextjs.org/) (App Router, static HTML export mode).
2. **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom grid-dot pattern background and elegant glassmorphism styles.
3. **Icons**: [Lucide React](https://lucide.dev/).
4. **Package Manager**: [Bun](https://bun.sh/).
5. **Deployment**: [GitHub Pages](https://pages.github.com/) deployed automatically via [GitHub Actions](https://github.com/features/actions).

---

## 💻 Local Development

### 1. Install Dependencies
Make sure you have [Bun](https://bun.sh/) installed, then run:
```bash
bun install
```

### 2. Run the Development Server
Launch the local server:
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Export Statically
Generate the production static assets inside the `out/` folder:
```bash
bun run build
```

---

## 🚀 Deployment Pipeline

This website is automatically built and deployed via **GitHub Actions** defined in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Every push or merge to the `main` or `master` branches:
1. Triggers the action on a clean Ubuntu runner.
2. Sets up Node.js & Bun environment.
3. Installs dependencies and builds the Next.js static site (`bun run build`).
4. Bundles output directory (`out/`) and deploys it to GitHub Pages.

---

## 🤝 Contributing & Support

Created and maintained by [Shaswat Raj (sh20raj)](https://github.com/sh20raj). If you enjoy the visual explanations on the channel, subscribe on [YouTube](https://www.youtube.com/@StackShade) and start building!
