'use client';

import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { dashboardService } from '@/features/dashboard/services/dashboard.service';
import { AlertsListView } from '@/features/dashboard/components/alerts/AlertsListView';
import type { DashboardAlert } from '@/features/dashboard/types/dashboard-api.types';
import type { DashboardAlertItem, AlertType } from '@/features/dashboard/components/monitoring/DashboardRecentAlerts';

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTimeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
}

function apiAlertToItem(alert: DashboardAlert): DashboardAlertItem {
  const typeMap: Record<string, string> = {
    SslExpiry: 'SSL',
    SecurityFinding: 'Security',
    DnsChange: 'DNS',
    VerificationFailed: 'Security',
  };
  const mappedType = typeMap[alert.type] ?? alert.type;
  
  // Safe validation check since isValidAlertType requires string
  const typeStr = mappedType;
  const isValid = ['SSL', 'Security', 'DNS'].includes(typeStr);

  return {
    id: alert.alertId,
    type: isValid ? (typeStr as AlertType) : 'Security',
    timeAgo: formatTimeAgo(alert.createdAt),
    title: alert.subject,
    domain: alert.domainName,
  };
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AlertsPage() {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['dashboard', 'alerts', { limit: 50 }],
    queryFn: () => dashboardService.getDashboardAlerts({ limit: 50 }),
  });

  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
        </div>
      }
    >
      <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen" style={{ background: '#F9F9F9' }}>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-brand-dark" style={{ fontFamily: 'Geist, sans-serif' }}>
            Active Alerts
          </h1>
          <p className="text-brand-gray" style={{ fontFamily: 'Geist, sans-serif' }}>
            Manage and monitor up to the last 50 alerts across all your active domains.
          </p>
        </div>

        {isLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
          </div>
        ) : error ? (
          <div className="flex h-40 w-full items-center justify-center text-red-500">
            Failed to load alerts.
          </div>
        ) : (
          <AlertsListView initialAlerts={(alerts ?? []).map(apiAlertToItem)} />
        )}
      </div>
    </Suspense>
  );
}
