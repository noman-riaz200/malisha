

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const UNIVERSITY_IMAGES = [
  {
    id: 1,
    name: 'Tsinghua University',
    slug: 'tsinghua-university',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    large: true,
  },
  {
    id: 2,
    name: 'Peking University',
    slug: 'peking-university',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    large: true,
  },
  {
    id: 3,
    name: 'Fudan University',
    slug: 'fudan-university',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    large: false,
  },
  {
    id: 4,
    name: 'Zhejiang University',
    slug: 'zhejiang-university',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400&h=300&fit=crop',
    large: false,
  },
  {
    id: 5,
    name: 'Shanghai Jiao Tong University',
    slug: 'shanghai-jiao-tong-university',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    large: false,
  },
  {
    id: 6,
    name: 'Nanjing University',
    slug: 'nanjing-university',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&h=300&fit=crop',
    large: false,
  },
  {
    id: 7,
    name: 'Wuhan University',
    slug: 'wuhan-university',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop',
    large: false,
  },
];

export function FindUniversitySection() {
  const largeImages = UNIVERSITY_IMAGES.filter(uni => uni.large);
  const smallImages = UNIVERSITY_IMAGES.filter(uni => !uni.large);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Find University
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore top Chinese universities and find your perfect match for your academic journey
          </p>
        </div>

        {/* First Row - Two Large Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {largeImages.map((uni) => (
            <Link
              key={uni.id}
              href={`/universities/${uni.slug}`}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src={uni.image}
                  alt={uni.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {uni.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    Click to explore →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Second Row - Five Smaller Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {smallImages.map((uni) => (
            <Link
              key={uni.id}
              href={`/universities/${uni.slug}`}
              className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-40 sm:h-48 md:h-56">
                <Image
                  src={uni.image}
                  alt={uni.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-semibold text-white line-clamp-2">
                    {uni.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/universities"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Universities
          </Link>
        </div>
      </div>
    </section>
  );
}
