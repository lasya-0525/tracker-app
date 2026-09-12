import { WEEKS, DAILY_FOCUS_ROTATION, TRAIT_ROTATION, PROGRAM_START, PROGRAM_END } from "../data/roadmap";
import type { DayPlan } from "../types";

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function formatDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const START = parseLocalDate(PROGRAM_START);
const END = parseLocalDate(PROGRAM_END);
export const TOTAL_DAYS = Math.round((END.getTime() - START.getTime()) / 86400000) + 1;

/**
 * Resolves the full plan for a given date.
 * weekdayIndex: 0=Mon .. 5=Sat, 6=Sun (rest day).
 */
export function getDayPlan(date: Date): DayPlan {
  const day = startOfDay(date);
  const diffDays = Math.round((day.getTime() - START.getTime()) / 86400000);
  const dayNumber = Math.min(Math.max(diffDays + 1, 1), TOTAL_DAYS);

  const jsDay = day.getDay(); // Sun=0 .. Sat=6
  const weekdayIndex = (jsDay + 6) % 7; // Mon=0 .. Sun=6
  const isRestDay = weekdayIndex === 6;

  const weekNumber = Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), WEEKS.length);
  const week = WEEKS[weekNumber - 1];
  const trait = TRAIT_ROTATION[Math.min(weekdayIndex, 5)];

  const base: DayPlan = {
    date: formatDateKey(day),
    isRestDay,
    weekNumber,
    dayNumber,
    totalDays: TOTAL_DAYS,
    weekdayIndex,
    trait,
  };

  if (isRestDay || !week) return base;

  // DSA: use the named problem for this weekday if it exists, otherwise fall back
  // to the week's Saturday/review activity for every day beyond the list.
  const dsaEntry =
    weekdayIndex < week.dsaProblems.length
      ? { title: week.dsaProblems[weekdayIndex].label, url: week.dsaProblems[weekdayIndex].url, isReview: false }
      : { title: week.dsaSaturday, url: undefined, isReview: true };

  const focus = DAILY_FOCUS_ROTATION[Math.min(weekdayIndex, 5)];

  return {
    ...base,
    dsa: dsaEntry,
    ai: { weekTopic: week.aiTopic, dailyFocus: focus, resource: week.aiResource },
    sd: { weekTopic: week.sdTopic, dailyFocus: focus },
    data: { weekTopic: week.dataTopic, dailyFocus: focus, resource: week.dataResource },
  };
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
