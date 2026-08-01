import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import markdoc from "@astrojs/markdoc"
import keystatic from "@keystatic/astro"
import AutoImport from "unplugin-auto-import/vite"
import tailwindcss from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import yaml from "@rollup/plugin-yaml"

import vercel from "@astrojs/vercel"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://edle-pferde.com",
  integrations: [react(), markdoc(), keystatic(), mdx(), sitemap()],

  vite: {
    plugins: [
      tailwindcss(),
      yaml(),
      AutoImport({
        dirs: ["./src/composables"],
        dts: "./auto-imports.d.ts",
      }),
    ],
    build: {
      chunkSizeWarningLimit: 3000,
    },
  },

  adapter: vercel(),
})
