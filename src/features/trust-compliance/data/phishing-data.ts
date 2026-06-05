export interface PhishingStat {
  value: string;
  label: string;
}

export interface ProtectedDomain {
  id: string;
  domain: string;
}

export type TyposquattingStatus = "active" | "monitoring" | "taken down";

export interface TyposquattingDomain {
  id: string;
  domain: string;
  status: TyposquattingStatus;
  similarity: string;
  detectedDate: string;
}

export const PHISHING_STATS: PhishingStat[] = [
  { value: "4", label: "Protected Domains" },
  { value: "3", label: "Threat Detected" },
  { value: "1", label: "Active Threat" },
  { value: "1", label: "Mitigated" },
];

export const PROTECTED_DOMAINS: ProtectedDomain[] = [
  { id: "pd1", domain: "example.com" },
  { id: "pd2", domain: "example.net" },
  { id: "pd3", domain: "example.com" },
  { id: "pd4", domain: "mycompany.com" },
];

export const TYPOSQUATTING_DOMAINS: TyposquattingDomain[] = [
  {
    id: "td1",
    domain: "example.com",
    status: "active",
    similarity: "95%",
    detectedDate: "2026-05-28",
  },
  {
    id: "td2",
    domain: "mycompany.com",
    status: "monitoring",
    similarity: "95%",
    detectedDate: "2026-05-28",
  },
  {
    id: "td3",
    domain: "example.com",
    status: "taken down",
    similarity: "95%",
    detectedDate: "2026-05-28",
  },
];
