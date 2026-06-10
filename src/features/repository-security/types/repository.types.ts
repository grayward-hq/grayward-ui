export type VisibilityType = "Public" | "Private";

export type SeverityLevel = "Critical" | "High" | "Medium" | "Low";

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  visibility: VisibilityType;
  defaultBranch: string;
  lastScanDate: string | null;
  totalFindings: number;
  criticalFindings: number;
  highFindings: number;
  mediumFindings: number;
  lowFindings: number;
  isMonitored: boolean;
}

export interface Vulnerability {
  id: string;
  packageName: string;
  currentVersion: string;
  fixedVersion: string | null;
  severity: SeverityLevel;
  cveId: string;
  cvssScore: number;
  description: string;
  referenceLinks: string[];
  plainExplanation: string;
  technicalExplanation: string;
  remediation: string[];
  discoveredDate: string;
  affectedFile: string;
}

export interface TrendDataPoint {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}
