// docmatch data for Fig. 2 and Fig. 3.
//
// Fig. 2: the synthetic invoice eval0001 from docmatch's CI corpus
// (engine/tests/evals/synthetic/annotations/eval0001.json). Bounding boxes are
// the labels' own, as fractions of the page. Synthetic data, safe to show.
//
// Fig. 3: the "Extraction, fixed subset" benchmark table in docmatch's
// README (100 pinned documents), read 2026-10-11.

export interface InvoiceField {
  type: string
  text: string
  bbox: [number, number, number, number]
}

export const invoiceFields: InvoiceField[] = [
  {
    type: "vendor_name",
    text: "Northwind Paper Co",
    bbox: [0.08, 0.1, 0.42, 0.13],
  },
  {
    type: "vendor_address",
    text: "14 Mill Lane\nRiverport, RP 11000",
    bbox: [0.08, 0.14, 0.42, 0.2],
  },
  { type: "document_id", text: "INV-1001", bbox: [0.7, 0.1, 0.92, 0.13] },
  { type: "date_issue", text: "03/04/26", bbox: [0.7, 0.14, 0.92, 0.17] },
  { type: "date_due", text: "04/03/26", bbox: [0.7, 0.18, 0.92, 0.21] },
  { type: "amount_total_tax", text: "18.00", bbox: [0.7, 0.76, 0.92, 0.79] },
  { type: "amount_total_gross", text: "237.50", bbox: [0.7, 0.8, 0.92, 0.83] },
  {
    type: "currency_code_amount_due",
    text: "USD",
    bbox: [0.6, 0.8, 0.69, 0.83],
  },
]
export const invoiceLines = [
  {
    code: "CP-500",
    _y: 0.32,
    quantity: "2",
    units_of_measure: "BOX",
    description: "A4 copier paper, 500 sheets",
    amount_gross: "60.00",
    id: 1,
  },
  {
    code: "ST-120",
    _y: 0.37,
    quantity: "1",
    units_of_measure: "EA",
    description: "Stapler, heavy duty",
    amount_gross: "40.00",
    id: 2,
  },
  {
    quantity: "3",
    _y: 0.42,
    units_of_measure: "BOX",
    description: "Nitrile gloves, box of 100",
    unit_price_gross: "12.50",
    amount_gross: "37.50",
    id: 3,
  },
  {
    quantity: "10",
    _y: 0.47,
    units_of_measure: "EA",
    description: "Packing tape, 48 mm",
    unit_price_gross: "2.40",
    amount_gross: "24.00",
    id: 4,
  },
  {
    quantity: "2",
    _y: 0.52,
    units_of_measure: "EA",
    description: "Label roll, 1000 labels",
    unit_price_gross: "9.00",
    amount_gross: "18.00",
    id: 5,
  },
  {
    quantity: "1",
    _y: 0.57,
    units_of_measure: "EA",
    description: "Extension cord, 5 m",
    unit_price_gross: "14.00",
    amount_gross: "14.00",
    id: 6,
  },
  {
    quantity: "4",
    _y: 0.62,
    units_of_measure: "EA",
    description: "Safety glasses, clear",
    unit_price_gross: "6.25",
    amount_gross: "25.00",
    id: 7,
  },
  {
    quantity: "5",
    _y: 0.67,
    units_of_measure: "BAG",
    description: "Zip ties, 200 mm",
    unit_price_gross: "3.80",
    amount_gross: "19.00",
    id: 8,
  },
] as const

export interface BenchmarkRow {
  backend: string
  detail: string
  f1: number
  cost: number
  commit: string
}

export const benchmark: BenchmarkRow[] = [
  {
    backend: "gemini-3.1-flash-lite",
    detail: "pages at 1600 px",
    f1: 0.615,
    cost: 0.00203,
    commit: "28d0738",
  },
  {
    backend: "gpt-5.6-luna",
    detail: "pages at 1600 px",
    f1: 0.588,
    cost: 0.00344,
    commit: "42e69fa",
  },
  {
    backend: "Azure prebuilt-invoice",
    detail: "API 2024-11-30",
    f1: 0.556,
    cost: 0.0112,
    commit: "d3bb01e",
  },
]

export const commitUrl = (sha: string) =>
  `https://github.com/franklinmdev/docmatch/commit/${sha}`
