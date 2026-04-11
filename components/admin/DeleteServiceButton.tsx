"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteServiceButton({ id, name }: { id: string; name: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) {
      setShowConfirm(false);
      startTransition(() => router.refresh());
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6">
            <h2 className="font-bold text-xl text-slate-900 mb-2">Delete Service</h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}