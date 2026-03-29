// =============================================================================
// app/dashboard/inquiries/page.tsx — Student Inquiries
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { InquiriesList } from './InquiriesList';

export const metadata = { title: 'My Inquiries — EduPro' };
export const dynamic = 'force-dynamic';

export default function InquiriesPage() {
  return (
    <div className="container-vz">
      <div className="mb-5">
        <h1 className="display-font fw-bold mb-2" style={{ fontSize: '2rem', color: '#1e293b' }}>
          My Inquiries
        </h1>
        <p style={{ color: '#64748b' }}>Contact us and track your inquiry status.</p>
      </div>

      <InquiriesList />
    </div>
  );
}