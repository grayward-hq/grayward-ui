import { STAT_CARDS, ACTIVITY_ITEMS, OWASP_ITEMS } from "../../data/owasp-data";
import { StatCards } from "./StatCards";
import { RecentActivity } from "./RecentActivity";
import { OWASPRiskMapping } from "./OWASPRiskMapping";

// Pure composition — no local state, no "use client" needed.

export function SecurityPostureTab() {
  return (
    <div className="flex flex-col gap-6">
      <StatCards cards={STAT_CARDS} />
      <RecentActivity items={ACTIVITY_ITEMS} />
      <OWASPRiskMapping items={OWASP_ITEMS} />
    </div>
  );
}
