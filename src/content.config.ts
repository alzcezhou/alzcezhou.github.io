import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.string(),
    role: z.string(),
    category: z.string(),
    description: z.string(),
    order: z.number(),
    coverAlt: z.string(),
    responsibilities: z.array(z.string()),
    results: z.array(z.string()),
  }),
});

export const collections = { work };
