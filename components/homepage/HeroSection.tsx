'use client';

import { useState } from 'react';
import Link from 'next/link';

const STATISTICS = [
  { value: '+13', label: 'Years of experience', color: 'bg-[#e53935]' },
  { value: '+27K', label: 'Students enrolled till now', color: 'bg-[#fdd835]' },
  { value: '+17', label: 'Worldwide Branches', color: 'bg-[#00897b]' },
  { value: '+250', label: 'University Cooperations', color: 'bg-[#4db6ac]' },
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntake, setSelectedIntake] = useState<'march' | 'september'>('march');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/universities?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex flex-col overflow-hidden">
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
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-8 pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Left Content - Title and Search */}
            <div className="flex-1 w-full lg:max-w-4xl">
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

              {/* Search Box Container */}
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Province, City, Degree, Major, University, Scholarship, Medium of Intruction"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 text-gray-700 text-sm bg-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0f4c3a] text-white rounded-lg font-medium hover:bg-[#0d3d2e] transition-colors flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </form>

                {/* Intake Selection */}
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedIntake('march')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      selectedIntake === 'march'
                        ? 'bg-[#0f4c3a] text-white border-[#0f4c3a] shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#0f4c3a]'
                    }`}
                  >
                    March-2026
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIntake('september')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      selectedIntake === 'september'
                        ? 'bg-[#0f4c3a] text-white border-[#0f4c3a] shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#0f4c3a]'
                    }`}
                  >
                    September-2026
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Action Buttons */}
            <div className="hidden lg:flex flex-col gap-0 lg:mt-16">
              <Link
                href="/apply"
                className="px-5 py-2.5 bg-[#e53935] text-white text-center rounded font-semibold hover:bg-[#c62828] transition-colors shadow-lg whitespace-nowrap text-sm"
              >
                Apply Now
              </Link>
              <Link
                href="/get-free-consultation"
                className="px-5 py-2.5 bg-[#0f4c3a] text-white text-center rounded font-semibold hover:bg-[#0d3d2e] transition-colors shadow-lg whitespace-nowrap text-xs leading-tight mt-2"
              >
                Get A Free<br />Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 translate-y-1/2">
            {STATISTICS.map((stat, index) => (
              <div
                key={index}
                className={`${stat.color} rounded-lg p-4 md:p-5 text-white text-center shadow-xl`}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm font-medium opacity-95 leading-tight">{stat.label}</div>
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
