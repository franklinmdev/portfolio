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

    const startLoading = () => {
      setIsLoading(true)
    }

    const stopLoading = () => {
      loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    const handleBeforeUnload = () => startLoading()
    const handleLoad = () => stopLoading()

    const handlePopState = () => {
      startLoading()
      setTimeout(stopLoading, 500)
    }

    const handleLangSwitch = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.hasAttribute("data-lang-switch")) {
        startLoading()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("load", handleLoad)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("click", handleLangSwitch)

    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      startLoading()
      originalPushState.apply(history, args)
      setTimeout(stopLoading, 300)
    }

    history.replaceState = function (...args) {
      startLoading()
      originalReplaceState.apply(history, args)
      setTimeout(stopLoading, 300)
    }

    return () => {
      clearTimeout(loadingTimer)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("load", handleLoad)
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleLangSwitch)

      history.pushState = originalPushState
      history.replaceState = originalReplaceState
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
