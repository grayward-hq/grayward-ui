"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  OWASPItem,
  OWASPFinding,
  OWASPStatus,
  Severity,
} from "../../data/owasp-data";

// ── Status config — all Tailwind classes live here ─────────────────────────

type StatusConfig = {
  icon: React.ReactNode;
  iconWrap: string;
  badge: string;
  badgeText: string;
  border: string;
  label: string;
};

const STATUS_CONFIG: Record<OWASPStatus, StatusConfig> = {
  compliant: {
    icon: <CheckCircle2 className="h-5 w-5 text-brand-green" strokeWidth={1.8} />,
    iconWrap: "bg-owasp-green-bg",
    badge: "bg-owasp-green-bg",
    badgeText: "text-brand-green",
    border: "border-brand-light-gray",
    label: "Compliant",
  },
  "needs-attention": {
    icon: <AlertTriangle className="h-5 w-5 text-scan-yellow-900" strokeWidth={1.8} />,
    iconWrap: "bg-owasp-warn-bg",
    badge: "bg-owasp-warn-bg",
    badgeText: "text-scan-yellow-900",
    border: "border-owasp-warn-bg",
    label: "needs attention",
  },
  "non-compliant": {
    icon: <AlertTriangle className="h-5 w-5 text-brand-failed-text" strokeWidth={1.8} />,
    iconWrap: "bg-brand-failed-bg",
    badge: "bg-brand-failed-bg",
    badgeText: "text-brand-failed-text",
    border: "border-brand-failed-bg",
    label: "Non-compliant",
  },
};

// ── Severity config ────────────────────────────────────────────────────────

type SeverityConfig = { wrap: string; text: string; label: string };

const SEVERITY_CONFIG: Record<Severity, SeverityConfig> = {
  medium: { wrap: "bg-owasp-warn-bg", text: "text-scan-yellow-900", label: "Medium" },
  low: { wrap: "bg-owasp-blue-bg", text: "text-owasp-blue", label: "Low" },
  high: { wrap: "bg-brand-risk-high-bg", text: "text-brand-risk-high", label: "High" },
  critical: {
    wrap: "bg-brand-risk-critical-bg",
    text: "text-brand-risk-critical",
    label: "Critical",
  },
};

// ── Finding row ────────────────────────────────────────────────────────────

function FindingRow({ finding }: { finding: OWASPFinding }) {
  const sev = SEVERITY_CONFIG[finding.severity];
  return (
    <div className="flex items-start gap-4 rounded-lg border border-brand-light-gray p-6">
      <span
        className={cn(
          "shrink-0 rounded-[9.6px] px-3 py-2 text-sm font-medium",
          sev.wrap,
          sev.text
        )}
      >
        {sev.label}
      </span>
      <div className="flex flex-col gap-4">
        <p className="text-base font-semibold text-brand-dark">{finding.title}</p>
        <p className="text-sm text-brand-gray">Location: {finding.location}</p>
      </div>
    </div>
  );
}

// ── OWASP row (expandable) ─────────────────────────────────────────────────

export function OWASPRiskItem({
  item,
  defaultOpen = false,
}: {
  item: OWASPItem;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const cfg = STATUS_CONFIG[item.status];

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border", cfg.border)}>
      {/* ── Clickable header ── */}
      <button
        type="button"
        id={`owasp-${item.id}-btn`}
        aria-expanded={open}
        aria-controls={`owasp-${item.id}-panel`}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start gap-6 bg-owasp-card-subtle p-6 text-left transition-colors hover:bg-white"
      >
        {/* Status icon */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px]",
            cfg.iconWrap
          )}
        >
          {cfg.icon}
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* Code + title + badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-base font-medium text-brand-gray">{item.code}</span>
            <span className="text-[18px] font-semibold leading-[18px] text-brand-dark">
              {item.title}
            </span>
            <span
              className={cn(
                "rounded-[4px] px-3 py-1.5 text-xs font-semibold",
                cfg.badge,
                cfg.badgeText
              )}
            >
              {cfg.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-base font-medium leading-6 text-brand-gray">
            {item.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-gray">
            <span>
              Scan:{" "}
              <strong className="font-semibold text-brand-dark">{item.scanVersion}</strong>
            </span>
            <span>
              Findings:{" "}
              <strong className="font-semibold text-brand-dark">{item.findingsCount}</strong>
            </span>
            <span>
              Compliance:{" "}
              <strong className="font-semibold text-brand-dark">
                {item.compliancePercent}%
              </strong>
            </span>
          </div>
        </div>

        {/* Chevron */}
        <div className="mt-1 shrink-0">
          {open ? (
            <ChevronUp className="h-6 w-6 text-scan-primary-900" strokeWidth={2} />
          ) : (
            <ChevronDown className="h-6 w-6 text-scan-primary-900" strokeWidth={2} />
          )}
        </div>
      </button>

      {/* ── Compliant footer (no findings) ── */}
      {open && item.status === "compliant" && item.findings.length === 0 && (
        <div
          id={`owasp-${item.id}-panel`}
          role="region"
          aria-labelledby={`owasp-${item.id}-btn`}
          className="flex items-center gap-4 bg-owasp-compliant-bg px-6 py-4"
        >
          <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-green" strokeWidth={1.8} />
          <span className="text-base text-brand-green">
            No findings detected – Fully compliant
          </span>
        </div>
      )}

      {/* ── Findings list (needs-attention / non-compliant) ── */}
      {open && item.findings.length > 0 && item.status !== "compliant" && (
        <div
          id={`owasp-${item.id}-panel`}
          role="region"
          aria-labelledby={`owasp-${item.id}-btn`}
          className="flex flex-col gap-4 px-6 pb-6 pt-2"
        >
          <p className="text-base font-semibold tracking-wide text-brand-dark">
            Findings
          </p>
          <div className="flex flex-col gap-4">
            {item.findings.map((finding) => (
              <FindingRow key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
