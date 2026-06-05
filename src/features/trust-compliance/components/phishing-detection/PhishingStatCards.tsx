import type { PhishingStat } from "../../data/phishing-data";

export function PhishingStatCards({ stats }: { stats: PhishingStat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between rounded-xl border border-brand-light-gray bg-white p-6 h-[120px]"
        >
          <span className="text-[32px] font-semibold leading-none text-brand-dark tracking-wide">
            {stat.value}
          </span>
          <span className="text-base font-normal text-brand-gray tracking-wide">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
