// =============================================================================
// app/dashboard/documents/page.tsx — Student Documents Management
// =============================================================================
import { DocumentsList } from './DocumentsList';
import { DOC_TYPES } from './docTypes';

export const metadata = { title: 'My Documents — EduPro' };
export const dynamic = 'force-dynamic';

export default function DocumentsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Documents</h1>
        <p className="text-slate-500 mt-1">Upload and manage your application documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DocumentsList />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-6">Required Documents</h2>
            <ul className="space-y-3">
              {DOC_TYPES.map(type => (
                <li key={type.value} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm">{type.icon}</span>
                  <span className="text-sm text-slate-600">{type.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Upload Tips</h2>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Maximum file size: 10MB</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Supported formats: PDF, JPG, PNG</span>
              </li>
              <li className="flex gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Documents verified within 24-48 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}