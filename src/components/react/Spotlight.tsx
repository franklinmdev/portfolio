import { useRef, useCallback, useEffect } from "react"

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)

  const updateSpotlight = useCallback((e: MouseEvent) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--x", `${e.clientX}px`)
        spotlightRef.current.style.setProperty("--y", `${e.clientY}px`)
      }
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "1"
    }
    document.addEventListener("mousemove", updateSpotlight)
  }, [updateSpotlight])

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0"
    }
    document.removeEventListener("mousemove", updateSpotlight)
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }
  }, [updateSpotlight])

  useEffect(() => {
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousemove", updateSpotlight)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleMouseEnter, handleMouseLeave, updateSpotlight])

  return <div ref={spotlightRef} className="spotlight-effect" />
}
