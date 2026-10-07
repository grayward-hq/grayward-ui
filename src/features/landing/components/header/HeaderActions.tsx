"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FEATURE_FLAGS } from "@/constants/feature-flags";

export function HeaderActions() {
  const pathname = usePathname();

  // The waitlist CTA is suppressed on Home and Waitlist — those pages have
  // their own in-page CTA, so a duplicate in the header is noise.
  const isCtaSuppressedPage =
    pathname === ROUTES.HOME || pathname === ROUTES.WAITLIST;

  const showLogin = FEATURE_FLAGS.SHOW_LOGIN_BUTTON;
  const showJoinWaitlist =
    FEATURE_FLAGS.SHOW_JOIN_WAITLIST_BUTTON && !isCtaSuppressedPage;

  if (!showLogin && !showJoinWaitlist) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {showLogin && (
        <Link
          href={ROUTES.LOGIN}
          className="text-primary flex h-11 items-center justify-center gap-1.5
           rounded-xl px-6 py-3 text-base leading-6 font-medium
           transition-all duration-400 hover:bg-primary/10"
        >
          Login
        </Link>
      )}

      {showJoinWaitlist && (
        <Link
          href={`${ROUTES.WAITLIST}#waitlist-form`}
          className="border-primary text-primary flex h-11 items-center
           justify-center gap-1.5 rounded-xl border-2 bg-white px-6 py-3
           text-base leading-6 font-medium transition-all duration-400
           hover:bg-primary hover:text-white"
        >
          Join Waitlist
        </Link>
      )}
    </div>
  );
}
