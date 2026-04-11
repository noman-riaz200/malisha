'use client';
// =============================================================================
// components/layout/DashboardSidebar.tsx — Student Dashboard Sidebar (Tailwind CSS)
// =============================================================================
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const NAV = [
  { label: 'Application Tracking', href: '/student/dashboard/applications', icon: 'applications' },
  { label: 'Program Selection', href: '/student/dashboard/programs', icon: 'programs' },
  { label: 'Document Vault', href: '/student/dashboard/documents', icon: 'documents' },
  { label: 'Profile Management', href: '/student/dashboard/profile', icon: 'profile' },
  { label: 'Payment Overview', href: '/student/dashboard/payments', icon: 'payments' },
  { label: 'Transaction Receipts', href: '/student/dashboard/receipts', icon: 'receipts' },
  { label: 'Notification Center', href: '/student/dashboard/notifications', icon: 'notifications' },
];

interface Props {
  user: { name?: string | null; email?: string | null; role: string };
}

export function DashboardSidebar({ user }: Props) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isActive = (href: string) => href === '/student/dashboard' ? pathname === href : pathname.startsWith(href);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const Icons = {
    dashboard: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10h8m-8 0H5m12 0v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2h7a2 2 0 002-2zM7 19h10" />
      </svg>
    ),
    applications: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    documents: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    payments: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    inquiries: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    profile: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    programs: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5m6 0l9 5-9 5-9-5 9-5m-6 0v6m-3-3l3 3m-3-3l3-3" />
      </svg>
    ),
    receipts: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zM9 14v4m6-4v4m-3-4h6" />
      </svg>
    ),
    notifications: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
          <Link href="/student/dashboard" className="ml-3 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">EduPro</h1>
              <span className="text-xs text-slate-400 font-medium">Student Portal</span>
            </div>
          </Link>
        )}
      </div>

      {/* User Profile */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-slate-800/30">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30 hover:bg-slate-700/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-400 to-rose-500 flex items-center justify-center text-white font-semibold shadow-lg">
              {user.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-semibold text-sm truncate">{user.name || 'Student'}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role || 'student'}</p>
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
                text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50
                ${active ? 'bg-red-500/20 text-red-100 shadow-lg shadow-red-500/25 !ring-2 !ring-red-400/50' : ''}
                ${isCollapsed ? 'justify-center p-3' : ''}
              `}
            >
              <Icon className={`w-6 h-6 flex-shrink-0 transition-colors ${active ? 'text-red-400' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              )}
              {active && !isCollapsed && (
                <div className="absolute inset-0 bg-red-500/10 rounded-2xl -m-3" />
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
          onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
          className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/20 text-red-400 hover:text-red-200 hover:bg-red-500/10 transition-all group"
        >
          <Icons.logout className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}