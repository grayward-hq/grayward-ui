import { Eye, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TyposquattingDomain, TyposquattingStatus } from "../../data/phishing-data";

const STATUS_CONFIG: Record<
  TyposquattingStatus,
  { bg: string; text: string; label: string }
> = {
  active: {
    bg: "bg-brand-failed-bg", // #FDEBEC
    text: "text-brand-failed-text", // #D00416
    label: "active",
  },
  monitoring: {
    bg: "bg-owasp-warn-bg", // #FFFBF0
    text: "text-scan-yellow-900", // #B27F06
    label: "monitoring",
  },
  "taken down": {
    bg: "bg-owasp-green-bg", // #E8F7EF
    text: "text-brand-green", // #1DAF61
    label: "taken down",
  },
};

export function TyposquattingDomainsList({
  domains,
}: {
  domains: TyposquattingDomain[];
}) {
  return (
    <div className="rounded-xl bg-white p-6 border border-brand-light-gray flex flex-col gap-6">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-brand-dark leading-none">
          Detected Typosquatting Domains
        </h3>
        <div className="flex items-center gap-4 text-brand-gray">
          <Eye className="h-6 w-6 text-brand-gray" strokeWidth={1.8} />
          <span className="text-base font-normal">Continuous monitoring active</span>
        </div>
      </div>

      {/* List of domains */}
      <div className="flex flex-col gap-4">
        {domains.map((item) => {
          const status = STATUS_CONFIG[item.status];
          return (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center justify-between rounded-xl border border-brand-light-gray bg-white p-6 gap-4"
            >
              {/* Left side info */}
              <div className="flex flex-col gap-4">
                {/* Top row with domain and badges */}
                <div className="flex items-center gap-4 flex-wrap">
                  <AlertCircle className="h-5 w-5 text-brand-failed-text" />
                  <span className="text-base font-normal text-brand-dark">
                    {item.domain}
                  </span>
                  {/* Status Badge */}
                  <span
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-normal leading-none capitalize",
                      status.bg,
                      status.text
                    )}
                  >
                    {status.label}
                  </span>
                  {/* High Risk Badge */}
                  <span className="rounded-lg bg-brand-sidebar-bg px-3 py-2 text-sm font-normal leading-none text-brand-gray">
                    High Risk
                  </span>
                </div>

                {/* Subtitle details */}
                <div className="flex items-center gap-2 text-sm text-brand-gray">
                  <span>Similarity: {item.similarity}</span>
                  <span className="h-2 w-2 rounded-full bg-brand-gray opacity-50" />
                  <span>Detected: {item.detectedDate}</span>
                </div>
              </div>

              {/* Right side action button */}
              <button
                type="button"
                className="rounded-lg bg-brand-sidebar-bg px-6 py-4 text-base font-medium text-brand-gray transition-opacity hover:opacity-95 text-center shrink-0 min-w-[136px] h-12 flex items-center justify-center cursor-pointer"
              >
                Take Action
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
