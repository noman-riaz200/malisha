'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const QUICK_LINKS = [
  { label: 'About CSCA', href: '/about' },
  { label: 'Alipay', href: '#' },
  { label: 'Didi', href: '#' },
  { label: 'Dingtalk', href: '#' },
  { label: 'Douyin', href: '#' },
  { label: 'WeChat', href: '#' },
  { label: 'Weibo', href: '#' },
];

const EXPLORE = [
  { label: 'Home', href: '/' },
  { label: 'Partner Universities', href: '/universities' },
  { label: 'Services', href: '/services' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'About Us', href: '/about' },
  { label: 'Guide', href: '/guide' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Programs', href: '/programs' },
  { label: 'Expo', href: '/expo' },
  { label: 'Blogs', href: '/blogs' },
];

const POLICIES = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'X (Twitter)', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
];

const PAYMENTS = [
  { label: 'Visa', icon: 'visa' },
  { label: 'Mastercard', icon: 'mastercard' },
  { label: 'PayPal', icon: 'paypal' },
  { label: 'Alipay', icon: 'alipay' },
  { label: 'WeChat Pay', icon: 'wechat' },
];

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.95.14,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.14-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.14-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.65-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.65,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.65,7-7C24,15.67,24,15.24,24,12s0-3.67-.07-4.95c-.2-4.35-2.66-6.78-7-7C15.67,0,15.24,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.45,20.45H17.51v-5.78c0-1.33-.55-2.25-1.71-2.25-1,0-1.76.71-1.76,2.25v5.78H11.09V9h3.26v1.51h.05a3.58,3.58,0,0,1,3.23-1.78c3.44,0,4.08,2.26,4.08,5.22v4.5ZM5.34,7.43A2.06,2.06,0,1,1,7.4,5.37,2.06,2.06,0,0,1,5.34,7.43Zm1.78,13H3.56V9H7.12ZM2.25,0H21.75v24H2.25Z" />
      </svg>
    ),
  };
  return icons[type] || null;
}

function PaymentIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    visa: (
      <div className="flex items-center justify-center w-12 h-8 rounded bg-white">
        <span className="text-xs font-bold text-blue-900">VISA</span>
      </div>
    ),
    mastercard: (
      <div className="flex items-center justify-center w-12 h-8 rounded bg-white">
        <span className="text-xs font-bold text-red-600">MC</span>
      </div>
    ),
    paypal: (
      <div className="flex items-center justify-center w-12 h-8 rounded bg-white">
        <span className="text-xs font-bold text-blue-700">PayPal</span>
      </div>
    ),
    alipay: (
      <div className="flex items-center justify-center w-12 h-8 rounded bg-white">
        <span className="text-xs font-bold text-blue-600">AliPay</span>
      </div>
    ),
    wechat: (
      <div className="flex items-center justify-center w-12 h-8 rounded bg-white">
        <span className="text-xs font-bold text-green-600">WeChat</span>
      </div>
    ),
  };
  return icons[type] || null;
}

function ContactIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    phone: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.12-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    location: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return icons[type] || null;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayYear = mounted ? currentYear : 2026;

  return (
    <footer className="bg-gradient-to-b from-[#0d2137] to-[#061525] text-slate-400" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-decoration-none mb-4">
              <span className="font-bold text-2xl text-white">
                Malisha<span style={{ color: '#C62828' }}>Edu</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400 max-w-sm">
              Your trusted partner for studying in China. We provide comprehensive services for international students seeking quality education in Chinese universities.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#C62828]/10 flex items-center justify-center text-[#C62828]">
                  <ContactIcon type="phone" />
                </div>
                <span className="text-slate-300">+8618613114366</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#C62828]/10 flex items-center justify-center text-[#C62828]">
                  <ContactIcon type="email" />
                </div>
                <span className="text-slate-300">info@malishaedu.com</span>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mb-5 text-white text-sm uppercase tracking-wide">
              Quick Links
            </h6>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-5 text-white text-sm uppercase tracking-wide">
              Explore
            </h6>
            <ul className="space-y-2.5">
              {EXPLORE.slice(0, 6).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-5 text-white text-sm uppercase tracking-wide">
              More
            </h6>
            <ul className="space-y-2.5">
              {EXPLORE.slice(6).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {POLICIES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-5 text-white text-sm uppercase tracking-wide">
              Follow Us
            </h6>
            <div className="flex gap-3 mb-8">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#C62828] hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
            <h6 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">
              Payment Methods
            </h6>
            <div className="flex flex-wrap gap-2">
              {PAYMENTS.map((payment) => (
                <PaymentIcon key={payment.label} type={payment.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              &copy; {displayYear} MalishaEdu. All Rights Reserved.
            </p>
            <p className="text-sm text-slate-500">
              Study In China | Seamless Admission Services For Your Path to Success
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}