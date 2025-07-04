import { useCallback, useEffect, useState } from "react"

const ScrollToTop = () => {
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
      className={`fixed right-4 bottom-4 flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition-all hover:bg-violet-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none sm:right-8 sm:bottom-8 2xl:h-14 2xl:w-14 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 2xl:h-7 2xl:w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

export default ScrollToTop
