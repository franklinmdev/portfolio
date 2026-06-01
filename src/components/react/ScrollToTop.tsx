import { ArrowUpIcon } from "@phosphor-icons/react"
import { useCallback, useEffect, useState } from "react"

interface ScrollToTopProps {
  label: string
}

const ScrollToTop = ({ label }: ScrollToTopProps) => {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <button
      type="button"
      id="scroll-to-top"
      className={`border-border bg-card/90 text-foreground hover:border-primary hover:text-primary focus-visible:ring-ring fixed right-4 bottom-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border shadow-lg backdrop-blur transition-all focus-visible:ring-2 focus-visible:outline-none sm:right-8 sm:bottom-12 2xl:h-14 2xl:w-14 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label={label}
      title={label}
      onClick={handleClick}
    >
      <ArrowUpIcon
        className="size-5 2xl:size-6"
        weight="bold"
        aria-hidden="true"
      />
    </button>
  )
}

export default ScrollToTop
