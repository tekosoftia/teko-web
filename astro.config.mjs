import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://tekosoft.io',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
    }),
  ],
  vite: {
    // Pre-bundle the 3D stack at dev-server start so Vite never re-optimizes it
    // mid-session (which made the open page load stale chunks and fall back to CSS).
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
    css: {
      postcss: {
        plugins: [
          (await import('tailwindcss')).default,
          (await import('autoprefixer')).default,
        ],
      },
    },
  },
});
