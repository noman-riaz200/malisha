'use client';
// =============================================================================
// app/admin/students/StudentsList.tsx — Students List (Bootstrap + Red Theme)
// =============================================================================
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  nationality?: string;
  isEmailVerified: boolean;
  createdAt: string;
}

interface Props {
  students: Student[];
  pagination: { page: number; pages: number; total: number };
  currentSearch: string;
}

export function StudentsList({ students, pagination, currentSearch }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/admin/students?search=${encodeURIComponent(search)}`);
  };

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (search) params.set('search', search);
    router.push(`/admin/students?${params.toString()}`);
  };

  return (
    <div className="admin-card w-100" style={{ maxWidth: '100%' }}>
      {/* Search Bar */}
      <div className="card-body border-bottom">
        <form onSubmit={handleSearch} className="d-flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ borderColor: '#e2e8f0', borderRadius: '8px' }}
          />
          <button type="submit" className="btn fw-semibold px-4" 
            style={{ backgroundColor: '#dc2626', color: 'white', borderRadius: '8px' }}>
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="table-responsive w-100">
        <table className="table table-hover mb-0" style={{ minWidth: '100%', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STUDENT</th>
              <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>CONTACT</th>
              <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>NATIONALITY</th>
              <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>VERIFIED</th>
              <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>JOINED</th>
              <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id.toString()} className="border-bottom" style={{ transition: 'all 0.2s' }}>
                <td className="px-4 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                      style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', fontSize: '0.85rem' }}>
                      {student.firstName?.[0]}{student.lastName?.[0]}
                    </div>
                    <div>
                      <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.9rem' }}>{student.firstName} {student.lastName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="mb-0" style={{ color: '#64748b', fontSize: '0.85rem' }}>{student.email}</p>
                  {student.phone && <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{student.phone}</p>}
                </td>
                <td className="px-4 py-3">
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{student.nationality || '—'}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-pill fw-semibold" style={{ 
                    fontSize: '0.75rem',
                    backgroundColor: student.isEmailVerified ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: student.isEmailVerified ? '#22c55e' : '#f59e0b'
                  }}>
                    {student.isEmailVerified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="d-flex align-items-center gap-2">
                    <Link 
                      href={`/admin/students/${student._id}`}
                      className="btn btn-sm" 
                      style={{ color: '#3b82f6', border: '1px solid #e2e8f0', fontSize: '0.75rem' }}
                      title="View Details"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <button
                      className="btn btn-sm" 
                      style={{ color: '#dc2626', border: '1px solid #e2e8f0', fontSize: '0.75rem' }}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="card-body d-flex align-items-center justify-content-between border-top w-100">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            Showing {((pagination.page - 1) * 20) + 1} to {Math.min(pagination.page * 20, pagination.total)} of {pagination.total} students
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
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <li key={p} className={`page-item ${p === pagination.page ? 'active' : ''}`}>
                  <button
                    onClick={() => handlePageChange(p)}
                    className="page-link"
                    style={{ 
                      borderColor: '#e2e8f0',
                      backgroundColor: p === pagination.page ? '#dc2626' : 'transparent',
                      color: p === pagination.page ? 'white' : '#64748b'
                    }}
                  >
                    {p}
                  </button>
                </li>
              ))}
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
  );
}
