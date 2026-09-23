import type { Metadata } from "next";
import SketchFlowStudio from "@/components/courses/sketchflow-studio";

export const metadata: Metadata = {
  title: "SketchFlow Practice — StackShade",
  description:
    "A first-party StackShade visual workspace for drawing technical mechanisms, practicing active reconstruction, and saving local study sketches.",
  alternates: {
    canonical: "https://stack-shade.github.io/practice/sketchflow",
  },
  robots: { index: true, follow: true },
};

interface PageProps {
  searchParams: Promise<{ topic?: string; prompt?: string }>;
}

export default async function SketchFlowPracticePage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const topic = params.topic?.trim() || "Core concept";
  const prompt =
    params.prompt?.trim() ||
    "Rebuild the core mechanism from memory. Label the input, transformation, observation, and transfer.";

  return (
    <SketchFlowStudio initialTopic={topic} initialPrompt={prompt} />
  );
}
