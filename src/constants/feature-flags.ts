/**
 * Feature flags for showing / hiding UI that is built but not yet launched.
 *
 * Driven by NEXT_PUBLIC_* environment variables so visibility can be set per
 * environment (e.g. Login on in staging, off in production) without a code
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
 * Strips surrounding quotes, but only in *matching* pairs.
 *
 * A .env loader removes quotes itself, while a value typed into a hosting
 * dashboard keeps them as literal characters — so `NEXT_PUBLIC_X="true"` has
 * to mean the same thing in both places.
 *
 * Only a pair of identical quote characters is removed. A value with a stray
 * or mismatched quote (`true"`, `'true"`) is deliberately left untouched so it
 * fails the comparison in `isEnabled` and the flag stays off. Stripping each
 * boundary independently would turn `true"` into `true` and switch a feature
 * on from a malformed value.
 */
function stripMatchingQuotes(value: string): string {
  let result = value;

  while (result.length >= 2) {
    const first = result[0];
    const last = result[result.length - 1];

    if ((first === '"' || first === "'") && first === last) {
      result = result.slice(1, -1).trim();
      continue;
    }

    break;
  }

  return result;
}

/**
 * Parses an env var into a boolean.
 *
 * Anything other than "true" (case-insensitive, trimmed, optionally wrapped in
 * one matching quote pair) is treated as false, so a typo or a malformed value
 * fails closed rather than exposing an unlaunched feature. An unset or empty
 * var falls back to `fallbackWhenUnset`, which keeps local development working
 * with no .env file present.
 */
function isEnabled(
  value: string | undefined,
  fallbackWhenUnset: boolean,
): boolean {
  if (value === undefined) {
    return fallbackWhenUnset;
  }

  const normalised = stripMatchingQuotes(value.trim()).toLowerCase();

  if (normalised === "") {
    return fallbackWhenUnset;
  }

  return normalised === "true";
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
