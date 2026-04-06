import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const UNIVERSITY_IMAGES = [
  {
    id: 1,
    name: 'ZHENGZHOU',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    name: 'YANGZHOU',
    image: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    name: 'CHANGZHOU',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'NINGBO',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'WUHAN',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'XINXIANG',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    name: 'QINGHAI PROVINCE',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop',
  },
];

export function FindUniversitySection() {
  const largeImages = UNIVERSITY_IMAGES.slice(0, 2); // First 2 images (ZHENGZHOU, YANGZHOU)
  const smallImages = UNIVERSITY_IMAGES.slice(2);    // Last 5 images (CHANGZHOU, NINGBO, WUHAN, XINXIANG, QINGHAI PROVINCE)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find University
          </h2>
        </div>

        {/* First Row - Two Large Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {largeImages.map((uni) => (
            <Link
              key={uni.id}
              href="/universities"
              className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 md:h-56 lg:h-64">
                <Image
                  src={uni.image}
                  alt={uni.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-center justify-center">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                    {uni.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Second Row - Five Smaller Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {smallImages.map((uni) => (
            <Link
              key={uni.id}
              href="/universities"
              className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-28 sm:h-32 md:h-36">
                <Image
                  src={uni.image}
                  alt={uni.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 flex items-center justify-center">
                  <h3 className="text-xs md:text-sm font-bold text-white tracking-wide text-center">
                    {uni.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
