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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex">
      <AdminSidebar user={session.user as any} />
      <main className="flex-1 p-6 lg:p-8 min-h-screen transition-all duration-500">
        {children}
      </main>
    </div>
  );
}