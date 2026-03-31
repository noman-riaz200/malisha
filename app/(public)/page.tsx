import React, { Suspense } from 'react';

import Link from 'next/link';

import { Award, Users, Globe, Building } from 'lucide-react';
import { HeroSection } from '@/components/homepage/HeroSection';
import { UniversityCardHomepage } from '@/components/homepage/UniversityCardHomepage';
import { FindUniversitySection } from '@/components/homepage/FindUniversitySection';
import { InternationalAdmissionServices } from '@/components/homepage/InternationalAdmissionServices';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import { LatestUpdatesSection } from '@/components/homepage/LatestUpdatesSection';

const STATISTICS = [
  { value: '+13', label: 'Years of experience', icon: 'award' },
  { value: '+27K', label: 'Students enrolled till now', icon: 'users' },
  { value: '+17', label: 'Worldwide Branches', icon: 'globe' },
  { value: '+250', label: 'University Cooperations', icon: 'building' },
];

const UniversityIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactNode> = {
    award: <Award className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    globe: <Globe className="w-6 h-6" />,
    building: <Building className="w-6 h-6" />,
  };
  return icons[icon as keyof typeof icons] || <Globe className="w-6 h-6 text-gray-400" />;
};

const UNIVERSITIES = [
  {
    name: 'Beihang University(Foundation+Bachelor)',
    rank: '150-200',
    location: 'Beijing, China',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: { days: 33, hours: 22, min: 46 },
  },
  {
    name: 'Beijing Institute of Technology',
    rank: '101-150',
    location: 'Beijing, China',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects'],
    countdown: null,
  },
];

const SERVICES = [
  {
    title: 'Service Charges',
    description: 'To facilitate better services we provide transparent and competitive service fees.',
    icon: 'dollar',
  },
];

const PARTNER_TESTIMONIALS = [];

const LEARNER_TESTIMONIALS = [];

const LATEST_UPDATES = [];

const GALLERY_ITEMS = [];

export default function Homepage() {
  return (
    <>
      <div suppressHydrationWarning>
        <HeroSection />
      </div>

      <section className="pt-32 pb-16 bg-gray-50" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Discover China's World Class Universities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {UNIVERSITIES.slice(0, 8).map((uni, index) => (
              <UniversityCardHomepage
                key={index}
                name={uni.name}
                rank={uni.rank}
                location={uni.location}
                students={uni.students}
                badges={uni.badges}
                countdown={uni.countdown}
              />
            ))}
          </div>
          <div className="text-center">
            <Link href="/universities" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View All Universities
            </Link>
          </div>
        </div>
      </section>

      {/* Find University Section */}
      <FindUniversitySection />

      {/* International Admission Services Section */}
      <InternationalAdmissionServices />
      {/* Testimonials Section */}
      <Suspense fallback={
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded-lg mx-auto w-64 mb-4" />
              <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4" />
                    <div className="h-4 bg-gray-300 rounded mb-2 mx-auto w-32" />
                    <div className="h-20 bg-gray-200 rounded mb-4" />
                    <div className="w-20 h-10 bg-teal-100 rounded mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }>
        <TestimonialsSection />
      </Suspense>

      {/* Latest Updates Section */}
      <Suspense fallback={
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded-lg mx-auto w-64 mb-4" />
              <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2" />
            </div>
          </div>
        </div>
      }>
        <LatestUpdatesSection />
      </Suspense>
    </>
  );
}

