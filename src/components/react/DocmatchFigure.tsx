import { invoiceFields, invoiceLines } from "@/data/docmatch"
import { cn } from "@/lib/utils"
import {
  ArrowCounterClockwiseIcon,
  ArrowRightIcon,
  CheckIcon,
  MinusIcon,
} from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { prefersReducedMotion, usePlotted } from "./usePlotted"

interface Props {
  t: {
    label: string
    caption: string
    replay: string
    invoice: string
    extract: string
    gate: string
    dates_sane: string
    dates_detail: string
    totals_agree: string
    totals_detail: string
    passed: string
    not_checkable: string
    verdict: string
    next: string
    fields: Record<string, string>
  }
}

// The six header fields Fig. 2 extracts, in reading order.
const SHOWN = [
  "vendor_name",
  "document_id",
  "date_issue",
  "date_due",
  "amount_total_tax",
  "amount_total_gross",
] as const

const extracted = SHOWN.flatMap((type) => {
  const f = invoiceFields.find((x) => x.type === type)
  return f ? [f] : []
})
const byType = (type: string) => invoiceFields.find((x) => x.type === type)

// Phases: 0 blank, 1..6 one field each, 7 rule one, 8 rule two, 9 verdict.
const LAST = extracted.length + 3
const STEP_MS = 420
const STATUSES = [
  "received",
  "extracted",
  "validated",
  "resolved",
  "matched",
] as const

function Placed({
  bbox,
  children,
  className,
}: {
  bbox: readonly number[]
  children: React.ReactNode
  className?: string
}) {
  const [x0 = 0, y0 = 0, x1 = 0, y1 = 0] = bbox
  return (
    <div
      className={cn(
        "absolute flex items-center whitespace-pre-line",
        className
      )}
      style={{
        left: `${x0 * 100}%`,
        top: `${y0 * 100}%`,
        width: `${(x1 - x0) * 100}%`,
        height: `${(y1 - y0) * 100}%`,
      }}
    >
      {children}
    </div>
  )
}

export default function DocmatchFigure({ t }: Props) {
  const { ref, plotted, replay } = usePlotted<HTMLElement>()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!plotted) {
      setPhase(0)
      return
    }
    if (prefersReducedMotion()) {
      setPhase(LAST)
      return
    }
    let p = 0
    const id = window.setInterval(() => {
      p += 1
      setPhase(p)
      if (p >= LAST) window.clearInterval(id)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [plotted])

  const rulesShown = phase - extracted.length
  const statusReached =
    phase === 0 ? 0 : phase <= extracted.length ? 1 : rulesShown >= 3 ? 3 : 2

  const address = byType("vendor_address")
  const currency = byType("currency_code_amount_due")

  return (
    <figure
      ref={ref}
      data-plotted={plotted}
      className="span-all mt-8 mb-2"
      aria-labelledby="fig2-caption"
    >
      <div className="figure grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        {/* The invoice, drawn from the labels' own positions. */}
        <div
          className="border-border bg-background [container-type:inline-size] relative aspect-[8.5/13] w-full border font-sans leading-tight sm:aspect-[8.5/11]"
          role="img"
          aria-label={`${t.invoice} INV-1001, Northwind Paper Co, 237.50 USD`}
        >
          <div className="absolute inset-0 [font-size:3.2cqw] sm:[font-size:2.5cqw]">
            <Placed
              bbox={[0.08, 0.04, 0.5, 0.08]}
              className="[font-size:4cqw] font-semibold tracking-wide sm:[font-size:3.4cqw]"
            >
              {t.invoice}
            </Placed>
            {address && (
              <Placed bbox={address.bbox} className="text-muted-foreground">
                {address.text}
              </Placed>
            )}
            {invoiceFields
              .filter((f) => (SHOWN as readonly string[]).includes(f.type))
              .map((f) => (
                <Placed
                  key={f.type}
                  bbox={f.bbox}
                  className={cn(
                    f.type === "vendor_name" &&
                      "[font-size:3.3cqw] font-semibold sm:[font-size:2.6cqw]",
                    f.type.startsWith("amount") && "data justify-end"
                  )}
                >
                  {f.text}
                </Placed>
              ))}
            <Placed
              bbox={[0.55, 0.14, 0.69, 0.17]}
              className="text-muted-foreground"
            >
              {t.fields.date_issue}
            </Placed>
            <Placed
              bbox={[0.55, 0.18, 0.69, 0.21]}
              className="text-muted-foreground"
            >
              {t.fields.date_due}
            </Placed>
            <Placed
              bbox={[0.4, 0.76, 0.67, 0.79]}
              className="text-muted-foreground justify-end"
            >
              {t.fields.amount_total_tax}
            </Placed>
            {currency && (
              <Placed
                bbox={[0.4, currency.bbox[1], 0.67, currency.bbox[3]]}
                className="text-muted-foreground justify-end"
              >
                {t.fields.amount_total_gross} {currency.text}
              </Placed>
            )}
            <div className="bg-rule-strong absolute top-[28%] right-[8%] left-[4%] h-px" />
            {invoiceLines.map((line) => (
              <div
                key={line.id}
                className="absolute right-[8%] left-[4%] flex gap-[2%]"
                style={{ top: `${line._y * 100}%` }}
              >
                <span className="text-muted-foreground hidden w-[13%] shrink-0 whitespace-nowrap sm:inline">
                  {"code" in line ? line.code : ""}
                </span>
                <span className="data w-[5%] shrink-0 text-right">
                  {line.quantity}
                </span>
                <span className="text-muted-foreground w-[7%] shrink-0 whitespace-nowrap">
                  {line.units_of_measure}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {line.description}
                </span>
                <span className="data w-[15%] shrink-0 text-right">
                  {line.amount_gross}
                </span>
              </div>
            ))}
            <div className="bg-rule-strong absolute top-[74%] right-[8%] left-[55%] h-px" />

            {/* Extraction boxes, one per phase. */}
            {extracted.map((f, i) => {
              const [x0 = 0, y0 = 0, x1 = 0, y1 = 0] = f.bbox
              const on = phase > i
              return (
                <div
                  key={f.type}
                  aria-hidden="true"
                  className={cn(
                    "border-measure bg-measure-soft absolute border-[1.5px] transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-opacity",
                    on ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  )}
                  style={{
                    left: `calc(${x0 * 100}% - 0.6%)`,
                    top: `calc(${y0 * 100}% - 0.4%)`,
                    width: `calc(${(x1 - x0) * 100}% + 1.2%)`,
                    height: `calc(${(y1 - y0) * 100}% + 0.8%)`,
                  }}
                >
                  <span className="bg-measure-ink text-background absolute -top-[1.5px] -right-[1.5px] translate-x-full px-[0.6cqw] font-sans [font-size:max(0.5625rem,2.3cqw)] leading-normal font-semibold sm:[font-size:max(0.5625rem,1.7cqw)]">
                    {i + 1}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* What was read, then the gate. */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <p className="font-sans text-[0.9375rem] font-semibold">
              {t.extract}
            </p>
            <button
              type="button"
              onClick={replay}
              className="apparatus hover:text-foreground inline-flex min-h-11 items-center gap-1.5 transition-colors duration-150"
            >
              <ArrowCounterClockwiseIcon
                aria-hidden="true"
                className="size-4"
              />
              {t.replay}
            </button>
          </div>
          <ol className="mt-1">
            {extracted.map((f, i) => (
              <li
                key={f.type}
                className={cn(
                  "border-border grid grid-cols-[1.5rem_8rem_minmax(0,1fr)] items-baseline gap-2 border-t py-2 font-sans text-[0.9375rem] transition-[opacity,visibility] duration-300",
                  phase > i ? "visible opacity-100" : "invisible opacity-0"
                )}
              >
                <span className="data measured text-xs">{i + 1}</span>
                <span className="text-muted-foreground">
                  {t.fields[f.type] ?? f.type}
                </span>
                <span
                  className={cn(
                    f.type.startsWith("amount") || f.type.startsWith("date")
                      ? "data"
                      : ""
                  )}
                >
                  {f.text}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-6 font-sans text-[0.9375rem] font-semibold">
            {t.gate}
          </p>
          <ul className="mt-1" aria-live="polite">
            {[
              {
                name: t.dates_sane,
                detail: t.dates_detail,
                outcome: "passed",
                label: t.passed,
              },
              {
                name: t.totals_agree,
                detail: t.totals_detail,
                outcome: "absent",
                label: t.not_checkable,
              },
            ].map((rule, i) => (
              <li
                key={rule.name}
                className={cn(
                  "border-border border-t py-2.5 font-sans text-[0.9375rem] transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
                  rulesShown > i
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-1 opacity-0"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    {rule.outcome === "passed" ? (
                      <CheckIcon
                        aria-hidden="true"
                        weight="bold"
                        className="size-4"
                      />
                    ) : (
                      <MinusIcon
                        aria-hidden="true"
                        weight="bold"
                        className="text-muted-foreground size-4"
                      />
                    )}
                    {rule.name}
                  </span>
                  <span className="data text-muted-foreground text-xs">
                    {rule.outcome}
                  </span>
                </div>
                <p className="apparatus mt-0.5 pl-6">{rule.detail}</p>
              </li>
            ))}
          </ul>
          <p
            className={cn(
              "border-rule-strong mt-1 border-t pt-3 font-sans text-[0.9375rem] font-semibold transition-[opacity,visibility] duration-300",
              rulesShown >= 3 ? "visible opacity-100" : "invisible opacity-0"
            )}
          >
            {t.verdict}
          </p>

          <ol
            className="apparatus mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-6"
            aria-label="Status"
          >
            {STATUSES.map((s, i) => (
              <li key={s} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "transition-colors duration-300",
                    i === statusReached - 1 && "text-foreground font-medium"
                  )}
                  aria-current={i === statusReached - 1 ? "step" : undefined}
                >
                  {s}
                </span>
                <ArrowRightIcon aria-hidden="true" className="size-3" />
              </li>
            ))}
            <li>approved | needs_review</li>
          </ol>
          <p className="apparatus mt-2">{t.next}</p>
        </div>
      </div>
      <figcaption id="fig2-caption" className="caption">
        <b>{t.label}.</b> {t.caption}
      </figcaption>
    </figure>
  )
}
