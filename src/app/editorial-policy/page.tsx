/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Editorial Policy — StackShade",
  description: "How StackShade researches, writes, reviews, and updates its engineering education content.",
  alternates: { canonical: "https://stack-shade.github.io/editorial-policy" },
  robots: { index: true, follow: true },
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-10">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Editorial Policy</h1>
      <p className="text-muted-foreground leading-relaxed mb-10">
        StackShade publishes practical engineering education for developers and students.
        This page explains how we approach originality, accuracy, examples, and updates.
      </p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Original work</h2>
          <p>
            Articles are written for StackShade and are intended to add explanation,
            examples, diagrams, comparisons, or practical debugging guidance rather than
            simply reproduce material from another website. External documentation and
            standards may be consulted when researching technical topics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Technical accuracy</h2>
          <p>
            We try to distinguish conceptual teaching models from implementation details.
            Examples are simplified when that makes a concept easier to learn, and the
            article text should make important assumptions clear. Technical articles may
            be updated when tools, protocols, or best practices change.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Interactive learning</h2>
          <p>
            StackShade uses visual explanations and interactive demonstrations where they
            improve understanding. Interactive elements are educational aids; readers
            should still understand the underlying concept instead of relying on an
            animation alone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Corrections</h2>
          <p>
            When a factual or technical error is identified, we aim to correct it in the
            article and update the relevant revision date. Readers can report issues
            through the <Link href="/contact" className="underline text-foreground">Contact page</Link>
            or the project's GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Author</h2>
          <p>
            StackShade is created and maintained by Shaswat Raj, a software developer and
            technology educator. See the <Link href="/about" className="underline text-foreground">About page</Link>
            for the creator profile and links to related work.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          Explore the engineering blog
        </Link>
      </div>
    </main>
  );
}
