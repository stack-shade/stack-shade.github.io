export const PRESENTATION_THEME = {
  stage: "bg-[#050608] text-white",
  panel: "bg-[#08090b]",
  mutedPanel: "bg-white/[0.035]",
  border: "border-white/10",
  borderStrong: "border-white/20",
  text: "text-white",
  mutedText: "text-white/60",
  faintText: "text-white/35",
  radius: "rounded-[2rem]",
  controlRadius: "rounded-xl",
  contentMax: "max-w-5xl",
  slidePadding: "p-7 sm:p-10 lg:p-14",
} as const;

export const PRESENTATION_ACCENTS = [
  "from-cyan-500/20 via-transparent to-transparent",
  "from-violet-500/20 via-transparent to-transparent",
  "from-emerald-500/20 via-transparent to-transparent",
  "from-amber-500/20 via-transparent to-transparent",
];

export const PRESENTATION_SHORTCUTS = [
  ["← / →", "Previous / next slide"],
  ["Space", "Next slide"],
  ["F", "Fullscreen"],
  ["O", "Slide overview"],
  ["N", "Presenter notes"],
  ["P", "Pointer"],
] as const;

export const PRESENTATION_AUTOPLAY_MS = 9000;
