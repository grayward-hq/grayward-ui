'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ScoreTrendItem } from '@/features/dashboard/types/dashboard-api.types';

interface SecurityScoreTrendProps {
  data?: ScoreTrendItem[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="flex flex-col items-start bg-white"
        style={{
          border: '1px solid #EDEDED',
          borderRadius: '4px',
          padding: '24px',
          gap: '10px',
          minWidth: '113px',
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <span
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#666666',
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#072E28',
            }}
          >
            Score : {payload[0].value}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export function SecurityScoreTrend({ data = [] }: SecurityScoreTrendProps) {
  // If the array is empty or every score is null, we show the empty state
  const hasData = data.length > 0 && data.some((d) => d.score !== null);

  return (
    <div
      className="flex flex-col gap-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDEDED',
        borderRadius: '12px',
        padding: '24px',
        flex: 1,
        minHeight: '421px',
      }}
    >
      <span
        style={{
          fontFamily: 'Geist, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '24px',
          color: '#2B2B2B',
        }}
      >
        Security Score Trend
      </span>

      <div className="flex flex-1 items-center justify-center h-[325px] w-full mt-4">
        {!hasData ? (
          <p className="text-[#666666] text-sm text-center">
            Nothing to show yet. Run more scans to get the score trend.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={325}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(160, 232, 112, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={true}
                stroke="#EDEDED"
              />

              <XAxis
                dataKey="day"
                axisLine={{ stroke: '#666666' }}
                tickLine={{ stroke: '#666666' }}
                tick={{
                  fill: '#666666',
                  fontSize: 16,
                  fontFamily: 'Geist, sans-serif',
                  fontWeight: 600,
                }}
                dy={10}
              />

              <YAxis
                axisLine={{ stroke: '#666666' }}
                tickLine={{ stroke: '#666666' }}
                tick={{
                  fill: '#666666',
                  fontSize: 16,
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 600,
                }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                dx={-10}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#666666', strokeWidth: 1 }}
              />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#072E28"
                strokeWidth={1}
                fillOpacity={1}
                fill="url(#colorScore)"
                activeDot={{ r: 4, fill: '#072E28', stroke: '#072E28' }}
                connectNulls={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
