// =============================================================================
// app/admin/layout.tsx — Admin Dashboard Layout
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
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar user={session.user as any} />
      <main className="flex-1 ml-[280px] p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}