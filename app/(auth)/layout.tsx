import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page-wrapper no-navbar" suppressHydrationWarning>
      {children}
    </div>
  );
}

