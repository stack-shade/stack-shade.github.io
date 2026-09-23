export const PRESENTATION_THEME = {
  stage: "bg-[#050608] text-white",
  panel: "bg-[#0a0c10]",
  mutedPanel: "bg-white/[0.03]",
  border: "border-white/[0.09]",
  borderStrong: "border-white/[0.18]",
  text: "text-white",
  mutedText: "text-white/62",
  faintText: "text-white/32",
  radius: "rounded-[1.5rem]",
  controlRadius: "rounded-xl",
  contentMax: "max-w-[1500px]",
  slidePadding: "p-5 sm:p-8 lg:p-12",
} as const;

export const PRESENTATION_ACCENTS = [
  "violet",
  "blue",
  "emerald",
  "amber",
] as const;

export const PRESENTATION_SHORTCUTS = [
  ["← / →", "Previous / next slide"],
  ["Space", "Next slide"],
  ["Home / End", "First / last slide"],
  ["F", "Fullscreen"],
  ["O", "Slide overview"],
  ["N", "Presenter notes"],
  ["P", "Pointer"],
] as const;

export const PRESENTATION_AUTOPLAY_MS = 9000;
