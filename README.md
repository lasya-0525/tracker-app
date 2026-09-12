# Day Tracker

A day-by-day tracker for the Sep 14 → Jan 1 roadmap. Opens straight to **today** and shows only today's tasks — no scrolling through the whole plan. Sundays show a rest-day screen instead of a checklist. Built in the scrapbook/collage style from your reference images: striped background, torn grid-paper card, script + serif type pairing, sticker accents that wiggle on hover.

## Run it standalone

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. `npm run build` produces a static `dist/` you can host anywhere (Vercel, Netlify, GitHub Pages).

## Or drop it into your existing project

If you're already set up with hover.dev components (Tailwind + Framer Motion), you only need:

- `src/components/`, `src/data/`, `src/lib/`, `src/types.ts`, `src/assets/stickers/`
- Merge `tailwind.config.ts`'s `theme.extend` (the `paper` / `plum` / `ink` / `gold` / `done` / `stripea` / `stripeb` colors and `script` / `heading` / `body` fonts) into your own config
- Add the Google Fonts `@import` line from `src/index.css` into your own stylesheet
- `npm install framer-motion` if it isn't already installed

## How the data model works

- `src/data/roadmap.ts` — one entry per week: 4–5 named DSA problems, a Saturday/review activity, and one topic each for AI/Agentic, System Design, and Data.
- `src/lib/dayPlan.ts` — takes any date and resolves it to that day's plan: which week, which weekday (Mon–Sat get tasks, Sunday is `isRestDay`), which DSA problem, and a rotating daily angle (`DAILY_FOCUS_ROTATION`) applied to the week's AI/System-Design/Data topic so each day within a week has a distinct sub-task instead of repeating the same line six times.
- Everything is computed from the real calendar date — nothing is hardcoded per-day, so it stays correct no matter when you open it.

**To edit content:** change `src/data/roadmap.ts` only. To change the daily sub-task pattern (currently: learn → see an example → hands-on → apply → explain out loud → review), edit `DAILY_FOCUS_ROTATION` in the same file.

## Checkbox state

Saved to `localStorage` per date (`tracker:YYYY-MM-DD`), so progress persists across visits without needing a backend.

## Stickers used

Nine assets pulled from your uploaded pack, cropped to their bounding box and resized for web: both bows, the star cluster, the scattered-doodle stars, the vintage camera, cassette, headphones, tulips, and butterfly. Swap any `src/assets/stickers/*.png` for a different one from your original set — the `<Sticker>` component just needs an image path.
