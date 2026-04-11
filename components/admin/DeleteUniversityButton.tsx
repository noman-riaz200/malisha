'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteUniversityButton({ id, name }: { id: string; name: string }) {
  const [confirm, setConfirm] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/universities/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setConfirm(false);
      startTransition(() => router.refresh());
    }
  };

  if (confirm) {
    return (
      <span className="flex items-center gap-2">
        <button onClick={handleDelete} disabled={pending}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          {pending ? '...' : 'Confirm'}
        </button>
        <button onClick={() => setConfirm(false)}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirm(true)}
      className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
    >
      Delete
    </button>
  );
}
