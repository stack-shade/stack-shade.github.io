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
          <p>
            <strong className="text-foreground">Last updated:</strong> July 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Overview</h2>
          <p>
            StackShade (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at <a href="https://stack-shade.github.io" className="text-foreground underline">https://stack-shade.github.io</a>.
          </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Information We Collect</h2>
            <p>
              We may collect non-personally identifiable information such as browser type, operating system, referring URLs, and pages visited. This helps us improve our website and content.
            </p>
            <p>
              We do not collect personally identifiable information unless you voluntarily provide it through contact forms or other interactive features.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Google Analytics:</strong> To understand how visitors interact with our site.</li>
              <li><strong className="text-foreground">Google AdSense:</strong> To display relevant advertisements. AdSense may use cookies to serve ads based on your prior visits to this or other websites.</li>
              <li><strong className="text-foreground">Essential cookies:</strong> Required for basic site functionality.</li>
            </ul>
            <p>
              You can control cookie preferences through your browser settings. Please note that disabling cookies may affect site functionality.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Third-Party Services</h2>
            <p>
              We use the following third-party services that may collect data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Google Analytics (GA4):</strong> <a href="https://analytics.google.com" className="text-foreground underline">https://analytics.google.com</a></li>
              <li><strong className="text-foreground">Google AdSense:</strong> <a href="https://www.google.com/adsense" className="text-foreground underline">https://www.google.com/adsense</a></li>
              <li><strong className="text-foreground">YouTube:</strong> Embedded content may be subject to YouTube&apos;s privacy policy.</li>
              <li><strong className="text-foreground">Notion:</strong> External links to StackShade HQ are subject to Notion&apos;s privacy policy.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please visit our <Link href="/contact" className="text-foreground underline">Contact page</Link> or reach out via our <Link href="https://github.com/sh20raj" className="text-foreground underline">GitHub profile</Link>.
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
