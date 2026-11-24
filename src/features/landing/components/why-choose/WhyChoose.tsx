"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import {
  Cpu,
  FileText,
  ShieldAlert,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

interface BenefitCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const WhyChoose: React.FC = () => {
  const benefits: BenefitCard[] = [
    {
      icon: ShieldAlert,
      title: "Catch Problems Before Customers Do",
      description:
        "Expiring SSL certificate, misconfigured DNS and exposed admin pages can break your site & lead to loss of customer trust overnight. Grayward flags these before they become incidents.",
    },
    {
      icon: SlidersHorizontal,
      title: "Prioritize the Risks That Matter",
      description:
        "Grayward helps teams cut through noisy scan results by highlighting the vulnerabilities most likely to affect real users and critical systems.",
    },
    {
      icon: Cpu,
      title: "Move Faster With AI-Assisted Triage",
      description:
        "Get clearer explanations, severity context, and suggested next steps so developers can understand security issues quickly and fix them with less back-and-forth.",
    },
    {
      icon: FileText,
      title: "Stay Ahead of Emerging Threats",
      description:
        "Track new vulnerabilities and security signals in one place, helping your team respond early before small issues become production incidents.",
    },
  ];

  return (
    <section className="relative z-[2] bg-white w-full py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-6 flex flex-col items-center justify-center text-center md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="mb-6 w-fit rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-2 text-[0.9rem] font-geist font-medium tracking-wide text-[#2B2B2B] sm:text-[1.1rem]">
            Why Choose Grayward
          </span>
          <h2 className="mb-4 w-[95%] text-2xl leading-snug font-semibold text-[#2B2B2B] sm:w-full sm:text-3xl md:text-4xl lg:text-5xl">
            See risks clearly, fix them faster,
            <br className="hidden sm:block" />
            and stay <span className="text-[#0F264F]">ahead of threats</span>
          </h2>
          <p className="mx-auto max-w-120 text-center text-[0.95rem] leading-relaxed text-[#666666] sm:text-base md:max-w-xl md:text-lg">
            No installs, no agents, no access to your hosting accounts. Just a
            domain and a minute of your time.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
              } as Variants}
              className="flex flex-col gap-5 rounded-[30px] bg-[#F4F4F5] p-6 transition-shadow duration-200 hover:shadow-md sm:p-8 md:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F264F]">
                <benefit.icon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#2B2B2B] sm:text-xl md:text-2xl">
                {benefit.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[#666666] sm:text-base md:text-lg md:leading-7">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
