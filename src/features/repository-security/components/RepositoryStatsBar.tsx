"use client";

import { AlertTriangle, Shield, FileSearch, Activity } from "lucide-react";
import type { Repository } from "../types/repository.types";

interface Props {
  repositories: Repository[];
}

export function RepositoryStatsBar({ repositories }: Props) {
  const totalFindings = repositories.reduce((s, r) => s + r.totalFindings, 0);
  const criticalFindings = repositories.reduce((s, r) => s + r.criticalFindings, 0);
  const highFindings = repositories.reduce((s, r) => s + r.highFindings, 0);
  const monitoredRepos = repositories.filter((r) => r.isMonitored).length;

  const stats = [
    {
      label: "Total Vulnerabilities",
      value: totalFindings,
      sub: `${criticalFindings} critical`,
      icon: <AlertTriangle className="h-5 w-5 text-brand-risk-critical" strokeWidth={1.8} />,
      iconBg: "bg-brand-risk-critical-bg",
    },
    {
      label: "Critical Findings",
      value: criticalFindings,
      sub: "Immediate attention required",
      icon: <Shield className="h-5 w-5 text-brand-risk-high" strokeWidth={1.8} />,
      iconBg: "bg-brand-risk-high-bg",
    },
    {
      label: "High Severity",
      value: highFindings,
      sub: "Review and remediate",
      icon: <FileSearch className="h-5 w-5 text-scan-yellow-900" strokeWidth={1.8} />,
      iconBg: "bg-owasp-warn-bg",
    },
    {
      label: "Monitored Repos",
      value: monitoredRepos,
      sub: `${repositories.length} total repositories`,
      icon: <Activity className="h-5 w-5 text-owasp-blue" strokeWidth={1.8} />,
      iconBg: "bg-owasp-blue-bg",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative flex flex-col rounded-lg border border-brand-light-gray bg-white p-5"
        >
          <p className="text-sm font-medium text-brand-gray pr-12">{s.label}</p>
          
          <div
            className={`absolute right-5 top-5 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px] ${s.iconBg}`}
          >
            {s.icon}
          </div>

          <div className="mt-4 flex flex-col">
            <p className="text-[32px] font-semibold leading-none text-brand-dark">{s.value}</p>
            <p className="mt-2 text-xs text-brand-muted">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
