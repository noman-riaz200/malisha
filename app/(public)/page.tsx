"use client";

import React from 'react';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Users, Globe, Building, Calendar, MapPin, Clock, ChevronRight, Star, Quote } from 'lucide-react';
import { HeroSection } from '@/components/homepage/HeroSection';
import { UniversityCardHomepage } from '@/components/homepage/UniversityCardHomepage';
import { FindUniversitySection } from '@/components/homepage/FindUniversitySection';

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
  // ... (truncated for brevity - full list in original)
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
];

const SERVICES = [
  {
    title: 'Service Charges',
    description: 'To facilitate better services we provide transparent and competitive service fees.',
    icon: 'dollar',
  },
  // ... full list
  {
    title: 'Airport Pickup Service',
    description: 'Convenient airport pickup service for new international students.',
    icon: 'car',
  },
];

const ServiceIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    dollar: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    // ... full icons
    car: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-4 4v4m-4-4h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm4 0h4a2 2 0 012 2v4H10V9a2 2 0 012-2z" /></svg>,
  };
  return icons[name] || null;
};

const PARTNER_TESTIMONIALS = [
  // ... full data
];

const LEARNER_TESTIMONIALS = [
  // ... full data
];

const LATEST_UPDATES = [
  // ... full data
];

const GALLERY_ITEMS = [
  // ... full data
];

export default function Homepage() {
  const [activeTab, setActiveTab] = useState<'partners' | 'learners'>('partners');
  const router = useRouter();

  return (
    <>
      <div suppressHydrationWarning>
        <HeroSection />
      </div>

      <section className="pt-32 pb-16 bg-gray-50" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Discover China&apos;s World Class Universities
            </h2>
          </div>

          <div suppressHydrationWarning className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

      {/* Services Section - Simplified */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              International Student Admission Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service, index) => (
              <div key={index} className="text-center p-8 border rounded-xl hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ServiceIcon name={service.icon as string} />
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Browse More Services
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNER_TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <Quote className="w-12 h-12 text-gray-400 mb-6 mx-auto" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote.substring(0, 150)}..."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
