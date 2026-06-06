"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  OWASPItem,
  OWASPStatus,
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




export function OWASPRiskItem({ item }: { item: OWASPItem }) {
  const cfg = STATUS_CONFIG[item.status];

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border bg-owasp-card-subtle", cfg.border)}>
      {/* ── Static Card Header ── */}
      <div className="flex w-full items-start gap-6 p-6 text-left transition-colors hover:bg-white">
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
      </div>
    </div>
  );
}
