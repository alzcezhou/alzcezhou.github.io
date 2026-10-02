import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/work",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    year: z.string(),
    role: z.string(),
    category: z.string(),
    description: z.string(),
    order: z.number(),
    cover: z.string().optional(), // path in public/, e.g. "/images/work/haven-cover.jpg"
    coverAlt: z.string(),
    /** Short labels shown as black pills in the case study header */
    tags: z.array(z.string()).optional(),
    /** e.g. "3 months", "36 hours" — shown under tags in the header */
    timeline: z.string().optional(),
    /** Lines under “Team” in the row below the header */
    team: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()),
    /** Lines under “Tools” in the row below the header */
    tools: z.array(z.string()).optional(),
    results: z.array(z.string()),
    /** "template": the scannable case study template (hero + TL;DR + sticky TOC) */
    variant: z.enum(["legacy", "template"]).default("legacy"),
    /** Template only: VT323 line above the headline, e.g. "CASE 02 / SKIPLEGAL · …" */
    eyebrow: z.string().optional(),
    /** Template only: the hero H1 (falls back to title) */
    headline: z.string().optional(),
    /** Template only: TL;DR card rows */
    tldr: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    /** Template only: highlighted TL;DR "Result" row, e.g. { stat: "+37%", text: "trust rating" } */
    tldrResult: z.object({ stat: z.string(), text: z.string() }).optional(),
    /** Template only: sticky TOC entries; ids must match the section ids in the MDX */
    toc: z.array(z.object({ id: z.string(), label: z.string() })).optional(),
    /** Template only: per-page accent override, e.g. { color: "#4a6b50", light: "#bcd2b8", ring: "rgba(74,107,80,.25)" } */
    accent: z.object({ color: z.string(), light: z.string().optional(), ring: z.string().optional() }).optional(),
  }),
});

export const collections = { work };
