import { ShieldCheck, TrendingUp, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatCard, StatCardVariant } from "../../data/owasp-data";

// ── Variant config — all Tailwind classes defined here so they are scanned ──

type VariantConfig = {
  iconBg: string;
  icon: React.ReactNode;
  progressColor: string;
};

const VARIANT_CONFIG: Record<StatCardVariant, VariantConfig> = {
  owasp: {
    iconBg: "bg-owasp-green-bg",
    icon: <ShieldCheck className="h-6 w-6 text-brand-green" strokeWidth={1.8} />,
    progressColor: "bg-brand-green",
  },
  score: {
    iconBg: "bg-owasp-blue-bg",
    icon: <TrendingUp className="h-6 w-6 text-owasp-blue" strokeWidth={1.8} />,
    progressColor: "bg-owasp-blue",
  },
  threats: {
    iconBg: "bg-owasp-warn-bg",
    icon: <AlertTriangle className="h-6 w-6 text-scan-yellow-900" strokeWidth={1.8} />,
    progressColor: "",
  },
  domains: {
    iconBg: "bg-brand-sidebar-bg",
    icon: <Eye className="h-6 w-6 text-scan-primary-900" strokeWidth={1.8} />,
    progressColor: "",
  },
};

// ── Single card ────────────────────────────────────────────────────────────

function StatCardItem({ card }: { card: StatCard }) {
  const { iconBg, icon, progressColor } = VARIANT_CONFIG[card.variant];
  const hasProgress = card.progressPercent !== undefined && progressColor;

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-lg border border-brand-light-gray bg-white p-6">
      {/* Icon wrapper */}
      <div
        className={cn(
          "flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[10px]",
          iconBg
        )}
      >
        {icon}
      </div>

      {/* Value */}
      <p className="text-[32px] font-semibold leading-8 tracking-wide text-brand-dark">
        {card.value}
      </p>

      {/* Label */}
      <p className="text-base font-medium text-brand-gray">{card.label}</p>

      {/* Progress bar (cards 1 and 2 only) */}
      {hasProgress && (
        <div className="relative h-2 w-full overflow-hidden rounded-sm bg-brand-light-gray">
          <div
            className={cn("absolute inset-y-0 left-0 rounded-sm", progressColor)}
            style={{ width: `${card.progressPercent}%` }}
          />
        </div>
      )}

      {/* Footer */}
      <p className="text-sm text-brand-gray">{card.footer}</p>
    </div>
  );
}

// ── Grid of cards ──────────────────────────────────────────────────────────

export function StatCards({ cards }: { cards: StatCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
