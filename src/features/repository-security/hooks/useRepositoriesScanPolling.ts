"use client";

import { useCallback, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { getUserIdFromToken } from "@/lib/jwt";
import { RateLimitedError } from "../services/repository.service";
import { isActiveRepoScan } from "../scan-status";
import type { Repository } from "../types/repository.types";

const POLL_INTERVAL_MS = 10_000;

interface Options {
  repositories: ReadonlyArray<Pick<Repository, "latestScanStatus">>;
  onRefresh: () => Promise<void>;
  pollIntervalMs?: number;
}

/**
 * Single page/container-level watcher for repository scans.
 *
 * - SignalR `/hubs/scans` events (`ScanCompleted` / `ScanFailed`) are the
 *   PRIMARY trigger for refreshing the repository list.
 * - A fallback poll runs ONLY while at least one repository is actively
 *   `Queued`/`Running`, at >= 10s, and pauses for the API's Retry-After window
 *   on 429 so a rate-limit response never turns into a polling storm.
 *
 * Individual `RepositoryCard`s must NOT poll; they read `latestScanStatus`
 * from the list data this page keeps refreshed.
 */
export function useRepositoriesScanPolling({
  repositories,
  onRefresh,
  pollIntervalMs = POLL_INTERVAL_MS,
}: Options) {
  const onRefreshRef = useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  const rateLimitedUntilRef = useRef(0);

  const hasActiveScan = repositories.some((r) =>
    isActiveRepoScan(r.latestScanStatus),
  );

  const refresh = useCallback(async () => {
    if (Date.now() < rateLimitedUntilRef.current) return;
    try {
      await onRefreshRef.current();
    } catch (error) {
      if (error instanceof RateLimitedError) {
        rateLimitedUntilRef.current = Date.now() + error.retryAfterMs;
      }
    }
  }, []);

  // SignalR subscription — primary trigger.
  useEffect(() => {
    let connection: signalR.HubConnection | null = null;
    let disposed = false;

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
        .configureLogging(signalR.LogLevel.None)
        .build();

      connection.on("ScanCompleted", () => {
        if (!disposed) void refresh();
      });
      connection.on("ScanFailed", () => {
        if (!disposed) void refresh();
      });

      // Defer start so React StrictMode's immediate unmount cleanup can run and
      // mark `disposed` first. Otherwise start() races with stop() and logs
      // "Failed to start the HttpConnection before stop() was called".
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (disposed) return;

      try {
        await connection.start();
        await connection.invoke("JoinUserGroup", userId);
      } catch {
        // SignalR unavailable — the fallback poller below still covers us.
      }
    })();

    return () => {
      disposed = true;
      if (connection) connection.stop().catch(() => {});
    };
  }, [refresh]);

  // Fallback poll — only while a scan is active.
  useEffect(() => {
    if (!hasActiveScan) return;

    void refresh();

    const timer = setInterval(() => {
      if (Date.now() < rateLimitedUntilRef.current) return;
      void refresh();
    }, pollIntervalMs);

    return () => clearInterval(timer);
  }, [hasActiveScan, pollIntervalMs, refresh]);

  return { refresh, hasActiveScan };
}