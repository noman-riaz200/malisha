

import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Clock } from 'lucide-react';

interface UniversityCardProps {
  name: string;
  rank: string;
  location: string;
  students: string;
  badges: string[];
  countdown: { days: number; hours: number; min: number } | null;
  image?: string;
  logo?: string;
  slug?: string;
}

export function UniversityCardHomepage({
  name,
  rank,
  location,
  students,
  badges,
  countdown,
  image,
  logo,
  slug,
}: UniversityCardProps) {
  const cardContent = (
    <div suppressHydrationWarning className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
      {/* University Image */}
      <div suppressHydrationWarning className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            suppressHydrationWarning
          />
        ) : logo ? (
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            suppressHydrationWarning
          />
        ) : (
          <div suppressHydrationWarning className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-white/30">{name.charAt(0)}</span>
          </div>
        )}
        {/* Badges Overlay */}
        {badges.length > 0 && (
          <div suppressHydrationWarning className="absolute top-3 left-3 flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-blue-700 rounded-md shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        {/* Countdown Timer */}
        {countdown && (
          <div suppressHydrationWarning className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-lg">
            <div suppressHydrationWarning className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">
                {countdown.days}d {countdown.hours}h {countdown.min}m left
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div suppressHydrationWarning className="p-5">
        {/* University Name */}
        <h3 suppressHydrationWarning className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* University Details */}
        <div suppressHydrationWarning className="space-y-2.5 mb-4">
          {/* World Rank */}
          <div suppressHydrationWarning className="flex items-center gap-2">
            <div suppressHydrationWarning className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg suppressHydrationWarning className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">World Rank</p>
              <p className="text-sm font-semibold text-gray-900">{rank}</p>
            </div>
          </div>

          {/* Location */}
          <div suppressHydrationWarning className="flex items-center gap-2">
            <div suppressHydrationWarning className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-semibold text-gray-900">{location}</p>
            </div>
          </div>

          {/* Students Enrolled */}
          <div suppressHydrationWarning className="flex items-center gap-2">
            <div suppressHydrationWarning className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Students Enrolled</p>
              <p className="text-sm font-semibold text-gray-900">{students}</p>
            </div>
          </div>
        </div>

        </div>
    </div>
  );

  if (slug) {
    return (
      <Link href={`/universities/${slug}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <Link href="/universities">
      {cardContent}
    </Link>
  );
}
