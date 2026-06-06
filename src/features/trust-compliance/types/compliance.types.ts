export interface OwaspCategory {
  code: string;
  name: string;
  score: number;
  complianceStatus: string;
  findingCount: number;
}

export interface OwaspComplianceResponse {
  scanId: string;
  overallScore: number;
  complianceTier: string;
  categories: OwaspCategory[];
  compliantCount: number;
  threatCount: number;
}

export interface MonitoredEmail {
  id: string;
  emailAddress: string;
  isBreached: boolean;
  breachCount: number;
  lastCheckedAt: string | null;
  latestDetectionAt: string | null;
  createdAt: string;
}

export interface MonitoredEmailsResponse {
  totalEmails: number;
  breachedCount: number;
  notBreachedCount: number;
  emails: {
    data: MonitoredEmail[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    links: {
      self: string | null;
      next: string | null;
      prev: string | null;
    };
  };
}

export interface BrandThreat {
  id: string;
  domainId: string;
  originalDomain: string;
  lookAlikeDomain: string;
  variationType: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical" | string;
  status: "Active" | "Resolved" | "Monitoring" | string;
  resolvesViaDns: boolean;
  resolvedIpAddress: string | null;
  respondedViaHttp: boolean;
  httpStatusCode: number | null;
  httpTitle: string | null;
  redirectsToOriginal: boolean;
  lastCheckedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BrandThreatsResponse {
  totalThreats: number;
  activeCount: number;
  resolvedCount: number;
  monitoringCount: number;
  threats: {
    data: BrandThreat[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    links: {
      self: string | null;
      next: string | null;
      prev: string | null;
    };
  };
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: { code: string; message: string } | null;
}
