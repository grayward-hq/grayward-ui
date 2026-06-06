// ── Types ──────────────────────────────────────────────────────────────────

export type OWASPStatus = "compliant" | "needs-attention" | "non-compliant";
export type Severity = "medium" | "low" | "high" | "critical";
export type StatCardVariant = "owasp" | "score" | "threats" | "domains";

export interface OWASPFinding {
  id: string;
  severity: Severity;
  title: string;
  location: string;
}

export interface OWASPItem {
  id: string;
  code: string;
  title: string;
  status: OWASPStatus;
  description: string;
  scanVersion: string;
  findingsCount: number;
  compliancePercent: number;
  findings: OWASPFinding[];
}

export interface StatCard {
  id: string;
  variant: StatCardVariant;
  value: string;
  label: string;
  footer: string;
  progressPercent?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
}

// ── Static data ────────────────────────────────────────────────────────────

export const STAT_CARDS: StatCard[] = [
  {
    id: "owasp",
    variant: "owasp",
    value: "8/10",
    label: "OWASP Compliance",
    footer: "Compliant",
    progressPercent: 80,
  },
  {
    id: "score",
    variant: "score",
    value: "92/100",
    label: "Security Score",
    footer: "+5 vs last month",
    progressPercent: 92,
  },
  {
    id: "threats",
    variant: "threats",
    value: "2",
    label: "Threats Detected",
    footer: "Active monitoring",
  },
  {
    id: "domains",
    variant: "domains",
    value: "12",
    label: "Protected Domains",
    footer: "All secure",
  },
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "a1",
    title: "OWASP Scan Completed",
    description: "Latest security audit shows 8/10 categories compliant",
    timeAgo: "2 hours ago",
  },
  {
    id: "a2",
    title: "Typosquatting Domain Detected",
    description: "example.com flagged as potential impersonation",
    timeAgo: "5 hours ago",
  },
  {
    id: "a3",
    title: "Credential Monitoring Active",
    description: "New breaches detected for employee email",
    timeAgo: "1 day ago",
  },
];

export const OWASP_ITEMS: OWASPItem[] = [
  {
    id: "a01",
    code: "A01",
    title: "Broken Access Control",
    status: "compliant",
    description: "Ensures proper restrictions on what authenticated users are allowed to do.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
  {
    id: "a02",
    code: "A02",
    title: "Cryptographic Failure",
    status: "compliant",
    description: "Protects data in transit and at rest with proper encryption.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
  {
    id: "a03",
    code: "A03",
    title: "Insecure Design",
    status: "needs-attention",
    description: "Addresses design and architectural security flaws.",
    scanVersion: "v05",
    findingsCount: 3,
    compliancePercent: 60,
    findings: [
      {
        id: "f1",
        severity: "medium",
        title: "Missing rate limiting on API endpoints",
        location: "/api/v1/user",
      },
      {
        id: "f2",
        severity: "low",
        title: "No account lockout policy implemented",
        location: "Authentication module",
      },
      {
        id: "f3",
        severity: "medium",
        title: "Insufficient input validation on forms",
        location: "/forms/contact",
      },
    ],
  },
  {
    id: "a04",
    code: "A04",
    title: "Security Misconfiguration",
    status: "compliant",
    description: "Identifies improperly configured security settings across the stack.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
  {
    id: "a05",
    code: "A05",
    title: "Vulnerable and Outdated Components",
    status: "compliant",
    description: "Detects use of outdated third-party libraries with known vulnerabilities.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
  {
    id: "a06",
    code: "A06",
    title: "Vulnerable and Outdated Components",
    status: "compliant",
    description: "Detects use of outdated third-party libraries with known vulnerabilities.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
  {
    id: "a07",
    code: "A07",
    title: "Identification and Authentication Failures",
    status: "needs-attention",
    description: "Covers weaknesses in authentication and session management controls.",
    scanVersion: "v05",
    findingsCount: 1,
    compliancePercent: 75,
    findings: [
      {
        id: "f4",
        severity: "medium",
        title: "Session tokens not invalidated on logout",
        location: "Auth service / session handler",
      },
    ],
  },
  {
    id: "a08",
    code: "A08",
    title: "Software and Data Integrity Failures",
    status: "compliant",
    description: "Ensures software updates and CI/CD pipelines are protected against integrity violations.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
  {
    id: "a09",
    code: "A09",
    title: "Security Logging and Monitoring Failures",
    status: "non-compliant",
    description: "Evaluates the completeness of security event logging and alerting pipelines.",
    scanVersion: "v05",
    findingsCount: 2,
    compliancePercent: 40,
    findings: [
      {
        id: "f5",
        severity: "high",
        title: "No centralised log aggregation in place",
        location: "Infrastructure / logging config",
      },
      {
        id: "f6",
        severity: "medium",
        title: "Authentication failures not alerted on",
        location: "Auth service / monitoring rules",
      },
    ],
  },
  {
    id: "a10",
    code: "A10",
    title: "Server-Side Request Forgery (SSRF)",
    status: "compliant",
    description: "Checks that outbound server requests are validated and restricted to allowlisted targets.",
    scanVersion: "v05",
    findingsCount: 0,
    compliancePercent: 100,
    findings: [],
  },
];
