// =============================================================================
// app/(public)/layout.tsx — Public Routes Layout
// Wraps all public pages
// =============================================================================

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
