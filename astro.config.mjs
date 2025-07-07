// @ts-check
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import min from "astro-min"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://franklinmdev.me",

  // Enable prefetching for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  // Internationalization configuration
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },

  // Integrations - order matters for optimization
  integrations: [
    react(),
    sitemap(),
    // Advanced minification - use default optimized settings
    min(),
  ],

  // Build optimizations
  build: {
    inlineStylesheets: "auto",
    concurrency: 2,
  },

  // Image optimization with latest settings
  image: {
    domains: ["franklinmdev.me"],
    remotePatterns: [{ protocol: "https" }],
  },

  // Vite configuration following current standards
  vite: {
    // Tailwind 4 native support via Vite plugin (recommended approach)
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            framework: ["astro"],
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            if (!assetInfo.names || !assetInfo.names[0])
              return "assets/[name]-[hash][extname]"
            const name = assetInfo.names[0]
            const info = name.split(".")
            const ext = info[info.length - 1]
            if (/\.(css)$/.test(name)) {
              return `assets/css/[name]-[hash].${ext}`
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
              return `assets/img/[name]-[hash].${ext}`
            }
            return `assets/[name]-[hash].${ext}`
          },
        },
      },
    },
    css: {
      devSourcemap: true,
    },
  },

  // Security - CSRF protection enabled by default in v5
  security: {
    checkOrigin: true,
  },

  // HTML compression
  compressHTML: true,
})
