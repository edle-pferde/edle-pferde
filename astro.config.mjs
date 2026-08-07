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
      rolldownOptions: {
        output: {
          // The Keystatic admin UI (only loaded on /keystatic) would otherwise be
          // bundled into a single ~2.8 MB chunk. Split it into smaller pieces so
          // every chunk stays under Vite's 500 kB warning threshold.
          codeSplitting: {
            groups: [
              {
                name: "keystatic",
                test: /node_modules\/(@keystatic|@keystar)\//,
                maxSize: 490 * 1024,
              },
            ],
          },
        },
      },
    },
  },

  adapter: vercel(),
})
