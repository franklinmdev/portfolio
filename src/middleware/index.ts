import { defaultLang, languages } from "@/i18n/utils"
import { defineMiddleware } from "astro:middleware"

/**
 * Astro i18n middleware.
 */

function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return []
  return header
    .split(",")
    .map((part) => (part.split(";")[0] ?? "").trim())
    .filter(Boolean)
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, search } = context.url

  // 1. Skip static assets and API routes early.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_") ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|js|css|woff2?|ttf|eot)$/)
  ) {
    return next()
  }

  const supportedLocales = Object.keys(languages)

  // 2. If the URL already contains a locale segment, do nothing.
  if (
    supportedLocales.some(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    )
  ) {
    return next()
  }

  // 3. We only ever redirect from the exact root path "/" (no locale yet).
  if (pathname !== "/") {
    return next()
  }

  // 4. If a language cookie exists and is valid, respect it.
  const cookieLocale = context.cookies.get("language")?.value
  if (
    cookieLocale &&
    supportedLocales.includes(cookieLocale as string) &&
    cookieLocale !== defaultLang
  ) {
    const destination = `/${cookieLocale}${search}`
    return Response.redirect(destination, 307)
  }

  // 5. Otherwise, inspect the Accept-Language header.
  const preferred = parseAcceptLanguage(
    context.request.headers.get("Accept-Language")
  )
  const matched = preferred
    .map((l) => l.split("-")[0] ?? "")
    .find((code) => supportedLocales.includes(code))

  if (matched && matched !== defaultLang) {
    // Remember the choice for one year.
    context.cookies.set("language", matched, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    const destination = `/${matched}${search}`
    return Response.redirect(destination, 307)
  }

  // 6. Fallback: continue without redirect (default locale).
  return next()
})
