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

export const measured = {
  justask: {
    exact: { value: "24 of 24" } as Measured,
    held: { value: "6 of 6" } as Measured,
    p95: { value: "380 ms" } as Measured,
    cap: { value: "$1" } as Measured,
  },
  docmatch: {
    p95: { value: "10.03 s" } as Measured,
    cost: { value: "$0.00236" } as Measured,
    review: { value: "0.484" } as Measured,
  },
  dgii: {
    cedulas: { value: "578" } as Measured,
    rncs: { value: "23" } as Measured,
  },
}
