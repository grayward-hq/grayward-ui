import { Mail, Download } from "lucide-react";
import { pressHero } from "../../constants/press";

export default function PressHero() {
  return (
    <section
      className="relative px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center"
      style={{
        background:
          "linear-gradient(178.53deg, #FFFFFF 53.92%, #C0D7FF 198.91%)",
      }}
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="text-[36px] font-bold leading-[44px] tracking-[-1.5px] text-[#2B2B2B]/90 md:text-[64px] md:leading-[72px] md:tracking-[-2px]">
          {pressHero.title}
        </h1>

        <p className="mt-4 text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-[#2B2B2B]/90 md:text-[20px] md:leading-[32px] md:tracking-[-1px]">
          {pressHero.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <a
            href={`mailto:${pressHero.email}`}
            className="inline-flex items-center gap-3 rounded-[10px] border border-[#DCDCDC] bg-white px-4 py-2.5 text-[15px] font-normal text-[#172033] shadow-xs transition hover:border-[#0F264F] hover:shadow-sm"
          >
            <Mail className="h-5 w-5 text-[#292D32] stroke-[1.5]" />
            <span>{pressHero.email}</span>
          </a>

          <a
            href={pressHero.brandKitUrl || "#"}
            className="inline-flex items-center gap-3 rounded-[10px] border border-[#DCDCDC] bg-white px-4 py-2.5 text-[15px] font-normal text-[#2B2B2B] shadow-xs transition hover:border-[#0F264F] hover:shadow-sm"
          >
            <Download className="h-5 w-5 text-[#292D32] stroke-[1.5]" />
            <span>Download Brand kit</span>
          </a>
        </div>
      </div>
    </section>
  );
}