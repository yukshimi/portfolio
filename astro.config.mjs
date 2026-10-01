import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";

/**
 * Markdown内の画像に遅延読み込み属性を付与する hast プラグイン
 */
const lazyImages = {
  name: "lazy-images",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const props = node.properties ?? {};
      if (!props.loading) ctx.setProperty(node, "loading", "lazy");
      if (!props.decoding) ctx.setProperty(node, "decoding", "async");
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio-3ws.pages.dev",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({ hastPlugins: [lazyImages] }),
  },
  output: "static",
  build: {
    assets: "assets",
  },
});
