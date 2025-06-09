import {defineConfig} from "vite";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: true,
  },
  build: {
    target: "es2020",
    minify: "terser",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
