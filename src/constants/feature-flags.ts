/**
 * Feature flags for showing / hiding UI that is built but not yet launched.
 *
 * Driven by NEXT_PUBLIC_* environment variables so visibility can be set per
 * environment (e.g. Login on in preview, off in production) without a code
 * change. Set a var to "true" to show the element, "false" to hide it.
 *
 * IMPORTANT — NEXT_PUBLIC_* values are inlined at BUILD time, not read at
 * runtime. Changing one in the hosting dashboard requires a rebuild/redeploy
 * before it takes effect. See the "Bundling environment variables for the
 * browser" section of the Next.js environment-variables guide.
 *
 * Each var must be referenced statically as `process.env.NEXT_PUBLIC_X`.
 * Dynamic lookups (`process.env[name]`) are NOT inlined and will read as
 * undefined in the browser, so do not refactor these into a loop.
 */

/**
 * Parses an env var into a boolean.
 *
 * Anything other than "true" (case-insensitive, trimmed) is treated as false,
 * so a typo fails closed rather than silently exposing an unlaunched feature.
 * An unset or empty var falls back to `fallbackWhenUnset`, which keeps local
 * development working with no .env file present.
 */
function isEnabled(
  value: string | undefined,
  fallbackWhenUnset: boolean,
): boolean {
  if (value === undefined || value.trim() === "") {
    return fallbackWhenUnset;
  }

  return value.trim().toLowerCase() === "true";
}

export const FEATURE_FLAGS = {
  /** Header "Login" button. Turn on when auth is ready for public traffic. */
  SHOW_LOGIN_BUTTON: isEnabled(
    process.env.NEXT_PUBLIC_SHOW_LOGIN_BUTTON,
    false,
  ),

  /** Header / mobile-menu "Join Waitlist" button. */
  SHOW_JOIN_WAITLIST_BUTTON: isEnabled(
    process.env.NEXT_PUBLIC_SHOW_JOIN_WAITLIST_BUTTON,
    false,
  ),

  /** "Join Waitlist" CTA in the waitlist page hero (scrolls to the form). */
  SHOW_WAITLIST_HERO_CTA: isEnabled(
    process.env.NEXT_PUBLIC_SHOW_WAITLIST_HERO_CTA,
    true,
  ),
} as const;
