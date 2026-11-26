"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getUserIdFromToken } from "@/lib/jwt";
import {
  RateLimitedError,
  repositoryService,
} from "../services/repository.service";
import { phaseForRepoStatus, type RepoScanPhase } from "../scan-status";
import type { RepositoryDetailData } from "../types/repository.types";

export type RepositoryScanPhase = RepoScanPhase;

const POLL_INTERVAL_MS = 10_000;

/**
 * Watches a repository's latest scan status via the detail endpoint, with a SignalR
 * `/hubs/scans` subscription (ScanCompleted / ScanFailed) and a safety-net poll.
 *
 * Used by the repository detail page to show a live scanning banner and
 * auto-refresh findings the moment a scan finishes. (The list page uses
 * `useRepositoriesScanPolling` instead so polling never runs per-card.)
 */
export function useRepositoryScanStatus(
  repoId?: string,
  opts?: { enableSignalR?: boolean; onChange?: (phase: RepositoryScanPhase) => void },
) {
  const enableSignalR = opts?.enableSignalR ?? true;
  const onChangeRef = useRef(opts?.onChange);
  onChangeRef.current = opts?.onChange;

  const [phase, setPhase] = useState<RepositoryScanPhase>("idle");
  const [status, setStatus] = useState<string | null>(null);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const rateLimitedUntilRef = useRef(0);

  const applyDetail = useCallback(
    (detail: RepositoryDetailData | null) => {
      const nextStatus = detail?.repository.latestScanStatus ?? null;
      setStatus(nextStatus);
      const nextPhase = phaseForRepoStatus(nextStatus);
      setPhase((prev) => {
        if (prev !== nextPhase) onChangeRef.current?.(nextPhase);
        return nextPhase;
      });
      return detail;
    },
    [],
  );

  const refresh = useCallback(async (): Promise<RepositoryDetailData | null> => {
    if (!repoId || Date.now() < rateLimitedUntilRef.current) return null;
    try {
      const detail = await repositoryService.getRepositoryDetail(repoId);
      applyDetail(detail);
      return detail;
    } catch (error) {
      if (error instanceof RateLimitedError) {
        rateLimitedUntilRef.current = Date.now() + error.retryAfterMs;
      }
      return null;
    }
  }, [repoId, applyDetail]);

  // Initial fetch + SignalR subscription.
  useEffect(() => {
    if (!repoId) return;

    void refresh();

    if (!enableSignalR) return;

    let connection: signalR.HubConnection | null = null;

    (async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      connection = new signalR.HubConnectionBuilder()
        .withUrl(`${apiBaseUrl}/hubs/scans`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      connectionRef.current = connection;

      const handleCompleted = (event: { repoId?: string }) => {
        if (event?.repoId && String(event.repoId).toLowerCase() === String(repoId).toLowerCase()) {
          refresh();
        }
      };

      connection.on("ScanCompleted", handleCompleted);
      connection.on("ScanFailed", handleCompleted);

      try {
        await connection.start();
        await connection.invoke("JoinUserGroup", userId);
      } catch (err) {
        console.warn("Repository scan SignalR failed, relying on poller...", err);
      }
    })();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(() => {});
        connectionRef.current = null;
      }
    };
  }, [repoId, enableSignalR, refresh]);

  // Safety-net poll only while a scan is in flight (>= 10s), honouring the
  // API's Retry-After backoff so a 429 never turns into a polling storm.
  useEffect(() => {
    if (!repoId || phase !== "scanning") return;

    const timer = setInterval(() => {
      if (Date.now() < rateLimitedUntilRef.current) return;
      void refresh();
    }, POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [repoId, phase, refresh]);

  return {
    phase,
    latestScanStatus: status,
    isScanning: phase === "scanning",
    refresh,
  };
}