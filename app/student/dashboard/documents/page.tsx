// =============================================================================
// app/dashboard/documents/page.tsx — Student Documents Management
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { DocumentsList } from './DocumentsList';

export const metadata = { title: 'My Documents — EduPro' };
export const dynamic = 'force-dynamic';

export default function DocumentsPage() {
  return (
    <div className="container-vz">
      <div className="mb-5">
        <h1 className="display-font fw-bold mb-2" style={{ fontSize: '2rem', color: '#1e293b' }}>
          My Documents
        </h1>
        <p style={{ color: '#64748b' }}>Upload and manage your application documents.</p>
      </div>

      <DocumentsList />
    </div>
  );
}