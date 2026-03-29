'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/universities?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav aria-label="University pagination">
      <ul className="pagination justify-content-center gap-2">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              color: currentPage === 1 ? '#94a3b8' : 'var(--vz-primary)',
              backgroundColor: '#fff',
              padding: '0.5rem 1rem',
            }}
          >
            ← Previous
          </button>
        </li>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            {page === '...' ? (
              <span
                className="page-link"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  color: '#64748b',
                  backgroundColor: '#fff',
                  padding: '0.5rem 1rem',
                  cursor: 'default',
                }}
              >
                ...
              </span>
            ) : (
              <button
                className="page-link"
                onClick={() => handlePageChange(page as number)}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  color: page === currentPage ? '#fff' : 'var(--vz-primary)',
                  backgroundColor: page === currentPage ? 'var(--vz-primary)' : '#fff',
                  padding: '0.5rem 1rem',
                  fontWeight: page === currentPage ? '600' : '400',
                }}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              color: currentPage === totalPages ? '#94a3b8' : 'var(--vz-primary)',
              backgroundColor: '#fff',
              padding: '0.5rem 1rem',
            }}
          >
            Next →
          </button>
        </li>
      </ul>
    </nav>
  );
}
