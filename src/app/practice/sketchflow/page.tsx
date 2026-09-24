import type { Metadata } from "next";
import SketchFlowPracticeClient from "@/components/courses/sketchflow-practice-client";

export const metadata: Metadata = {
  title: "SketchFlow Practice — StackShade",
  description:
    "A first-party StackShade visual workspace for drawing technical mechanisms, practicing active reconstruction, and saving local study sketches.",
  alternates: {
    canonical: "https://stack-shade.github.io/practice/sketchflow",
  },
  robots: { index: true, follow: true },
};

export default function SketchFlowPracticePage() {
  return <SketchFlowPracticeClient />;
}
