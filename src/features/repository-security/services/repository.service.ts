/**
 * Repository Security Service
 *
 * When the real API is ready:
 * 1. Delete `../data/repository.mock.ts`
 * 2. Replace the mock imports below with real `privateApi` calls
 */

import type { Repository, Vulnerability, TrendDataPoint } from "../types/repository.types";
import {
  MOCK_REPOSITORIES,
  MOCK_VULNERABILITIES,
  MOCK_TREND_DATA,
} from "../data/repository.mock";

export const repositoryService = {
  async getRepositories(): Promise<Repository[]> {
    // TODO: replace with → privateApi.get<Repository[]>("/api/repositories")
    return Promise.resolve(MOCK_REPOSITORIES);
  },

  async getRepository(id: string): Promise<Repository | null> {
    // TODO: replace with → privateApi.get<Repository>(`/api/repositories/${id}`)
    return Promise.resolve(MOCK_REPOSITORIES.find((r) => r.id === id) ?? null);
  },

  async getVulnerabilities(repoId: string): Promise<Vulnerability[]> {
    // TODO: replace with → privateApi.get<Vulnerability[]>(`/api/repositories/${repoId}/vulnerabilities`)
    return Promise.resolve(MOCK_VULNERABILITIES[repoId] ?? []);
  },

  async getVulnerability(
    repoId: string,
    vulnId: string
  ): Promise<Vulnerability | null> {
    // TODO: replace with → privateApi.get<Vulnerability>(`/api/repositories/${repoId}/vulnerabilities/${vulnId}`)
    const vulns = MOCK_VULNERABILITIES[repoId] ?? [];
    return Promise.resolve(vulns.find((v) => v.id === vulnId) ?? null);
  },

  async getTrendData(repoId: string): Promise<TrendDataPoint[]> {
    // TODO: replace with → privateApi.get<TrendDataPoint[]>(`/api/repositories/${repoId}/trends`)
    void repoId;
    return Promise.resolve(MOCK_TREND_DATA);
  },
};
