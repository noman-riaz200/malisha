'use client';
// =============================================================================
// components/layout/DashboardSidebar.tsx — Student Dashboard Sidebar (Tailwind CSS)
// =============================================================================
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const NAV = [
  { label: 'Overview', href: '/student/dashboard', icon: '📊' },
  { label: 'Applications', href: '/student/dashboard/applications', icon: '📄' },
  { label: 'Documents', href: '/student/dashboard/documents', icon: '📁' },
  { label: 'Payments', href: '/student/dashboard/payments', icon: '💳' },
  { label: 'Inquiries', href: '/student/dashboard/inquiries', icon: '💬' },
  { label: 'Profile', href: '/student/dashboard/profile', icon: '👤' },
];

interface Props {
  user: { name?: string | null; email?: string | null; role: string };
}

export function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/student/dashboard' ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex flex-col bg-slate-900" style={{ width: '280px' }}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center text-decoration-none">
          <div className="rounded-xl flex items-center justify-center me-2 text-white font-bold"
            style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', fontSize: '1.1rem' }}
          >
            E
          </div>
          <span className="font-bold text-xl text-white">
            Edu<span className="text-red-500">Pro</span>
          </span>
        </Link>
      </div>

      {/* User card */}
      <div className="mx-3 my-3 p-3 rounded-xl bg-white/10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-red-600 to-red-800">
            {user.name?.[0] || 'S'}
          </div>
          <div className="ms-3 flex-1 min-w-0">
            <p className="mb-1 text-white font-semibold truncate text-sm">{user.name}</p>
            <span className="rounded-full text-white text-xs px-2 py-0.5 bg-gradient-to-br from-red-600 to-red-800">
              {user.role}
            </span>
          </div>
        </div>
        <p className="text-white/50 text-xs mb-0 mt-2 truncate">{user.email}</p>
      </div>

      {/* Nav */}
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

      {/* Bottom */}
      <div className="p-3 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 mb-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
          <span className="text-lg">🏠</span>
          <span className="text-sm">Back to Site</span>
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
