// ── Dashboard API Types ────────────────────────────────────────────────────────
// Source: GET /api/dashboard/summary
//         GET /api/dashboard/domains
//         GET /api/dashboard/alerts
//         GET /api/dashboard/score-trend
//
// NOTE: These are schema/type definitions only.
//       No service calls are wired here yet (Phase 1).
//       Service layer will be added in Phase 3.
// ──────────────────────────────────────────────────────────────────────────────

// ── Generic API wrapper ────────────────────────────────────────────────────────

export interface DashboardApiError {
  code: string;
  message: string;
}

export interface DashboardApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: DashboardApiError | null;
}

// ── GET /api/dashboard/summary ─────────────────────────────────────────────────

/**
 * The most urgent SSL certificate across all domains.
 * Null when no SSL alerts are active.
 */
export interface DashboardSummaryMostUrgentSsl {
  domainId: string;
  domainName: string;
  daysRemaining: number;
  /** e.g. "Unknown" | "Info" | "Low" | "Medium" | "High" | "Critical" */
  severity: string;
}

/**
 * The most recent scan across all domains.
 * Null when no scans have been completed yet.
 */
export interface DashboardSummaryMostRecentScan {
  scanId: string;
  domainId: string;
  domainName: string;
  securityScore: number;
  completedAt: string;
}

/**
 * Overall stats returned by GET /api/dashboard/summary.
 * Called on every dashboard load.
 */
export interface DashboardSummary {
  totalDomains: number;
  verifiedDomains: number;
  monitoringActiveDomains: number;
  /** e.g. "safe" | "moderate" | "critical" */
  overallPosture: string;
  avgSecurityScore: number;
  totalCriticalFindings: number;
  totalOpenFindings: number;
  sslAlertsActive: number;
  mostUrgentSsl: DashboardSummaryMostUrgentSsl | null;
  mostRecentScan: DashboardSummaryMostRecentScan | null;
  severityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export type DashboardSummaryResponse = DashboardApiResponse<DashboardSummary>;

// ── GET /api/dashboard/score-trend ─────────────────────────────────────────────

export interface ScoreTrendItem {
  day: string;
  score: number | null;
}

export type ScoreTrendResponse = DashboardApiResponse<ScoreTrendItem[]>;

// ── GET /api/dashboard/domains ─────────────────────────────────────────────────

/**
 * Pagination links returned alongside the domains list.
 */
export interface DashboardDomainsLinks {
  self: string;
  next: string | null;
  prev: string | null;
}

/**
 * A single domain row returned by GET /api/dashboard/domains.
 * Different from the verification-focused Domain type in domain.types.ts —
 * this shape is monitoring-centric.
 */
export interface DashboardDomainRow {
  domainId: string;
  domainName: string;
  monitoringEnabled: boolean;
  securityScore: number;
  /** e.g. "safe" | "low" | "medium" | "high" | "critical" */
  riskLevel: string;
  sslDaysRemaining: number | null;
  /** e.g. "Unknown" | "Info" | "Low" | "Medium" | "High" | "Critical" */
  sslSeverity: string;
  criticalFindings: number;
  totalOpenFindings: number;
  lastScannedAt: string;
}

/**
 * Paginated response from GET /api/dashboard/domains.
 */
export interface DashboardDomainsList {
  data: DashboardDomainRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  links: DashboardDomainsLinks;
}

export type DashboardDomainsResponse = DashboardApiResponse<DashboardDomainsList>;

/** Query parameters for GET /api/dashboard/domains */
export interface DashboardDomainsParams {
  page?: number;
  pageSize?: number;
}

// ── GET /api/dashboard/alerts ──────────────────────────────────────────────────

/** Alert type discriminator */
export type DashboardAlertType =
  | "SslExpiry"
  | "SecurityFinding"
  | "DnsChange"
  | "VerificationFailed"
  | string;

/** Alert severity levels */
export type DashboardAlertSeverity =
  | "Info"
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | string;

/** Alert status */
export type DashboardAlertStatus = "Pending" | "Resolved" | "Dismissed" | string;

/**
 * A single alert item returned by GET /api/dashboard/alerts.
 */
export interface DashboardAlert {
  alertId: string;
  domainId: string;
  domainName: string;
  type: DashboardAlertType;
  severity: DashboardAlertSeverity;
  subject: string;
  status: DashboardAlertStatus;
  createdAt: string;
}

export type DashboardAlertsResponse = DashboardApiResponse<DashboardAlert[]>;

/** Query parameters for GET /api/dashboard/alerts */
export interface DashboardAlertsParams {
  limit?: number;
}
