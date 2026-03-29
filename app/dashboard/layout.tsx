// =============================================================================
// app/dashboard/layout.tsx — Dashboard Layout Wrapper (Auth Check)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session) {
    redirect('/login?callbackUrl=/dashboard');
  }
  
  const role = (session.user as any)?.role;
  
  if (role === 'admin' || role === 'super_admin') {
    redirect('/admin/dashboard');
  }
  
  // Student users will be handled by child pages that redirect to /student/dashboard
  return <>{children}</>;
}