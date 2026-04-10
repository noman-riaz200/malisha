import React from 'react';

interface TailadminStatsCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  color?: string;
}

export function TailadminStatsCard({ 
  title, 
  value, 
  prefix = '', 
  change, 
  changeType, 
  icon,
  color = 'slate' 
}: TailadminStatsCardProps) {
  return (
    <div className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-tailadmin-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-tailadmin-xl hover:-translate-y-2 transition-all duration-500 hover:border-slate-200/70 dark:hover:border-slate-600/70">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-slate-100 dark:from-indigo-500/20 dark:to-slate-800/50 group-hover:from-indigo-500/20 dark:group-hover:from-indigo-500/30 transition-all duration-300`}>
          {icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
          changeType === 'positive' 
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {prefix}{Number(value).toLocaleString()}
        </p>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{title}</p>
      </div>
    </div>
  );
}