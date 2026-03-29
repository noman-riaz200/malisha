'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-8 text-center">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
          <h2 className="font-semibold text-slate-900 text-lg mb-2">Something went wrong!</h2>
          <p className="text-slate-500 text-sm mb-6">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={() => reset()}
            className="btn-primary px-6 py-2.5 text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
