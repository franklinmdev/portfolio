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
    let shouldShowLoaderOnUnload = true
    let currentPath = window.location.pathname.endsWith("/")
      ? window.location.pathname
      : window.location.pathname + "/"

    // Reset loading state on mount (handles Back-Forward Cache)
    setIsLoading(false)

    const startLoading = () => {
      setIsLoading(true)
    }

    const stopLoading = () => {
      clearTimeout(loadingTimer)
      loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 200)
    }

    // Check if page is already loaded when component mounts
    if (document.readyState === "complete") {
      stopLoading()
    }

    // Only show loading for actual page navigation, not hash changes
    const handleBeforeUnload = () => {
      if (shouldShowLoaderOnUnload) {
        startLoading()
      }
    }

    const handleLoad = () => stopLoading()

    // Smart navigation detection - only show loading for real page changes
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return

      // Language switching: always show loading
      if (
        target.hasAttribute("data-lang-switch") ||
        link.hasAttribute("data-lang-switch")
      ) {
        startLoading()
        return
      }

      const href = link.getAttribute("href")
      if (!href) return

      // Skip loader for links that open in new tab
      const linkTarget = link.getAttribute("target")
      if (linkTarget === "_blank" || linkTarget === "_new") {
        return
      }

      // Skip loader for mailto:, tel:, and other protocol links
      if (/^(mailto:|tel:|sms:|whatsapp:)/i.test(href)) {
        // Disable beforeunload loader temporarily
        shouldShowLoaderOnUnload = false
        setTimeout(() => {
          shouldShowLoaderOnUnload = true
        }, 100)
        return
      }

      // External absolute URL (starts with http)
      if (/^https?:\/\//i.test(href)) {
        startLoading()
        return
      }

      // Compare pathnames (ignore trailing slashes)
      const tempAnchor = document.createElement("a")
      tempAnchor.href = href
      const targetPathname = tempAnchor.pathname.replace(/\/+$/, "") || "/"
      const currentPathname =
        window.location.pathname.replace(/\/+$/, "") || "/"

      // Same-page navigation: no loader
      if (targetPathname === currentPathname) {
        return
      }

      // Different page within site: start loader
      startLoading()
    }

    // Handle browser back/forward - only if path actually changes
    const handlePopState = () => {
      const newPath = window.location.pathname.endsWith("/")
        ? window.location.pathname
        : window.location.pathname + "/"

      if (newPath !== currentPath) {
        currentPath = newPath
        // Don't start loading if already loading
        if (!isLoading) {
          startLoading()
        }
        // Ensure we stop loading after navigation completes
        requestAnimationFrame(() => {
          if (document.readyState === "complete") {
            stopLoading()
          }
        })
      }
    }

    // Handle page visibility changes (for Back-Forward Cache)
    const handleVisibilityChange = () => {
      if (!document.hidden && isLoading) {
        // Page became visible and loader is stuck - stop it
        stopLoading()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("load", handleLoad)
    window.addEventListener("popstate", handlePopState)
    window.addEventListener("pageshow", handleLoad)
    document.addEventListener("click", handleClick)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearTimeout(loadingTimer)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("load", handleLoad)
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("pageshow", handleLoad)
      document.removeEventListener("click", handleClick)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
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
