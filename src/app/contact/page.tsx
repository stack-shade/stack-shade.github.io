import React from "react";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — StackShade",
  description: "Get in touch with StackShade. Reach out for collaborations, feedback, or questions about engineering education.",
  alternates: {
    canonical: "https://stack-shade.github.io/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="selection:bg-foreground/20 selection:text-foreground min-h-screen">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Contact</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-2xl">
          Have a question, feedback, or collaboration idea? We&apos;d love to hear from you.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <a 
            href="https://github.com/sh20raj" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 border border-border rounded-xl bg-card/20 hover:border-foreground/30 hover:bg-muted/10 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">GitHub</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Open an issue or reach out directly on GitHub.
              </p>
            </div>
          </a>

          <a 
            href="https://www.youtube.com/@StackShade" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 border border-border rounded-xl bg-card/20 hover:border-foreground/30 hover:bg-muted/10 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">YouTube</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comment on videos or reach out via channel contact.
              </p>
            </div>
          </a>
        </div>

        <div className="mt-12">
          <Link href="/" className={buttonVariants({ variant: "outline", className: "cursor-pointer" })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
