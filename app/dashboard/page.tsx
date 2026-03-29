// =============================================================================
// app/dashboard/page.tsx — Central Dashboard Route (Auth & Role-Based Redirect)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login?callbackUrl=/dashboard');
  }
  
  const role = (session.user as any)?.role;
  
  if (role === 'admin' || role === 'super_admin') {
    redirect('/admin/dashboard');
  }
  
  // Default to student dashboard
  redirect('/student/dashboard');
}