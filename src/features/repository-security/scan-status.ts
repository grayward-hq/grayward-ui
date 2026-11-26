// Shared repository scan-status helpers used by the repository card, the detail
// page, and the page-level poller. Status strings come from the API's
// `ScanStatus` enum (serialized with JsonStringEnumConverter).

export const REPO_SCAN_ACTIVE = new Set(["Queued", "Running"]);
export const REPO_SCAN_TERMINAL = new Set([
  "Completed",
  "Failed",
  "Cancelled",
]);

export type RepoScanPhase = "idle" | "scanning" | "completed" | "failed";

export function isActiveRepoScan(
  status: string | null | undefined,
): boolean {
  return !!status && REPO_SCAN_ACTIVE.has(status);
}

export function phaseForRepoStatus(
  status: string | null | undefined,
): RepoScanPhase {
  if (!status) return "idle";
  if (REPO_SCAN_ACTIVE.has(status)) return "scanning";
  if (status === "Failed") return "failed";
  if (status === "Completed") return "completed";
  return "idle";
}