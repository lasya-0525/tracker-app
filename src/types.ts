export interface LinkedTask {
  label: string;
  url?: string;
}

export interface WeekTheme {
  weekNumber: number;
  dateRange: string;
  dsaProblems: LinkedTask[]; // Mon–Fri named items; may be fewer than 5 in grind weeks
  dsaSaturday: string; // Saturday DSA activity (review/mock)
  aiTopic: string;
  aiResource?: LinkedTask;
  sdTopic: string;
  dataTopic: string;
  dataResource?: LinkedTask;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  isRestDay: boolean;
  weekNumber: number;
  dayNumber: number; // 1-111 overall program day count
  totalDays: number;
  weekdayIndex: number; // 0=Mon .. 5=Sat, 6=Sun
  trait: string;
  dsa?: { title: string; url?: string; isReview: boolean };
  ai?: { weekTopic: string; dailyFocus: string; resource?: LinkedTask };
  sd?: { weekTopic: string; dailyFocus: string };
  data?: { weekTopic: string; dailyFocus: string; resource?: LinkedTask };
}
