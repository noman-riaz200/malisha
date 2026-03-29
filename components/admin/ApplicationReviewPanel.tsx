'use client';
// =============================================================================
// components/admin/ApplicationReviewPanel.tsx
// — Full application detail with approve/reject/notes
// =============================================================================
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface AdminNote { note: string; addedBy: string; addedAt: string; }

interface Application {
  _id: string;
  status: string;
  paymentStatus: string;
  decisionNote?: string;
  adminNotes?: AdminNote[];
  personal?: Record<string, any>;
  education?: any[];
  language?: Record<string, any>;
  documents?: any[];
  studentId?: { firstName: string; lastName: string; email: string; phone?: string };
  universityId?: { name: string; location: { city: string }};
  programId?: { name: string; degreeLevel: string; medium: string; applicationFeeUSD: number };
  createdAt: string;
  submittedAt?: string;
  reviewedAt?: string;
}

interface Props { application: Application; }

const STATUS_CONFIG = {
  draft:        { label: 'Draft',        dot: 'bg-slate-400',  text: 'text-slate-600',  badge: 'bg-slate-100' },
  submitted:    { label: 'Submitted',    dot: 'bg-blue-500',   text: 'text-blue-700',   badge: 'bg-blue-100' },
  under_review: { label: 'Under Review', dot: 'bg-amber-500',  text: 'text-amber-700',  badge: 'bg-amber-100' },
  approved:     { label: 'Approved',     dot: 'bg-green-500',  text: 'text-green-700',  badge: 'bg-green-100' },
  rejected:     { label: 'Rejected',     dot: 'bg-red-500',    text: 'text-red-700',    badge: 'bg-red-100' },
};

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-36 shrink-0">{label}</span>
      <span className="text-xs font-medium text-slate-700">{value}</span>
    </div>
  );
}

export function ApplicationReviewPanel({ application: app }: Props) {
  const router  = useRouter();
  const [pending, startTransition] = useTransition();

  const [note,       setNote]       = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [noteMsg,    setNoteMsg]    = useState('');
  const [actionNote, setActionNote] = useState('');
  const [showAction, setShowAction] = useState<'approve' | 'reject' | null>(null);

  const cfg = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft;

  const updateStatus = async (status: 'under_review' | 'approved' | 'rejected') => {
    const res = await fetch(`/api/applications/${app._id}/status`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status, note: actionNote }),
    });
    if (res.ok) {
      setShowAction(null);
      setActionNote('');
      startTransition(() => router.refresh());
    }
  };

  const addNote = async () => {
    setAddingNote(true);
    const res = await fetch(`/api/applications/${app._id}/notes`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ note }),
    });
    if (res.ok) {
      setNote(''); setNoteMsg('Note added!');
      setTimeout(() => setNoteMsg(''), 3000);
      startTransition(() => router.refresh());
    }
    setAddingNote(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── Left column: app info ─────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-5">

        {/* Status bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-slate-400 mb-1">Application ID</p>
              <p className="font-mono text-xs text-slate-600">{app._id}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${cfg.badge} ${cfg.text}`}>
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </div>
          </div>

          {/* Action buttons */}
          {!['approved', 'rejected'].includes(app.status) && (
            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100 flex-wrap">
              {app.status === 'submitted' && (
                <button
                  onClick={() => updateStatus('under_review')}
                  disabled={pending}
                  className="btn-secondary text-xs py-2 text-amber-700 border-amber-200 hover:bg-amber-50"
                >
                  🔍 Move to Review
                </button>
              )}
              <button
                onClick={() => setShowAction('approve')}
                className="btn-secondary text-xs py-2 text-green-700 border-green-200 hover:bg-green-50"
              >
                ✅ Approve
              </button>
              <button
                onClick={() => setShowAction('reject')}
                className="btn-secondary text-xs py-2 text-red-700 border-red-200 hover:bg-red-50"
              >
                ❌ Reject
              </button>
            </div>
          )}

          {/* Action modal */}
          {showAction && (
            <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-2 capitalize">
                {showAction === 'approve' ? '✅ Confirm Approval' : '❌ Confirm Rejection'}
              </p>
              <textarea
                value={actionNote}
                onChange={e => setActionNote(e.target.value)}
                placeholder={`Optional note to student (email will be sent)...`}
                rows={3}
                className="input-field text-xs resize-none mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(showAction === 'approve' ? 'approved' : 'rejected')}
                  disabled={pending}
                  className={`text-xs font-medium px-4 py-2 rounded-lg text-white transition-colors
                    ${showAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {pending ? 'Processing...' : `Confirm ${showAction}`}
                </button>
                <button onClick={() => setShowAction(null)} className="text-xs btn-secondary py-2">Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* Personal info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">Personal Information</h3>
          <div className="space-y-0.5">
            <InfoRow label="Full Name"       value={`${app.personal?.firstName || ''} ${app.personal?.lastName || ''}`.trim() || 'Not provided'} />
            <InfoRow label="Chinese Name"    value={app.personal?.chineseName} />
            <InfoRow label="Email"           value={app.personal?.email} />
            <InfoRow label="Phone"           value={app.personal?.phone} />
            <InfoRow label="Contact ID"      value={app.personal?.contactId} />
            <InfoRow label="Nationality"     value={app.personal?.nationality} />
            <InfoRow label="Date of Birth"   value={app.personal?.dateOfBirth && new Date(app.personal.dateOfBirth).toLocaleDateString()} />
            <InfoRow label="Gender"          value={app.personal?.gender} />
            <InfoRow label="Passport No."    value={app.personal?.passportNumber} />
            <InfoRow label="Passport Expiry" value={app.personal?.passportExpiry && new Date(app.personal.passportExpiry).toLocaleDateString()} />
            <InfoRow label="Religion"        value={app.personal?.religion} />
          </div>
        </div>

        {/* Education */}
        {app.education && app.education.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Education History</h3>
            <div className="space-y-3">
              {app.education.map((edu: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4">
                  <p className="font-medium text-slate-800 text-sm">{edu.schoolName}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                    <span>Major: <span className="text-slate-700">{edu.major}</span></span>
                    <span>GPA: <span className="text-slate-700">{edu.gpa}</span></span>
                    <span>Country: <span className="text-slate-700">{edu.country}</span></span>
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language */}
        {app.language && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Language Proficiency</h3>
            <div className="space-y-0.5">
              <InfoRow label="Native Language" value={app.language.nativeLanguage} />
              <InfoRow label="English Level"   value={app.language.englishLevel} />
              <InfoRow label="English Cert"    value={app.language.englishCert} />
              <InfoRow label="English Score"   value={app.language.englishScore} />
              <InfoRow label="Chinese Level"   value={app.language.chineseLevel} />
              <InfoRow label="HSK Level"       value={app.language.hskLevel} />
            </div>
          </div>
        )}

        {/* Documents */}
        {app.documents && app.documents.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Uploaded Documents</h3>
            <div className="space-y-2">
              {app.documents.map((doc: any, i: number) => (
                <a key={i} href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 rounded-xl transition-colors group">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 capitalize">{doc.docType?.replace('_', ' ')}</p>
                    <p className="text-xs text-slate-400 truncate">{doc.originalFilename}</p>
                  </div>
                  <span className="text-blue-600 text-xs group-hover:text-blue-700">View →</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Right column: meta + notes ────────────────────────────────── */}
      <div className="space-y-5">

        {/* Program info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">Application Summary</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-400 mb-0.5">University</p>
              <p className="text-sm font-semibold text-blue-900">{app.universityId?.name}</p>
              <p className="text-xs text-blue-600">{app.universityId?.location?.city}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-0.5">Program</p>
              <p className="text-sm font-medium text-slate-800">{app.programId?.name}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 capitalize">{app.programId?.degreeLevel}</span>
                <span className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 capitalize">{app.programId?.medium}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <InfoRow label="Payment"    value={app.paymentStatus === 'paid' ? '✓ Paid' : 'Unpaid'} />
            <InfoRow label="Submitted"  value={app.submittedAt && new Date(app.submittedAt).toLocaleString()} />
            <InfoRow label="Reviewed"   value={app.reviewedAt && new Date(app.reviewedAt).toLocaleString()} />
          </div>
        </div>

        {/* Student meta */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">Student</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {app.studentId?.firstName?.[0] || 'S'}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                {app.studentId?.firstName} {app.studentId?.lastName}
              </p>
              <p className="text-xs text-slate-500">{app.studentId?.email}</p>
            </div>
          </div>
        </div>

        {/* Admin notes */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">Internal Notes</h3>

          {app.adminNotes && app.adminNotes.length > 0 ? (
            <div className="space-y-3 mb-4">
              {app.adminNotes.map((n: AdminNote, i: number) => (
                <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs text-slate-700">{n.note}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{new Date(n.addedAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mb-4">No internal notes yet.</p>
          )}

          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Add an internal note (not visible to student)..."
            rows={3}
            className="input-field text-xs resize-none mb-2"
          />
          <button
            onClick={addNote}
            disabled={!note.trim() || addingNote}
            className="btn-primary text-xs py-2 w-full justify-center disabled:opacity-50"
          >
            {addingNote ? 'Adding...' : '+ Add Note'}
          </button>
          {noteMsg && <p className="text-xs text-green-600 text-center mt-1">{noteMsg}</p>}
        </div>
      </div>
    </div>
  );
}
