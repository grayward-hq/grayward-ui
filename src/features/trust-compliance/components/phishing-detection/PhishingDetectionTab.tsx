import { useBrandThreats, useActiveDomainId } from "../../hooks/use-compliance";
import { PhishingStatCards } from "./PhishingStatCards";
import { ProtectedDomainsList } from "./ProtectedDomainsList";
import { TyposquattingDomainsList } from "./TyposquattingDomainsList";

export function PhishingDetectionTab() {
  const { data: brandThreats, isLoading, isError } = useBrandThreats();
  const { activeDomainId, verifiedDomains } = useActiveDomainId();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-brand-gray">
        Loading phishing detection data...
      </div>
    );
  }

  if (isError || !brandThreats) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        Failed to load phishing detection data.
      </div>
    );
  }

  const stats = [
    { value: brandThreats.totalThreats.toString(), label: "Total Threats" },
    { value: brandThreats.activeCount.toString(), label: "Active" },
    { value: brandThreats.resolvedCount.toString(), label: "Resolved" },
    { value: brandThreats.monitoringCount.toString(), label: "Monitoring" },
  ];

  const activeDomain = verifiedDomains.find(d => d.id === activeDomainId);

  const protectedDomains = activeDomain 
    ? [{ id: activeDomain.id, domain: activeDomain.domain, protectionLevel: "Active", dnsSec: true, ssl: true }] 
    : [];

  return (
    <div className="flex flex-col gap-6">
      <PhishingStatCards stats={stats} />
      <ProtectedDomainsList domains={protectedDomains} />
      <TyposquattingDomainsList domains={brandThreats.threats.data} />
    </div>
  );
}
