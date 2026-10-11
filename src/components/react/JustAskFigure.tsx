import type { Recording } from "@/data/justask-recordings"
import { cn } from "@/lib/utils"
import {
  ArrowCounterClockwiseIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react"
import { useState, type CSSProperties } from "react"
import { usePlotted } from "./usePlotted"

interface Props {
  lang: "en" | "es"
  recordings: Recording[]
  tagLabels: Record<string, string>
  liveUrl: string
  t: {
    label: string
    caption: string
    pick: string
    replay: string
    card: string
    vendor: string
    tags: string
    date: string
    amount: string
    gate: string
    empty: string
    empty_why: string
    try: string
  }
}

const STAGGER_MS = 170

function Meter({
  p,
  gate,
  gateLabel,
  delay,
}: {
  p: number
  gate: number
  gateLabel: string
  delay: number
}) {
  const passes = p >= gate
  return (
    <div className="mt-1.5 flex items-center gap-3">
      <div
        className="bg-border relative h-1.5 flex-1"
        role="img"
        aria-label={`${p.toFixed(2)}, ${gateLabel} ${gate.toFixed(2)}`}
      >
        <div
          className={cn(
            "grow-x absolute inset-0",
            passes ? "bg-measure" : "bg-measure/45"
          )}
          style={{ "--to": p, transitionDelay: `${delay}ms` } as CSSProperties}
        />
        <div
          className="bg-foreground absolute -top-1 -bottom-1 w-px"
          style={{ left: `${gate * 100}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="data measured w-10 text-right">{p.toFixed(2)}</span>
      <span className="apparatus hidden w-16 sm:inline">
        {gateLabel} {gate.toFixed(2)}
      </span>
    </div>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-border grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-t py-3 first:border-t-0 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
      <dt className="apparatus pt-0.5">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export default function JustAskFigure({
  lang,
  recordings,
  tagLabels,
  liveUrl,
  t,
}: Props) {
  const [index, setIndex] = useState(0)
  const { ref, plotted, replay } = usePlotted<HTMLElement>()
  const rec = recordings[index] ?? recordings[0]
  if (!rec) return null

  const date = new Intl.DateTimeFormat(lang, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${rec.date.iso}T00:00:00Z`))
  const amount = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: rec.amount.currency,
  }).format(rec.amount.value)

  const choose = (i: number) => {
    if (i === index) return
    setIndex(i)
    replay()
  }

  let step = 0
  const next = () => step++ * STAGGER_MS

  return (
    <figure
      ref={ref}
      data-plotted={plotted}
      className="span-all mt-8 mb-2"
      aria-labelledby="fig1-caption"
    >
      <div className="figure grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <div>
          <p className="apparatus mb-3" id="fig1-pick">
            {t.pick}
          </p>
          <div role="radiogroup" aria-labelledby="fig1-pick">
            {recordings.map((r, i) => (
              <button
                key={r.request}
                type="button"
                role="radio"
                aria-checked={i === index}
                onClick={() => choose(i)}
                className={cn(
                  "border-border flex min-h-11 w-full items-start gap-3 border-t py-3 text-left font-sans text-[0.9375rem] leading-snug transition-colors duration-150 last:border-b",
                  i === index
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 size-2 shrink-0 border transition-colors duration-150",
                    i === index
                      ? "bg-foreground border-foreground"
                      : "border-rule-strong"
                  )}
                />
                {r.request}
              </button>
            ))}
          </div>
          <a
            href={liveUrl}
            className="link mt-5 inline-flex items-center gap-1 font-sans text-[0.9375rem]"
          >
            {t.try}
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="border-border bg-figure border px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-sans text-[0.9375rem] font-semibold">{t.card}</p>
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
          <p className="border-border mt-1 border-b pb-4 font-serif text-lg italic">
            “{rec.request}”
          </p>

          <dl aria-live="polite">
            <Row label={t.vendor}>
              {rec.vendor.name ? (
                <>
                  <p
                    className="settle"
                    style={{ transitionDelay: `${step * STAGGER_MS}ms` }}
                  >
                    {rec.vendor.name}
                  </p>
                  <Meter
                    p={rec.vendor.p}
                    gate={rec.vendor.gate}
                    gateLabel={t.gate}
                    delay={next()}
                  />
                </>
              ) : (
                <>
                  <p
                    className="settle text-muted-foreground"
                    style={{ transitionDelay: `${step * STAGGER_MS}ms` }}
                  >
                    <span className="border-rule-strong inline-block min-w-40 border-b border-dashed pr-2">
                      {t.empty}
                    </span>
                  </p>
                  {rec.vendor.guess && (
                    <>
                      <Meter
                        p={rec.vendor.guess.p}
                        gate={rec.vendor.gate}
                        gateLabel={t.gate}
                        delay={next()}
                      />
                      <p className="apparatus mt-1.5">
                        {t.empty_why
                          .replace("{name}", rec.vendor.guess.name)
                          .replace("{p}", rec.vendor.guess.p.toFixed(2))}
                      </p>
                    </>
                  )}
                </>
              )}
            </Row>

            <Row label={t.tags}>
              {rec.tags.map((tag) => (
                <div key={tag.id} className="mb-1 last:mb-0">
                  <p
                    className="settle"
                    style={{ transitionDelay: `${step * STAGGER_MS}ms` }}
                  >
                    {tagLabels[tag.id] ?? tag.id}
                  </p>
                  <Meter
                    p={tag.p}
                    gate={rec.tagGate}
                    gateLabel={t.gate}
                    delay={next()}
                  />
                </div>
              ))}
            </Row>

            <Row label={t.date}>
              <p
                className="settle"
                style={{ transitionDelay: `${step * STAGGER_MS}ms` }}
              >
                {date} <span className="apparatus">“{rec.date.text}”</span>
              </p>
              <Meter
                p={rec.date.p}
                gate={rec.date.gate}
                gateLabel={t.gate}
                delay={next()}
              />
            </Row>

            <Row label={t.amount}>
              <p
                className="settle"
                style={{ transitionDelay: `${step * STAGGER_MS}ms` }}
              >
                <span className="data text-base">{amount}</span>{" "}
                <span className="apparatus">“{rec.amount.text}”</span>
              </p>
              <Meter
                p={rec.amount.p}
                gate={rec.amount.gate}
                gateLabel={t.gate}
                delay={next()}
              />
            </Row>
          </dl>
        </div>
      </div>
      <figcaption id="fig1-caption" className="caption">
        <b>{t.label}.</b> {t.caption}
      </figcaption>
    </figure>
  )
}
