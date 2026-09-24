import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { StudyDeskProvider } from "@/components/study-desk-provider";
import { StudyDeskGlobal } from "@/components/study-desk-global";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stack-shade.github.io"),
  title: {
    default: "StackShade — Learn Faster, Remember Longer",
    template: "%s | StackShade",
  },
  description:
    "A technical learning library for DSA, system design, backend engineering, DevOps, networking, AI and NLP. Learn from deep explanations, interactive artifacts, practice and projects.",
  keywords: [
    "computer science",
    "DSA",
    "system design",
    "backend engineering",
    "DevOps",
    "computer networks",
    "artificial intelligence",
    "natural language processing",
    "machine learning",
    "LLM",
    "RAG",
    "technical education",
  ],
  authors: [{ name: "StackShade" }],
  creator: "StackShade",
  publisher: "StackShade",
  verification: { google: "_rPi-600gMFYjNa9qzMTuIQg1_aey417EeAdaiIqgFg" },
  other: { "google-adsense-account": "ca-pub-1828915420581549" },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "StackShade",
    title: "StackShade — Learn Faster, Remember Longer",
    description:
      "Visual explanations of DSA patterns, system design, backend engineering, DevOps, Next.js, and AI engineering.",
    url: "https://stack-shade.github.io/",
    images: [{ url: "https://stack-shade.github.io/og-image.svg", width: 1200, height: 630, type: "image/svg+xml", alt: "StackShade — Learn Faster, Remember Longer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StackShade — Learn Faster, Remember Longer",
    description:
      "Visual explanations of DSA patterns, system design, backend engineering, DevOps, Next.js, and AI engineering.",
    images: ["https://stack-shade.github.io/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="stackshade-theme-init" strategy="beforeInteractive">
          {`try{const s=localStorage.getItem("stackshade-theme");const d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}`}
        </Script>
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <StudyDeskProvider>
          {children}
          <StudyDeskGlobal />
        </StudyDeskProvider>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QDGSX2YTBT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QDGSX2YTBT');
          `}
        </Script>
      </body>
    </html>
  );
}
