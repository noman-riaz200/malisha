import React, { Suspense } from 'react';

import Link from 'next/link';


import { HeroSection } from '@/components/homepage/HeroSection';
import { UniversityCardHomepage } from '@/components/homepage/UniversityCardHomepage';
import { FindUniversitySection } from '@/components/homepage/FindUniversitySection';
import { InternationalAdmissionServices } from '@/components/homepage/InternationalAdmissionServices';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import { LatestUpdatesSection } from '@/components/homepage/LatestUpdatesSection';

const UNIVERSITIES = [
  {
    name: 'Tsinghua University',
    rank: '1-50',
    location: 'Beijing, China',
    students: '350+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
  },
  {
    name: 'South China University of Technology',
    rank: '101-150',
    location: 'Guangzhou, Guangdong',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
  },
  {
    name: 'Zhejiang University',
    rank: '51-100',
    location: 'Hangzhou, Zhejiang',
    students: '300+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: { days: 25, hours: 18, min: 30 },
  },
  {
    name: 'Fudan University',
    rank: '51-100',
    location: 'Shanghai, China',
    students: '250+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
  },
  {
    name: 'Nanjing University',
    rank: '101-150',
    location: 'Nanjing, Jiangsu',
    students: '180+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: { days: 40, hours: 12, min: 15 },
  },
  {
    name: 'Wuhan University',
    rank: '150-200',
    location: 'Wuhan, Hubei',
    students: '220+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
  },
  {
    name: 'Harbin Institute of Technology',
    rank: '101-150',
    location: 'Harbin, Heilongjiang',
    students: '190+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: { days: 28, hours: 8, min: 45 },
  },
  {
    name: 'Shanghai Jiao Tong University',
    rank: '51-100',
    location: 'Shanghai, China',
    students: '280+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
  },
];



export default function Homepage() {
  return (
    <>
      <HeroSection />

      {/* Featured Universities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Discover China&apos;s World Class Universities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore top-ranked institutions with our comprehensive admission services
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSITIES.map((uni, index) => (
            <UniversityCardHomepage key={index} {...uni} />
          ))}
        </div>
      </div>

      {/* Find University Section */}
      <FindUniversitySection />

      {/* International Student Admission Services */}
      <InternationalAdmissionServices />



    </>
  );
}

