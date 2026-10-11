import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      // One paragraph: the abstract under the title and the meta description.
      description: z.string(),
      // Optional: library/utility projects may have no screenshot, and a
      // project may expose only one of live URL / source (private repo, or a
      // live site that has been taken down). Missing links are hidden, not
      // disabled, in the UI.
      image: image().optional(),
      // Optional dark-theme screenshot. When present, the UI swaps to it under
      // the `.dark` class so product shots match the active theme.
      imageDark: image().optional(),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      npmUrl: z.string().optional(),
      tags: z.array(z.string()),
      publishDate: z.coerce.date(),
    }),
})

export const collections = { projects }
