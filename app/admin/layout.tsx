// =============================================================================
// app/admin/layout.tsx — Admin Dashboard Layout (Navy/Orange Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login');
  if (!['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }
  return (
    <div className="admin-dashboard" style={{ backgroundColor: 'var(--admin-background)', minHeight: '100vh' }}>
      <div className="d-flex">
        <AdminSidebar user={session.user as any} />
        <main className="flex-grow-1 p-4" style={{ minWidth: 0, paddingTop: '60px', backgroundColor: 'var(--admin-background)' }}>{children}</main>
      </div>
    </div>
  );
}
