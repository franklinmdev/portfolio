import { agentProfile } from "@/lib/agent-profile"
import type { APIRoute } from "astro"

// Serves /llms.txt: an agent-readable summary of the site, generated from the
// shared agent profile so it never drifts from the WebMCP tools.

const { name, role, location, summary, howIWork, skills, projects, contact } =
  agentProfile

const contactLabels: Record<string, string> = {
  site: "Site",
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
}

const body = `# ${name}

> ${summary}

${role}, based in ${location}.

## How I work
${howIWork.map((line) => `- ${line}`).join("\n")}

## Skills
${Object.entries(skills)
  .map(([group, items]) => `- ${group}: ${items.join(", ")}`)
  .join("\n")}

## Projects
${projects.map((p) => `- [${p.name}](${p.url}): ${p.description}`).join("\n")}

## Contact
${Object.entries(contact)
  .map(([key, value]) => `- ${contactLabels[key] ?? key}: ${value}`)
  .join("\n")}
`

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
