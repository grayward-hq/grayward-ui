import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { SeverityBadge, type Severity } from '../SeverityBadge';
import { scanService, ScanReport, FindingDto } from '../../../../../scans/services/scan.service';

type ExposureDetailsProps = {
  backHref?: string;
  scanId?: string | null;
  findingId?: string | null;
};

interface ExposureTechnicalDetail {
  error?: string;
  issues?: string[];
  rawRecords?: unknown;
}

type EndpointRecord = Record<string, unknown>;

const ENDPOINT_COLLECTION_KEYS = [
  "endpoints",
  "discoveredEndpoints",
  "discovered",
  "records",
  "urls",
  "results",
  "items",
  "entries",
] as const;

function firstPresent(record: EndpointRecord, keys: string[]): unknown {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }
  return undefined;
}

function toEndpointRecords(detail: unknown): EndpointRecord[] | null {
  if (Array.isArray(detail)) {
    const records = detail.filter(
      (item): item is EndpointRecord =>
        item !== null && typeof item === "object" && !Array.isArray(item),
    );
    return records.length > 0 ? records : null;
  }

  if (!detail || typeof detail !== "object") {
    return null;
  }

  const obj = detail as EndpointRecord;
  for (const key of ENDPOINT_COLLECTION_KEYS) {
    const candidate = obj[key];
    if (!Array.isArray(candidate)) continue;
    const records = candidate.filter(
      (item): item is EndpointRecord =>
        item !== null && typeof item === "object" && !Array.isArray(item),
    );
    if (records.length > 0) return records;
  }

  return null;
}

function toStringArray(value: unknown): string[] {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) {
    return value
      .filter((item) => item !== undefined && item !== null)
      .map((item) => (typeof item === "string" ? item : JSON.stringify(item)));
  }
  if (typeof value === "string") {
    return value
      .split(/[,\s]+/)
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [String(value)];
}

export function ExposureDetails({
  backHref = '/scan/report/findings/exposure',
  scanId,
  findingId,
}: ExposureDetailsProps) {
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(!!scanId);

  useEffect(() => {
    if (!scanId) return;

    let active = true;
    scanService.getScanReport(scanId)
      .then((res) => {
        if (active && res.isSuccess && res.value) {
          setReport(res.value);
        }
      })
      .catch((err: unknown) => {
        console.error("Failed to load report", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scanId]);

  let finding: FindingDto | null = null;
  if (report?.summary) {
    const allIssues = [
      ...(report.summary.criticalIssues || []),
      ...(report.summary.highSeverityIssues || []),
      ...(report.summary.mediumSeverityIssues || []),
      ...(report.summary.lowSeverityIssues || []),
    ];
    finding = allIssues.find(
      (f) => typeof f !== 'string' && f.id === findingId
    ) as FindingDto | null;
  }

  const renderEndpointRecords = (records: EndpointRecord[]) => {
    const sources = Array.from(
      new Set(
        records
          .map((rec) => firstPresent(rec, ["source", "tool", "discoverySource", "scanner", "origin"]))
          .filter((value) => value !== undefined)
          .map((value) => String(value)),
      ),
    );

    return (
      <div className="space-y-2">
        {sources.length > 0 && (
          <div>
            <span className="font-semibold">Discovery sources:</span> {sources.join(", ")}
          </div>
        )}

        <ul className="space-y-2">
          {records.map((rec, i) => {
            const url = firstPresent(rec, ["url", "matchedUrl", "fullUrl", "matched", "link", "href", "location"]);
            const path = firstPresent(rec, ["path", "urlPath", "route", "endpoint"]);
            const host = firstPresent(rec, ["host", "hostname", "targetHost", "target", "domain", "baseUrl", "origin"]);
            const status = firstPresent(rec, ["statusCode", "httpStatus", "status", "httpStatusCode", "code", "responseCode"]);
            const source = firstPresent(rec, ["source", "tool", "discoverySource", "scanner", "origin"]);
            const parameters = toStringArray(firstPresent(rec, ["parameters", "params", "queryParams", "queryParameters", "query", "queryString"]));
            const routes = toStringArray(firstPresent(rec, ["routes", "paths", "pathList", "routeList", "endpoints"]));

            const display =
              typeof url === "string" && url
                ? url
                : typeof path === "string" && path
                  ? path
                  : null;
            return (
              <li
                key={i}
                className="rounded-md border border-neutral-200 bg-neutral-50/60 p-3 font-mono"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <code className="break-all text-xs text-[#243B78]">
                    {display ?? "—"}
                  </code>
                  {status !== undefined && (
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
                      {String(status)}
                    </span>
                  )}
                  {source !== undefined && (
                    <span className="text-[11px] text-neutral-500">
                      via {String(source)}
                    </span>
                  )}
                </div>
                {typeof host === "string" && host && (
                  <div className="mt-1 text-[11px] text-neutral-500">
                    Host: {host}
                  </div>
                )}
                {typeof path === "string" && path && display !== path && (
                  <div className="mt-1 text-[11px] text-neutral-500">
                    Path: {path}
                  </div>
                )}
                {parameters.length > 0 && (
                  <div className="mt-1 text-[11px] text-neutral-500">
                    Parameters: {parameters.join(", ")}
                  </div>
                )}
                {routes.length > 0 && (
                  <div className="mt-1 text-[11px] text-neutral-500">
                    Routes: {routes.join(", ")}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderTechnicalDetails = (detail: unknown) => {
    if (!detail) return "No technical details available.";
    if (typeof detail === 'string') return detail;

    const d = detail as ExposureTechnicalDetail;
    if (d.error) return d.error;

    const endpointRecords = toEndpointRecords(detail);

    const detailObj =
      detail !== null && typeof detail === "object" && !Array.isArray(detail)
        ? (detail as EndpointRecord)
        : null;
    const targetHost = detailObj
      ? firstPresent(detailObj, ["host", "hostname", "targetHost", "targetUrl", "target", "domain", "baseUrl", "origin"])
      : undefined;
    const discoveredParameters = detailObj
      ? toStringArray(firstPresent(detailObj, ["parameters", "params", "queryParams", "queryParameters", "query", "queryString"]))
      : [];
    const discoveredRoutes = detailObj
      ? toStringArray(firstPresent(detailObj, ["routes", "paths", "pathList", "routeList", "endpoints", "urls"]))
      : [];

    return (
      <div className="space-y-2 font-mono text-xs text-[#4B5563]">
        {typeof targetHost === "string" && targetHost && (
          <div>
            <span className="font-semibold">Target host/URL:</span> {targetHost}
          </div>
        )}
        {discoveredParameters.length > 0 && (
          <div>
            <span className="font-semibold">Discovered parameters:</span> {discoveredParameters.join(", ")}
          </div>
        )}
        {discoveredRoutes.length > 0 && (
          <div>
            <span className="font-semibold">Discovered routes:</span> {discoveredRoutes.join(", ")}
          </div>
        )}

        {endpointRecords && (
          <div>
            <span className="font-semibold text-[#111827]">
              Discovered Endpoints ({endpointRecords.length}):
            </span>
            <div className="mt-1">{renderEndpointRecords(endpointRecords)}</div>
          </div>
        )}

        {d.issues && d.issues.length > 0 && (
          <div>
            <span className="font-semibold text-red-600">Issues:</span>
            <ul className="list-disc pl-4 mt-1">
              {d.issues.map((issue: string, i: number) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {!!d.rawRecords && (
          <div className="mt-2 pt-2 border-t border-neutral-100">
            <span className="font-semibold">Raw Records:</span>
            <pre className="mt-1 max-h-40 overflow-auto rounded bg-neutral-50 p-2 text-[10px] whitespace-pre-wrap">
              {JSON.stringify(d.rawRecords, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-neutral-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!finding) {
    return (
      <section className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6'>
        <div className="flex justify-start">
          <Link
            href={backHref}
            className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to results
          </Link>
        </div>
        <div className="mt-10 rounded-xl border border-dashed border-neutral-300 p-8 bg-white max-w-md mx-auto text-center">
          <h2 className="text-lg font-bold text-neutral-800">Finding Details Not Found</h2>
          <p className="text-sm text-neutral-500 mt-2">
            The details for this scan finding could not be found or the URL is invalid.
          </p>
        </div>
      </section>
    );
  }

  const title = finding.title;
  const severity = finding.severity as Severity;
  const explanation = finding.explanation;
  const techDetail = renderTechnicalDetails(finding.technicalDetail);
  const steps = finding.remediationSteps && finding.remediationSteps.length > 0 ? finding.remediationSteps : [];

  return (
    <section className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6'>
      <Link
        href={backHref}
        className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to results
      </Link>

      <div>
        <h1 className='text-2xl font-bold text-[#111827]'>Finding Details</h1>

        <div className='mt-5'>
          <h2 className='text-lg font-semibold text-[#303030]'>
            Exposed Files and Pages
          </h2>
          <p className='mt-3 text-sm text-[#6B7280]'>
            1 thing needs attention on {report ? report.domainName : 'your domain'}
          </p>
        </div>
      </div>

      <section className='mt-6 rounded-lg bg-[#EFEFEF] p-5 md:p-6'>
        <div className='flex flex-wrap items-center gap-4'>
          <SeverityBadge severity={severity} />
          <span className='text-base font-semibold text-[#243B78]'>
            {title}
          </span>
        </div>
      </section>

      <div className='mt-5 space-y-5'>
        <DetailCard title='What this Means For You'>
          {explanation}
        </DetailCard>

        <DetailCard title='For Your Developer (Technical Details)'>
          {techDetail}
        </DetailCard>

        {steps.length > 0 && (
          <section className='rounded-lg border border-[#E5E7EB] bg-white p-5 md:p-6'>
            <h2 className='text-base font-semibold text-[#303030]'>
              How to Fix it
            </h2>

            <ol className='mt-6 space-y-4'>
              {steps.map((step, index) => (
                <li
                  key={step}
                  className='flex gap-4 text-sm leading-6 text-[#6B7280]'
                >
                  <span className='grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#DFF8EC] text-xs font-bold text-[#1FA870]'>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className='flex gap-4 rounded-lg border border-[#073B32] bg-[#9BE96A] p-5 text-sm leading-6 text-[#356139] md:p-6'>
          <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-[#073B32]' />
          <p>
            We found this by looking at publicly available information only,
            like reading a sign on the outside of a building. We never tried to
            log in, access your data, or interfere with your site in any way.
          </p>
        </section>
      </div>
    </section>
  );
}

type DetailCardProps = {
  title: string;
  children: React.ReactNode;
};

function DetailCard({ title, children }: DetailCardProps) {
  return (
    <section className='rounded-lg border border-[#E5E7EB] bg-white p-5 md:p-6'>
      <h2 className='text-base font-semibold text-[#303030]'>{title}</h2>
      <div className='mt-6 text-sm leading-6 text-[#6B7280]'>{children}</div>
    </section>
  );
}
