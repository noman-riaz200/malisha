// =============================================================================
// app/student/dashboard/layout.tsx — Student Dashboard Layout (Red/Green/Blue/White Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login?callbackUrl=/student/dashboard');

  return (
    <div className="student-dashboard" style={{ backgroundColor: 'var(--student-background-alt)', minHeight: '100vh' }}>
      {/* Top Navbar for mobile */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom d-lg-none" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1050 }}>
        <div className="container-fluid">
          <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold"
              style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
            >
              E
            </div>
            <span style={{ color: '#1e293b' }}>Edu<span style={{ color: '#dc2626' }}>Pro</span></span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dashboardNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="dashboardNav">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <Link href="/student/dashboard" className="nav-link active">
                  <i className="bi bi-grid me-2"></i> Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/student/dashboard/applications" className="nav-link">
                  <i className="bi bi-file-text me-2"></i> Applications
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/student/dashboard/documents" className="nav-link">
                  <i className="bi bi-folder me-2"></i> Documents
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/student/dashboard/payments" className="nav-link">
                  <i className="bi bi-credit-card me-2"></i> Payments
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/student/dashboard/inquiries" className="nav-link">
                  <i className="bi bi-chat-dots me-2"></i> Inquiries
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/student/dashboard/profile" className="nav-link">
                  <i className="bi bi-person me-2"></i> Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="d-flex">
        {/* Desktop Sidebar */}
        <DashboardSidebar user={session.user} />
        
        {/* Main Content */}
        <div className="flex-grow-1 p-4" style={{ minWidth: 0, paddingTop: '80px', backgroundColor: 'var(--student-background-alt)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}