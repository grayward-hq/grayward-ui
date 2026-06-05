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
      <div className="mb-6 flex items-start justify-between">
        {/* Tab list */}
        <div className="flex items-end gap-20">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center gap-4 text-base tracking-wide transition-colors",
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

        {/* Export button */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-scan-primary-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Upload className="h-4 w-4" strokeWidth={1.8} />
          Export Executive Report
        </button>
      </div>

      {/* ── Tab content ── */}
      {activeTab === "owasp" && <SecurityPostureTab />}

      {activeTab === "phishing" && <PhishingDetectionTab />}

      {activeTab === "credentials" && (
        <div className="flex h-64 items-center justify-center rounded-xl bg-white text-brand-gray">
          Credential Monitoring — coming soon
        </div>
      )}
    </div>
  );
}
