'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#f59e0b', '#10b981', '#ef4444', '#3b82f6'];

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface StatusPieProps {
  pending: number;
  approved: number;
  rejected: number;
  total?: number;
}

export function StatusPie({ pending, approved, rejected, total = pending + approved + rejected }: StatusPieProps) {
  const data: StatusData[] = [
    { name: 'Pending', value: pending, color: COLORS[0] },
    { name: 'Approved', value: approved, color: COLORS[1] },
    { name: 'Rejected', value: rejected, color: COLORS[2] },
    { name: 'Other', value: Math.max(0, total - pending - approved - rejected), color: COLORS[3] },
  ].filter(d => d.value > 0);

  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-tailadmin-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-tailadmin-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Application Status</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            cornerRadius={8}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="hsl(0 0% 98%)" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(0 0% 100%)',
              border: '1px solid hsl(210 20% 95%)',
              borderRadius: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 space-y-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {Math.round((entry.value / total * 100))}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

