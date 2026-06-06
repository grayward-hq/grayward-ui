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

export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: { code: string; message: string } | null;
}
