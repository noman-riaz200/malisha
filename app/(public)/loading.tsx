// =============================================================================
// app/(public)/loading.tsx
// Loading state for faster perceived performance
// =============================================================================

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading content...</p>
      </div>
    </div>
  );
}
