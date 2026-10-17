// Single source for the agent-facing snapshot of who Franklin is. Consumed by
// the /llms.txt endpoint and the WebMCP tools island so the two never drift.
// Keep this concise and stable; it is the version an AI agent reads, not a
// marketing page.

export interface AgentProject {
  readonly name: string
  readonly description: string
  readonly url: string
}

export interface AgentProfile {
  readonly name: string
  readonly role: string
  readonly location: string
  readonly summary: string
  readonly howIWork: readonly string[]
  readonly skills: Readonly<Record<string, readonly string[]>>
  readonly projects: readonly AgentProject[]
  readonly contact: Readonly<Record<string, string>>
}

export const agentProfile: AgentProfile = {
  name: "Franklin Martinez",
  role: "AI Engineer",
  location: "Santiago, Dominican Republic",
  summary:
    "Full-stack AI engineer who builds LLM systems and measures them before trusting them: frozen eval sets, measured gates, and benchmarks tied to commits. Also ships complete web applications end to end, from the data model to a UI non-technical users can use. Claude Code, Cursor CLI, Antigravity CLI, and Codex are daily drivers.",
  howIWork: [
    "From PRD to shipped product: written research and a plan go in, a working product and a QA guide come out, with little back-and-forth.",
    "Quality is enforced, not hoped for: codified rules and edit hooks typecheck, lint, and validate every change before it lands.",
    "The right model for the job: deep reasoning models plan, fast models execute, so delivery stays fast without losing rigor.",
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "C#", "Python", "SQL"],
    Frontend: ["React", "Next.js", "Astro", "Tailwind CSS", "shadcn/ui"],
    "Backend & data": [
      "Node.js",
      "NestJS",
      "ASP.NET Core",
      "PostgreSQL",
      "SQL Server",
      "Prisma",
      "Entity Framework",
      "REST APIs",
    ],
    Workflow: [
      "Jest",
      "Playwright",
      "CI/CD",
      "Vercel",
      "Claude Code",
      "Cursor CLI",
      "Antigravity CLI",
      "Codex",
    ],
  },
  projects: [
    {
      name: "DomiProp",
      description:
        "Compliance-first property management for Dominican landlords: ISR/IPI tax, Formato 606 records, lease generation, and e-CF electronic invoicing.",
      url: "https://domiprop.com.do",
    },
    {
      name: "dgii-ts",
      description:
        "Open-source TypeScript library for validating and looking up Dominican tax identifiers (RNC, cedula, NCF, e-NCF) against the DGII, built with offline validation and a circuit breaker so it keeps working when the source does not.",
      url: "https://github.com/franklinmdev/dgii-ts",
    },
    {
      name: "justask",
      description:
        "Turns plain-language requests into an app's own state (search results, table filters, a filled record card). Code finds candidates, a model picks one label per question with a probability for every label, and a field below its measured gate stays empty for the person. On npm as @justask/core, MIT.",
      url: "https://github.com/franklinmdev/justask",
    },
    {
      name: "docmatch",
      description:
        "Invoice reconciliation engine, in progress: vision-model extraction, a deterministic validation gate, three-way matching against purchase orders and receiving records, and human review, with every stage benchmarked in CI against the commit that produced it.",
      url: "https://github.com/franklinmdev/docmatch",
    },
    {
      name: "brook",
      description:
        "Upcoming mobile app (Expo) that turns saved links into a searchable, typed library. A landing page and waitlist demand test is running before the app is built.",
      url: "https://brook.franklinmdev.workers.dev",
    },
  ],
  contact: {
    site: "https://franklinmdev.me",
    email: "franklinmdev@hotmail.com",
    github: "https://github.com/franklinmdev",
    linkedin: "https://www.linkedin.com/in/franklin-martinez-0a697a253",
    x: "https://x.com/franklinmdev",
  },
}
