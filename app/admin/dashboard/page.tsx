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

export const metadata = { title: 'Admin Dashboard — EduPro' };
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

const STATUS_COLORS: Record<string, string> = {
  draft: '#94a3b8',   submitted: '#3b82f6',
  under_review: '#f59e0b', approved: '#22c55e', rejected: '#dc2626',
};

async function getAnalytics() {
  await connectDB();
  const [
    totalStudents, totalApplications, totalInquiries,
    statusData, recentApps, revenueData, monthlyData
  ] = await Promise.all([
    User.count({ role: 'student' }),
    Application.countDocuments().exec(),
    Inquiry.countDocuments({ status: 'new' }),
    Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Application.find()
      .sort({ createdAt: -1 }).limit(8)
      .populate('studentId',    'firstName lastName email')
      .populate('universityId', 'name')
      .populate('programId',    'name degreeLevel')
      .lean(),
    Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]),
    Application.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 86400000) } } },
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
    totalRevenue:   revenueData[0]?.total || 0,
    paymentCount:   revenueData[0]?.count || 0,
    monthlyData,
  };
}

const statusCards = [
  { label: 'Draft',        key: 'draft',        icon: 'bi-pencil' },
  { label: 'Submitted',    key: 'submitted',     icon: 'bi-upload' },
  { label: 'Under Review', key: 'under_review',  icon: 'bi-search' },
  { label: 'Approved',     key: 'approved',      icon: 'bi-check-circle' },
  { label: 'Rejected',     key: 'rejected',      icon: 'bi-x-circle' },
];

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect('/login');
  if (!['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/student/dashboard');
  }

  const d = await getAnalytics();

  const topStats = [
    { label: 'Total Students',   value: d.totalStudents.toLocaleString(),       icon: 'bi-people', delta: '+12 this week', color: '#dc2626',   bg: 'rgba(220, 38, 38, 0.1)' },
    { label: 'Applications',     value: d.totalApplications.toLocaleString(),   icon: 'bi-file-earmark-text', delta: `${d.statusMap['submitted'] || 0} pending`, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Revenue (USD)',    value: `${d.totalRevenue.toLocaleString()}`,  icon: 'bi-currency-dollar', delta: `${d.paymentCount} payments`,  color: '#22c55e',  bg: 'rgba(34, 197, 94, 0.1)' },
    { label: 'New Inquiries',    value: d.totalInquiries.toLocaleString(),      icon: 'bi-chat-dots', delta: 'Unread',                       color: '#f59e0b',  bg: 'rgba(245, 158, 11, 0.1)' },
  ];

  const quickActions = [
    { label: 'Add University', href: '/admin/universities/new',   icon: 'bi bi-building', color: '#dc2626' },
    { label: 'View Inquiries', href: '/admin/inquiries',          icon: 'bi bi-chat-dots', color: '#f59e0b' },
    { label: 'All Students',   href: '/admin/students',           icon: 'bi bi-people', color: '#3b82f6' },
    { label: 'Payments Log',   href: '/admin/payments',           icon: 'bi bi-credit-card', color: '#22c55e' },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="admin-page-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 className="display-font fw-bold mb-1" style={{ fontSize: '2rem', color: 'white' }}>Analytics Dashboard</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Real-time overview of platform activity</p>
          </div>
          <div className="bg-white bg-opacity-25 rounded-3 px-3 py-2" style={{ fontSize: '0.75rem', color: 'white' }}>
            <span className="me-2">●</span>
            Live data · {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-5">
        {topStats.map(s => (
          <div key={s.label} className="col-6 col-lg-3">
            <div className="admin-stat-card" style={{ background: 'white' }}>
              <div className="stat-icon" style={{ backgroundColor: s.bg, color: s.color }}>
                <i className={s.icon} style={{ fontSize: '1.25rem' }}></i>
              </div>
              <p className="fw-bold mb-1" style={{ fontSize: '1.5rem', color: s.color }}>{s.value}</p>
              <p className="mb-0" style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.label}</p>
              <p className="mb-0" style={{ fontSize: '0.75rem', color: '#f59e0b' }}>{s.delta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Application Pipeline */}
      <div className="admin-card mb-5">
        <div className="card-header">
          <h2 className="mb-0" style={{ fontSize: '1.25rem' }}>Application Pipeline</h2>
        </div>
        <div className="card-body">
          <div className="row g-3 mb-4">
            {statusCards.map(({ label, key, icon }) => (
              <div key={key} className="col-6 col-md">
                <Link href={`/admin/applications?status=${key}`} className="d-block text-center p-3 rounded-3 text-decoration-none" style={{ backgroundColor: '#f8fafc' }}>
                  <i className={`${icon} mb-2 d-block`} style={{ fontSize: '1.25rem', color: STATUS_COLORS[key] }}></i>
                  <div className="fw-bold" style={{ fontSize: '1.25rem', color: '#dc2626' }}>{d.statusMap[key] || 0}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{label}</div>
                </Link>
              </div>
            ))}
          </div>
          <div className="d-flex rounded-pill overflow-hidden" style={{ height: '0.75rem' }}>
            {statusCards.map(({ key }) => {
              const count = d.statusMap[key] || 0;
              const pct   = d.totalApplications ? (count / d.totalApplications) * 100 : 0;
              return pct > 0 ? (
                <div key={key} style={{ width: `${pct}%`, backgroundColor: STATUS_COLORS[key] }}></div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Recent Applications */}
        <div className="col-lg-8">
          <div className="admin-card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h2 className="mb-0" style={{ fontSize: '1.1rem' }}>Recent Applications</h2>
              <Link href="/admin/applications" className="text-decoration-none fw-medium" style={{ color: '#dc2626', fontSize: '0.875rem' }}>View all →</Link>
            </div>
            <div className="card-body p-0">
              {d.recentApps.map((app: any) => (
                <Link key={app._id.toString()} href={`/admin/applications/${app._id}`} className="d-flex align-items-center gap-3 px-4 py-3 text-decoration-none" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', fontSize: '0.875rem' }}>
                    {(app.studentId as any)?.firstName?.[0] || '?'}
                  </div>
                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.9rem' }}>{(app.studentId as any)?.firstName} {(app.studentId as any)?.lastName}</p>
                    <p className="mb-0" style={{ color: '#64748b', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{(app.universityId as any)?.name} · {(app.programId as any)?.name}</p>
                  </div>
                  <div className="rounded-pill px-3 py-1 flex-shrink-0" style={{ 
                    backgroundColor: app.status === 'approved' ? '#dcfce7' : app.status === 'rejected' ? '#fee2e2' : app.status === 'under_review' ? '#fef3c7' : app.status === 'submitted' ? '#dbeafe' : '#f1f5f9',
                    color: app.status === 'approved' ? '#15803d' : app.status === 'rejected' ? '#b91c1c' : app.status === 'under_review' ? '#b45309' : app.status === 'submitted' ? '#1d4ed8' : '#475569',
                    fontSize: '0.75rem', fontWeight: 600
                  }}>
                    {app.status?.replace('_', ' ')}
                  </div>
                  <span className="flex-shrink-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="admin-card">
            <div className="card-header">
              <h3 className="mb-0" style={{ fontSize: '1.1rem' }}>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {quickActions.map(action => (
                  <div key={action.label} className="col-6">
                    <Link href={action.href} className="d-flex flex-column align-items-center justify-content-center p-4 rounded-4 text-white text-decoration-none h-100" style={{ backgroundColor: action.color, transition: 'all 0.3s ease' }}>
                      <i className={action.icon} style={{ fontSize: '1.5rem', marginBottom: '8px' }}></i>
                      <span className="fw-semibold" style={{ fontSize: '0.8rem' }}>{action.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}