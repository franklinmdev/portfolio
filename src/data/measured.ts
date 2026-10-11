// Every number shown in the measured column, with the date it was measured
// and the commit that produced it. Sources are filled from the repos
// themselves, never from memory; a number without a source stays unsourced.
export interface Source {
  date?: string
  source?: { label: string; href: string }
}
export interface Measured extends Source {
  value: string
}

const gh = (repo: string, sha: string, path: string) =>
  `https://github.com/franklinmdev/${repo}/blob/${sha}/${path}`

// justask: round 4 of the frozen search eval, English column.
const SEARCH_EVAL: Source = {
  date: "2026-09-23",
  source: {
    label: "search-eval.md at ce451bb",
    href: gh("justask", "ce451bb", "docs/search-eval.md"),
  },
}
// justask: the demo's daily budget on the owner's key.
const DEMO_BUDGET: Source = {
  date: "2026-09-25",
  source: {
    label: "budget.ts at f2aa3b6",
    href: gh("justask", "f2aa3b6", "demo/server/budget.ts"),
  },
}

// docmatch: the pipeline table in the README, gemini row.
const PIPELINE: Source = {
  date: "2026-09-25",
  source: {
    label: "README at 301ce3e",
    href: gh("docmatch", "301ce3e", "README.md"),
  },
}
// dgii-ts: the whitelist files, both sourced from python-stdnum.
const WHITELIST: Source = {
  date: "2026-03-19",
  source: {
    label: "cedula-whitelist.ts at ff60bd9",
    href: gh("dgii-ts", "ff60bd9", "src/validators/cedula-whitelist.ts"),
  },
}

export const measured = {
  justask: {
    exact: { value: "24 of 24", ...SEARCH_EVAL } as Measured,
    held: { value: "6 of 6", ...SEARCH_EVAL } as Measured,
    p95: { value: "380 ms", ...SEARCH_EVAL } as Measured,
    cap: { value: "$1", ...DEMO_BUDGET } as Measured,
  },
  docmatch: {
    p95: { value: "10.03 s", ...PIPELINE } as Measured,
    cost: { value: "$0.00236", ...PIPELINE } as Measured,
    review: { value: "0.484", ...PIPELINE } as Measured,
  },
  dgii: {
    cedulas: { value: "578", ...WHITELIST } as Measured,
    rncs: { value: "23", ...WHITELIST } as Measured,
  },
}
