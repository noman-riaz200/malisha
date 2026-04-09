import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { getApplicationModel } from '@/lib/db/models/Application';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | EduPro Admin',
  description: 'Admin dashboard for managing applications, students, and inquiries',
};

interface DashboardData {
  totalStudents: number;
  totalApplications: number;
  totalPayments: number;
  totalRevenue: number;
  totalInquiries: number;
  pendingApplications: number;
  approvedApplications: number;
  recentApplications: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    program: string;
    status: string;
    createdAt: Date;
  }>;
}

async function getDashboardData(): Promise<DashboardData> {
  await connectDB();
  const ApplicationModel = await getApplicationModel();
  
  const totalApplications = await ApplicationModel.countDocuments({});
  const pendingApplications = await ApplicationModel.countDocuments({ status: 'pending' });
  const approvedApplications = await ApplicationModel.countDocuments({ status: 'approved' });
  
  const recentApplications = await ApplicationModel.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return {
    totalStudents: 1245,
    totalApplications,
    totalPayments: 89,
    totalRevenue: 45230,
    totalInquiries: 567,
    pendingApplications,
    approvedApplications,
    recentApplications: recentApplications.map(app => ({
      _id: app._id?.toString() || '',
      firstName: (app.personal as any)?.firstName || '',
      lastName: (app.personal as any)?.lastName || '',
      email: (app.personal as any)?.email || '',
      program: (app as any).programName || (app as any).program || 'N/A',
      status: app.status || 'pending',
      createdAt: app.createdAt || new Date()
    }))
  };
}

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }

  const data = await getDashboardData();

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
            <p className="text-red-100 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-red-200">Today&apos;s Revenue</p>
              <p className="text-2xl font-bold">$2,890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Total Students"
          value={data.totalStudents}
          change="+12.5%"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="#3b82f6"
        />
        <StatCard 
          title="Applications"
          value={data.totalApplications}
          change="+28%"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          color="#10b981"
        />
        <StatCard 
          title="Total Revenue"
          value={data.totalRevenue}
          prefix="$"
          change="+15.2%"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="#f59e0b"
        />
        <StatCard 
          title="Inquiries"
          value={data.totalInquiries}
          change="+8%"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
          color="#ec4899"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Pending Applications</h3>
            <span className="p-2 bg-amber-100 rounded-lg">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{data.pendingApplications}</p>
          <p className="text-sm text-slate-500 mt-1">Awaiting review</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Approved</h3>
            <span className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{data.approvedApplications}</p>
          <p className="text-sm text-slate-500 mt-1">Successfully processed</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Monthly Target</h3>
            <span className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-800">$50,000</p>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500">Progress</span>
              <span className="text-slate-800 font-medium">90%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart Placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Monthly Revenue</h2>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[65, 45, 75, 50, 80, 70, 85, 60, 78, 88, 92, 95].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 hover:from-red-600 hover:to-red-500"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-slate-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Status Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Application Status</h2>
          <div className="space-y-4">
            <StatusBar label="Pending" count={data.pendingApplications} total={data.totalApplications || 1} color="#f59e0b" />
            <StatusBar label="Approved" count={data.approvedApplications} total={data.totalApplications || 1} color="#10b981" />
            <StatusBar label="Rejected" count={Math.max(0, data.totalApplications - data.pendingApplications - data.approvedApplications)} total={data.totalApplications || 1} color="#ef4444" />
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Applications</p>
                <p className="text-2xl font-bold text-slate-800">{data.totalApplications}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Approval Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {data.totalApplications > 0 
                    ? Math.round((data.approvedApplications / data.totalApplications) * 100) 
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Recent Applications</h2>
          <a href="/admin/applications" className="text-sm text-red-600 hover:text-red-700 font-medium">
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Student</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Program</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.recentApplications.length > 0 ? (
                data.recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                          {app.firstName?.[0] || '?'}{app.lastName?.[0] || ''}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{app.firstName} {app.lastName}</p>
                          <p className="text-sm text-slate-500">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700">{app.program}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-500">
                        {new Date(app.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric' 
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
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No recent applications
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  prefix = '', 
  change, 
  changeType, 
  icon, 
  color 
}: { 
  title: string; 
  value: number; 
  prefix?: string;
  change: string; 
  changeType: string;
  icon: React.ReactNode; 
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
          changeType === 'positive' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-slate-500 text-sm">{title}</p>
    </div>
  );
}

function StatusBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm text-slate-500">{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: '#fef3c7', text: '#b45309', label: 'Pending' },
    approved: { bg: '#d1fae5', text: '#047857', label: 'Approved' },
    rejected: { bg: '#fee2e2', text: '#b91c1c', label: 'Rejected' },
    submitted: { bg: '#dbeafe', text: '#1d4ed8', label: 'Submitted' },
    under_review: { bg: '#e0e7ff', text: '#4338ca', label: 'Under Review' },
  };
  
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
  
  return (
    <span 
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}
