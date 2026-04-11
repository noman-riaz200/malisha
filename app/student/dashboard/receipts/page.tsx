import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Payment } from '@/lib/db/models/models';
import Link from 'next/link';

export const metadata = { title: 'Transaction Receipts — EduPro' };
export const dynamic = 'force-dynamic';

export default async function ReceiptsPage() {
  const session = await auth();
  await connectDB();

  const payments = await Payment
    .find({ studentId: (session!.user as any).id, status: 'succeeded' })
    .sort({ createdAt: -1 })
    .populate('applicationId', 'universityId programId')
    .lean();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Transaction Receipts</h1>
        <p className="text-slate-500 mt-1">Download PDF receipts for your payments</p>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🧾</div>
          <h3 className="font-semibold text-slate-900 text-lg mb-2">No receipts yet</h3>
          <p className="text-slate-500">Your payment receipts will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {payments.map((pay: any) => (
            <div key={pay._id.toString()} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl shrink-0">🧾</div>
                <div>
                  <p className="font-semibold text-slate-900">${pay.amount.toFixed(2)}</p>
                  <p className="text-sm text-slate-500">{new Date(pay.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all">
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
