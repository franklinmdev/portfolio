import { cn } from "@/lib/utils"
import {
  ECF_TYPE_NAMES,
  NCF_TYPE_NAMES,
  validateCedula,
  validateEcf,
  validateNcf,
  validateRnc,
} from "dgii-ts/validators"
import { useId, useMemo, useState, type CSSProperties } from "react"
import { usePlotted } from "./usePlotted"

interface Props {
  t: {
    label: string
    caption: string
    input: string
    examples: string
    ex_rnc: string
    ex_cedula: string
    ex_ncf: string
    ex_typo: string
    digit: string
    weight: string
    product: string
    sum: string
    check: string
    expected: string
    got: string
    valid: string
    invalid: string
    waiting: string
    rnc_rule: string
    cedula_rule: string
    ncf_rule: string
    whitelist: string
    type: string
  }
}

// Invented numbers that pass the algorithm (and one that does not).
const EXAMPLES = {
  rnc: "4-30-58712-5",
  cedula: "402-8731905-3",
  ncf: "E310000000042",
  typo: "4-30-58712-0",
} as const

const RNC_WEIGHTS = [7, 9, 8, 6, 5, 4, 3, 2]

type Analysis =
  | { kind: "empty" }
  | {
      kind: "rnc" | "cedula"
      digits: number[]
      weights: number[]
      products: number[]
      sum: number
      expected: number
      got: number
      steps: string
      call: string
      result: ReturnType<typeof validateRnc>
    }
  | {
      kind: "ncf" | "ecf"
      call: string
      result: ReturnType<typeof validateNcf>
      typeName: string | undefined
    }
  | { kind: "partial"; digits: number[] }

function analyse(raw: string): Analysis {
  const value = raw.trim().toUpperCase()
  if (!value) return { kind: "empty" }

  if (value.startsWith("B") || value.startsWith("E")) {
    const ecf = value.startsWith("E")
    const result = ecf ? validateEcf(value) : validateNcf(value)
    const code = value.slice(1, 3)
    return {
      kind: ecf ? "ecf" : "ncf",
      call: `${ecf ? "validateEcf" : "validateNcf"}("${value}")`,
      result,
      typeName: ecf ? ECF_TYPE_NAMES[code] : NCF_TYPE_NAMES[code],
    }
  }

  const digits = value.replace(/\D/g, "").split("").map(Number)

  if (digits.length === 9) {
    const products = RNC_WEIGHTS.map((w, i) => w * (digits[i] ?? 0))
    const sum = products.reduce((a, b) => a + b, 0)
    const r = sum % 11
    const expected = r === 0 ? 2 : r === 1 ? 1 : 11 - r
    return {
      kind: "rnc",
      digits,
      weights: RNC_WEIGHTS,
      products,
      sum,
      expected,
      got: digits[8] ?? 0,
      steps: `${sum} mod 11 = ${r}`,
      call: `validateRnc("${digits.join("")}")`,
      result: validateRnc(value),
    }
  }

  if (digits.length === 11) {
    const weights = Array.from({ length: 10 }, (_, i) => (i % 2 === 0 ? 1 : 2))
    const products = weights.map((w, i) => {
      const p = w * (digits[i] ?? 0)
      return p >= 10 ? p - 9 : p
    })
    const sum = products.reduce((a, b) => a + b, 0)
    const expected = (10 - (sum % 10)) % 10
    return {
      kind: "cedula",
      digits,
      weights,
      products,
      sum,
      expected,
      got: digits[10] ?? 0,
      steps: `(10 - ${sum} mod 10) mod 10`,
      call: `validateCedula("${digits.join("")}")`,
      result: validateCedula(value),
    }
  }

  return { kind: "partial", digits }
}

function formatResult(result: object) {
  return JSON.stringify(result)
    .replace(/"(\w+)":/g, "$1: ")
    .replace(/,/g, ", ")
}

export default function DgiiFigure({ t }: Props) {
  const inputId = useId()
  const [value, setValue] = useState<string>(EXAMPLES.rnc)
  const { ref, plotted, replay } = usePlotted<HTMLElement>()
  const a = useMemo(() => analyse(value), [value])

  const set = (next: string) => {
    setValue(next)
    replay()
  }

  const checked = a.kind === "rnc" || a.kind === "cedula"
  const lib = checked || a.kind === "ncf" || a.kind === "ecf" ? a.result : null
  const whitelisted = checked && a.result.valid && a.expected !== a.got

  return (
    <figure
      ref={ref}
      data-plotted={plotted}
      className="span-all mt-8 mb-2"
      aria-labelledby="fig4-caption"
    >
      <div className="figure">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor={inputId} className="apparatus mb-1.5 block">
              {t.input}
            </label>
            <input
              id={inputId}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => checked && replay()}
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              maxLength={20}
              className="border-input focus-visible:border-foreground bg-background data w-full rounded-[2px] border px-3 py-2.5 text-lg tracking-wide outline-none sm:text-xl"
            />
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t.examples}
          >
            {(
              [
                ["rnc", t.ex_rnc],
                ["cedula", t.ex_cedula],
                ["ncf", t.ex_ncf],
                ["typo", t.ex_typo],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => set(EXAMPLES[key])}
                className={cn(
                  "btn btn-ghost min-h-11 px-3 text-sm",
                  value === EXAMPLES[key] && "border-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 min-h-[13rem]" aria-live="polite">
          {a.kind === "empty" && <p className="apparatus">{t.waiting}</p>}

          {a.kind === "partial" && (
            <p className="apparatus">
              <span className="data text-foreground">{a.digits.length}</span> /
              9 · 11. {t.waiting}
            </p>
          )}

          {checked && (
            <>
              <div>
                <table className="data w-full table-fixed border-collapse text-center text-base">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="apparatus w-20 pr-3 text-left font-normal"
                      >
                        {t.digit}
                      </th>
                      {a.digits.map((d, i) => (
                        <td
                          key={i}
                          className={cn(
                            "border-border border-b py-1.5 text-base sm:text-lg",
                            i === a.digits.length - 1 &&
                              "border-foreground border-l"
                          )}
                        >
                          {d}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-muted-foreground">
                      <th
                        scope="row"
                        className="apparatus pr-3 text-left font-normal"
                      >
                        × {t.weight}
                      </th>
                      {a.digits.map((_, i) => (
                        <td key={i} className="py-1.5">
                          {a.weights[i] ?? ""}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="apparatus pr-3 text-left font-normal"
                      >
                        {t.product}
                      </th>
                      {a.digits.map((_, i) => (
                        <td key={i} className="border-border border-t py-1.5">
                          {a.products[i] !== undefined && (
                            <span
                              className="settle measured inline-block"
                              style={
                                {
                                  transitionDelay: `${i * 70}ms`,
                                } as CSSProperties
                              }
                            >
                              {a.products[i]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                className="settle mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-sans text-[0.9375rem]"
                style={{ transitionDelay: `${a.digits.length * 70}ms` }}
              >
                <span>
                  {t.sum} <span className="data measured">{a.sum}</span>
                </span>
                <span className="data text-muted-foreground">{a.steps}</span>
                <span>
                  {t.check}: {t.expected}{" "}
                  <span className="data measured">{a.expected}</span>, {t.got}{" "}
                  <span className="data">{a.got}</span>
                </span>
              </div>
              <p className="apparatus mt-2 max-w-2xl">
                {a.kind === "rnc" ? t.rnc_rule : t.cedula_rule}
              </p>
              {whitelisted && <p className="apparatus mt-1">{t.whitelist}</p>}
            </>
          )}

          {(a.kind === "ncf" || a.kind === "ecf") && (
            <div className="font-sans text-[0.9375rem]">
              <p className="data text-xl tracking-wide">
                <span className="measured">
                  {value.trim().toUpperCase().slice(0, 1)}
                </span>
                <span className="measured">
                  {value.trim().toUpperCase().slice(1, 3)}
                </span>
                <span>{value.trim().toUpperCase().slice(3)}</span>
              </p>
              {a.typeName && (
                <p className="mt-2">
                  {t.type}: {a.typeName}
                </p>
              )}
              <p className="apparatus mt-2 max-w-2xl">{t.ncf_rule}</p>
            </div>
          )}

          {lib && a.kind !== "partial" && a.kind !== "empty" && (
            <div className="border-border mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <code className="data text-muted-foreground min-w-0 text-sm break-all whitespace-pre-wrap">
                {a.call}
                <span aria-hidden="true"> → </span>
                <span className="text-foreground">{formatResult(lib)}</span>
              </code>
              <p
                className={cn(
                  "shrink-0 font-sans text-lg font-semibold",
                  lib.valid ? "text-foreground" : "measured"
                )}
              >
                {lib.valid ? t.valid : t.invalid}
              </p>
            </div>
          )}
        </div>
      </div>
      <figcaption id="fig4-caption" className="caption">
        <b>{t.label}.</b> {t.caption}
      </figcaption>
    </figure>
  )
}
