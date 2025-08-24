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
  build: {
    rollupOptions: {
      // Force Rollup to bundle this instead of skipping it
      dedupe: ["@supabase/supabase-js"],
    },
    commonjsOptions: {
      include: [/packages\/shared/, /node_modules/],
    },
  },
});
