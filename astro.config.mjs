import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // グローバルCSSで管理するため
    }),
  ],
  output: 'static',
  build: {
    assets: 'assets',
  },
});


