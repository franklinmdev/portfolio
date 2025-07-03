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
