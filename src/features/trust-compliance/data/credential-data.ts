// ── Types ──────────────────────────────────────────────────────────────────

export type BreachSeverity = "critical" | "high" | "medium" | "low";
export type BreachActionStatus =
  | "password reset"
  | "notified"
  | "investigating"
  | "resolved";

export interface ExposedDataTag {
  label: string;
}

export interface CredentialBreach {
  id: string;
  email: string;
  severity: BreachSeverity;
  actionStatus: BreachActionStatus;
  breachSource: string;
  breachDate: string;
  exposedData: string[];
}

export interface CredentialStat {
  value: string;
  label: string;
}

// ── Static data ────────────────────────────────────────────────────────────

export const CREDENTIAL_STATS: CredentialStat[] = [
  { value: "247", label: "Monitored Email" },
  { value: "2", label: "Breaches Found" },
  { value: "1", label: "Resolved" },
  { value: "0", label: "Investigating" },
];

export const CREDENTIAL_BREACHES: CredentialBreach[] = [
  {
    id: "cb1",
    email: "John.de@company.com",
    severity: "critical",
    actionStatus: "password reset",
    breachSource: "DataLeakDB 2026",
    breachDate: "2026-05-14",
    exposedData: ["Email", "Password", "IP Address"],
  },
  {
    id: "cb2",
    email: "John.de@company.com",
    severity: "medium",
    actionStatus: "notified",
    breachSource: "ForumHack 2026",
    breachDate: "2026-04-05",
    exposedData: ["Email", "Username"],
  },
];
