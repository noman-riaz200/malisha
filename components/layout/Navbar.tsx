'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Partner Univ', href: '/universities' },
  { label: 'Find University', href: '/universities' },
  { label: 'Scholarship Services', href: '/scholarships' },
  { label: 'Expo', href: '/expo', hasDropdown: true, dropdown: [
    { label: 'Education Expo in China', href: '/services/education-expo-china' },
    { label: 'Education Expo in Overseas', href: '/services/education-expo-overseas' },
    { label: 'Education Expo in America', href: '/services/education-expo-america' },
  ]},
  { label: 'Services', href: '/services', hasDropdown: true, dropdown: [
    { label: 'Service Charges', href: '/services/service-charges' },
    { label: 'Admission Service', href: '/services/admission-service' },
    { label: 'Chinese Language and Foundation Course', href: '/services/chinese-language-foundation-course' },
    { label: 'Airport Pickup Service', href: '/services/airport-pickup' },
    { label: 'Accommodation Service', href: '/services/accommodation' },
    { label: 'Visa Service', href: '/services/visa' },
    { label: 'On Campus Service', href: '/services/on-campus-service' },
    { label: 'Job & Business in China', href: '/services/job-business-china' },
  ]},
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [expoOpen, setExpoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isServicesActive = (href: string) => pathname.startsWith('/services') || pathname.startsWith(expoOpen ? '/expo' : '');

  // Prevent hydration mismatch by not rendering mobile menu until mounted
  const displayMobileOpen = mounted ? mobileOpen : false;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0d2137] shadow-lg' : 'bg-[#0d2137]/98'
      }`}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-3">
          {/* Logo - MalishaEdu */}
          <Link href="/" className="flex items-center gap-2 text-decoration-none ml-2">
            <span className="font-bold text-xl text-white tracking-tight">
              Malisha<span style={{ color: '#C62828' }}>Edu</span>
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white border-0 bg-transparent"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {displayMobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop nav */}
          <div className={`hidden lg:flex lg:items-center lg:w-full lg:justify-between ${displayMobileOpen ? 'flex' : ''}`}>
            <ul className="flex items-center w-full justify-between">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="relative" style={{ position: 'relative' }}>
                  {link.hasDropdown && link.dropdown ? (
                    <>
                      <button 
                        className={`px-3 py-2 rounded text-decoration-none transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                          isServicesActive(link.href) 
                            ? 'text-[#C62828] bg-[#C62828]/10' 
                            : 'text-white/90 hover:text-[#C62828]'
                        }`}
                        style={{ 
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                        onClick={() => link.label === 'Expo' ? setExpoOpen(!expoOpen) : setServicesOpen(!servicesOpen)}
                        onMouseEnter={() => link.label === 'Expo' ? setExpoOpen(true) : setServicesOpen(true)}
                      >
                        {link.label}
                        <svg className={`w-3 h-3 transition-transform ${servicesOpen || expoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {/* Dropdown Menu */}
                      <div 
                        className={`absolute top-full left-1/2 -translate-x-1/2 min-w-[280px] rounded-lg shadow-xl p-2 transition-all duration-200 ${
                          servicesOpen || expoOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                        style={{ 
                          backgroundColor: 'rgba(13, 33, 55, 0.98)',
                          zIndex: 9999,
                        }}
                        onMouseEnter={() => link.label === 'Expo' ? setExpoOpen(true) : setServicesOpen(true)}
                        onMouseLeave={() => {
                          setServicesOpen(false);
                          setExpoOpen(false);
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 rounded text-white/90 text-sm transition-colors duration-200 hover:bg-[#C62828]/20 hover:text-[#C62828]"
                            onClick={() => {
                              setServicesOpen(false);
                              setExpoOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link 
                      href={link.href}
                      className={`px-3 py-2 rounded text-decoration-none transition-all duration-200 whitespace-nowrap relative ${
                        isActive(link.href) 
                          ? 'text-[#C62828]' 
                          : 'text-white/90 hover:text-[#C62828]'
                      }`}
                      style={{ 
                        fontSize: '0.85rem',
                        fontWeight: 500,
                      }}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5"
                          style={{ backgroundColor: '#C62828' }}
                        />
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Contact Button */}
            <div className="flex gap-2 ml-3">
              <Link 
                href="/contact"
                className="px-4 py-2 rounded font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: '#C62828', 
                  color: '#ffffff',
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0d2137]/98 border-t border-white/10">
          <ul className="py-2 px-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="py-2">
                {link.hasDropdown && link.dropdown ? (
                  <div>
                    <button 
                      className="flex items-center justify-between w-full px-3 py-2 text-white/90 text-sm font-medium"
                      onClick={() => link.label === 'Expo' ? setExpoOpen(!expoOpen) : setServicesOpen(!servicesOpen)}
                    >
                      {link.label}
                      <svg className={`w-4 h-4 ${servicesOpen || expoOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {(servicesOpen || expoOpen) && (
                      <div className="ml-4 mt-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 text-white/70 text-sm hover:text-[#C62828]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href={link.href}
                    className={`block px-3 py-2 text-sm font-medium ${
                      isActive(link.href) ? 'text-[#C62828]' : 'text-white/90'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <div className="flex gap-2 mt-4 px-3 pb-4">
              <Link 
                href="/contact"
                className="flex-1 px-3 py-2 rounded text-center text-sm font-medium"
                style={{ 
                  backgroundColor: '#C62828', 
                  color: '#ffffff',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}
