import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSafeReturnUrl(url: string | null, fallback = "/dashboard"): string {
  if (!url) return fallback;
  // Reject absolute URLs or protocol-relative URLs
  if (url.startsWith('//') || url.includes('://')) return fallback;
  // Accept relative paths starting with a single slash
  if (url.startsWith('/')) return url;
  return fallback;
}

/**
 * Turns an API status value into human-readable label text.
 *
 * The waitlist API returns PascalCase values such as "EmailConfirmed", which
 * should read as "Email Confirmed" in the UI. Acronyms are kept together
 * ("IDVerified" -> "ID Verified"), snake_case and kebab-case are handled, and
 * a value that is already spaced passes through unchanged — so an unrecognised
 * status from the backend still renders sensibly rather than breaking.
 */
export function formatStatusLabel(status: string): string {
  return status
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}
