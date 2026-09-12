import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDayPlan, addDays } from "../lib/dayPlan";
import { PROGRAM_START } from "../data/roadmap";
import Sticker from "./Sticker";
import RestDay from "./RestDay";

import bowCream from "../assets/stickers/bow-cream.png";
import bowCross from "../assets/stickers/bow-crosstitch.png";
import doodleStars from "../assets/stickers/doodle-stars.png";
import starCluster from "../assets/stickers/star-cluster.png";
import camera from "../assets/stickers/camera-vintage.png";
import headphones from "../assets/stickers/headphones.png";
import cassette from "../assets/stickers/cassette.png";

type Checks = Record<string, boolean>;

interface Item {
  id: string;
  label: string;
  url?: string;
  tag?: string;
}

function loadChecks(dateKey: string): Checks {
  try {
    const raw = localStorage.getItem(`tracker:${dateKey}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveChecks(dateKey: string, checks: Checks) {
  try {
    localStorage.setItem(`tracker:${dateKey}`, JSON.stringify(checks));
  } catch {
    // storage unavailable — fail silently, nothing to persist to
  }
}

export default function DayTracker() {
  const [viewDate, setViewDate] = useState<Date>(() => {
    const today = new Date();
    const [y, m, d] = PROGRAM_START.split("-").map(Number);
    const start = new Date(y, m - 1, d);
    return today < start ? start : today;
  });
  const plan = useMemo(() => getDayPlan(viewDate), [viewDate]);
  const [checks, setChecks] = useState<Checks>(() => loadChecks(plan.date));

  useEffect(() => {
    setChecks(loadChecks(plan.date));
  }, [plan.date]);

  function toggle(id: string) {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecks(plan.date, next);
      return next;
    });
  }

  const items: Item[] = plan.isRestDay
    ? []
    : ([
        { id: "wake", label: "Wake at 6:00, walk till 7:00" },
        { id: "yoga", label: "Yoga, 7:00–7:30" },
        { id: "ready", label: "Ready & out by 8:30" },
        { id: "commute-in", label: "Commute: listen to today's concept" },
        plan.dsa && { id: "dsa", label: plan.dsa.title, url: plan.dsa.url, tag: "DSA" },
        plan.ai && {
          id: "ai",
          label: `${plan.ai.weekTopic} — ${plan.ai.dailyFocus}`,
          url: plan.ai.resource?.url,
          tag: "AI / Agentic",
        },
        plan.sd && { id: "sd", label: `${plan.sd.weekTopic} — ${plan.sd.dailyFocus}`, tag: "System Design" },
        plan.data && {
          id: "data",
          label: `${plan.data.weekTopic} — ${plan.data.dailyFocus}`,
          url: plan.data.resource?.url,
          tag: "Data",
        },
        { id: "network", label: "1 networking action" },
        { id: "dinner", label: "Dinner, water, protein" },
        { id: "journal", label: `Trait today: ${plan.trait}` },
        { id: "sleep", label: "Lights out by 10:30" },
      ].filter(Boolean) as Item[]);

  const doneCount = items.filter((i) => checks[i.id]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div className="stripe-bg min-h-screen w-full flex justify-center py-10 px-4 relative overflow-hidden">
      <Sticker src={starCluster} alt="" className="absolute top-6 left-4 w-20 md:w-28" rotate={-8} />
      <Sticker src={doodleStars} alt="" className="absolute top-10 right-4 w-24 md:w-32" rotate={6} />
      <Sticker
        src={bowCream}
        alt=""
        className="absolute bottom-8 left-6 w-20 md:w-28 hidden sm:block"
        rotate={-10}
      />

      <div className="relative w-full max-w-xl">
        <header className="text-center mb-6">
          <p className="font-script text-4xl text-plum leading-none">
            Day {plan.dayNumber} of {plan.totalDays}
          </p>
          <p className="font-body text-ink/70 text-sm mt-2">
            {viewDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <button onClick={() => setViewDate((d) => addDays(d, -1))} className="nav-btn">
              ← yesterday
            </button>
            <button onClick={() => setViewDate(new Date())} className="nav-btn">
              today
            </button>
            <button onClick={() => setViewDate((d) => addDays(d, 1))} className="nav-btn">
              tomorrow →
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {plan.isRestDay ? (
            <RestDay key="rest" />
          ) : (
            <motion.div
              key={plan.date}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="paper-card relative p-6 md:p-8"
            >
              <Sticker src={bowCross} alt="" className="absolute -top-6 -right-4 w-16 md:w-20" rotate={12} />

              <div className="progress-track mb-2">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${pct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <p className="text-xs text-ink/60 font-body mb-6">
                {doneCount} of {items.length} done today
              </p>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <span
                        onClick={() => toggle(item.id)}
                        className={`checkbox ${checks[item.id] ? "checkbox-done" : ""}`}
                      />
                      <span className="flex-1 font-body text-[15px] leading-snug">
                        {item.tag && <span className="tag">{item.tag} </span>}
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`link ${checks[item.id] ? "line-through text-ink/40" : ""}`}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className={checks[item.id] ? "line-through text-ink/40" : ""}>{item.label}</span>
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center gap-6 mt-8 opacity-80">
                <img src={camera} className="w-10 select-none" alt="" />
                <img src={cassette} className="w-10 select-none" alt="" />
                <img src={headphones} className="w-10 select-none" alt="" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
