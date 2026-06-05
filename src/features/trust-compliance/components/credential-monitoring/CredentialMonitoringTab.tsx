import { CheckCircle } from "lucide-react";
import { useId } from "react";
import {
  CREDENTIAL_STATS,
  CREDENTIAL_BREACHES,
} from "../../data/credential-data";
import { BreachCard } from "./BreachCard";

// ── Tab ────────────────────────────────────────────────────────────────────

export function CredentialMonitoringTab() {
  const clipId = useId();
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
              <g clipPath={`url(#${clipId})`}>
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
                <clipPath id={clipId}>
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
