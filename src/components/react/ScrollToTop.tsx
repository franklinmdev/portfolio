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
      className={`border-rule-strong bg-background text-muted-foreground hover:text-foreground fixed right-4 bottom-6 flex size-11 cursor-pointer items-center justify-center rounded-[2px] border transition-[opacity,transform,color] duration-200 sm:right-8 sm:bottom-8 ${
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
