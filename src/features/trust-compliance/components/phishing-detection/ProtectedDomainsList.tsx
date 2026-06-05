import { Shield, CheckCircle2 } from "lucide-react";
import type { ProtectedDomain } from "../../data/phishing-data";

export function ProtectedDomainsList({ domains }: { domains: ProtectedDomain[] }) {
  return (
    <div className="rounded-xl bg-white p-6 border border-brand-light-gray flex flex-col gap-6">
      <h3 className="text-2xl font-semibold text-brand-dark leading-none">
        Protected Domains
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {domains.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-brand-green bg-owasp-green-bg px-6 py-4 h-14"
          >
            <div className="flex items-center gap-4">
              <Shield className="h-6 w-6 text-brand-green fill-brand-green/10" />
              <span className="text-base font-normal text-brand-dark">
                {item.domain}
              </span>
            </div>
            <CheckCircle2 className="h-6 w-6 text-brand-green" />
          </div>
        ))}
      </div>
    </div>
  );
}
