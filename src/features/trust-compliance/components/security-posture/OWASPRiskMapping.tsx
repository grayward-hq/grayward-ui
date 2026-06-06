import type { OWASPItem } from "../../data/owasp-data";
import { OWASPRiskItem } from "./OWASPRiskItem";

// First item and any "needs-attention" items default to open, matching the design screenshot.

export function OWASPRiskMapping({ items }: { items: OWASPItem[] }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-6">
      <h2 className="text-2xl font-semibold text-brand-dark">OWASP Risk Mapping</h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <OWASPRiskItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
