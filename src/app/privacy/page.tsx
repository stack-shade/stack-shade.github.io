/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — StackShade",
  description: "Privacy policy for StackShade. Learn how we collect, use, and protect your data.",
  alternates: {
    canonical: "https://stack-shade.github.io/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-muted-foreground text-sm sm:text-base leading-relaxed">
          <p><strong className="text-foreground">Last updated:</strong> September 20, 2026</p>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Overview</h2>
            <p>
              StackShade ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard information
              when you visit <a href="https://stack-shade.github.io" className="text-foreground underline">https://stack-shade.github.io</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Information We Collect</h2>
            <p>
              We may collect non-personally identifiable information such as browser type,
              operating system, referring URLs, pages visited, approximate device information,
              and analytics events. This helps us understand how the site is used and improve
              the content and experience.
            </p>
            <p>
              We do not intentionally collect personally identifiable information unless you
              voluntarily provide it through a form, email, or another feature.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Cookies, Analytics, and Advertising</h2>
            <p>
              StackShade uses cookies and similar technologies for analytics, site operation,
              and advertising. Google Analytics may process usage information to help us
              understand traffic and improve the site.
            </p>
            <p>
              Google AdSense and its advertising partners may use cookies and similar
              technologies to serve or measure advertisements, including ads based on a
              visitor's prior visits to this or other websites. Depending on a user's
              location and applicable consent requirements, personalized advertising may
              require consent before it is shown.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Google Analytics:</strong> site analytics and measurement.</li>
              <li><strong className="text-foreground">Google AdSense:</strong> advertising, measurement, and related ad services.</li>
              <li><strong className="text-foreground">Essential technologies:</strong> required for core functionality.</li>
            </ul>
            <p>
              You can manage browser cookie controls through your browser settings. For
              Google advertising personalization preferences, visit
              <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline ml-1">
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Third-Party Services</h2>
            <p>
              The site may link to or use services including Google Analytics, Google AdSense,
              YouTube, GitHub, and Notion. These services operate under their own policies and
              may process information according to their respective terms and privacy notices.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Google Analytics:</strong> <a href="https://analytics.google.com" className="text-foreground underline">analytics.google.com</a></li>
              <li><strong className="text-foreground">Google AdSense:</strong> <a href="https://www.google.com/adsense" className="text-foreground underline">google.com/adsense</a></li>
              <li><strong className="text-foreground">YouTube:</strong> embedded content and external links may be subject to Google's privacy policy.</li>
              <li><strong className="text-foreground">Notion:</strong> external StackShade HQ links are subject to Notion's privacy policy.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Data Security</h2>
            <p>
              We use reasonable measures to protect information processed through the site.
              No method of Internet transmission or storage can be guaranteed to be completely secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Children's Privacy</h2>
            <p>
              StackShade is educational in nature but is not directed specifically to children.
              We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy as the website, services, or applicable
              requirements change. The current version is always published on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
            <p>
              For privacy questions, visit our <Link href="/contact" className="text-foreground underline">Contact page</Link>
              or reach out through the <a href="https://github.com/sh20raj" target="_blank" rel="noopener noreferrer" className="text-foreground underline">GitHub profile</a>.
            </p>
          </section>
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
