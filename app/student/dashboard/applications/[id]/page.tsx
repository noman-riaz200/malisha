// =============================================================================
// app/student/dashboard/applications/[id]/page.tsx — Application Detail Page
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { Application } from '@/lib/db/models/models';
import Link from 'next/link';

interface Props {
  params: { id: string };
  searchParams: { pay?: string };
}

export default async function ApplicationDetailPage({ params, searchParams }: Props) {
  const session = await auth();
  if (!session) redirect('/login');

  await connectDB();

  const application = await Application.findById(params.id)
    .populate('universityId', 'name logo location')
    .populate('programId', 'name degreeLevel tuitionFeeUSD applicationFeeUSD')
    .lean();

  if (!application) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Application Not Found</h2>
          <p className="text-red-600 mb-4">The application you're looking for doesn't exist or has been removed.</p>
          <Link href="/student/dashboard/applications" className="text-red-600 hover:underline">
            ← Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const uni = application.universityId as any;
  const prog = application.programId as any;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link href="/student/dashboard/applications" className="text-red-600 hover:underline text-sm mb-2 inline-block">
              ← Back to Applications
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">{uni?.name}</h1>
            <p className="text-slate-500 mt-1">{prog?.name} · {prog?.degreeLevel}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === 'approved' ? 'bg-green-100 text-green-700' : application.status === 'rejected' ? 'bg-red-100 text-red-700' : application.status === 'under_review' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
            {application.status?.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {searchParams.pay === '1' && application.paymentStatus !== 'paid' && application.status !== 'draft' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-amber-800 mb-4">Complete Payment</h2>
          <p className="text-amber-700 mb-4">
            Application Fee: <span className="font-bold">${prog?.applicationFeeUSD || 0}</span>
          </p>
          <div className="flex gap-3">
            <Link
              href={`/api/payments/stripe/create-payment-intent?applicationId=${application._id}`}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all"
            >
              Pay with Stripe
            </Link>
            <Link
              href={`/api/payments/paypal/create-order?applicationId=${application._id}`}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all"
            >
              Pay with PayPal
            </Link>
          </div>
        </div>
      )}

      {/* Payment Status */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Status</h2>
        <div className="flex items-center gap-3">
          {application.paymentStatus === 'paid' ? (
            <>
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-medium text-green-700">Payment Completed</p>
                <p className="text-sm text-slate-500">Application fee has been paid</p>
              </div>
            </>
          ) : (
            <>
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-medium text-amber-700">Payment Required</p>
                <p className="text-sm text-slate-500">Please complete your application fee payment</p>
              </div>
              {application.status !== 'draft' && (
                <Link
                  href={`/student/dashboard/applications/${application._id}?pay=1`}
                  className="ml-auto px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all"
                >
                  Pay Now
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Application Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">University</p>
            <p className="font-medium text-slate-900">{uni?.name}</p>
          </div>
          <div>
            <p className="text-slate-500">Program</p>
            <p className="font-medium text-slate-900">{prog?.name}</p>
          </div>
          <div>
            <p className="text-slate-500">Degree Level</p>
            <p className="font-medium text-slate-900 capitalize">{prog?.degreeLevel}</p>
          </div>
          <div>
            <p className="text-slate-500">Tuition Fee</p>
            <p className="font-medium text-slate-900">${prog?.tuitionFeeUSD?.toLocaleString()}/year</p>
          </div>
          <div>
            <p className="text-slate-500">Application Fee</p>
            <p className="font-medium text-slate-900">${prog?.applicationFeeUSD}</p>
          </div>
          <div>
            <p className="text-slate-500">Submitted</p>
            <p className="font-medium text-slate-900">{application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Decision Note */}
      {application.decisionNote && (
        <div className={`border rounded-xl p-6 ${application.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <h2 className="text-lg font-semibold mb-2">Advisor Note</h2>
          <p className={application.status === 'approved' ? 'text-green-800' : 'text-red-800'}>
            {application.decisionNote}
          </p>
        </div>
      )}
    </div>
  );
}