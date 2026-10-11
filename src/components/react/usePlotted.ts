import { useCallback, useEffect, useRef, useState } from "react"

/**
 * The motion signature: a figure "plots itself" the first time it scrolls
 * into view. Returns a ref for the figure root, whether it has plotted, and
 * a replay() that resets and plots again. CSS reads [data-plotted] and
 * handles reduced motion on its own.
 */
export function usePlotted<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [plotted, setPlotted] = useState(false)
  const frame = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlotted(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const replay = useCallback(() => {
    setPlotted(false)
    cancelAnimationFrame(frame.current)
    // Two frames so the reset state paints before the transition runs.
    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame(() => setPlotted(true))
    })
  }, [])

  return { ref, plotted, replay }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}
