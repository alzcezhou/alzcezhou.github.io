import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alzcezhou.github.io",
  /**
   * If GitHub Pages serves this repo at https://USER.github.io/REPO_NAME/ (project site),
   * set base so routes resolve (e.g. base: "/REPO_NAME/" — keep leading and trailing slashes).
   * User/org site at https://USER.github.io/ should leave base unset (default "/").
   */
  // base: "/your-repo-name",
  output: "static",
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
