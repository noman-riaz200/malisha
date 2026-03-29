'use client';
// =============================================================================
// app/admin/inquiries/InquiriesList.tsx — Inquiries List (Bootstrap + Red Theme)
// =============================================================================
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Inquiry {
  _id: string;
  source: string;
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  interestedMajor?: string;
  interestedDegree?: string;
  status: string;
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

interface Props {
  inquiries: Inquiry[];
  pagination: { page: number; pages: number; total: number };
  currentStatus: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
  contacted: { bg: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' },
  converted: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
  closed: { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' },
};

export function InquiriesList({ inquiries, pagination, currentStatus }: Props) {
  const router = useRouter();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (status !== 'all') params.set('status', status);
    router.push(`/admin/inquiries?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (currentStatus !== 'all') params.set('status', currentStatus);
    router.push(`/admin/inquiries?${params.toString()}`);
  };

  const handleReply = async (inquiryId: string) => {
    if (!replyText.trim()) return;
    
    setSending(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/inquiries/${inquiryId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Reply sent successfully!' });
        setReplyingTo(null);
        setReplyText('');
        router.refresh();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send reply' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const statuses = ['all', 'new', 'contacted', 'converted', 'closed'];

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

      {/* Inquiries List */}
      <div className="admin-card">
        <div className="card-body p-0">
          {inquiries.length === 0 ? (
            <div className="text-center py-5 text-muted">No inquiries found</div>
          ) : (
            <div className="list-group list-group-flush">
              {inquiries.map((inquiry) => (
                <div key={inquiry._id.toString()} className="list-group-item border-bottom p-4">
                  <div className="d-flex align-items-start justify-content-between gap-4">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-pill fw-semibold" style={{ 
                          fontSize: '0.75rem',
                          backgroundColor: STATUS_COLORS[inquiry.status]?.bg || 'rgba(100, 116, 139, 0.1)',
                          color: STATUS_COLORS[inquiry.status]?.color || '#64748b'
                        }}>
                          {inquiry.status}
                        </span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {inquiry.source} • {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="fw-semibold mb-1" style={{ color: '#1e293b', fontSize: '1rem' }}>
                        {inquiry.name}
                      </h3>
                      <p className="mb-2" style={{ color: '#64748b', fontSize: '0.9rem' }}>{inquiry.email}</p>
                      {inquiry.phone && (
                        <p className="mb-2 text-muted" style={{ fontSize: '0.85rem' }}>📞 {inquiry.phone}</p>
                      )}
                      
                      {inquiry.reason && (
                        <div className="mt-3 p-3 rounded-3" style={{ backgroundColor: '#f8fafc' }}>
                          <p className="mb-0" style={{ color: '#475569', fontSize: '0.9rem' }}>{inquiry.reason}</p>
                          {inquiry.interestedMajor && (
                            <p className="mb-0 mt-2 text-muted" style={{ fontSize: '0.75rem' }}>
                              Interested: {inquiry.interestedMajor} ({inquiry.interestedDegree})
                            </p>
                          )}
                        </div>
                      )}

                      {inquiry.adminReply && (
                        <div className="mt-3 p-3 rounded-3" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                          <p className="fw-semibold mb-1" style={{ color: '#15803d', fontSize: '0.85rem' }}>Reply:</p>
                          <p className="mb-0" style={{ color: '#166534', fontSize: '0.9rem' }}>{inquiry.adminReply}</p>
                          {inquiry.repliedAt && (
                            <p className="mb-0 mt-2" style={{ color: '#15803d', fontSize: '0.7rem' }}>
                              Replied on {new Date(inquiry.repliedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="d-flex flex-column gap-2" style={{ minWidth: '150px' }}>
                      {replyingTo === inquiry._id.toString() ? (
                        <div>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply..."
                            className="form-control mb-2"
                            style={{ borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '0.85rem' }}
                            rows={3}
                          />
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleReply(inquiry._id.toString())}
                              disabled={sending}
                              className="btn btn-sm flex-grow-1 fw-semibold"
                              style={{ backgroundColor: '#dc2626', color: 'white', borderRadius: '6px' }}
                            >
                              {sending ? 'Sending...' : 'Send'}
                            </button>
                            <button
                              onClick={() => { setReplyingTo(null); setReplyText(''); }}
                              className="btn btn-sm flex-grow-1"
                              style={{ borderColor: '#e2e8f0', color: '#64748b', borderRadius: '6px' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReplyingTo(inquiry._id.toString())}
                          className="btn btn-sm fw-semibold"
                          style={{ backgroundColor: '#dc2626', color: 'white', borderRadius: '6px' }}
                        >
                          <i className="bi bi-reply me-1"></i>
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
