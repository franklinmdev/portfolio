import { useCallback, useEffect, useRef } from "react"

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)

  const updateSpotlight = useCallback((e: MouseEvent) => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      const element = spotlightRef.current
      if (element) {
        element.style.setProperty("--x", `${e.clientX}px`)
        element.style.setProperty("--y", `${e.clientY}px`)
      }
      rafId.current = null
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    const element = spotlightRef.current
    if (element) {
      element.style.opacity = "1"
    }
    document.addEventListener("mousemove", updateSpotlight)
  }, [updateSpotlight])

  const handleMouseLeave = useCallback(() => {
    const element = spotlightRef.current
    if (element) {
      element.style.opacity = "0"
    }
    document.removeEventListener("mousemove", updateSpotlight)

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [updateSpotlight])

  useEffect(() => {
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousemove", updateSpotlight)

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [handleMouseEnter, handleMouseLeave, updateSpotlight])

  return <div ref={spotlightRef} className="spotlight-effect" />
}
