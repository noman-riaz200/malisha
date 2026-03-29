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
      <span className="flex items-center gap-1">
        <button onClick={handleDelete} disabled={pending}
          className="text-xs text-red-600 hover:text-red-700 font-medium">
          {pending ? '...' : 'Confirm'}
        </button>
        <button onClick={() => setConfirm(false)} className="text-xs text-slate-400">Cancel</button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirm(true)} className="text-xs text-red-400 hover:text-red-600 transition-colors">
      Delete
    </button>
  );
}
