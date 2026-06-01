import { agentProfile } from "@/lib/agent-profile"
import { useEffect } from "react"

// Exposes read-only portfolio tools to in-browser AI agents via the
// experimental WebMCP API (navigator.modelContext). It is a no-op everywhere
// the API is absent, which is almost everywhere today, and renders nothing.

interface ToolResult {
  readonly content: readonly { readonly type: "text"; readonly text: string }[]
}

interface ModelContextTool {
  readonly name: string
  readonly description: string
  readonly inputSchema: object
  readonly execute: (input: unknown) => Promise<ToolResult>
}

interface ModelContext {
  readonly registerTool?: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal }
  ) => void
  readonly provideContext?: (ctx: { tools: ModelContextTool[] }) => void
}

const asText = (data: unknown): ToolResult => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
})

const noArgs = { type: "object", properties: {} }

const tools: ModelContextTool[] = [
  {
    name: "get_profile",
    description:
      "Get Franklin Martinez's professional profile: role, location, a short summary, and how he works with AI.",
    inputSchema: noArgs,
    execute: async () =>
      asText({
        name: agentProfile.name,
        role: agentProfile.role,
        location: agentProfile.location,
        summary: agentProfile.summary,
        howIWork: agentProfile.howIWork,
      }),
  },
  {
    name: "list_projects",
    description: "List Franklin Martinez's selected projects with links.",
    inputSchema: noArgs,
    execute: async () => asText(agentProfile.projects),
  },
  {
    name: "list_skills",
    description: "List Franklin Martinez's technical skills, grouped by area.",
    inputSchema: noArgs,
    execute: async () => asText(agentProfile.skills),
  },
  {
    name: "get_contact",
    description: "Get Franklin Martinez's contact details and social links.",
    inputSchema: noArgs,
    execute: async () => asText(agentProfile.contact),
  },
]

export default function WebMCP() {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext })
      .modelContext
    if (!mc) return

    const controller = new AbortController()
    try {
      if (typeof mc.registerTool === "function") {
        for (const tool of tools) {
          mc.registerTool(tool, { signal: controller.signal })
        }
      } else if (typeof mc.provideContext === "function") {
        mc.provideContext({ tools })
      }
    } catch {
      // Experimental API: never let a shape change break the page.
    }

    return () => controller.abort()
  }, [])

  return null
}
