import Link from "next/link";
import { pressReleases } from "../../constants/press";

export default function PressRelease() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-4 pb-20 md:pb-28">
      <h2 className="mb-8 text-[26px] font-semibold leading-[36px] tracking-[-1px] text-black md:text-[32px] md:leading-[40px]">
        Press release
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pressReleases.map((release) => (
          <article
            key={release.title}
            className="flex flex-col justify-between rounded-[12px] border border-[#DCDCDC] bg-white p-6 md:p-7 transition hover:shadow-md hover:border-[#0F264F]/40"
          >
            <div className="space-y-3">
              <p className="text-[15px] font-normal text-[#888888] md:text-[17px] tracking-[-0.5px]">
                {release.date}
              </p>

              <h3 className="text-[17px] font-normal leading-[26px] tracking-[-0.5px] text-[#2B2B2B]/90 md:text-[19px] md:leading-[30px]">
                {release.title}
              </h3>
            </div>

            <div className="mt-6 pt-2">
              <Link
                href={release.url}
                className="text-[16px] font-normal text-[#0F264F] underline underline-offset-4 transition hover:text-[#0a1b38] md:text-[18px]"
              >
                Read release
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}