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
          className="border-[#0F264F] text-[#2A2A2A] flex h-11 items-center justify-center gap-1.5
           rounded-xl border bg-white px-6 py-3 text-base leading-6 font-medium
           transition-all duration-400 hover:bg-[#0F264F]/5"
        >
          Login
        </Link>
      )}

      {showJoinWaitlist && (
        <Link
          href={`${ROUTES.WAITLIST}#waitlist-form`}
          className="border-[#C0D7FF] bg-[#0F264F] text-white flex h-11 items-center
           justify-center gap-1.5 rounded-xl border px-6 py-3
           text-base leading-6 font-medium transition-all duration-400
           hover:bg-[#0a1b38]"
        >
          Join Waitlist
        </Link>
      )}
    </div>
  );
}
