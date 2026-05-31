import { MonitorIcon, SunIcon } from "@phosphor-icons/react"
import { useCallback } from "react"

interface ThemeToggleProps {
  /** Action label for AT, e.g. "Toggle theme" / "Cambiar tema". */
  label: string
  /** Mode name shown in dark mode, e.g. "Deck" / "Consola". */
  deckLabel: string
  /** Mode name shown in light mode, e.g. "Blueprint" / "Plano". */
  blueprintLabel: string
}

const BG = { light: "#eaf1fb", dark: "#0d1117" } as const

/**
 * Cyberdeck theme switch: DECK (dark) / BLUEPRINT (light).
 * Icon state is derived purely from the .dark class via CSS (cross-fade),
 * so it is SSR-safe and never flashes or mismatches on hydration.
 * The click handler flips the class, persists the choice, and keeps
 * the browser chrome (theme-color) in sync.
 */
export default function ThemeToggle({
  label,
  deckLabel,
  blueprintLabel,
}: ThemeToggleProps) {
  const toggle = useCallback(() => {
    const root = document.documentElement
    const next = !root.classList.contains("dark")
    root.classList.toggle("dark", next)

    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      /* storage unavailable: choice simply is not persisted */
    }

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", next ? BG.dark : BG.light)
  }, [])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group border-border text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-primary relative inline-flex size-9 items-center justify-center rounded border bg-transparent transition-colors lg:w-auto lg:justify-start lg:gap-2 lg:px-2"
    >
      <span className="relative grid size-[18px] place-items-center">
        {/* SunIcon = shown in dark mode (switch to blueprint/light) */}
        <SunIcon
          weight="bold"
          className="text-primary absolute size-[18px] scale-0 -rotate-90 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:scale-100 dark:rotate-0 dark:opacity-100"
          aria-hidden="true"
        />
        {/* MonitorIcon = shown in light mode (switch to deck/dark) */}
        <MonitorIcon
          weight="bold"
          className="absolute size-[18px] scale-100 rotate-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-12 dark:scale-0 dark:rotate-90 dark:opacity-0"
          aria-hidden="true"
        />
      </span>
      {/* Current-mode caption: DECK in dark, BLUEPRINT in light. The two
          spans swap via the .dark CSS scope so it stays SSR-safe. */}
      <span
        className="hidden font-mono text-[0.625rem] font-bold tracking-[0.14em] uppercase lg:inline-block"
        aria-hidden="true"
      >
        <span className="dark:hidden">{blueprintLabel}</span>
        <span className="hidden dark:inline">{deckLabel}</span>
      </span>
    </button>
  )
}
