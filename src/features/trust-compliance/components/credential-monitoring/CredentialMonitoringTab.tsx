import { Mail, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  BreachSeverity,
  BreachActionStatus,
  CredentialBreach,
} from "../../data/credential-data";
import {
  CREDENTIAL_STATS,
  CREDENTIAL_BREACHES,
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

// ── Breach card ────────────────────────────────────────────────────────────

function BreachCard({ breach }: { breach: CredentialBreach }) {
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

// ── Tab ────────────────────────────────────────────────────────────────────

export function CredentialMonitoringTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CREDENTIAL_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-6 rounded-xl border border-brand-light-gray bg-white p-6"
          >
            <span className="text-[32px] font-semibold leading-8 tracking-wide text-brand-dark">
              {stat.value}
            </span>
            <span className="text-base font-normal tracking-wide text-brand-gray">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Dark Web Monitoring banner ── */}
      <div className="flex items-start justify-between gap-6 rounded-xl border border-brand-light-gray bg-white px-6 py-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-owasp-green-bg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7953_34605)">
                <path
                  d="M12 3.19L19 6.3V11C19 15.52 16.02 19.69 12 20.93C7.98 19.69 5 15.52 5 11V6.3L12 3.19ZM12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
                  fill="#1DAF61"
                />
                <path
                  d="M11.7997 17.8992L11.7996 17.7L10.2 12L11.7997 17.8992Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_7953_34605">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {/* Text */}
          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold tracking-wide text-brand-dark">
              Dark Web Monitoring Active
            </p>
            <p className="text-base font-normal leading-6 tracking-wide text-brand-gray">
              We continuously scan dark web databases and breach repositories for
              exposed employees credentials. Alerts are sent immediately when
              compromised data is detected.
            </p>
          </div>
        </div>
        {/* Check icon */}
        <CheckCircle
          className="h-6 w-6 shrink-0 text-brand-green mt-1"
          strokeWidth={2}
        />
      </div>

      {/* ── Detected Credential Breaches ── */}
      <div className="flex flex-col gap-6 rounded-xl border border-brand-light-gray bg-white p-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-brand-dark">
            Detected Credential Breaches
          </h3>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="text-base font-medium text-scan-primary-900 cursor-not-allowed opacity-70 whitespace-nowrap"
          >
            View All Monitored Email
          </button>
        </div>

        {/* Breach cards */}
        <div className="flex flex-col gap-4">
          {CREDENTIAL_BREACHES.map((breach) => (
            <BreachCard key={breach.id} breach={breach} />
          ))}
        </div>
      </div>
    </div>
  );
}
