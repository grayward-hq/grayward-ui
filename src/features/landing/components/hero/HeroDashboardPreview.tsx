"use client";

import { motion } from "motion/react";
import Image from 'next/image';

// Static imports give content-hashed URLs, so a replaced image is never served from a stale cache
import heroDesktop from '../../assets/hero-image-desktop.png';
import heroMobile from '../../assets/hero-image-mobile.png';

export function HeroDashboardPreview() {
  return (
    <motion.div
      className='relative mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 md:px-0 md:mt-6'
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
    >
      {/* Desktop Image */}
      <Image
        src={heroDesktop}
        alt='Grayward Dashboard Preview'
        className='hidden h-auto w-full object-contain md:block drop-shadow-[0_24px_50px_rgba(15,38,79,0.16)]'
        priority
      />

      {/* Mobile Image */}
      <Image
        src={heroMobile}
        alt='Grayward Mobile Dashboard Preview'
        className='block h-auto w-full object-cover object-top md:hidden drop-shadow-[0_16px_36px_rgba(15,38,79,0.14)]'
        priority
      />
    </motion.div>
  );
}
