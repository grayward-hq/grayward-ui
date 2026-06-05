"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { SecurityPostureTab } from "./security-posture/SecurityPostureTab";

import { PhishingDetectionTab } from "./phishing-detection/PhishingDetectionTab";

// ── Tab definitions ────────────────────────────────────────────────────────

const TABS = [
  { id: "owasp", label: "OWASP Scoring" },
  { id: "phishing", label: "Phishing Detection" },
  { id: "credentials", label: "Credential Monitoring" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Page ───────────────────────────────────────────────────────────────────

export default function TrustCompliancePage() {
  const [activeTab, setActiveTab] = useState<TabId>("owasp");

  return (
    <div className="min-h-[calc(100vh-88px)] bg-brand-dashboard-bg px-4 py-6 md:px-6">
      {/* ── Top bar: tabs + export ── */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Tab list — scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-none">
          <div
            role="tablist"
            aria-label="Trust and Compliance sections"
            className="flex shrink-0 items-end gap-8 md:gap-20"
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    const next = TABS[(index + 1) % TABS.length];
                    setActiveTab(next.id);
                    document.getElementById(`tab-${next.id}`)?.focus();
                  } else if (e.key === "ArrowLeft") {
                    const prev = TABS[(index - 1 + TABS.length) % TABS.length];
                    setActiveTab(prev.id);
                    document.getElementById(`tab-${prev.id}`)?.focus();
                  }
                }}
                className={cn(
                  "flex flex-col items-center gap-4 whitespace-nowrap text-sm md:text-base tracking-wide transition-colors",
                  activeTab === tab.id
                    ? "font-medium text-scan-primary-900"
                    : "font-normal text-brand-gray hover:text-brand-dark"
                )}
              >
                <span>{tab.label}</span>
                {/* Active underline */}
                <span
                  className={cn(
                    "block h-[5px] w-full rounded-full transition-colors",
                    activeTab === tab.id ? "bg-scan-primary-900" : "bg-transparent"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Export button — disabled until export flow is ready */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Export coming soon"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-scan-primary-900 px-5 py-2.5 text-sm font-medium text-white opacity-50 cursor-not-allowed md:w-auto md:shrink-0"
        >
          <Upload className="h-4 w-4" strokeWidth={1.8} />
          Export Executive Report
        </button>
      </div>

      {/* ── Tab content ── */}
      <div
        id="tabpanel-owasp"
        role="tabpanel"
        aria-labelledby="tab-owasp"
        hidden={activeTab !== "owasp"}
      >
        {activeTab === "owasp" && <SecurityPostureTab />}
      </div>

      <div
        id="tabpanel-phishing"
        role="tabpanel"
        aria-labelledby="tab-phishing"
        hidden={activeTab !== "phishing"}
      >
        {activeTab === "phishing" && <PhishingDetectionTab />}
      </div>

      <div
        id="tabpanel-credentials"
        role="tabpanel"
        aria-labelledby="tab-credentials"
        hidden={activeTab !== "credentials"}
      >
        {activeTab === "credentials" && (
          <div className="flex h-64 items-center justify-center rounded-xl bg-white text-brand-gray">
            Credential Monitoring — coming soon
          </div>
        )}
      </div>
    </div>
  );
}
