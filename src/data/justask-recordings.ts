// Real responses from the justask live demo (POST /api/card/{en,es}),
// recorded 2026-10-11 with timeZone America/Santo_Domingo, reduced to what
// Fig. 1 draws. Raw recordings are not committed; re-record to refresh.

export interface Recording {
  request: string
  vendor: {
    name: string | null
    p: number
    gate: number
    guess?: { name: string; p: number }
  }
  tags: { id: string; p: number }[]
  tagGate: number
  date: { text: string; iso: string; p: number; gate: number }
  amount: {
    text: string
    value: number
    currency: string
    p: number
    gate: number
  }
}

export const recordings: Record<"en" | "es", Recording[]> = {
  en: [
    {
      request: "lunch with Larkspur yesterday, $86.40",
      vendor: { name: "Larkspur Catering", p: 0.99, gate: 0.7 },
      tags: [{ id: "meals", p: 0.86 }],
      tagGate: 0.4,
      date: { text: "yesterday", iso: "2026-10-10", p: 0.98, gate: 0.8 },
      amount: { text: "$86.40", value: 86.4, currency: "USD", p: 1, gate: 0.9 },
    },
    {
      request: "lunch with the cleaners yesterday, $40",
      vendor: {
        name: null,
        p: 0.74,
        gate: 0.7,
        guess: { name: "Larkspur Catering", p: 0.17 },
      },
      tags: [{ id: "meals", p: 0.95 }],
      tagGate: 0.4,
      date: { text: "yesterday", iso: "2026-10-10", p: 0.98, gate: 0.8 },
      amount: { text: "$40", value: 40, currency: "USD", p: 1, gate: 0.9 },
    },
    {
      request: "Farwander taxi with a client on Friday, $64",
      vendor: { name: "Farwander Travel", p: 0.81, gate: 0.7 },
      tags: [
        { id: "travel", p: 0.7 },
        { id: "client", p: 0.86 },
      ],
      tagGate: 0.4,
      date: { text: "Friday", iso: "2026-10-09", p: 0.99, gate: 0.8 },
      amount: { text: "$64", value: 64, currency: "USD", p: 1, gate: 0.9 },
    },
  ],
  es: [
    {
      request: "almuerzo con Cazuela Azul ayer, $86.40",
      vendor: { name: "Banquetes Cazuela Azul", p: 0.99, gate: 0.7 },
      tags: [{ id: "meals", p: 0.74 }],
      tagGate: 0.4,
      date: { text: "ayer", iso: "2026-10-10", p: 0.94, gate: 0.8 },
      amount: { text: "$86.40", value: 86.4, currency: "USD", p: 1, gate: 0.9 },
    },
    {
      request: "almuerzo con los de limpieza ayer, $40",
      vendor: {
        name: null,
        p: 0.82,
        gate: 0.7,
        guess: { name: "Banquetes Cazuela Azul", p: 0.12 },
      },
      tags: [{ id: "meals", p: 0.9 }],
      tagGate: 0.4,
      date: { text: "ayer", iso: "2026-10-10", p: 0.99, gate: 0.8 },
      amount: { text: "$40", value: 40, currency: "USD", p: 1, gate: 0.9 },
    },
    {
      request: "taxi de Rumbo Claro con un cliente el viernes, 64 dólares",
      vendor: { name: "Viajes Rumbo Claro", p: 0.83, gate: 0.7 },
      tags: [
        { id: "travel", p: 0.57 },
        { id: "client", p: 0.56 },
      ],
      tagGate: 0.4,
      date: { text: "viernes", iso: "2026-10-09", p: 0.99, gate: 0.8 },
      amount: {
        text: "64 dólares",
        value: 64,
        currency: "USD",
        p: 1,
        gate: 0.9,
      },
    },
  ],
}
