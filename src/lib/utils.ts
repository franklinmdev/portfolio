import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type SupportedLocale = "en" | "es"

export function formatDate(date: Date, locale: SupportedLocale): string {
  const localeMap: Record<SupportedLocale, string> = {
    en: "en-US",
    es: "es-ES",
  }

  return new Intl.DateTimeFormat(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}

/**
 * Build a ≤160-char meta description from a project's `description` field,
 * truncating with an ellipsis for SEO.
 */
export function getProjectMetaDescription(
  description: string | string[]
): string {
  const text = Array.isArray(description) ? (description[0] ?? "") : description
  return text.length > 160 ? text.slice(0, 157).trimEnd() + "…" : text
}
