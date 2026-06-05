import { PHISHING_STATS, PROTECTED_DOMAINS, TYPOSQUATTING_DOMAINS } from "../../data/phishing-data";
import { PhishingStatCards } from "./PhishingStatCards";
import { ProtectedDomainsList } from "./ProtectedDomainsList";
import { TyposquattingDomainsList } from "./TyposquattingDomainsList";

export function PhishingDetectionTab() {
  return (
    <div className="flex flex-col gap-6">
      <PhishingStatCards stats={PHISHING_STATS} />
      <ProtectedDomainsList domains={PROTECTED_DOMAINS} />
      <TyposquattingDomainsList domains={TYPOSQUATTING_DOMAINS} />
    </div>
  );
}
