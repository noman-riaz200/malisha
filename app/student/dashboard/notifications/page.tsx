import { auth } from '@/lib/auth/config';
import Link from 'next/link';

export const metadata = { title: 'Notification Center — EduPro' };
export const dynamic = 'force-dynamic';

export default async function NotificationsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Notification Center</h1>
        <p className="text-slate-500 mt-1">University alerts, inquiry replies, and admission updates</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔔</div>
        <h3 className="font-semibold text-slate-900 text-lg mb-2">No new notifications</h3>
        <p className="text-slate-500">You'll receive alerts here when universities reply to your inquiries or update your admission status.</p>
      </div>
    </div>
  );
}
