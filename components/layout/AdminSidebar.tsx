'use client';
// =============================================================================
// components/layout/AdminSidebar.tsx — Admin Dashboard Sidebar (Tailwind CSS)
// =============================================================================
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const NAV = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Universities', href: '/admin/universities', icon: '🏫' },
  { label: 'Students', href: '/admin/students', icon: '👤' },
  { label: 'Applications', href: '/admin/applications', icon: '📋' },
  { label: 'Inquiries', href: '/admin/inquiries', icon: '💬' },
  { label: 'Payments', href: '/admin/payments', icon: '💰' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

interface Props {
  user?: { name?: string | null; email?: string | null; role?: string };
}

export function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isActive = (href: string) => pathname.startsWith(href) || pathname === href;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const Icons = {
    dashboard: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10h8m-8 0H5m12 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2h7a2 2 0 002-2zM7 19h10" />
      </svg>
    ),
    universities: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    students: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    applications: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    inquiries: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    payments: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    settings: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37  .826-2.573-1.065-2.572-2.572-1.065-.426-1.756 0-2.924-.426-3.35z" />
        <circle cx={12} cy={12} r={3} />
      </svg>
    ),
    globe: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    logout: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
  };

  return (
    <aside className={`h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 shadow-2xl shadow-slate-950/50 backdrop-blur-xl border-r border-slate-800/50 transition-all duration-500 w-20 lg:w-64 group data-[collapsed=true]:w-20 hover:data-[collapsed=true]:w-64 lg:data-[collapsed=false]:w-64 sticky top-0 z-50 overflow-hidden ${isCollapsed ? 'data-[collapsed=true]' : ''}`}>
      {/* Sidebar Header */}
      <div className="flex items-center p-4 border-b border-slate-800/50">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all group-hover:opacity-100 lg:hidden"
          title="Toggle Sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'} />
          </svg>
        </button>
        {!isCollapsed && (
          <Link href="/admin/dashboard" className="ml-3 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">EduPro</h1>
              <span className="text-xs text-slate-400 font-medium">Admin Panel</span>
            </div>
          </Link>
        )}
      </div>

      {/* User Profile */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-slate-800/30">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30 hover:bg-slate-700/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg">
              {user.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold text-sm truncate">{user.name || 'Admin User'}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role || 'admin'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-2 space-y-1 flex-1">
        {NAV.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] || Icons.dashboard;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 group relative
                text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                ${active ? 'bg-indigo-500/20 text-indigo-100 shadow-lg shadow-indigo-500/25 !ring-2 !ring-indigo-400/50' : ''}
                ${isCollapsed ? 'justify-center p-3' : ''}
              `}
            >
              <Icon className={`w-6 h-6 flex-shrink-0 transition-colors ${active ? 'text-indigo-400' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              )}
              {active && !isCollapsed && (
                <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl -m-3" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/50 space-y-2">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 transition-colors w-full">
            <Icons.globe className="w-5 h-5" />
            <span className="text-sm font-medium">View Site</span>
          </Link>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/20 text-red-400 hover:text-red-200 hover:bg-red-500/10 transition-all group"
        >
          <Icons.logout className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
