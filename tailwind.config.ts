import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#faf6ec",
        plum: "#8c3f63",
        ink: "#2b211c",
        gold: "#c9a227",
        done: "#7fa37f",
        stripea: "#f3e1e2",
        stripeb: "#ddb9bf",
      },
      fontFamily: {
        script: ["Caveat", "cursive"],
        heading: ["Playfair Display", "serif"],
        body: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
