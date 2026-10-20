"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function TrustTransparency() {
  return (
    <section className="bg-[#C0D7FF] relative w-full py-16 md:py-24">
      <motion.div
        className="mx-auto flex w-full max-w-360 flex-col items-center gap-6 px-5 text-center md:gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="inline-flex items-center rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-2 text-[18px] font-medium text-[#2B2B2B]">
          Trust & Transparency
        </span>

        <h2 className="font-geist max-w-[900px] text-center text-[32px] leading-[40px] font-semibold tracking-tight text-white md:text-[56px] md:leading-[64px]">
          Your <span className="text-[#0F264F]">Website</span> could be <br />
          compromised <span className="text-[#0F264F]">right now</span>
        </h2>

        <p className="font-geist text-white max-w-[659px] text-center text-lg font-normal md:text-[24px]">
          Find out in under 60 seconds
        </p>

        <Link
          href={`${ROUTES.WAITLIST}#waitlist-form`}
          className="font-inter bg-[#0F264F] border border-[#C0D7FF] inline-flex h-[54px] w-full
          max-w-[230px] items-center justify-center gap-2 rounded-[12px]
          text-[18px] font-semibold text-[#F9F9F9] shadow-lg transition-all duration-200
          hover:bg-[#0a1b38] hover:scale-105"
        >
          Start Free Scan
          <ArrowRight className="h-5 w-5 text-white stroke-[2.2px]" />
        </Link>
      </motion.div>
    </section>
  );
}
