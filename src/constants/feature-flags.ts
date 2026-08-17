/**
 * Feature flags for showing / hiding UI that is built but not yet launched.
 *
 * Flip a value to `true` to turn the element on, `false` to turn it off.
 * These are plain booleans (not env vars) so a toggle is a one-word edit and
 * works the same in server and client components.
 */
export const FEATURE_FLAGS = {
  /** Header "Login" button. Turn on when auth is ready for public traffic. */
  SHOW_LOGIN_BUTTON: false,

  /** Header / mobile-menu "Join Waitlist" button. */
  SHOW_JOIN_WAITLIST_BUTTON: false,

  /** "Join Waitlist" CTA in the waitlist page hero (scrolls to the form). */
  SHOW_WAITLIST_HERO_CTA: true,
} as const;
