'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RiskSeverityBreakdownProps {
  breakdown?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

const COLORS = {
  Critical: '#D00416',
  High: '#DD6414',
  Medium: '#B27F06',
  Low: '#1DAF61',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value, name }: any) => {
  const RADIAN = Math.PI / 180;
  // Push the label further out (outerRadius + offset)
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000000"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{
        fontFamily: 'Geist, sans-serif',
        fontSize: '16px',
        fontWeight: 400,
      }}
    >
      {`${name}: ${value}`}
    </text>
  );
};

export function RiskSeverityBreakdown({ breakdown }: RiskSeverityBreakdownProps) {
  const data = [
    { name: 'Critical', value: breakdown?.critical ?? 0, fill: COLORS.Critical },
    { name: 'High', value: breakdown?.high ?? 0, fill: COLORS.High },
    { name: 'Medium', value: breakdown?.medium ?? 0, fill: COLORS.Medium },
    { name: 'Low', value: breakdown?.low ?? 0, fill: COLORS.Low },
  ].filter((item) => item.value > 0);

  const hasData = data.length > 0;

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
        Risk Severity Breakdown
      </span>

      <div className="flex flex-1 items-center justify-center h-[316px] w-full">
        {!hasData ? (
          <p className="text-[#666666] text-sm text-center">
            Nothing to show yet. Run a scan to see risk breakdown.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={316}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120} // matches 240px width/height from CSS
                innerRadius={0}
                dataKey="value"
                stroke="#FFFFFF"
                strokeWidth={2} // Gives a little gap between slices
                label={renderCustomizedLabel}
                labelLine={false} // No line connecting label to slice based on the image
                isAnimationActive={false} // Disable animation to match static snapshot style if desired, or leave it. We'll leave it false for now for perfect fidelity.
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
