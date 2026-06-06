import { Eye, AlertCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandThreat } from "../../types/compliance.types";

const STATUS_CONFIG: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  Active: {
    bg: "bg-brand-failed-bg", // #FDEBEC
    text: "text-brand-failed-text", // #D00416
    label: "Active",
  },

  Resolved: {
    bg: "bg-owasp-green-bg", // #E8F7EF
    text: "text-brand-green", // #1DAF61
    label: "Resolved",
  },
};

export function TyposquattingDomainsList({
  domains,
}: {
  domains: BrandThreat[];
}) {
  return (
    <div className="rounded-xl bg-white p-6 border border-brand-light-gray flex flex-col gap-6">
      {/* Title row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-brand-dark leading-none sm:text-2xl">
          Detected Typosquatting Domains
        </h3>
        <div className="flex items-center gap-2 text-brand-gray">
          <Eye className="h-5 w-5 text-brand-gray" strokeWidth={1.8} />
          <span className="text-sm font-normal sm:text-base">Continuous monitoring active</span>
        </div>
      </div>

      {/* List of domains */}
      <div className="flex flex-col gap-4">
        {domains.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-light-gray bg-[#FAFAFA] py-12 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm mb-4">
              <Shield className="h-6 w-6 text-brand-gray opacity-50" />
            </div>
            <h4 className="text-base font-semibold text-brand-dark">No Typosquatting Threats Found</h4>
            <p className="mt-1 text-sm text-brand-gray max-w-sm">
              We are continuously monitoring your domain. Any look-alike domains or typosquatting attempts will appear here.
            </p>
          </div>
        ) : (
          domains.map((item) => {
            const status = STATUS_CONFIG[item.status] || STATUS_CONFIG["Active"];
            
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-brand-light-gray bg-white p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left side info */}
                <div className="flex flex-col gap-4">
                  {/* Top row with domain and badges */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <AlertCircle className="h-5 w-5 text-brand-failed-text" />
                    <span className="text-base font-normal text-brand-dark">
                      {item.lookAlikeDomain}
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
                  </div>

                  {/* Subtitle details */}
                  <div className="flex items-center gap-2 text-sm text-brand-gray">
                    <span>Detected: {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Right side action button — disabled until takedown flow is wired */}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="rounded-lg bg-brand-sidebar-bg px-6 py-4 text-base font-medium text-brand-gray text-center shrink-0 min-w-[136px] h-12 flex items-center justify-center cursor-not-allowed opacity-60"
                >
                  Take Action
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
