import { privateApi } from "@/lib/axios";
import axios from "axios";
import type {
  ApiResponse,
  ApiRepositoryDetail,
  ApiRepositoryListItem,
  ApiVulnerability,
  ConnectGithubPayload,
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

const DEFAULT_RATELIMIT_BACKOFF_MS = 60_000;
const MAX_RATELIMIT_BACKOFF_MS = 15 * 60_000;

/**
 * Error thrown when the API responds with 429. Carries the backoff duration so
 * pollers can pause instead of hammering the endpoint (and without surfacing
 * a raw AxiosError to the Next.js error overlay).
 */
export class RateLimitedError extends Error {
  readonly retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super("Too many requests. Please slow down.");
    this.name = "RateLimitedError";
    this.retryAfterMs = retryAfterMs;
  }
}

function extractRetryAfterMs(error: unknown): number {
  if (axios.isAxiosError(error)) {
    const raw = (error.response?.headers as Record<string, string> | undefined)?.[
      "retry-after"
    ];
    if (typeof raw === "string" && raw.trim()) {
      const seconds = Number(raw);
      if (Number.isFinite(seconds) && seconds > 0) {
        return Math.min(Math.ceil(seconds * 1000), MAX_RATELIMIT_BACKOFF_MS);
      }
      const headerDate = Date.parse(raw);
      if (!Number.isNaN(headerDate)) {
        return Math.max(0, headerDate - Date.now());
      }
    }
  }
  return DEFAULT_RATELIMIT_BACKOFF_MS;
}

function normalizeRateLimitError(error: unknown): unknown {
  if (axios.isAxiosError(error) && error.response?.status === 429) {
    return new RateLimitedError(extractRetryAfterMs(error));
  }
  return error;
}

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
    latestScanStatus: item.latestScanStatus ?? null,
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
    latestScanStatus: detail.latestScanStatus ?? null,
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
    description: v.title,
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

const inFlightListRequests = new Map<string, Promise<Repository[]>>();
const inFlightDetailRequests = new Map<string, Promise<RepositoryDetailData>>();

function buildRepositoriesQuery(params: GetRepositoriesParams): URLSearchParams {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.sort_by) query.set("sort_by", params.sort_by);
  if (params.order) query.set("order", params.order);
  query.set("page", String(params.page ?? 1));
  query.set("page_size", String(params.page_size ?? 100));
  return query;
}

export const repositoryService = {
  async getRepositories(params: GetRepositoriesParams = {}): Promise<Repository[]> {
    const key = buildRepositoriesQuery(params).toString();

    const inflight = inFlightListRequests.get(key);
    if (inflight) return inflight;

    const request = (async () => {
      try {
        const res = await privateApi.get<ApiResponse<Paginated<ApiRepositoryListItem>>>(
          `/api/repositories?${key}`,
        );
        return unwrap(res).data.map(mapListItem);
      } catch (error) {
        throw normalizeRateLimitError(error);
      } finally {
        inFlightListRequests.delete(key);
      }
    })();

    inFlightListRequests.set(key, request);
    return request;
  },

  async getRepositoryDetail(
    id: string,
    trendDays = 30,
  ): Promise<RepositoryDetailData> {
    const key = `${id}:${trendDays}`;

    const inflight = inFlightDetailRequests.get(key);
    if (inflight) return inflight;

    const request = (async () => {
      try {
        const res = await privateApi.get<ApiResponse<ApiRepositoryDetail>>(
          `/api/repositories/${id}?trendDays=${trendDays}`,
        );
        const detail = unwrap(res);

        return {
          repository: mapDetailToRepository(detail),
          vulnerabilities: detail.vulnerabilities.map(mapVulnerability),
          trendData: detail.trend as TrendDataPoint[],
        };
      } catch (error) {
        throw normalizeRateLimitError(error);
      } finally {
        inFlightDetailRequests.delete(key);
      }
    })();

    inFlightDetailRequests.set(key, request);
    return request;
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

  async connectGithub(payload: ConnectGithubPayload): Promise<{ message: string }> {
    const res = await privateApi.post<ApiResponse<{ message: string }>>(
      "/api/integrations/github",
      payload,
    );
    return unwrap(res);
  },
};
