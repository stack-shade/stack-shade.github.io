import type { Metadata } from "next";
import SketchFlowPracticeClient from "@/components/courses/sketchflow-practice";

export const metadata: Metadata = {
  title: "Practice Canvas — StackShade",
  description:
    "A first-party StackShade visual reconstruction canvas for rebuilding technical ideas from memory.",
  alternates: {
    canonical: "https://stack-shade.github.io/practice/sketchflow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SketchFlowPracticePage() {
  return <SketchFlowPracticeClient />;
}
