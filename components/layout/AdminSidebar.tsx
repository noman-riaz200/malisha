'use client';
// =============================================================================
// components/layout/AdminSidebar.tsx — Admin Dashboard Sidebar (Tailwind CSS)
// =============================================================================
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const NAV = [
  { label: 'Analytics', href: '/admin', icon: '📊' },
  { label: 'Universities', href: '/admin/universities', icon: '🏢' },
  { label: 'Students', href: '/admin/students', icon: '👥' },
  { label: 'Applications', href: '/admin/applications', icon: '📄' },
  { label: 'Inquiries', href: '/admin/inquiries', icon: '💬' },
  { label: 'Payments', href: '/admin/payments', icon: '💳' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

interface Props {
  user?: { name?: string | null; email?: string | null; role?: string };
}

export function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/admin' ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <Link href="/admin" className="sidebar-brand">
          <div className="sidebar-logo-icon">
            E
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">EduPro Admin</span>
            <span className="sidebar-brand-subtitle">Control Panel</span>
          </div>
        </Link>
      </div>

      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user.name?.[0] || 'A'}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user.name || 'Admin'}</p>
            <span className="sidebar-user-role">{user.role || 'admin'}</span>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {NAV.map(item => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`sidebar-nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link href="/" className="sidebar-nav-item">
          <span className="sidebar-nav-icon">🌐</span>
          <span className="sidebar-nav-label">View Site</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="sidebar-nav-item sidebar-logout"
        >
          <span className="sidebar-nav-icon">🚪</span>
          <span className="sidebar-nav-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
