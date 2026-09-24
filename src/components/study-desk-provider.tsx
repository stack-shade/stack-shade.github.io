"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PomodoroMode = "focus" | "break";

export interface PomodoroState {
  mode: PomodoroMode;
  focusMinutes: number;
  remaining: number;
  running: boolean;
  endAt: number | null;
  courseSlug: string | null;
}

interface StudyDeskContextValue {
  pomodoro: PomodoroState;
  togglePomodoro: (courseSlug?: string | null) => void;
  setPomodoroPreset: (minutes: number, courseSlug?: string | null) => void;
  resetPomodoro: () => void;
}

const STORAGE_KEY = "ss-study-pomodoro";
const DAY = 24 * 60 * 60 * 1000;

const DEFAULT_POMODORO: PomodoroState = {
  mode: "focus",
  focusMinutes: 25,
  remaining: 25 * 60,
  running: false,
  endAt: null,
  courseSlug: null,
};

const StudyDeskContext = createContext<StudyDeskContextValue | null>(null);

function localDayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function readState(): PomodoroState {
  if (typeof window === "undefined") return DEFAULT_POMODORO;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_POMODORO;

    const parsed = JSON.parse(raw) as Partial<PomodoroState>;
    const mode = parsed.mode === "break" ? "break" : "focus";
    const focusMinutes =
      typeof parsed.focusMinutes === "number" && Number.isFinite(parsed.focusMinutes)
        ? parsed.focusMinutes === 50
          ? 50
          : 25
        : 25;
    const focusDuration = focusMinutes * 60;
    const breakDuration = focusMinutes === 50 ? 10 * 60 : 5 * 60;
    const duration = mode === "focus" ? focusDuration : breakDuration;
    let remaining =
      typeof parsed.remaining === "number" && Number.isFinite(parsed.remaining)
        ? Math.max(0, Math.round(parsed.remaining))
        : duration;

    const running = parsed.running === true && typeof parsed.endAt === "number";
    if (running) {
      remaining = Math.max(0, Math.ceil((parsed.endAt! - Date.now()) / 1000));
    }

    return {
      mode,
      focusMinutes,
      remaining: Math.min(duration, remaining),
      running,
      endAt: running ? parsed.endAt! : null,
      courseSlug: typeof parsed.courseSlug === "string" ? parsed.courseSlug : null,
    };
  } catch {
    return DEFAULT_POMODORO;
  }
}

function persistState(state: PomodoroState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("ss-pomodoro-change"));
  } catch {
    // Local-only timer state is best-effort.
  }
}

function deskStorageKey(slug: string) {
  return "ss-study-desk-" + slug;
}

function recordCompletedFocusSession(slug: string | null) {
  if (typeof window === "undefined" || !slug) return;

  try {
    const key = deskStorageKey(slug);
    const raw = window.localStorage.getItem(key);
    const current = raw ? JSON.parse(raw) as {
      notes?: string;
      dailyTarget?: number;
      focusSessionsByDay?: Record<string, number>;
    } : {};

    const day = localDayKey();
    const next = {
      notes: typeof current.notes === "string" ? current.notes : "",
      dailyTarget:
        typeof current.dailyTarget === "number" && Number.isFinite(current.dailyTarget)
          ? current.dailyTarget
          : 3,
      focusSessionsByDay: {
        ...(current.focusSessionsByDay ?? {}),
        [day]: (current.focusSessionsByDay?.[day] ?? 0) + 1,
      },
    };

    window.localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(
      new CustomEvent("ss-study-desk-change", { detail: { slug } }),
    );
  } catch {
    // Best-effort local analytics for study sessions.
  }
}

export function formatPomodoroClock(seconds: number) {
  const mins = Math.floor(Math.max(0, seconds) / 60).toString().padStart(2, "0");
  const secs = Math.floor(Math.max(0, seconds) % 60).toString().padStart(2, "0");
  return mins + ":" + secs;
}

export function StudyDeskProvider({ children }: { children: React.ReactNode }) {
  const [pomodoro, setPomodoro] = useState<PomodoroState>(DEFAULT_POMODORO);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPomodoro(readState());
    setHydrated(true);

    const sync = () => setPomodoro(readState());
    window.addEventListener("storage", sync);
    window.addEventListener("ss-pomodoro-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ss-pomodoro-change", sync);
    };
  }, []);

  const completeBlock = useCallback((state: PomodoroState) => {
    if (state.mode === "focus") {
      recordCompletedFocusSession(state.courseSlug);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.([120, 80, 120]);
      }

      const next: PomodoroState = {
        ...state,
        mode: "break",
        remaining: state.focusMinutes === 50 ? 10 * 60 : 5 * 60,
        running: false,
        endAt: null,
      };
      setPomodoro(next);
      persistState(next);
      return;
    }

    const next: PomodoroState = {
      ...state,
      mode: "focus",
      remaining: state.focusMinutes * 60,
      running: false,
      endAt: null,
    };
    setPomodoro(next);
    persistState(next);
  }, []);

  useEffect(() => {
    if (!hydrated || !pomodoro.running || !pomodoro.endAt) return;

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((pomodoro.endAt! - Date.now()) / 1000));
      if (remaining <= 0) {
        completeBlock(pomodoro);
        return;
      }

      setPomodoro((current) => {
        if (!current.running || current.endAt !== pomodoro.endAt) return current;
        return { ...current, remaining };
      });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [completeBlock, hydrated, pomodoro.endAt, pomodoro.running]);

  const togglePomodoro = useCallback((courseSlug?: string | null) => {
    if (pomodoro.running && pomodoro.endAt) {
      const remaining = Math.max(0, Math.ceil((pomodoro.endAt - Date.now()) / 1000));
      const next = { ...pomodoro, remaining, running: false, endAt: null };
      setPomodoro(next);
      persistState(next);
      return;
    }

    const slug = courseSlug ?? pomodoro.courseSlug ?? null;
    const remaining = Math.max(1, pomodoro.remaining);
    const next = {
      ...pomodoro,
      courseSlug: slug,
      running: true,
      endAt: Date.now() + remaining * 1000,
    };
    setPomodoro(next);
    persistState(next);
  }, [pomodoro]);

  const setPomodoroPreset = useCallback(
    (minutes: number, courseSlug?: string | null) => {
      if (pomodoro.running) return;

      const focusMinutes = minutes === 50 ? 50 : 25;
      const next = {
        ...pomodoro,
        courseSlug: courseSlug ?? pomodoro.courseSlug ?? null,
        mode: "focus" as const,
        focusMinutes,
        remaining: focusMinutes * 60,
        running: false,
        endAt: null,
      };
      setPomodoro(next);
      persistState(next);
    },
    [pomodoro],
  );

  const resetPomodoro = useCallback(() => {
    const next = {
      ...pomodoro,
      mode: "focus" as const,
      remaining: pomodoro.focusMinutes * 60,
      running: false,
      endAt: null,
    };
    setPomodoro(next);
    persistState(next);
  }, [pomodoro]);

  const value = useMemo(
    () => ({
      pomodoro,
      togglePomodoro,
      setPomodoroPreset,
      resetPomodoro,
    }),
    [pomodoro, resetPomodoro, setPomodoroPreset, togglePomodoro],
  );

  return (
    <StudyDeskContext.Provider value={value}>
      {children}
    </StudyDeskContext.Provider>
  );
}

export function useStudyDesk() {
  const value = useContext(StudyDeskContext);
  if (!value) {
    throw new Error("useStudyDesk must be used inside StudyDeskProvider");
  }
  return value;
}
