// =============================================================================
// app/layout.tsx — Root Layout (Optimized for Performance)
// =============================================================================
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

const Navbar = dynamic(
  () => import('@/components/layout/Navbar').then((mod) => mod.Navbar),
  { 
    loading: () => (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm h-16" />
    )
  }
);

const Footer = dynamic(
  () => import('@/components/layout/Footer').then((mod) => mod.Footer),
  { loading: () => <footer className="bg-gray-900 py-12" /> }
);
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: { 
    default: 'Malisha Edu - Study In China', 
    template: '%s | Malisha Edu' 
  },
  description: 'Your trusted partner for studying in China. We provide comprehensive services for international students seeking quality education in Chinese universities.',
  keywords: ['study in china, chinese universities, scholarships, education expo, malisha edu'],
  openGraph: {
    title: 'Malisha Edu - Study In China',
    description: 'Your trusted partner for studying in China.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Simplified layout - Navbar and Footer shown on all pages except dashboard routes
  // The Navbar component itself handles route-specific visibility
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to Google Fonts */}
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
      </html>
  );
}
