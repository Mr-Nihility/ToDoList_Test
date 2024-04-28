import react from "@vitejs/plugin-react";
import sass from "sass";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/ToDoList_Test/",
  plugins: [
    svgr(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "./src/assets/**",
          dest: "./assets",
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
