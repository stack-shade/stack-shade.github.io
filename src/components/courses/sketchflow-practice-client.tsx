"use client";

import { useEffect, useState } from "react";
import SketchFlowStudio from "@/components/courses/sketchflow-studio";

const DEFAULT_TOPIC = "Core concept";
const DEFAULT_PROMPT =
  "Rebuild the core mechanism from memory. Label the input, transformation, observation, and transfer.";

export default function SketchFlowPracticeClient() {
  const [params, setParams] = useState({
    topic: DEFAULT_TOPIC,
    prompt: DEFAULT_PROMPT,
  });

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    setParams({
      topic: hash.get("topic")?.trim() || DEFAULT_TOPIC,
      prompt: hash.get("prompt")?.trim() || DEFAULT_PROMPT,
    });
  }, []);

  return (
    <SketchFlowStudio
      key={params.topic + "|" + params.prompt}
      initialTopic={params.topic}
      initialPrompt={params.prompt}
    />
  );
}
