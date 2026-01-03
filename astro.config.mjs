import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // グローバルCSSで管理するため
    }),
  ],
  markdown: {
    rehypePlugins: [
      () => {
        return (tree) => {
          const visit = (node) => {
            if (!node || typeof node !== "object") return;

            if (node.type === "element" && node.tagName === "img") {
              node.properties ||= {};
              node.properties.loading ||= "lazy";
              node.properties.decoding ||= "async";
            }

            const children = node.children;
            if (Array.isArray(children)) {
              children.forEach(visit);
            }
          };

          visit(tree);
        };
      },
    ],
  },
  output: "static",
  build: {
    assets: "assets",
  },
});
