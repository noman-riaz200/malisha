'use client';
// =============================================================================
// app/admin/payments/PaymentsList.tsx — Payments List (Bootstrap + Red Theme)
// =============================================================================
import { useRouter } from 'next/navigation';

interface Payment {
  _id: string;
  studentId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  applicationId?: {
    universityId?: {
      name: string;
    };
  };
  amount: number;
  currency: string;
  provider: string;
  providerPaymentId: string;
  status: string;
  createdAt: string;
}

interface Props {
  payments: Payment[];
  pagination: { page: number; pages: number; total: number };
  currentStatus: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
  succeeded: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
  failed: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
  refunded: { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' },
};

const PROVIDER_COLORS: Record<string, string> = {
  stripe: '#635bff',
  paypal: '#003087',
};

export function PaymentsList({ payments, pagination, currentStatus }: Props) {
  const router = useRouter();

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (status !== 'all') params.set('status', status);
    router.push(`/admin/payments?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (currentStatus !== 'all') params.set('status', currentStatus);
    router.push(`/admin/payments?${params.toString()}`);
  };

  const statuses = ['all', 'pending', 'succeeded', 'failed', 'refunded'];

  return (
    <div>
      {/* Status Filter */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className="btn btn-sm fw-semibold px-4 py-2"
            style={{ 
              borderRadius: '20px',
              backgroundColor: currentStatus === status ? '#dc2626' : 'white',
              color: currentStatus === status ? 'white' : '#64748b',
              border: currentStatus === status ? 'none' : '1px solid #e2e8f0'
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="admin-card">
        <div className="card-body p-0">
          {payments.length === 0 ? (
            <div className="text-center py-5 text-muted">No payments found</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>TRANSACTION</th>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STUDENT</th>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>UNIVERSITY</th>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>AMOUNT</th>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>PROVIDER</th>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STATUS</th>
                    <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id.toString()} className="border-bottom" style={{ transition: 'all 0.2s' }}>
                      <td className="px-4 py-3">
                        <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          {payment.providerPaymentId?.substring(0, 20)}...
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.9rem' }}>
                          {payment.studentId?.firstName} {payment.studentId?.lastName}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{payment.studentId?.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {payment.applicationId?.universityId?.name || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="fw-bold mb-0" style={{ color: '#22c55e', fontSize: '0.95rem' }}>
                          ${payment.amount.toFixed(2)}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>{payment.currency}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '1.2rem' }}>💳</span>
                          <span style={{ color: '#64748b', fontSize: '0.85rem', textTransform: 'capitalize' }}>{payment.provider}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-pill fw-semibold" style={{ 
                          fontSize: '0.75rem',
                          backgroundColor: STATUS_COLORS[payment.status]?.bg || 'rgba(100, 116, 139, 0.1)',
                          color: STATUS_COLORS[payment.status]?.color || '#64748b'
                        }}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="card-body d-flex align-items-center justify-content-between border-top">
            <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
              Showing {((pagination.page - 1) * 20) + 1} to {Math.min(pagination.page * 20, pagination.total)} of {pagination.total}
            </p>
            <nav>
              <ul className="pagination mb-0 gap-1">
                <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="page-link"
                    style={{ borderColor: '#e2e8f0', color: '#64748b' }}
                  >
                    Previous
                  </button>
                </li>
                <li className={`page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`}>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="page-link"
                    style={{ borderColor: '#e2e8f0', color: '#64748b' }}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
