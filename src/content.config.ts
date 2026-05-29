import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.array(z.string()).or(z.string()),
      challenges: z.string(),
      learnings: z.string(),
      image: image(),
      liveUrl: z.string(),
      githubUrl: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean().default(false),
      publishDate: z.coerce.date(),
      iconAsset: image().optional(),
    }),
})

export const collections = { projects }
