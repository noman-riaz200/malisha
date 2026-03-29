"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AuthCheckProps {
  children: ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const pathname = usePathname();
  console.log('AuthCheck pathname:', pathname);
  console.log('AuthCheck children:', children);
  const isAuthPage = pathname === '/login' || pathname === '/register';
  console.log('isAuthPage:', isAuthPage);

  return (
    <main style={{ minHeight: isAuthPage ? '100vh' : 'calc(100vh - 400px)', background: 'orange' }}>
      <div style={{ padding: '20px' }}>AUTH CHECK - pathname: {pathname}</div>
      {children}
    </main>
  );
}