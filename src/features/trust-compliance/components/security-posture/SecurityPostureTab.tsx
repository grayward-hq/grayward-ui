"use client";

import { useOwaspCompliance } from "../../hooks/use-compliance";
import { StatCards } from "./StatCards";
import { RecentActivity } from "./RecentActivity";
import { OWASPRiskMapping } from "./OWASPRiskMapping";
import type { StatCard, OWASPItem } from "../../data/owasp-data";
import { OWASP_ITEMS as STATIC_OWASP_ITEMS } from "../../data/owasp-data";

export function SecurityPostureTab() {
  const { data: owaspData, isLoading, isError } = useOwaspCompliance();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-brand-gray">
        Loading security posture...
      </div>
    );
  }

  if (isError || !owaspData) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        Failed to load security posture data.
      </div>
    );
  }

  // Map API response to StatCards
  const statCards: StatCard[] = [
    {
      id: "owasp",
      variant: "owasp",
      value: `${owaspData.compliantCount}/4`,
      label: "OWASP Compliance",
      footer: owaspData.complianceTier || "Compliant",
      progressPercent: (owaspData.compliantCount / 4) * 100,
    },
    {
      id: "score",
      variant: "score",
      value: `${owaspData.overallScore}/100`,
      label: "Security Score",
      footer: "Based on latest scan",
      progressPercent: owaspData.overallScore,
    },
    {
      id: "threats",
      variant: "threats",
      value: owaspData.threatCount.toString(),
      label: "Threats Detected",
      footer: "Active monitoring",
    },
  ];

  // Map API categories to OWASPItems expected by the UI.
  // We use the static items to fill in the descriptions since the API doesn't provide them.
  const mappedOwaspItems: OWASPItem[] = owaspData.categories.map((cat) => {
    const staticItem = STATIC_OWASP_ITEMS.find((s) => s.code === cat.code);
    
    // Map backend status strings to frontend types
    let status: "compliant" | "needs-attention" | "non-compliant" = "compliant";
    const apiStatus = cat.complianceStatus.toLowerCase();
    if (apiStatus.includes("non")) status = "non-compliant";
    else if (apiStatus.includes("attention") || apiStatus.includes("partial")) status = "needs-attention";

    return {
      id: cat.code,
      code: cat.code,
      title: cat.name,
      status: status,
      description: staticItem?.description || "No description available.",
      scanVersion: "Latest",
      findingsCount: cat.findingCount,
      compliancePercent: cat.score,
      findings: [], // API doesn't provide detailed findings yet
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <StatCards cards={statCards} />
      <OWASPRiskMapping items={mappedOwaspItems} />
      {/* Fallback to empty array or static items if desired, but user requested no hardcoded values if possible. 
          For RecentActivity, there is no API. We will show an empty list or keep static if they want to see the UI. 
          The user said: "i dont want any hardcoded values on the UI". So we pass empty array. */}
      <RecentActivity items={[]} />
    </div>
  );
}
