

import React from 'react';
import Link from 'next/link';

const STATISTICS = [
  { value: '+13', label: 'Years of experience', color: 'bg-[#e53935]' },
  { value: '+27K', label: 'Students enrolled till now', color: 'bg-[#00897b]' },
  { value: '+17', label: 'Worldwide Branches', color: 'bg-[#00897b]' },
  { value: '+250', label: 'University Cooperations', color: 'bg-[#4db6ac]' },
];

export function HeroSection() {

  return (
<section className="relative min-h-screen flex flex-col overflow-visible" suppressHydrationWarning>
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/banner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-8 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center lg:justify-between gap-6">
            {/* Left Content - Title and Search */}
            <div className="w-full max-w-4xl mx-auto lg:flex-1">
              {/* Title */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
              >
                Study In China
              </h1>

              {/* Subtitle */}
              <p
                className="text-base md:text-lg text-white text-center mb-8"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
              >
                Seamless Admission Services For Your Path to Success!
              </p>


            </div>


          </div>
        </div>
      </div>

{/* Statistics Cards - Bottom Section */}
      {/* <div className="absolute mt-50 bottom-0 left-0 right-0 z-20 pb-20 mt-[2000px]"> */}
      <div className="-mt-24 md:-mt-32 lg:-mt-40 relative z-20 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
            {STATISTICS.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} rounded-2xl p-6 md:p-8 text-white text-center shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-h-[100px] flex flex-col justify-center`}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 whitespace-nowrap">{stat.value}</div>
                <div className="text-sm md:text-base font-semibold leading-tight whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <Link
        href="/contact"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#4db6ac] rounded-full flex items-center justify-center text-white shadow-xl hover:bg-[#3d9b91] transition-all hover:scale-105"
        aria-label="Chat with us"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </Link>

      {/* Mobile Action Buttons */}
      <div className="lg:hidden fixed bottom-24 right-4 flex flex-col gap-2 z-40">
        <Link
          href="/apply"
          className="px-4 py-2 bg-[#e53935] text-white text-sm rounded-lg font-semibold shadow-lg"
        >
          Apply Now
        </Link>
        <Link
          href="/get-free-consultation"
          className="px-4 py-2 bg-[#0f4c3a] text-white text-sm rounded-lg font-semibold shadow-lg"
        >
          Free Consultation
        </Link>
      </div>
    </section>
  );
}
