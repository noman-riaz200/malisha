// =============================================================================
// app/admin/applications/page.tsx — Applications Management (Bootstrap + Red Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Application } from '@/lib/db/models/Application';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { ApplicationReviewPanel } from '@/components/admin/ApplicationReviewPanel';

export const dynamic   = 'force-dynamic';
export const metadata = { title: 'Applications — Admin' };

const STATUSES = ['all', 'draft', 'submitted', 'under_review', 'approved', 'rejected'];

interface PageProps {
  searchParams: { status?: string; search?: string; page?: string; };
}

async function getApplications(params: PageProps['searchParams']) {
  await connectDB();
  const page  = Math.max(1, parseInt(params.page || '1'));
  const limit = 20;
  const skip  = (page - 1) * limit;

  const filter: Record<string, any> = {};
  if (params.status && params.status !== 'all') filter.status = params.status;

  const [apps, total] = await Promise.all([
    Application.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip).limit(limit)
      .populate('studentId',    'firstName lastName email')
      .populate('universityId', 'name')
      .populate('programId',    'name degreeLevel')
      .lean(),
    Application.countDocuments(filter),
  ]);

  return { apps, total, page, pages: Math.ceil(total / limit) };
}

const STATUS_BADGE: Record<string, { bg: string; color: string }> = {
  draft:        { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' },
  submitted:    { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
  under_review: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
  approved:     { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
  rejected:     { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
};

const STATUS_COLORS: Record<string, string> = {
  draft: '#64748b',
  submitted: '#3b82f6',
  under_review: '#f59e0b',
  approved: '#22c55e',
  rejected: '#dc2626',
};

export default async function AdminApplicationsPage({ searchParams }: PageProps) {
  const { apps, total, page, pages } = await getApplications(searchParams);
  const currentStatus = searchParams.status || 'all';

  return (
    <div className="p-4 w-100">
      {/* Header */}
      <div className="admin-page-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 className="display-font fw-bold mb-1" style={{ fontSize: '1.75rem', color: 'white' }}>Applications</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{total} total applications</p>
          </div>
          <div className="bg-white bg-opacity-25 rounded-3 px-3 py-2" style={{ fontSize: '0.75rem', color: 'white' }}>
            <span className="me-2">●</span>
            Live data · {formatDate()}
          </div>
        </div>
      </div>

      {/* Status tabs */}
      <div className="admin-card mb-4 w-100">
        <div className="card-body p-2">
          <div className="flex w-full gap-2" style={{ minWidth: '0' }}>
            {STATUSES.map(status => (
              <Link key={status}
                href={`/admin/applications${status !== 'all' ? `?status=${status}` : ''}`}
                className="btn btn-sm fw-semibold py-2 flex-1 text-center"
                style={{ 
                  borderRadius: '8px',
                  backgroundColor: currentStatus === status ? '#dc2626' : 'transparent',
                  color: currentStatus === status ? 'white' : '#64748b',
                  border: currentStatus === status ? 'none' : '1px solid #e2e8f0',
                  whiteSpace: 'nowrap'
                }}
              >
                {status.replace('_', ' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card w-100">
        <div className="card-body p-0">
          <div className="table-responsive w-100">
            <table className="table table-hover mb-0" style={{ minWidth: '100%', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STUDENT</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>UNIVERSITY</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>PROGRAM</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STATUS</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>PAYMENT</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>DATE</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {apps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5 text-muted">No applications found</td>
                  </tr>
                ) : apps.map((app: any) => (
                  <tr key={app._id.toString()} className="border-bottom" style={{ transition: 'all 0.2s' }}>
                    <td className="px-4 py-3">
                      <div>
                        <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.9rem' }}>
                          {(app.studentId as any)?.firstName} {(app.studentId as any)?.lastName}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{(app.studentId as any)?.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="mb-0" style={{ color: '#64748b', fontSize: '0.85rem' }}>{(app.universityId as any)?.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="mb-0" style={{ color: '#64748b', fontSize: '0.85rem' }}>{(app.programId as any)?.name}</p>
                      <p className="mb-0 text-muted" style={{ fontSize: '0.7rem', textTransform: 'capitalize' }}>{(app.programId as any)?.degreeLevel}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-pill fw-semibold" style={{ 
                        fontSize: '0.75rem',
                        backgroundColor: STATUS_BADGE[app.status]?.bg || STATUS_BADGE.draft.bg,
                        color: STATUS_BADGE[app.status]?.color || STATUS_BADGE.draft.color
                      }}>
                        {app.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="fw-semibold" style={{ 
                        fontSize: '0.75rem',
                        color: app.paymentStatus === 'paid' ? '#22c55e' : '#64748b'
                      }}>
                        {app.paymentStatus === 'paid' ? '✓ Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/applications/${app._id}`}
                        className="btn btn-sm fw-semibold"
                        style={{ color: '#dc2626', border: '1px solid #dc2626', fontSize: '0.75rem', borderRadius: '6px' }}>
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="card-body d-flex align-items-center justify-content-between border-top w-100">
            <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>Page {page} of {pages}</p>
            <nav>
              <ul className="pagination mb-0 gap-1">
                {page > 1 && (
                  <li className="page-item">
                    <Link href={`/admin/applications?${currentStatus !== 'all' ? `status=${currentStatus}&` : ''}page=${page - 1}`}
                      className="page-link" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                      ← Prev
                    </Link>
                  </li>
                )}
                {page < pages && (
                  <li className="page-item">
                    <Link href={`/admin/applications?${currentStatus !== 'all' ? `status=${currentStatus}&` : ''}page=${page + 1}`}
                      className="page-link" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                      Next →
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
