/**
 * Repository Security Service
 *
 * Talks to the real backend (`/api/repositories`). The API response shapes
 * differ from the UI types, so each call is mapped into the existing
 * `Repository` / `Vulnerability` / `TrendDataPoint` types the components expect.
 * Fields the API does not return are filled with safe defaults.
 */

import { privateApi } from "@/lib/axios";
import type {
  ApiResponse,
  ApiRepositoryDetail,
  ApiRepositoryListItem,
  ApiVulnerability,
  GetRepositoriesParams,
  Paginated,
  Repository,
  RepositoryDetailData,
  RepositorySettings,
  SeverityLevel,
  TrendDataPoint,
  UpdateRepositorySettingsPayload,
  Vulnerability,
} from "../types/repository.types";

function unwrap<T>(res: { data: ApiResponse<T>; status: number }): T {
  if (!res.data.isSuccess || res.data.value === null || res.data.value === undefined) {
    const msg = res.data.error?.message ?? "Request failed";
    const err = new Error(msg) as Error & { response?: { status: number } };
    err.response = { status: res.status };
    throw err;
  }
  return res.data.value;
}

/** Derive a short repo name (e.g. "owner/repo" -> "repo"). */
function shortName(fullName: string): string {
  const parts = fullName.split("/");
  return parts[parts.length - 1] || fullName;
}

function severityCount(
  counts: { severity: SeverityLevel; count: number }[],
  severity: SeverityLevel,
): number {
  return counts.find((c) => c.severity === severity)?.count ?? 0;
}

function mapListItem(item: ApiRepositoryListItem): Repository {
  return {
    id: item.id,
    name: shortName(item.fullName),
    fullName: item.fullName,
    visibility: item.isPrivate ? "Private" : "Public",
    defaultBranch: item.defaultBranch,
    lastScanDate: item.lastScannedAt,
    // The list endpoint does not return per-severity counts.
    totalFindings: 0,
    criticalFindings: 0,
    highFindings: 0,
    mediumFindings: 0,
    lowFindings: 0,
    isMonitored: item.status === "Active",
  };
}

function mapDetailToRepository(detail: ApiRepositoryDetail): Repository {
  const critical = severityCount(detail.openBySeverity, "Critical");
  const high = severityCount(detail.openBySeverity, "High");
  const medium = severityCount(detail.openBySeverity, "Medium");
  const low = severityCount(detail.openBySeverity, "Low");

  return {
    id: detail.repositoryId,
    name: shortName(detail.fullName),
    fullName: detail.fullName,
    visibility: detail.isPrivate ? "Private" : "Public",
    defaultBranch: detail.defaultBranch,
    lastScanDate: detail.lastScanAt,
    totalFindings: critical + high + medium + low,
    criticalFindings: critical,
    highFindings: high,
    mediumFindings: medium,
    lowFindings: low,
    isMonitored:
      detail.settings.periodicScanEnabled || detail.settings.eventScanEnabled,
  };
}

function mapVulnerability(v: ApiVulnerability): Vulnerability {
  return {
    id: v.id,
    packageName: v.package,
    severity: v.severity,
    cveId: v.cveId,
    discoveredDate: v.detectedAt,
    // Use the title as the human-readable summary the UI renders.
    description: v.title,
    // Fields the API does not provide yet — safe defaults so the UI never breaks.
    currentVersion: "",
    fixedVersion: null,
    cvssScore: 0,
    referenceLinks: [],
    plainExplanation: "",
    technicalExplanation: "",
    remediation: [],
    affectedFile: "",
  };
}

export const repositoryService = {
  async getRepositories(params: GetRepositoriesParams = {}): Promise<Repository[]> {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);
    if (params.sort_by) query.set("sort_by", params.sort_by);
    if (params.order) query.set("order", params.order);
    query.set("page", String(params.page ?? 1));
    // Large default so the existing client-side search/filter sees the full set.
    query.set("page_size", String(params.page_size ?? 100));

    const res = await privateApi.get<ApiResponse<Paginated<ApiRepositoryListItem>>>(
      `/api/repositories?${query.toString()}`,
    );
    return unwrap(res).data.map(mapListItem);
  },

  async getRepositoryDetail(
    id: string,
    trendDays = 30,
  ): Promise<RepositoryDetailData> {
    const res = await privateApi.get<ApiResponse<ApiRepositoryDetail>>(
      `/api/repositories/${id}?trendDays=${trendDays}`,
    );
    const detail = unwrap(res);

    return {
      repository: mapDetailToRepository(detail),
      vulnerabilities: detail.vulnerabilities.map(mapVulnerability),
      trendData: detail.trend as TrendDataPoint[],
    };
  },

  async updateSettings(
    id: string,
    payload: UpdateRepositorySettingsPayload,
  ): Promise<RepositorySettings> {
    const res = await privateApi.put<ApiResponse<RepositorySettings>>(
      `/api/repositories/${id}/settings`,
      payload,
    );
    return unwrap(res);
  },
};
