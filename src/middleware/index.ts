import type { MiddlewareHandler } from "astro"
import { defineMiddleware } from "astro:middleware"
import type { Language } from "../i18n/utils"
import { defaultLang, languages } from "../i18n/utils"

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url
  const pathname = url.pathname

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return next()
  }

  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && firstSegment in languages) {
    return next()
  }

  const preferredLang = getUserPreferredLanguage(context)

  if (preferredLang !== defaultLang) {
    const localizedPath = `/${preferredLang}${pathname}`
    return context.redirect(localizedPath, 302)
  }

  // Redirect /en or /es (no trailing slash) to /en/ or /es/
  if ((pathname === "/en" || pathname === "/es") && !pathname.endsWith("/")) {
    return context.redirect(pathname + "/", 302)
  }

  return next()
})

function getUserPreferredLanguage(
  context: Parameters<MiddlewareHandler>[0]
): Language {
  const cookieLang = context.cookies.get("preferred-language")?.value
  if (cookieLang && cookieLang in languages) {
    return cookieLang as Language
  }

  const acceptLanguage = context.request.headers.get("accept-language")
  if (acceptLanguage) {
    const browserLang = parseBrowserLanguage(acceptLanguage)
    if (browserLang && browserLang in languages) {
      return browserLang as Language
    }
  }

  return defaultLang
}

function parseBrowserLanguage(acceptLanguage: string): string | null {
  try {
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, quality] = lang.trim().split(";")
        if (!code) return null

        const langCode = code.split("-")[0]?.toLowerCase()
        if (!langCode) return null

        const qualityValue = quality?.split("=")?.[1]

        return {
          code: langCode,
          quality: qualityValue ? parseFloat(qualityValue) : 1.0,
        }
      })
      .filter(Boolean)
      .sort((a, b) => (b?.quality || 0) - (a?.quality || 0))

    return languages.length > 0 && languages[0] ? languages[0].code : null
  } catch {
    return null
  }
}

export function setLanguagePreference(
  context: Parameters<MiddlewareHandler>[0],
  language: Language
): void {
  context.cookies.set("preferred-language", language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Allow client-side access for language switching
    sameSite: "lax",
  })
}
