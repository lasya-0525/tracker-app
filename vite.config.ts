import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: ["es2015", "chrome64", "firefox67", "safari12", "edge79"],
  },
});
