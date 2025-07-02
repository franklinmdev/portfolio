import { useEffect, useState } from "react"
import CustomLoader from "./CustomLoader"

export default function PageLoader({
  loadingText = "Loading...",
}: {
  loadingText?: string
}) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let loadingTimer: NodeJS.Timeout
    let currentPath = window.location.pathname

    const startLoading = () => {
      setIsLoading(true)
    }

    const stopLoading = () => {
      clearTimeout(loadingTimer)
      loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 200)
    }

    // Only show loading for actual page navigation, not hash changes
    const handleBeforeUnload = () => startLoading()

    const handleLoad = () => stopLoading()

    // Smart navigation detection - only show loading for real page changes
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return

      // Language switching - always show loading
      if (
        target.hasAttribute("data-lang-switch") ||
        link.hasAttribute("data-lang-switch")
      ) {
        startLoading()
        return
      }

      const href = link.getAttribute("href")
      if (!href) return

      // External links - show loading
      if (href.startsWith("http")) {
        startLoading()
        return
      }

      // Same-page hash navigation - NO loading
      if (href.startsWith("#")) {
        return
      }

      // Cross-page navigation - show loading
      const [targetPath] = href.split("#")
      if (targetPath && targetPath !== currentPath) {
        startLoading()
      }
    }

    // Handle browser back/forward - only if path actually changes
    const handlePopState = () => {
      const newPath = window.location.pathname
      if (newPath !== currentPath) {
        currentPath = newPath
        startLoading()
        setTimeout(stopLoading, 300)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("load", handleLoad)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("click", handleClick)

    return () => {
      clearTimeout(loadingTimer)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("load", handleLoad)
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="bg-opacity-90 fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111] backdrop-blur-sm">
      <div className="text-center">
        <CustomLoader size="lg" className="mx-auto mb-4" />
        <p className="animate-pulse text-sm text-zinc-400">{loadingText}</p>
      </div>
    </div>
  )
}
