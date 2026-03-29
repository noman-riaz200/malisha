'use client';

import Link from 'next/link';

import { useState, useEffect, useRef, useCallback } from 'react';

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdown?: { label: string; href: string }[];
}

// Helper function to check if a pathname is active
function isPathActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(href + '/');
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Partner Universities', href: '/universities' },
  { label: 'Scholarship', href: '/scholarships' },
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
    dropdown: [
      { label: 'Service Charges', href: '/services/service-charges' },
      { label: 'Admission Service', href: '/services/admission-service' },
      { label: 'Chinese Language and Foundation Course', href: '/services/chinese-language-foundation-course' },
      { label: 'Airport Pickup Service', href: '/services/airport-pickup' },
      { label: 'Accommodation Service', href: '/services/accommodation' },
      { label: 'Visa Service', href: '/services/visa' },
      { label: 'On Campus Service', href: '/services/on-campus-service' },
      { label: 'Job & Business in China', href: '/services/job-business-china' },
    ],
  },
  {
    label: 'Expo',
    href: '/expo',
    hasDropdown: true,
    dropdown: [
      { label: 'Education Expo in China', href: '/services/education-expo-china' },
      { label: 'Education Expo in Overseas', href: '/services/education-expo-overseas' },
      { label: 'Education Expo in America', href: '/services/education-expo-america' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    hasDropdown: true,
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  {
    label: 'More',
    href: '#',
    hasDropdown: true,
    dropdown: [
      { label: 'Blogs', href: '/blogs' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Guide', href: '/guide' },
      { label: 'Programs', href: '/programs' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    hasDropdown: true,
    dropdown: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Get Free Consultation', href: '/get-free-consultation' },
    ],
  },
];

// ChevronDown icon component
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Logo component matching the design
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <div className="flex flex-col items-start">
        {/* Logo Icon */}
        <div className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized person/graduate figure */}
            <circle cx="50" cy="25" r="12" fill="#0d9488" />
            <path
              d="M35 45 Q50 35 65 45 L65 55 Q50 45 35 55 Z"
              fill="#0d9488"
            />
            {/* Arms raised in success */}
            <path
              d="M35 45 L20 25 L25 20 L38 38"
              fill="#0d9488"
            />
            <path
              d="M65 45 L80 25 L75 20 L62 38"
              fill="#0d9488"
            />
            {/* Body */}
            <path
              d="M38 50 L38 85 L45 85 L45 60 L55 60 L55 85 L62 85 L62 50 Q50 45 38 50"
              fill="#0d9488"
            />
            {/* Graduation cap */}
            <path
              d="M30 18 L50 8 L70 18 L50 28 Z"
              fill="#0d9488"
            />
            <path
              d="M70 18 L70 25 L65 22"
              fill="#0d9488"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800 leading-tight">
              Malisha<span className="text-[#0d9488]">Edu</span>
            </span>
            <span className="text-xs text-gray-600">马丽莎教育</span>
          </div>
        </div>
        <span className="text-[10px] text-gray-500 mt-0.5">The China Education Expert</span>
      </div>
    </Link>
  );
}

// Dropdown component
function NavDropdown({
  link,
  isOpen,
  onToggle,
  onClose,
}: {
  link: NavLink;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname: string = '/'; // Default for server-side

  // Removed direct DOM listeners for hydration safety
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside as any, true);
      return () => {
        document.removeEventListener('click', handleClickOutside as any, true);
      };
    }
  }, [handleClickOutside]);

  const isActive = isPathActive(pathname, link.href);

  return (
<div ref={dropdownRef} className="relative" suppressHydrationWarning={true}>
      <button
        onClick={onToggle}
        onMouseEnter={() => onToggle()}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-[#0d9488]' : 'text-gray-600 hover:text-[#0d9488]'
        }`}
      >
        {link.label}
        <ChevronDown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && link.dropdown && (
        <div
          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-2 z-50"
          onMouseLeave={onClose}
        >
          {link.dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0d9488] hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [pathname, setPathname] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Set client state and pathname on mount
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '');
    }
  }, []);

  // Close mobile menu when route changes (client-side)
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const handleRouteChange = () => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      };
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, [isClient]);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex flex-col space-y-0.5">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            </div>
            <div className="hidden lg:block w-24 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="lg:hidden w-6 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav suppressHydrationWarning className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = isPathActive(pathname, link.href);

              if (link.hasDropdown) {
                return (
                  <NavDropdown
                    key={link.label}
                    link={link}
                    isOpen={openDropdown === link.label}
                    onToggle={() => handleDropdownToggle(link.label)}
                    onClose={handleDropdownClose}
                  />
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0d9488]'
                      : 'text-gray-600 hover:text-[#0d9488]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Login Button */}
          <div className="hidden lg:block">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-[#0f766e] rounded hover:bg-[#0d9488] transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-[#0d9488]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden border-t border-gray-100 py-4 ${mobileMenuOpen ? '' : 'hidden'}`} suppressHydrationWarning>
          <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = isPathActive(pathname, link.href);

                if (link.hasDropdown) {
                  const isDropdownOpen = openDropdown === link.label;
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => handleDropdownToggle(link.label)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium ${
                          isActive ? 'text-[#0d9488]' : 'text-gray-600'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isDropdownOpen && link.dropdown && (
                        <div className="ml-4 mt-1 border-l-2 border-gray-100">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-[#0d9488]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium ${
                      isActive ? 'text-[#0d9488]' : 'text-gray-600 hover:text-[#0d9488]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 px-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white bg-[#0f766e] rounded hover:bg-[#0d9488] transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
      </div>
    </header>
  );
}
