"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabOption<T extends string> {
  id: T;
  label: string;
}

export interface TabsProps<T extends string> {
  tabs: readonly TabOption<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  ariaLabel?: string;
  className?: string;
  layoutId?: string;
}

export function Tabs<T extends string>({ 
  tabs, 
  activeTab, 
  onChange, 
  ariaLabel, 
  className,
  layoutId = "activeTabIndicator" 
}: TabsProps<T>) {
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const activeTabElement = document.getElementById(`tab-${activeTab}`);
      if (activeTabElement && tabContainerRef.current) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div ref={tabContainerRef} className={cn("overflow-x-auto scrollbar-none w-full min-w-0", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel || "Tabs"}
        className="flex shrink-0 items-end gap-8 md:gap-20 pr-4"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                const next = tabs[(index + 1) % tabs.length];
                onChange(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              } else if (e.key === "ArrowLeft") {
                const prev = tabs[(index - 1 + tabs.length) % tabs.length];
                onChange(prev.id);
                document.getElementById(`tab-${prev.id}`)?.focus();
              }
            }}
            className={cn(
              "flex flex-col items-center gap-4 whitespace-nowrap text-sm md:text-base tracking-wide transition-colors",
              activeTab === tab.id
                ? "font-medium text-scan-primary-900"
                : "font-normal text-brand-gray hover:text-brand-dark"
            )}
          >
            <span>{tab.label}</span>
            {/* Active underline */}
            {activeTab === tab.id ? (
              <motion.div
                layoutId={layoutId}
                className="block h-[5px] w-full rounded-full bg-scan-primary-900"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ) : (
              <div className="block h-[5px] w-full rounded-full bg-transparent" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
