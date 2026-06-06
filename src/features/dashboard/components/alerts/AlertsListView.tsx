'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, TriangleAlert } from 'lucide-react';
import type { DashboardAlertItem, AlertType } from '../monitoring/DashboardRecentAlerts';

// ── Single alert row ──────────────────────────────────────────────────────────
function AlertRow({ alert }: { alert: DashboardAlertItem }) {
  return (
    <div
      className="flex flex-row items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
      style={{
        background: '#fff',
        border: "1px solid #ededed",
        borderRadius: '8px',
        padding: '16px 24px',
      }}
    >
      <div className="flex items-center justify-center shrink-0 mt-0.5">
        <TriangleAlert size={20} strokeWidth={1.8} style={{ color: '#072E28' }} />
      </div>

      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex flex-row items-center gap-2">
          <span
            className="flex items-center justify-center"
            style={{
              padding: '4px 12px',
              border: '1px solid #b8b7b7ff',
              borderRadius: '8px',
              fontFamily: 'Geist, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#2B2B2B',
              whiteSpace: 'nowrap',
            }}
          >
            {alert.type}
          </span>
          <span
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '14px',
              color: '#666666',
            }}
          >
            {alert.timeAgo}
          </span>
        </div>

        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '16px',
            color: '#2B2B2B',
          }}
        >
          {alert.title}
        </span>

        <span
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '14px',
            color: '#666666',
          }}
        >
          {alert.domain}
        </span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface AlertsListViewProps {
  initialAlerts: DashboardAlertItem[];
}

export function AlertsListView({ initialAlerts }: AlertsListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<AlertType | 'All'>('All');

  // Debounce logic to prevent layout stutter while typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); // 300ms delay
    
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredAlerts = useMemo(() => {
    return initialAlerts.filter((alert) => {
      const matchesSearch = 
        alert.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
        alert.domain.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesType = typeFilter === 'All' || alert.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [initialAlerts, debouncedSearch, typeFilter]);

  return (
    <div className="flex flex-col gap-6">
      
      {/* ── Filters & Search ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-brand-light-gray shadow-sm">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by domain or alert title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-scan-primary-900 focus:border-transparent bg-brand-dashboard-bg"
            style={{ fontFamily: 'Geist, sans-serif' }}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="h-5 w-5 text-gray-500 hidden sm:block" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as AlertType | 'All')}
            className="w-full sm:w-auto px-4 py-2.5 border border-brand-light-gray rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-scan-primary-900 cursor-pointer"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            <option value="All">All Types</option>
            <option value="Security">Security</option>
            <option value="SSL">SSL</option>
            <option value="DNS">DNS</option>
          </select>
        </div>
      </div>

      {/* ── Results List ── */}
      <div className="flex flex-col gap-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-brand-light-gray shadow-sm">
            <TriangleAlert className="h-10 w-10 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium font-geist text-lg">No alerts found matching your filters.</p>
            <p className="text-gray-400 font-geist text-sm mt-1">Try adjusting your search query or type filter.</p>
          </div>
        )}
      </div>

    </div>
  );
}
