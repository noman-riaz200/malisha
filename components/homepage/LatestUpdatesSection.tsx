"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const LATEST_UPDATES = [
  {
    id: 1,
    title: 'Scholarship Opportunities for International Students 2024',
    date: 'March 15, 2024',
    excerpt: 'Discover the latest scholarship programs available for international students studying in China. Learn about eligibility criteria and application deadlines.',
    image: '/images/Sozhou.jpg',
    slug: 'scholarship-opportunities-2024',
  },
  {
    id: 2,
    title: 'New University Partnerships Announced',
    date: 'March 10, 2024',
    excerpt: 'We are excited to announce new partnerships with top Chinese universities, expanding opportunities for students worldwide.',
    image: '/images/Shanghai Jiao Tong.jpg',
    slug: 'new-university-partnerships',
  },
  {
    id: 3,
    title: 'Education Expo 2024: Registration Now Open',
    date: 'March 5, 2024',
    excerpt: 'Join us at the biggest education expo in Asia and explore your future academic journey in China.',
    image: '/images/NINGBO.png',
    slug: 'education-expo-2024',
  },
  {
    id: 4,
    title: 'Student Success Stories: From Application to Graduation',
    date: 'February 28, 2024',
    excerpt: 'Read inspiring stories from our students who achieved their dreams in China. Learn from their experiences and journeys.',
    image: '/images/Wuhan.jpg',
    slug: 'student-success-stories',
  },
];

export function LatestUpdatesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedUpdate = LATEST_UPDATES[selectedIndex] ?? LATEST_UPDATES[0];

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= LATEST_UPDATES.length) {
      setSelectedIndex(0);
    }
  }, [selectedIndex]);

  return (
    <section className="py-20 bg-white" suppressHydrationWarning>
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div suppressHydrationWarning className="text-center mb-12">
          <h2 suppressHydrationWarning className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Latest Update
          </h2>
        </div>

        {/* Content Grid */}
        <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Featured Image Card */}
          <div suppressHydrationWarning className="order-2 lg:order-1">
            <Link suppressHydrationWarning href={`/blogs/${selectedUpdate.slug}`} className="block group">
              <div suppressHydrationWarning className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div suppressHydrationWarning className="relative h-64 md:h-80 lg:h-96">
                  <img
                    src={selectedUpdate.image}
                    alt={selectedUpdate.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    suppressHydrationWarning
                    onError={(e) => {
                      e.currentTarget.src = '/images/Sozhou.jpg';
                    }}
                  />
                  <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div suppressHydrationWarning className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p suppressHydrationWarning className="text-teal-400 text-sm font-semibold mb-2">
                    {selectedUpdate.date}
                  </p>
                  <h3 suppressHydrationWarning className="text-xl md:text-2xl font-bold text-white mb-3">
                    {selectedUpdate.title}
                  </h3>
                  <p suppressHydrationWarning className="text-white/80 text-sm md:text-base">
                    Click to read more →
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Side - News Items List */}
          <div suppressHydrationWarning className="order-1 lg:order-2">
            <div suppressHydrationWarning className="flex flex-col gap-4">
              {LATEST_UPDATES.map((update, index) => (
                <div
                  suppressHydrationWarning
                  key={update.id}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-gray-100 border-l-4 border-transparent ${
                    index === selectedIndex ? 'bg-teal-50 border-teal-600 shadow-md ring-2 ring-teal-200/50' : ''
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <p 
                    suppressHydrationWarning
                    className={`text-sm font-semibold mb-1 ${
                      index === selectedIndex ? 'text-teal-600' : 'text-gray-500'
                    }`}
                  >
                    {update.date}
                  </p>
                  <h4 
                    suppressHydrationWarning
                    className={`font-bold mb-2 line-clamp-2 ${
                      index === selectedIndex ? 'text-teal-700' : 'text-gray-900'
                    }`}
                  >
                    {update.title}
                  </h4>
                  <div suppressHydrationWarning className="flex items-center text-teal-600">
                    <svg suppressHydrationWarning className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span suppressHydrationWarning className="text-xs">Read more</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div suppressHydrationWarning className="text-center mt-12">
          <Link
            suppressHydrationWarning
            href="/blogs"
            className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            View All Updates
          </Link>
        </div>
      </div>
    </section>
  );
}
