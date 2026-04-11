// =============================================================================
// app/dashboard/payments/page.tsx
// =============================================================================
import { auth }      from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Payment }   from '@/lib/db/models/models';
import Link          from 'next/link';

export const metadata = { title: 'Payment History — EduPro' };
export const dynamic  = 'force-dynamic';

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-50 text-amber-700',
  succeeded: 'bg-green-50 text-green-700',
  failed:    'bg-red-50 text-red-700',
  refunded:  'bg-slate-100 text-slate-600',
};

export default async function PaymentsPage({ searchParams }: { searchParams: { success?: string } }) {
  const session  = await auth();
  await connectDB();

  const payments = await Payment
    .find({ studentId: (session!.user as any).id })
    .sort({ createdAt: -1 })
    .populate('applicationId', 'universityId programId')
    .lean();

  const succeeded = payments.filter((p: any) => p.status === 'succeeded');
  const pending = payments.filter((p: any) => p.status === 'pending');
  const total = succeeded.reduce((sum: number, p: any) => sum + p.amount, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Payment History</h1>
        <p className="text-slate-500 mt-1">View and manage your payment transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500 mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500 mb-1">Successful</p>
          <p className="text-2xl font-bold text-green-600">{succeeded.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{pending.length}</p>
        </div>
      </div>

      {searchParams.success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 mb-6">
          <span className="text-2xl">✅</span>
          <p className="text-green-800 font-medium">Payment successful! Your application fee has been received.</p>
        </div>
      )}

      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">💳</div>
          <h3 className="font-semibold text-slate-900 mb-2">No payments yet</h3>
          <p className="text-slate-500 text-sm">Payments will appear here after you pay an application fee.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.map((pay: any) => (
            <div key={pay._id.toString()} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0
                  ${pay.provider === 'stripe' ? 'bg-violet-50' : 'bg-blue-50'}`}>
                  {pay.provider === 'stripe' ? '💳' : '🅿️'}
                </div>
                <div>
                  <p className="font-medium text-slate-900 capitalize">{pay.provider} Payment</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">{pay.providerPaymentId?.slice(0, 20)}...</p>
                  <p className="text-xs text-slate-400">{new Date(pay.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-slate-900">${pay.amount.toFixed(2)}</p>
                <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mt-1 ${STATUS_STYLES[pay.status] || STATUS_STYLES.pending}`}>
                  {pay.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
