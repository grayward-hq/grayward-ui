import type { ActivityItem } from "../../data/owasp-data";

// ── Single row ─────────────────────────────────────────────────────────────

function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <div className="flex flex-col gap-3 rounded-sm bg-owasp-activity-bg p-6">
      <p className="text-[18px] font-semibold leading-[18px] text-brand-dark">
        {item.title}
      </p>
      <p className="text-base text-brand-gray">{item.description}</p>
      <p className="text-sm text-brand-gray">{item.timeAgo}</p>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-6">
      <h2 className="text-2xl font-semibold text-brand-dark">Recent Activity</h2>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
