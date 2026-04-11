// =============================================================================
// app/student/dashboard/layout.tsx — Student Dashboard Layout
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login?callbackUrl=/student/dashboard/applications');
  
  const userRole = (session.user as any)?.role;
  if (userRole === 'admin' || userRole === 'super_admin') {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar user={session.user as any} />
      <main className="flex-1 w-full p-6 lg:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}