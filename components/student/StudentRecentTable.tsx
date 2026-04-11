import React from 'react';

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    draft: { bg: '#f1f5f9', text: '#64748b', label: 'Draft' },
    submitted: { bg: '#dbeafe', text: '#1d4ed8', label: 'Submitted' },
    under_review: { bg: '#e0e7ff', text: '#4338ca', label: 'Under Review' },
    approved: { bg: '#dcfce7', text: '#15803d', label: 'Approved' },
    rejected: { bg: '#fee2e2', text: '#b91c1c', label: 'Rejected' },
  };
  
  const config = statusConfig[status?.toLowerCase() as keyof typeof statusConfig] || statusConfig.draft;
  
  return (
    <span 
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

interface Application {
  _id: { toString: () => string };
  universityId?: { name?: string; logo?: string; location?: string };
  programId?: { name?: string; degreeLevel?: string };
  updatedAt?: Date;
  status?: string;
}

interface StudentRecentTableProps {
  data: Application[];
}

export function StudentRecentTable({ data }: StudentRecentTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-tailadmin-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Applications</h3>
        <a href="/student/dashboard/applications" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm transition-colors">
          View All →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">University</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Program</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
            {data.length > 0 ? (
              data.map((app) => (
                <tr key={app._id.toString()} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg overflow-hidden">
                        {(app.universityId as any)?.logo ? (
                          <img src={(app.universityId as any).logo} alt="" className="w-full h-full object-contain p-1" />
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{(app.universityId as any)?.name || 'University'}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{(app.universityId as any)?.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900 dark:text-white font-medium">{(app.programId as any)?.name}</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{(app.programId as any)?.degreeLevel}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(app.updatedAt as any).toLocaleDateString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status as string} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="text-slate-500 dark:text-slate-400">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">No applications yet</p>
                    <p className="text-sm mt-1">Start by exploring our partner universities.</p>
                    <a href="/universities" className="mt-4 inline-block text-indigo-600 hover:text-indigo-700 font-medium">
                      Browse Universities →
                    </a>
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