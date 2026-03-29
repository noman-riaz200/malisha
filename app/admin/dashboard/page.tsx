// =============================================================================
// app/admin/dashboard/page.tsx — Admin Dashboard (Red/Green/Blue/White Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import { Application } from '@/lib/db/models/models';
import { Payment } from '@/lib/db/models/models';
import { Inquiry } from '@/lib/db/models/models';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const metadata = { title: 'Admin Dashboard — EduPro' };
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

const STATUS_COLORS: Record<string, string> = {
  draft: '#94a3b8',
  submitted: '#3b82f6',
  under_review: '#f59e0b',
  approved: '#22c55e',
  rejected: '#dc2626',
};

async function getAnalytics() {
  await connectDB();
  const [
    totalStudents,
    totalApplications,
    totalInquiries,
    statusData,
    recentApps,
    revenueData,
    monthlyData,
  ] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    Application.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Application.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('studentId', 'firstName lastName email')
      .populate('universityId', 'name')
      .populate('programId', 'name degreeLevel')
      .lean(),
    Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]),
    Application.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ]),
  ]);

  const statusMap = Object.fromEntries(statusData.map((s: any) => [s._id, s.count]));
  return {
    totalStudents,
    totalApplications,
    totalInquiries,
    statusMap,
    recentApps,
    totalRevenue: revenueData[0]?.total || 0,
    paymentCount: revenueData[0]?.count || 0,
    monthlyData,
  };
}

const statusCards = [
  { label: 'Draft', key: 'draft', icon: 'bi-pencil' },
  { label: 'Submitted', key: 'submitted', icon: 'bi-upload' },
  { label: 'Under Review', key: 'under_review', icon: 'bi-search' },
  { label: 'Approved', key: 'approved', icon: 'bi-check-circle' },
  { label: 'Rejected', key: 'rejected', icon: 'bi-x-circle' },
];

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (!['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/student/dashboard');
  }

  const data = await getAnalytics();

  const topStats = [
    {
      label: 'Total Students',
      value: data.totalStudents.toLocaleString(),
      icon: 'bi-people',
      delta: '+12 this week',
      color: '#dc2626',
      bg: 'rgba(220, 38, 38, 0.1)',
    },
    {
      label: 'Applications',
      value: data.totalApplications.toLocaleString(),
      icon: 'bi-file-earmark-text',
      delta: `${data.statusMap['submitted'] || 0} pending`,
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.1)',
    },
    {
      label: 'Revenue (USD)',
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: 'bi-currency-dollar',
      delta: `${data.paymentCount} payments`,
      color: '#22c55e',
      bg: 'rgba(34, 197, 94, 0.1)',
    },
    {
      label: 'New Inquiries',
      value: data.totalInquiries.toLocaleString(),
      icon: 'bi-chat-dots',
      delta: 'Unread',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  const quickActions = [
    { label: 'Add University', href: '/admin/universities/new', icon: 'bi-building', color: '#dc2626' },
    { label: 'View Inquiries', href: '/admin/inquiries', icon: 'bi-chat-dots', color: '#f59e0b' },
    { label: 'All Students', href: '/admin/students', icon: 'bi-people', color: '#3b82f6' },
    { label: 'Payments Log', href: '/admin/payments', icon: 'bi-credit-card', color: '#22c55e' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-8 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-white/80 text-lg">Real-time overview of platform activity</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Live data · {formatDate()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {topStats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl" style={{ backgroundColor: stat.bg, color: stat.color }}>
                <i className={stat.icon} style={{ fontSize: '1.25rem' }}></i>
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-sm font-semibold text-amber-600">{stat.delta}</p>
          </div>
        ))}
      </div>

      {/* Application Pipeline */}
      <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-0">Application Pipeline</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {statusCards.map(({ label, key, icon }) => {
              const count = data.statusMap[key] || 0;
              return (
                <Link
                  key={key}
                  href={`/admin/applications?status=${key}`}
                  className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 transition-colors text-center text-decoration-none border-2 border-gray-100 hover:border-gray-200 hover:shadow-md"
                  style={{ backgroundColor: '#f8fafc' }}
                >
                  <i
                    className={`${icon} mb-3`}
                    style={{ fontSize: '1.25rem', color: STATUS_COLORS[key] }}
                  ></i>
                  <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>
                    {count}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{label}</div>
                </Link>
              );
            })}
          </div>
          <div className="flex rounded-3xl h-3 bg-gray-200 overflow-hidden">
            {statusCards.map(({ key }) => {
              const count = data.statusMap[key] || 0;
              const pct = data.totalApplications ? (count / data.totalApplications) * 100 : 0;
              return pct > 0 ? (
                <div
                  key={key}
                  className="h-full flex-shrink-0"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: STATUS_COLORS[key],
                  }}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link
                href="/admin/applications"
                className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {data.recentApps.map((app: any) => (
                <Link
                  key={app._id.toString()}
                  href={`/admin/applications/${app._id}`}
                  className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors text-decoration-none"
                >
                  <div
                    className="flex items-center justify-center text-white font-bold rounded-full flex-shrink-0"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                      fontSize: '0.875rem',
                    }}
                  >
                    {((app.studentId as any)?.firstName?.[0] || '?').toUpperCase()}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-gray-900 text-sm mb-1">
                      {(app.studentId as any)?.firstName} {(app.studentId as any)?.lastName}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {(app.universityId as any)?.name} · {(app.programId as any)?.name}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                    style={{
                      backgroundColor:
                        app.status === 'approved'
                          ? '#dcfce7'
                          : app.status === 'rejected'
                          ? '#fee2e2'
                          : app.status === 'under_review'
                          ? '#fef3c7'
                          : app.status === 'submitted'
                          ? '#dbeafe'
                          : '#f1f5f9',
                      color:
                        app.status === 'approved'
                          ? '#15803d'
                          : app.status === 'rejected'
                          ? '#b91c1c'
                          : app.status === 'under_review'
                          ? '#b45309'
                          : app.status === 'submitted'
                          ? '#1d4ed8'
                          : '#475569',
                    }}
                  >
                    {app.status?.replace('_', ' ')}
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-6 rounded-xl text-white text-decoration-none h-32 hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: action.color }}
                >
                  <i className={action.icon} style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
                  <span className="font-semibold text-sm">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

