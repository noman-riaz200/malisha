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
    <aside className="hidden lg:flex flex-col bg-slate-900" style={{ width: '280px' }}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3 text-decoration-none">
          <div className="rounded-xl flex items-center justify-center text-white font-bold"
            style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', fontSize: '1.25rem' }}
          >
            E
          </div>
          <div>
            <div className="font-bold text-white text-lg">EduPro Admin</div>
            <div className="text-white/50 text-xs">Control Panel</div>
          </div>
        </Link>
      </div>

      {/* User Info */}
      {user && (
        <div className="mx-3 my-3 p-3 rounded-xl bg-white/10">
          <div className="flex items-center gap-3">
            <div className="rounded-full flex items-center justify-center text-white font-bold"
              style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', fontSize: '1rem' }}
            >
              {user.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-0 text-white font-semibold truncate text-sm">{user.name || 'Admin'}</p>
              <span className="rounded-full text-white text-xs px-2 py-0.5" style={{ background: '#dc2626' }}>
                {user.role || 'admin'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3">
        {NAV.map(item => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-3 mb-1 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.href) 
                ? 'bg-red-600/20 text-red-500' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 mb-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
          <span className="text-lg">🌐</span>
          <span className="text-sm">View Site</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg border-0 bg-transparent transition-colors hover:bg-white/5"
          style={{ color: '#dc2626' }}
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
