import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Use — StackShade",
  description: "Terms for using StackShade articles, courses, visualizations, and educational resources.",
  alternates: { canonical: "https://stack-shade.github.io/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-10">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Terms of Use</h1>
      <p className="text-muted-foreground mb-10">Last updated: September 20, 2026</p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Educational purpose</h2>
          <p>
            StackShade provides educational articles, courses, examples, and interactive
            visualizations. The material is provided for learning and general information.
            It is not a guarantee that a particular implementation will be suitable for
            a production environment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Acceptable use</h2>
          <p>
            You may use the public educational material for personal learning and
            legitimate study or development work. Do not attempt to disrupt the website,
            abuse interactive services, circumvent security controls, or use the site for
            unlawful activity.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Third-party links</h2>
          <p>
            StackShade links to services including GitHub, YouTube, Notion, and other
            external resources. Those services operate under their own terms and privacy
            policies. StackShade does not control third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Intellectual property</h2>
          <p>
            Unless otherwise stated, original StackShade text, graphics, and website code
            are owned by their respective authors or contributors. Third-party trademarks,
            protocols, libraries, and product names remain the property of their owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Changes</h2>
          <p>
            The site and these terms may change as StackShade adds courses, articles, and
            features. The current version is the version published on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Questions</h2>
          <p>
            For questions about these terms, use the <Link href="/contact" className="underline text-foreground">Contact page</Link>.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to StackShade
        </Link>
      </div>
    </main>
  );
}
