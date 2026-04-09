'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface RevenueDataPoint {
  month: string;
  revenue: number;
  applications?: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  height?: number;
}

export function RevenueChart({ data, height = 350 }: RevenueChartProps) {
  // Mock data if empty
  const chartData = data.length > 0 ? data : [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 51200 },
    { month: 'Mar', revenue: 38000 },
    { month: 'Apr', revenue: 62000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 72000 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-tailadmin-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-tailadmin-xl hover:border-slate-300/70 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Revenue Overview</h3>
        <select className="text-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors">
          <option>12 Months</option>
          <option>6 Months</option>
          <option>30 Days</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 95%)" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(210 24% 32%)' }}
            tickMargin={12}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tick={{ fontSize: 12, fill: 'hsl(210 24% 32%)' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(0 0% 100%)',
              border: '1px solid hsl(210 20% 95%)',
              borderRadius: '12px',
              boxShadow: '0 10px 25px hsl(0 0% 0% / 0.1)',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#6366f1" 
            strokeWidth={4}
            strokeLinecap="round"
            dot={{ fill: '#6366f1', strokeWidth: 2 }}
            activeDot={{ r: 8, fill: '#6366f1' }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="none" 
            fillOpacity={1}
            fill="url(#revenueGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

