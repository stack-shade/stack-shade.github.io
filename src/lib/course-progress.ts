export interface LessonProgress {
  completedAt: number;
  reviews: number;
  lastReviewedAt?: number;
}

export type CourseProgress = Record<string, LessonProgress>;

const DAY = 24 * 60 * 60 * 1000;
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 21, 60];\n\nexport type ReviewRating = "again" | "good" | "easy";

function key(slug: string) {
  return `ss-course-${slug}`;
}

export function loadProgress(slug: string): CourseProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key(slug));
    return raw ? (JSON.parse(raw) as CourseProgress) : {};
  } catch {
    return {};
  }
}

export function saveProgress(slug: string, progress: CourseProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(slug), JSON.stringify(progress));
  } catch {
    // storage full or unavailable — progress stays in memory
  }
}

export function lessonId(moduleIndex: number, lessonIndex: number) {
  return `${moduleIndex}:${lessonIndex}`;
}

export function toggleLesson(
  progress: CourseProgress,
  id: string
): CourseProgress {
  const next = { ...progress };
  if (next[id]) {
    delete next[id];
  } else {
    next[id] = { completedAt: Date.now(), reviews: 0 };
  }
  return next;
}

export function reviewLesson(\n  progress: CourseProgress,\n  id: string,\n  rating: ReviewRating,\n): CourseProgress {\n  const entry = progress[id];\n  if (!entry) return progress;\n\n  const nextReviews =\n    rating === "again"\n      ? 0\n      : Math.min(\n          REVIEW_INTERVALS_DAYS.length,\n          entry.reviews + (rating === "easy" ? 2 : 1),\n        );\n\n  return {\n    ...progress,\n    [id]: { ...entry, reviews: nextReviews, lastReviewedAt: Date.now() },\n  };\n}\n\nexport function markReviewed(progress: CourseProgress, id: string): CourseProgress {
  const entry = progress[id];
  if (!entry) return progress;
  return {
    ...progress,
    [id]: { ...entry, reviews: entry.reviews + 1, lastReviewedAt: Date.now() },
  };
}

function lastEventAt(p: LessonProgress) {
  return p.lastReviewedAt ?? p.completedAt;
}

export function isDue(p: LessonProgress, now = Date.now()): boolean {
  if (p.reviews >= REVIEW_INTERVALS_DAYS.length) return false;
  const interval = REVIEW_INTERVALS_DAYS[p.reviews] * DAY;
  return now - lastEventAt(p) >= interval;
}

export function nextReviewLabel(p: LessonProgress, now = Date.now()): string {
  if (p.reviews >= REVIEW_INTERVALS_DAYS.length) return "Mastered";
  const interval = REVIEW_INTERVALS_DAYS[p.reviews] * DAY;
  const remaining = lastEventAt(p) + interval - now;
  if (remaining <= 0) return "Due now";
  const days = Math.ceil(remaining / DAY);
  return days <= 1 ? "Due tomorrow" : `Due in ${days} days`;
}

export function progressPercent(total: number, done: number): number {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}
