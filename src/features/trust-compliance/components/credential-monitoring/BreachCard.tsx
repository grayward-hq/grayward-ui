import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  BreachSeverity,
  BreachActionStatus,
  CredentialBreach,
} from "../../data/credential-data";

// ── Severity config ────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<
  BreachSeverity,
  { bg: string; text: string; label: string }
> = {
  critical: {
    bg: "bg-brand-failed-bg",
    text: "text-brand-failed-text",
    label: "Critical",
  },
  high: {
    bg: "bg-brand-risk-high-bg",
    text: "text-brand-risk-high",
    label: "High",
  },
  medium: {
    bg: "bg-owasp-warn-bg",
    text: "text-scan-yellow-900",
    label: "Medium",
  },
  low: {
    bg: "bg-owasp-blue-bg",
    text: "text-owasp-blue",
    label: "Low",
  },
};

// ── Action status config ───────────────────────────────────────────────────

const ACTION_CONFIG: Record<
  BreachActionStatus,
  { bg: string; text: string; label: string }
> = {
  "password reset": {
    bg: "bg-owasp-green-bg",
    text: "text-brand-green",
    label: "password reset",
  },
  notified: {
    bg: "bg-[#EBEEFD]",
    text: "text-[#263FA5]",
    label: "notified",
  },
  investigating: {
    bg: "bg-owasp-warn-bg",
    text: "text-scan-yellow-900",
    label: "investigating",
  },
  resolved: {
    bg: "bg-owasp-green-bg",
    text: "text-brand-green",
    label: "resolved",
  },
};

export function BreachCard({ breach }: { breach: CredentialBreach }) {
  const sev = SEVERITY_CONFIG[breach.severity];
  const action = ACTION_CONFIG[breach.actionStatus];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-brand-light-gray bg-brand-dashboard-bg p-6">
      {/* Top row: email + severity + action status */}
      <div className="flex flex-wrap items-center gap-4">
        <Mail className="h-6 w-6 shrink-0 text-brand-dark" strokeWidth={1.5} />
        <span className="text-base font-normal text-brand-dark">
          {breach.email}
        </span>
        {/* Severity badge */}
        <span
          className={cn(
            "rounded-[9.6px] px-3.5 py-2 text-sm font-medium leading-none",
            sev.bg,
            sev.text
          )}
        >
          {sev.label}
        </span>
        {/* Action status badge */}
        <span
          className={cn(
            "rounded px-3 py-2 text-xs font-semibold leading-none",
            action.bg,
            action.text
          )}
        >
          {action.label}
        </span>
      </div>

      {/* Breach source */}
      <p className="text-sm text-brand-gray tracking-wide">
        Breach:{" "}
        <span>
          {breach.breachSource} ({breach.breachDate})
        </span>
      </p>

      {/* Exposed data tags */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-brand-gray">Exposed Data:</span>
        <div className="flex flex-wrap gap-3">
          {breach.exposedData.map((tag) => (
            <span
              key={tag}
              className="rounded border border-brand-light-gray bg-white px-3 py-1.5 text-sm text-brand-gray"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* View Details button */}
      <div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="rounded-lg border border-scan-primary-900 px-6 py-3.5 text-base font-semibold text-scan-primary-900 cursor-not-allowed opacity-70"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
