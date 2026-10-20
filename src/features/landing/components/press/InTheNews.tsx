import { ArrowUpRight } from "lucide-react";
import { newsItems } from "../../constants/press";

export default function InTheNews() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="mb-8 text-[26px] font-semibold leading-[36px] tracking-[-1px] text-black md:text-[32px] md:leading-[40px]">
        In the news
      </h2>

      <div className="space-y-0 divide-y divide-[#DCDCDC]">
        {newsItems.map((item) => (
          <a
            key={item.headline}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between gap-4 py-6 transition md:flex-row md:items-center hover:bg-gray-50/50 rounded-lg px-2"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-5">
                <span className="text-[17px] font-medium text-black md:text-[20px] tracking-[-0.5px]">
                  {item.source}
                </span>
                <span className="text-[15px] font-normal text-[#888888] md:text-[18px] tracking-[-0.5px]">
                  {item.date}
                </span>
              </div>
              <p className="text-[15px] font-normal text-[#4B5568] md:text-[18px] tracking-[-0.5px] group-hover:text-black transition-colors">
                {item.headline}
              </p>
            </div>

            <div className="flex items-center justify-end">
              <ArrowUpRight className="h-6 w-6 text-[#292D32] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}