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
  }),
});

export const collections = { work };
