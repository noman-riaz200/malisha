// =============================================================================
// app/dashboard/page.tsx — Student Dashboard Overview (Red/Green/Blue/White Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { redirect } from 'next/navigation';
import { Application } from '@/lib/db/models/models';
import { Payment } from '@/lib/db/models/models';
import Link from 'next/link';

export const metadata = { title: 'Dashboard — EduPro' };

const STATUS_COLORS: Record<string, string> = {
  draft: '#f1f5f9',
  submitted: '#dbeafe',
  under_review: '#fef3c7',
  approved: '#dcfce7',
  rejected: '#fee2e2',
};

const STATUS_TEXT_COLORS: Record<string, string> = {
  draft: '#64748b',
  submitted: '#1d4ed8',
  under_review: '#b45309',
  approved: '#15803d',
  rejected: '#b91c1c',
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

async function getDashboardData(userId: string) {
  await connectDB();
  const [applications, payments] = await Promise.all([
    Application.find({ studentId: userId })
      .populate('universityId', 'name logo location')
      .populate('programId', 'name degreeLevel medium')
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),
    Payment.find({ studentId: userId, status: 'succeeded' })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean(),
  ]);

  const totalApps = await Application.countDocuments({ studentId: userId });
  const approved = await Application.countDocuments({ studentId: userId, status: 'approved' });

  return { applications, payments, totalApps, approved };
}

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session || !session.user) {
    return null; // Layout will handle redirect
  }
  
  const userId = (session.user as any).id;
  const { applications, payments, totalApps, approved } = await getDashboardData(userId);
  
  const userName = session.user.name?.split(' ')[0] || 'Student';

  const stats = [
    { label: 'Total Applications', value: totalApps, icon: 'bi-file-earmark-text', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)', statClass: 'stat-primary' },
    { label: 'Approved', value: approved, icon: 'bi-check-circle', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', statClass: 'stat-success' },
    { label: 'Payments Made', value: payments.length, icon: 'bi-credit-card', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', statClass: 'stat-accent' },
    { label: 'In Progress', value: totalApps - approved, icon: 'bi-clock', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', statClass: 'stat-warning' },
  ];

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="student-welcome-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="display-font fw-bold mb-1" style={{ fontSize: '2rem', color: 'white' }}>Welcome back, {userName}! 👋</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>Here's your application overview at a glance.</p>
          </div>
          <Link href="/universities" className="btn btn-light fw-semibold">
            <i className="bi bi-search me-2"></i>Browse Universities
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="col-12 col-sm-6 col-xl-3">
            <div className={`student-stat-card ${stat.statClass}`} style={{ background: 'white' }}>
              <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                <i className={stat.icon} style={{ fontSize: '1.5rem' }}></i>
              </div>
              <p className="fw-bold mb-1" style={{ fontSize: '2rem', color: stat.color }}>{stat.value}</p>
              <p className="mb-0" style={{ fontSize: '0.85rem', color: '#64748b' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Applications Section */}
        <div className="col-lg-8">
          <div className="student-card">
            <div className="card-header">
              <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>My Applications</h5>
              <Link href="/student/dashboard/applications" className="btn btn-sm" style={{ background: '#dc2626', color: 'white' }}>
                View all <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="card-body p-0">
              {applications.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="bi bi-folder" style={{ fontSize: '4rem', color: '#e2e8f0' }}></i>
                  </div>
                  <h5 className="fw-semibold mb-2" style={{ color: '#1e293b' }}>No applications yet</h5>
                  <p className="text-muted mb-3">Start by exploring our partner universities.</p>
                  <Link href="/universities" className="btn" style={{ background: '#dc2626', color: 'white' }}>
                    Browse Universities <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr>
                        <th className="border-0 px-4 py-3" style={{ fontSize: '0.85rem', color: '#1e293b' }}>University</th>
                        <th className="border-0 py-3" style={{ fontSize: '0.85rem', color: '#1e293b' }}>Program</th>
                        <th className="border-0 py-3" style={{ fontSize: '0.85rem', color: '#1e293b' }}>Status</th>
                        <th className="border-0 py-3" style={{ fontSize: '0.85rem', color: '#1e293b' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app: any) => (
                        <tr key={app._id.toString()} className="align-middle">
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="rounded-3 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
                                {(app.universityId as any)?.logo
                                  ? <img src={(app.universityId as any).logo} alt="" className="w-100 h-100 object-fit-contain p-1" />
                                  : <i className="bi bi-building text-white"></i>
                                }
                              </div>
                              <div>
                                <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#1e293b' }}>{(app.universityId as any)?.name || 'University'}</p>
                                <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{(app.universityId as any)?.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <p className="mb-0" style={{ fontSize: '0.9rem', color: '#1e293b' }}>{(app.programId as any)?.name}</p>
                            <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{(app.programId as any)?.degreeLevel}</p>
                          </td>
                          <td className="py-3">
                            <span 
                              className="badge rounded-pill px-3 py-1"
                              style={{ 
                                backgroundColor: STATUS_COLORS[app.status],
                                color: STATUS_TEXT_COLORS[app.status],
                                fontSize: '0.75rem',
                                fontWeight: 600
                              }}
                            >
                              {STATUS_LABELS[app.status]}
                            </span>
                          </td>
                          <td className="py-3 text-muted" style={{ fontSize: '0.85rem' }}>
                            {new Date(app.updatedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="col-lg-4">
          {/* Quick Actions Card */}
          <div className="student-card mb-4">
            <div className="card-header">
              <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>Quick Actions</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <Link href="/universities" className="list-group-item list-group-item-action d-flex align-items-center p-3 border-0">
                  <div className="rounded-2 p-2 me-3" style={{ background: 'rgba(220, 38, 38, 0.1)' }}>
                    <i className="bi bi-building" style={{ color: '#dc2626' }}></i>
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Browse Universities</p>
                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>Explore 250+ partners</p>
                  </div>
                  <i className="bi bi-chevron-right ms-auto text-muted"></i>
                </Link>
                <Link href="/student/dashboard/documents" className="list-group-item list-group-item-action d-flex align-items-center p-3 border-0">
                  <div className="rounded-2 p-2 me-3" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                    <i className="bi bi-folder" style={{ color: '#3b82f6' }}></i>
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Upload Documents</p>
                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>Add passport, transcripts</p>
                  </div>
                  <i className="bi bi-chevron-right ms-auto text-muted"></i>
                </Link>
                <Link href="/get-free-consultation" className="list-group-item list-group-item-action d-flex align-items-center p-3 border-0">
                  <div className="rounded-2 p-2 me-3" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                    <i className="bi bi-chat-dots" style={{ color: '#22c55e' }}></i>
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Free Consultation</p>
                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>Talk to an advisor</p>
                  </div>
                  <i className="bi bi-chevron-right ms-auto text-muted"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          {payments.length > 0 && (
            <div className="student-card">
              <div className="card-header">
                <h5 className="mb-0" style={{ fontSize: '1.1rem' }}>Recent Payments</h5>
                <Link href="/student/dashboard/payments" className="btn btn-sm text-white" style={{ background: '#3b82f6' }}>
                  View all
                </Link>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {payments.map((payment: any) => (
                    <div key={payment._id.toString()} className="list-group-item border-0 px-3 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#1e293b' }}>${payment.amount}</p>
                          <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>{new Date(payment.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="badge rounded-pill px-3 py-1" style={{ background: '#dcfce7', color: '#15803d' }}>Success</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
