import { getRelativeLocaleUrl } from "astro:i18n"
import enTranslations from "./en.json"
import esTranslations from "./es.json"

// Supported languages
export const languages = {
  en: "English",
  es: "Español",
} as const

export const defaultLang = "en"

// Type definitions
export type Language = keyof typeof languages
export type TranslationKey = keyof typeof enTranslations

// Translations object
export const ui = {
  en: enTranslations,
  es: esTranslations,
} as const

/**
 * Extract language from URL pathname using Astro's routing logic
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split("/")
  if (lang && lang in ui) return lang as Language
  return defaultLang
}

/**
 * Get nested translation value using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  try {
    const result = path.split(".").reduce<unknown>((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return (current as Record<string, unknown>)[key]
      }
      return undefined
    }, obj)
    return typeof result === "string" ? result : ""
  } catch {
    return ""
  }
}

/**
 * Create translation function for a specific language
 */
export function createTranslations(lang: Language) {
  return function t(key: string): string {
    const translation = getNestedValue(ui[lang], key)
    if (translation) return translation

    // Fallback to default language if translation not found
    const fallback = getNestedValue(ui[defaultLang], key)
    if (fallback) return fallback

    // Return key if no translation found
    return key
  }
}

/**
 * Get translation function from URL
 */
export function getTranslationFromUrl(url: URL) {
  const lang = getLangFromUrl(url)
  return createTranslations(lang)
}

/**
 * Generate localized route URLs using Astro's built-in helper
 * This replaces the custom getLocalizedUrl function
 */
export function getLocalizedUrl(path: string, lang: Language): string {
  return getRelativeLocaleUrl(lang, path)
}

/**
 * Get all available language routes for current path
 */
export function getLanguageRoutes(currentPath: string) {
  return (Object.keys(languages) as Language[]).map((lang) => ({
    code: lang,
    name: languages[lang],
    url: getLocalizedUrl(currentPath, lang),
  }))
}

/**
 * Remove locale prefix from path
 */
export function removeLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length > 0 && segments[0] && segments[0] in languages) {
    return "/" + segments.slice(1).join("/")
  }
  return pathname
}

/**
 * Check if current locale is default
 */
export function isDefaultLocale(lang: Language): boolean {
  return lang === defaultLang
}
