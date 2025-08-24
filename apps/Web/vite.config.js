import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../packages/shared"),
    },
  },
  optimizeDeps: {
    include: ["@supabase/supabase-js"],
  },
  server: {
    fs: {
      // Allow both the app root and shared package
      allow: [
        path.resolve(__dirname, "."), // Apps/Web
        path.resolve(__dirname, "../../packages/shared"),
      ],
    },
  },
});
