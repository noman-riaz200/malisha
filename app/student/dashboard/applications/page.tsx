// =============================================================================
// app/dashboard/applications/page.tsx — Student Application List
// =============================================================================
import { auth }        from '@/lib/auth/config';
import { connectDB }   from '@/lib/db/mongoose';
import { Application } from '@/lib/db/models/models';
import Link            from 'next/link';

export const metadata = { title: 'My Applications — EduPro' };
export const dynamic  = 'force-dynamic';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  draft:        { label: 'Draft',        bg: 'bg-slate-100',  text: 'text-slate-600',  dot: 'bg-slate-400' },
  submitted:    { label: 'Submitted',    bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  under_review: { label: 'Under Review', bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500' },
  approved:     { label: 'Approved ✓',   bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
  rejected:     { label: 'Rejected',     bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
};

const TIMELINE: Record<string, number> = {
  draft: 1, submitted: 2, under_review: 3, approved: 4, rejected: 4,
};

export default async function ApplicationsPage({ searchParams }: { searchParams: { submitted?: string } }) {
  const session = await auth();
  await connectDB();

  const applications = await Application
    .find({ studentId: (session!.user as any).id })
    .populate('universityId', 'name logo location')
    .populate('programId',    'name degreeLevel medium applicationFeeUSD')
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500 mt-1">{applications.length} application{applications.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/universities" className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all">
          + New Application
        </Link>
      </div>

      {/* Submitted toast */}
      {searchParams.submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold text-green-800">Application submitted!</p>
            <p className="text-green-700 text-sm">We'll review it shortly and email you any updates.</p>
          </div>
        </div>
      )}

      {/* Applications */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">📋</div>
          <h3 className="font-semibold text-slate-900 text-lg mb-2">No applications yet</h3>
          <p className="text-slate-500 mb-6">Start your journey by browsing our 250+ partner universities.</p>
          <Link href="/universities" className="inline-flex px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-rose-700 transition-all">Browse Universities →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => {
            const cfg    = STATUS_CONFIG[app.status] || STATUS_CONFIG.draft;
            const step   = TIMELINE[app.status] || 1;
            const uni    = app.universityId as any;
            const prog   = app.programId as any;

            return (
              <div key={app._id.toString()} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card transition-shadow">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="w-12 h-12 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                      {uni?.logo
                        ? <img src={uni.logo} alt="" className="w-full h-full object-contain p-1.5" />
                        : <span className="text-xl">🏛️</span>
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="font-semibold text-slate-900">{uni?.name}</h3>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {prog?.name}
                            {prog?.degreeLevel && <span className="capitalize"> · {prog.degreeLevel}</span>}
                            {prog?.medium     && <span className="capitalize"> · {prog.medium} taught</span>}
                          </p>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text} shrink-0`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </div>
                      </div>

                      {/* Progress timeline */}
                      <div className="flex items-center gap-1 mt-4">
                        {['Submitted', 'Under Review', 'Decision'].map((label, i) => {
                          const stepNum = i + 2;
                          const done    = step >= stepNum;
                          const current = step === stepNum;
                          return (
                            <div key={label} className="flex items-center flex-1">
                              <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs
                                ${done
                                  ? app.status === 'rejected' && i === 2 ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'
                                  : 'bg-slate-200 text-slate-400'
                                }`}>
                                {done ? (app.status === 'rejected' && i === 2 ? '✕' : '✓') : stepNum - 1}
                              </div>
                              <div className="flex-1 mx-1">
                                <p className={`text-xs ${done ? (app.status === 'rejected' && i === 2 ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'} font-medium`}>
                                  {label}
                                </p>
                              </div>
                              {i < 2 && <div className={`h-px flex-1 ${step > stepNum ? 'bg-blue-300' : 'bg-slate-200'}`} />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 flex-wrap gap-2">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>Created {new Date(app.createdAt).toLocaleDateString()}</span>
                          <span className={`font-medium ${app.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                            {app.paymentStatus === 'paid' ? '✓ Fee Paid' : '⚠ Fee Unpaid'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {app.paymentStatus !== 'paid' && app.status !== 'draft' && (
                            <Link href={`/student/dashboard/applications/${app._id}?pay=1`}
                              className="inline-flex px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-medium rounded-lg hover:from-red-600 hover:to-rose-700 transition-all">
                              Pay Fee
                            </Link>
                          )}
                          <Link href={`/student/dashboard/applications/${app._id}`}
                            className="inline-flex px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-all">
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decision note */}
                {app.decisionNote && (
                  <div className={`px-5 py-3 text-sm border-t ${app.status === 'approved' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    <span className="font-medium">Advisor note: </span>{app.decisionNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
