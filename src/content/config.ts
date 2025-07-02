import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

// Define the projects collection with i18n support
// Updated to support nested language directories
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.array(z.string()).or(z.string()),
    challenges: z.string(),
    learnings: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    liveUrl: z.string(),
    githubUrl: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    publishDate: z.coerce.date(),
    icon: z.string(),
  }),
})

export const collections = { projects }
