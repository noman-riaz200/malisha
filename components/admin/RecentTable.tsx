import React from 'react';
// StatusBadge defined inline for self-contained component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: { bg: '#fef3c7', text: '#b45309', label: 'Pending' },
    approved: { bg: '#d1fae5', text: '#047857', label: 'Approved' },
    rejected: { bg: '#fee2e2', text: '#b91c1c', label: 'Rejected' },
    submitted: { bg: '#dbeafe', text: '#1d4ed8', label: 'Submitted' },
    under_review: { bg: '#e0e7ff', text: '#4338ca', label: 'Under Review' },
  };
  
  const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <span 
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

interface RecentApp {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  status: string;
  createdAt: Date;
}

interface RecentTableProps {
  data: RecentApp[];
}

export function RecentTable({ data }: RecentTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-tailadmin-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Applications</h3>
        <a href="/admin/applications" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm transition-colors">
          View All →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Program</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
            {data.length > 0 ? (
              data.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {app.firstName[0]}{app.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{app.firstName} {app.lastName}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900 dark:text-white font-medium">{app.program}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(app.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="text-slate-500 dark:text-slate-400">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                      📋
                    </div>
                    <p className="text-lg font-medium">No recent applications</p>
                    <p className="text-sm mt-1">Applications will appear here when submitted.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

