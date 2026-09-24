"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState } from "react";
import {
  Check,
  ChevronDown,
  Clock3,
  Download,
  ExternalLink,
  FileUp,
  Grid3X3,
  HelpCircle,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  PencilLine,
  RotateCcw,
  Save,
  Share2,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false },
);

type TemplateId = "flow" | "system" | "array" | "blank" | "timeline";

type Template = {
  id: TemplateId;
  label: string;
  description: string;
  labels: string[];
};

type SceneElements = ReturnType<ExcalidrawImperativeAPI["getSceneElements"]>;

const TEMPLATES: Template[] = [
  {
    id: "flow",
    label: "4-stage flow",
    description: "Input → transform → observe → transfer.",
    labels: ["Input", "Transform", "Observe", "Transfer"],
  },
  {
    id: "system",
    label: "System design",
    description: "Client → services → data → feedback.",
    labels: ["Client", "Service", "Data", "Feedback"],
  },
  {
    id: "array",
    label: "DSA pattern",
    description: "State → pointer → window → result.",
    labels: ["State", "Pointer", "Window", "Result"],
  },
  {
    id: "timeline",
    label: "Timeline",
    description: "Event → decision → action → outcome.",
    labels: ["Event", "Decision", "Action", "Outcome"],
  },
  {
    id: "blank",
    label: "Blank canvas",
    description: "Start from zero.",
    labels: [],
  },
];

const STORAGE_PREFIX = "stackshade-sketchflow-v2:";
const FOCUS_LENGTHS = [25, 50];

function storageKey(topic: string) {
  return STORAGE_PREFIX + topic.toLowerCase().trim().slice(0, 120);
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const secs = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return mins + ":" + secs;
}

function templateSkeletons(template: Template, dark: boolean): unknown[] {
  const stroke = dark ? "#d7d0c7" : "#474039";
  const fill = dark ? "#15181d" : "#f1ede7";
  const text = dark ? "#f5f2ed" : "#29251f";
  const accent = dark ? "#a78bfa" : "#6d4db1";
  const blocks = template.labels;
  const gap = 90;
  const width = 220;
  const height = 115;
  const startX = 90;
  const y = 170;

  if (!blocks.length) return [];

  const result: unknown[] = [];
  blocks.forEach((label, index) => {
    const x = startX + index * (width + gap);
    result.push(
      {
        type: "rectangle",
        x,
        y,
        width,
        height,
        strokeColor: stroke,
        backgroundColor: fill,
        roughness: 1,
        roundness: { type: 3 },
      },
      {
        type: "text",
        x: x + 20,
        y: y + 42,
        text: label,
        fontSize: 22,
        strokeColor: text,
        roughness: 0,
      },
    );

    if (index < blocks.length - 1) {
      result.push({
        type: "arrow",
        x: x + width,
        y: y + height / 2,
        points: [[0, 0], [gap, 0]],
        endArrowhead: "arrow",
        strokeColor: accent,
        roughness: 1,
      });
    }
  });

  return result;
}

export default function SketchFlowStudio({
  initialTopic,
  initialPrompt,
}: {
  initialTopic: string;
  initialPrompt: string;
}) {
  const [topic, setTopic] = useState(initialTopic || "Core concept");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [templateId, setTemplateId] = useState<TemplateId>("flow");
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);
  const [dark, setDark] = useState(true);
  const [grid, setGrid] = useState(false);
  const [zen, setZen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [help, setHelp] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [focusLength, setFocusLength] = useState(25);
  const [focusRemaining, setFocusRemaining] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);
  const [focusComplete, setFocusComplete] = useState(false);
  const [importing, setImporting] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const seededRef = useRef(false);
  const lastElementsRef = useRef<SceneElements>([]);
  const activeTopicRef = useRef(topic);

  activeTopicRef.current = topic;

  const template = useMemo(
    () => TEMPLATES.find((item) => item.id === templateId) ?? TEMPLATES[0],
    [templateId],
  );

  const persist = useCallback((elements: SceneElements) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        storageKey(activeTopicRef.current),
        JSON.stringify({
          version: 2,
          elements,
          updatedAt: Date.now(),
        }),
      );
      setSavedAt(Date.now());
      setDirty(false);
    } catch {
      // Local storage is best-effort.
    }
  }, []);

  const seedTemplate = useCallback(
    async (selected: Template = template, replace = true) => {
      if (!api) return;
      const { convertToExcalidrawElements } = await import("@excalidraw/excalidraw");
      const skeletons = templateSkeletons(selected, dark);
      const elements = convertToExcalidrawElements(skeletons as Parameters<typeof convertToExcalidrawElements>[0]);
      if (replace) {
        api.updateScene({ elements });
      } else {
        api.updateScene({
          elements: [...api.getSceneElements(), ...elements],
        });
      }
      if (elements.length) {
        api.scrollToContent(elements, { fitToContent: true, animate: false });
      }
      lastElementsRef.current = elements;
      persist(elements);
    },
    [api, dark, persist, template],
  );

  useEffect(() => {
    const syncTheme = () =>
      setDark(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api || seededRef.current) return;
    seededRef.current = true;

    void (async () => {
      let restored: SceneElements | null = null;
      try {
        const raw = window.localStorage.getItem(storageKey(topic));
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.elements)) {
            restored = parsed.elements as SceneElements;
            setSavedAt(typeof parsed.updatedAt === "number" ? parsed.updatedAt : null);
          }
        }
      } catch {
        restored = null;
      }

      if (restored) {
        api.updateScene({ elements: restored });
        lastElementsRef.current = restored;
        return;
      }

      await seedTemplate(template, true);
    })();
  }, [api, seedTemplate, template, topic]);

  useEffect(() => {
    if (!focusRunning) return;
    const timer = window.setInterval(() => {
      setFocusRemaining((current) => {
        if (current <= 1) {
          setFocusRunning(false);
          setFocusComplete(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [focusRunning]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSessionSeconds((current) => current + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onFullscreen = () =>
      setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  useEffect(() => {
    if (!api) return;
    const listener = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }

      if (event.key === "?") setHelp((value) => !value);
      if (event.key.toLowerCase() === "g") setGrid((value) => !value);
      if (event.key.toLowerCase() === "z") setZen((value) => !value);
      if (event.key.toLowerCase() === "f") void toggleFullscreen();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [api]);

  const onChange = useCallback(
    (elements: SceneElements) => {
      lastElementsRef.current = elements;
      setDirty(true);

      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(() => {
        persist(elements);
      }, 900);
    },
    [persist],
  );

  useEffect(() => {
    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!shellRef.current) return;
    if (document.fullscreenElement === shellRef.current) {
      await document.exitFullscreen();
    } else {
      await shellRef.current.requestFullscreen();
    }
  };

  const manualSave = () => persist(api?.getSceneElements() ?? lastElementsRef.current);

  const restoreLastSave = () => {
    if (!api || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey(topic));
      const parsed = raw ? JSON.parse(raw) : null;
      if (!Array.isArray(parsed?.elements)) {
        window.alert("No saved drawing was found for this topic.");
        return;
      }
      api.updateScene({ elements: parsed.elements });
      lastElementsRef.current = parsed.elements as SceneElements;
      setSavedAt(typeof parsed.updatedAt === "number" ? parsed.updatedAt : null);
      setDirty(false);
    } catch {
      window.alert("The saved drawing could not be restored.");
    }
  };

  const reset = async (hard = false) => {
    if (!api) return;
    if (!hard && !window.confirm("Reset this canvas to the selected starter?")) return;
    await seedTemplate(template, true);
  };

  const clear = () => {
    if (!api) return;
    if (!window.confirm("Clear the entire canvas? This will replace the current local save.")) return;
    api.resetScene();
    persist([]);
  };

  const handleExport = () => {
    const payload = {
      type: "excalidraw",
      version: 2,
      source: "https://stack-shade.github.io/practice/sketchflow",
      topic,
      prompt,
      elements: api?.getSceneElements() ?? lastElementsRef.current,
      appState: {
        gridSize: grid ? 20 : null,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") +
      ".excalidraw.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file?: File) => {
    if (!file || !api) return;
    if (file.size > 5 * 1024 * 1024) {
      window.alert("That drawing is larger than 5 MB and cannot be imported.");
      return;
    }
    setImporting(true);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result ?? ""));
        if (!Array.isArray(parsed?.elements)) throw new Error("Invalid drawing");
        api.updateScene({ elements: parsed.elements });
        persist(parsed.elements);
      } catch {
        window.alert("That file does not contain a valid Excalidraw scene.");
      } finally {
        setImporting(false);
      }
    };
    reader.onerror = () => setImporting(false);
    reader.readAsText(file);
  };

  const changeFocusLength = (minutes: number) => {
    if (focusRunning) return;
    setFocusLength(minutes);
    setFocusRemaining(minutes * 60);
    setFocusComplete(false);
  };

  const toggleFocus = () => {
    if (focusRemaining === 0) {
      setFocusRemaining(focusLength * 60);
      setFocusComplete(false);
    }
    setFocusRunning((value) => !value);
  };

  const resetFocus = () => {
    setFocusRunning(false);
    setFocusRemaining(focusLength * 60);
    setFocusComplete(false);
  };

  const share = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("topic", topic);
    url.searchParams.set("prompt", prompt);

    try {
      if (navigator.share) {
        await navigator.share({ title: topic + " — SketchFlow", text: prompt, url: url.toString() });
        return;
      }
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url.toString());
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("SketchFlow share failed:", error);
      window.alert("Could not share the practice link. Please copy the page URL manually.");
    }
  };

  const applyTemplate = async (id: TemplateId) => {
    setTemplateId(id);
    const next = TEMPLATES.find((item) => item.id === id) ?? TEMPLATES[0];
    await seedTemplate(next, true);
  };

  const focusProgress =
    focusLength * 60 === 0
      ? 0
      : Math.round(((focusLength * 60 - focusRemaining) / (focusLength * 60)) * 100);

  return (
    <main className={"sketchflow-studio " + (zen ? "is-zen" : "")}>
      <div className="sketchflow-studio-shell">
        {!zen && (
          <header className="sketchflow-studio-header">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/courses" className="sketchflow-back-link">
                  ← Courses
                </Link>
                <span className="sketchflow-header-divider">/</span>
                <span className="lesson-kicker">SKETCHFLOW</span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <PencilLine className="mb-1 h-5 w-5 shrink-0" />
                <input
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="sketchflow-title-input"
                  aria-label="Practice topic"
                />
              </div>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="sketchflow-prompt-input"
                rows={2}
                aria-label="Practice prompt"
              />
            </div>

            <div className="sketchflow-header-stats">
              <div>
                <span>SESSION</span>
                <strong>{formatTime(sessionSeconds)}</strong>
              </div>
              <div>
                <span>STATE</span>
                <strong>{dirty ? "Unsaved" : "Saved"}</strong>
              </div>
            </div>
          </header>
        )}

        <div className="sketchflow-commandbar">
          <div className="sketchflow-command-group">
            <label className="sketchflow-select">
              <Sparkles className="h-3.5 w-3.5" />
              <select
                value={templateId}
                onChange={(event) => void applyTemplate(event.target.value as TemplateId)}
                aria-label="Choose starter template"
              >
                {TEMPLATES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5" />
            </label>

            <button type="button" onClick={manualSave} className="sketchflow-tool-btn" title="Save now">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button type="button" onClick={handleExport} className="sketchflow-tool-btn" title="Export drawing">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="sketchflow-tool-btn" title="Import drawing">
              <FileUp className="h-4 w-4" />
              <span>{importing ? "Loading…" : "Import"}</span>
            </button>
            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept=".json,.excalidraw,application/json"
              onChange={(event) => {
                handleImport(event.target.files?.[0]);
                event.currentTarget.value = "";
              }}
            />
          </div>

          <div className="sketchflow-command-group">
            <button type="button" onClick={() => setGrid((value) => !value)} className={"sketchflow-icon-btn " + (grid ? "is-active" : "")} title="Toggle grid">
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => setZen((value) => !value)} className={"sketchflow-icon-btn " + (zen ? "is-active" : "")} title="Zen mode">
              {zen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => void toggleFullscreen()} className="sketchflow-icon-btn" title="Fullscreen">
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => setHelp((value) => !value)} className={"sketchflow-icon-btn " + (help ? "is-active" : "")} title="Keyboard shortcuts">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="sketchflow-workspace">
          {!zen && (
            <aside className="sketchflow-side-panel">
              <section className="sketchflow-panel">
                <div className="sketchflow-panel-title">Starter</div>
                <div className="sketchflow-template-list">
                  {TEMPLATES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => void applyTemplate(item.id)}
                      className={"sketchflow-template " + (templateId === item.id ? "is-selected" : "")}
                    >
                      <span className="sketchflow-template-icon">{item.id === "blank" ? "×" : "↗"}</span>
                      <span className="min-w-0">
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>
                      {templateId === item.id && <Check className="h-3.5 w-3.5 shrink-0" />}
                    </button>
                  ))}
                </div>
              </section>

              <section className="sketchflow-panel">
                <div className="sketchflow-panel-title">Focus block</div>
                <div className="sketchflow-timer">
                  <div className="sketchflow-timer-time">{formatTime(focusRemaining)}</div>
                  <div className="sketchflow-timer-progress">
                    <span style={{ width: Math.max(0, Math.min(100, focusProgress)) + "%" }} />
                  </div>
                  <div className="sketchflow-timer-presets">
                    {FOCUS_LENGTHS.map((minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        disabled={focusRunning}
                        onClick={() => changeFocusLength(minutes)}
                        className={focusLength === minutes ? "is-selected" : ""}
                      >
                        {minutes}m
                      </button>
                    ))}
                  </div>
                  <div className="sketchflow-timer-actions">
                    <button type="button" onClick={toggleFocus} className="sketchflow-timer-primary">
                      <Clock3 className="h-3.5 w-3.5" />
                      {focusRunning ? "Pause" : focusComplete ? "Restart" : "Start"}
                    </button>
                    <button type="button" onClick={resetFocus} className="sketchflow-timer-reset" title="Reset focus timer">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {focusComplete && <p className="sketchflow-timer-complete">Focus block complete. Step away, then review.</p>}
                </div>
              </section>

              <section className="sketchflow-panel">
                <div className="sketchflow-panel-title">Actions</div>
                <div className="sketchflow-panel-actions">
                  <button type="button" onClick={() => void reset()}><RotateCcw /> Reset starter</button>
                  <button type="button" onClick={restoreLastSave}><Save /> Restore saved</button>
                  <button type="button" onClick={clear}><Trash2 /> Clear canvas</button>
                  <button type="button" onClick={() => void share().catch(() => {})}><Share2 /> Share practice link</button>
                  <a href={"/courses"}><ExternalLink /> Course library</a>
                </div>
              </section>
            </aside>
          )}

          <section className="sketchflow-canvas-column">
            <div ref={shellRef} className={"sketchflow-canvas-shell " + (fullscreen ? "is-fullscreen" : "")}>
              <div className="sketchflow-canvas-topline">
                <div className="sketchflow-canvas-topline-copy">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{template.label}</span>
                  <span className="text-muted-foreground">· {template.description}</span>
                </div>
                  <div className="sketchflow-canvas-topline-actions">
                  <span>Canvas tools</span>
                </div>
              </div>
              <div className="sketchflow-canvas">
                <Excalidraw
                  theme={dark ? "dark" : "light"}
                  gridModeEnabled={grid}
                  zenModeEnabled={false}
                  initialData={{ elements: [], appState: { viewBackgroundColor: dark ? "#090a0c" : "#fcfbf8", theme: dark ? "dark" : "light" } }}
                  excalidrawAPI={setApi}
                  onChange={(elements) => onChange(elements)}
                  UIOptions={{
                    canvasActions: {
                      saveToActiveFile: false,
                      loadScene: false,
                      export: false,
                      clearCanvas: false,
                    },
                  }}
                />
              </div>
            </div>

            {!zen && (
              <div className="sketchflow-bottom-strip">
                <div><strong>Draw first.</strong> Then explain the invariant, failure mode, and trade-off.</div>
                <div className="sketchflow-bottom-actions">
                  <button type="button" onClick={manualSave}><Save className="h-3.5 w-3.5" /> Save</button>
                  <button type="button" onClick={handleExport}><Download className="h-3.5 w-3.5" /> Export</button>
                  <span>{savedAt ? "Saved " + new Date(savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Autosave on"}</span>
                </div>
              </div>
            )}
          </section>
        </div>

        {help && !zen && (
          <section className="sketchflow-help">
            <div>
              <HelpCircle className="h-4 w-4" />
              <strong>Shortcuts</strong>
            </div>
            <span><kbd>G</kbd> grid</span>
            <span><kbd>Z</kbd> zen</span>
            <span><kbd>F</kbd> fullscreen</span>
            <span><kbd>?</kbd> help</span>
            <span>Canvas shortcuts remain available from Excalidraw.</span>
          </section>
        )}
      </div>
    </main>
  );
}
