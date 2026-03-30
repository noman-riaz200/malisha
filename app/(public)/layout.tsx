// =============================================================================
// app/(public)/layout.tsx — Public Routes Layout
// Wraps all public pages
// =============================================================================

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Malisha Edu - Study In China',
  description: 'Your trusted partner for studying in China.',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
