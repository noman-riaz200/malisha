// =============================================================================
// app/(public)/page.tsx — MalishaEdu Homepage
// Pixel-perfect clone of https://malishaedu.com
// =============================================================================

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Award, Users, Globe, Building, Calendar, MapPin, Clock, ChevronRight, Star, Quote } from 'lucide-react';

// =============================================================================
// DATA ARRAYS - Exact data from original site
// =============================================================================

// Statistics Data (from original)
const STATISTICS = [
  { value: '+13', label: 'Years of experience', icon: 'award' },
  { value: '+27K', label: 'Students enrolled till now', icon: 'users' },
  { value: '+17', label: 'Worldwide Branches', icon: 'globe' },
  { value: '+250', label: 'University Cooperations', icon: 'building' },
];

// University Icons
const UniversityIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, JSX.Element> = {
    award: <Award className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    globe: <Globe className="w-6 h-6" />,
    building: <Building className="w-6 h-6" />,
  };
  return icons[icon] || null;
};

// Featured Universities Data (exact list from original)
const UNIVERSITIES = [
  {
    name: 'Beihang University(Foundation+Bachelor)',
    rank: '150-200',
    location: 'Beijing, China',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: { days: 33, hours: 22, min: 46 },
    csca: true,
  },
  {
    name: 'Beijing Institute of Technology',
    rank: '101-150',
    location: 'Beijing, China',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects'],
    countdown: null,
    csca: true,
  },
  {
    name: 'Beijing Normal University(Belt and Road School)',
    rank: '101-150',
    location: 'Beijing, China',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class', 'CSCA Required'],
    countdown: { days: 33, hours: 22, min: 46 },
    csca: true,
  },
  {
    name: 'Fujian Medical University',
    rank: '150-200',
    location: 'Fuzhou, Fujian',
    students: '200+ Students Enrolled',
    badges: [],
    countdown: null,
    csca: false,
  },
  {
    name: 'Hangzhou Dianzi University',
    rank: '200-300',
    location: 'Hangzhou, Zhejiang',
    students: '200+ Students Enrolled',
    badges: ['211 Projects'],
    countdown: { days: 33, hours: 22, min: 46 },
    csca: false,
  },
  {
    name: 'Harbin Institute of Technology, Shenzhen',
    rank: '101-150',
    location: 'Shenzhen, Guangdong',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
    csca: true,
  },
  {
    name: 'Henan University of Technology',
    rank: '200-300',
    location: 'Zhengzhou, Henan',
    students: '200+ Students Enrolled',
    badges: [],
    countdown: null,
    csca: false,
  },
  {
    name: 'South China University of Technology',
    rank: '101-150',
    location: 'Guangzhou, Guangdong',
    students: '200+ Students Enrolled',
    badges: ['211 Projects', '985 Projects', 'Double First Class'],
    countdown: null,
    csca: true,
  },
];

// Services Data (exact list from original)
const SERVICES = [
  {
    title: 'Service Charges',
    description: 'To facilitate better services we provide transparent and competitive service fees.',
    icon: 'dollar',
  },
  {
    title: 'Admission Service',
    description: 'Full admission guidance and application processing for Chinese universities.',
    icon: 'graduation',
  },
  {
    title: 'Chinese Language and Foundation Course',
    description: 'Prepare for Chinese language proficiency and academic foundation courses.',
    icon: 'book',
  },
  {
    title: 'Education Expo in China',
    description: 'Participate in education expos to explore various Chinese universities.',
    icon: 'globe',
  },
  {
    title: 'Education Expo in Overseas',
    description: 'Join our overseas education expos to connect with Chinese universities.',
    icon: 'plane',
  },
  {
    title: 'Airport Pickup Service',
    description: 'Convenient airport pickup service for new international students.',
    icon: 'car',
  },
];

// Service Icons
const ServiceIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    dollar: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    graduation: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    globe: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3m-3 3a9 9 0 01-9-9m9 9c1.657 0 3 1.343 3 3m-3-3c0-1.657-1.343-3-3-3" />
      </svg>
    ),
    plane: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m-9 9l9-2" />
      </svg>
    ),
    book: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    car: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-4 4v4m-4-4h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zm4 0h4a2 2 0 012 2v4H10V9a2 2 0 012-2z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// Partner Testimonials Data (exact from original)
const PARTNER_TESTIMONIALS = [
  {
    name: "Mr.Thapanut 'Udomsree",
    title: 'Thai Ministry of Education',
    quote: 'MalishaEdu has been instrumental in facilitating educational partnerships between Thailand and China. Their professionalism and commitment to student success are outstanding.',
  },
  {
    name: 'Lady Syeda Sarwat Abed',
    title: 'BRAC Institute of Languages',
    quote: 'MalishaEdu has been a valuable partner since 2015. Their dedication to helping Bangladeshi students pursue education in China is commendable. We look forward to continuing this successful collaboration.',
  },
  {
    name: 'Salomon Menthos April',
    title: 'Regional Governor, Namibia',
    quote: 'MalishaEdu has been helping Namibian students achieve their dream of studying in China. Their support and guidance have been invaluable to our students.',
  },
];

// Learner Testimonials Data (exact from original)
const LEARNER_TESTIMONIALS = [
  {
    name: 'Neena Malishaedu',
    university: "Xi'an Jiaotong University",
    quote: 'MalishaEdu helped me throughout the entire admission process. They made my dream of studying in China a reality. Very grateful for their support!',
  },
  {
    name: 'Tatanjaky Jobonina Miantsa',
    university: 'NJUPT',
    quote: 'Thank you MalishaEdu for your amazing guidance. You made everything so easy and clear. I am now living my dream in China!',
  },
  {
    name: 'Jurakulov Obidion',
    university: 'Central South University of Forestry and Technology',
    quote: 'MalishaEdu helped me throughout the entire admission process. They made my dream of studying in China a reality. Very grateful for their support!',
  },
  {
    name: 'Jose Matias',
    university: 'Southwest Petroleum University',
    quote: 'Thank you MalishaEdu for your amazing guidance. You made everything so easy and clear. I am now living my dream in China!',
  },
  {
    name: 'Masaba Charles',
    university: 'Shanghai Polytechnic University',
    quote: 'MalishaEdu provided excellent support throughout my journey. They were always available to answer my questions and guided me at every step.',
  },
];

// Latest Updates Data (exact from original)
const LATEST_UPDATES = [
  {
    title: 'Scholarships in China for International Students',
    date: '30 Aug, 2024',
  },
  {
    title: "MalishaEdu Hosts 'Study in China' Education Exhibition at Chulalongkorn University, Bangkok, Thailand",
    date: '24 Mar',
  },
  {
    title: 'Strengthening International Education Partnership with Central South University of Forestry and Technology',
    date: '14 Mar',
  },
  {
    title: 'MalishaEdu Facilitates Tianjin University Spot Admission Program at National Academy for Educational Development',
    date: '25 Jan',
  },
  {
    title: 'MalishaEdu Hosts Tianjin University Spot Admission Program at Bangladesh University of Engineering and Technology',
    date: '25 Jan',
  },
];

// Activity Gallery Data (exact from original)
const GALLERY_ITEMS = [
  { title: 'Interview for Hangzhou Dianzi University, Admission', image: '/images/gallery-1.jpg' },
  { title: '3rd Belt and Road Chinese University & Overseas Partner Exchange Conference', image: '/images/gallery-2.jpg' },
  { title: "Bangladeshi Students at Hart Institute of Technology, President's Interview", image: '/images/gallery-3.jpg' },
  { title: '2026 Study in Shanxi Exhibition, Thailand', image: '/images/gallery-4.jpg' },
  { title: 'Embassy in BD', image: '/images/gallery-5.jpg' },
];

// =============================================================================
// HOMEPAGE COMPONENT
// =============================================================================

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'partners' | 'learners'>('partners');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/universities?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* ========================================================================
           1. HERO SECTION
           ======================================================================== */}
      <section 
        className="relative min-h-[700px] flex items-center"
        style={{ 
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
          paddingTop: '80px',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: '#ffffff' }}
            >
              Study In China
            </h1>

            {/* Subheading */}
            <p 
              className="text-lg md:text-xl mb-6"
              style={{ color: '#94a3b8' }}
            >
              Seamless Admission Services For Your Path to success
            </p>

            {/* Dates */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'rgba(198, 40, 40, 0.2)', 
                  color: '#C62828',
                  border: '1px solid #C62828'
                }}
              >
                March-2026
              </span>
              <span style={{ color: '#94a3b8' }}>_</span>
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'rgba(198, 40, 40, 0.2)', 
                  color: '#C62828',
                  border: '1px solid #C62828'
                }}
              >
                September-2026
              </span>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {STATISTICS.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <UniversityIcon icon={stat.icon} />
                    <span className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: '#94a3b8' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg mb-4"
              style={{ 
                backgroundColor: '#C62828', 
                color: '#ffffff',
              }}
            >
              Discover China's World Class Universities
            </button>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span 
                className="px-3 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: 'rgba(198, 40, 40, 0.1)', 
                  color: '#C62828',
                  border: '1px solid #C62828'
                }}
              >
                211 Projects
              </span>
              <span 
                className="px-3 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: 'rgba(198, 40, 40, 0.1)', 
                  color: '#C62828',
                  border: '1px solid #C62828'
                }}
              >
                985 Projects
              </span>
              <span 
                className="px-3 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: 'rgba(198, 40, 40, 0.1)', 
                  color: '#C62828',
                  border: '1px solid #C62828'
                }}
              >
                Double First Class
              </span>
              <span 
                className="px-3 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: 'rgba(198, 40, 40, 0.1)', 
                  color: '#C62828',
                  border: '1px solid #C62828'
                }}
              >
                CSCA Required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
           2. DISCOVER UNIVERSITIES SECTION
           ======================================================================== */}
      <section className="py-16" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-8">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#1e293b' }}
            >
              Discover China's World Class Universities | Chinese Universities
            </h2>
          </div>

          {/* Find University Search */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-4 max-w-xl">
              <input
                type="text"
                placeholder="Find University"
                className="flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#e2e8f0',
                  backgroundColor: '#ffffff'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                style={{ 
                  backgroundColor: '#0a2b4e', 
                  color: '#ffffff',
                }}
              >
                Find University
              </button>
            </form>
          </div>

          {/* University Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {UNIVERSITIES.map((uni, index) => (
              <div 
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                }}
              >
                {/* Card Header - Placeholder Image */}
                <div 
                  className="h-40 relative"
                  style={{ backgroundColor: '#f1f5f9' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold" style={{ color: '#cbd5e1' }}>
                      {uni.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {uni.badges.map((badge, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: '#0a2b4e', 
                          color: '#ffffff',
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* University Name */}
                  <h3 className="font-bold mb-2" style={{ color: '#1e293b', fontSize: '1.1rem' }}>
                    {uni.name}
                  </h3>

                  {/* Rank and Location */}
                  <div className="flex items-center gap-4 mb-3 text-sm" style={{ color: '#64748b' }}>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      World Rank: {uni.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-3 text-sm" style={{ color: '#64748b' }}>
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{uni.location}</span>
                  </div>

                  {/* Students Enrolled */}
                  <p className="text-sm mb-3" style={{ color: '#64748b' }}>
                    {uni.students}
                  </p>

                  {/* Countdown Timer (if available) */}
                  {uni.countdown && (
                    <div 
                      className="flex items-center gap-2 p-3 rounded-lg mb-3"
                      style={{ 
                        backgroundColor: 'rgba(198, 40, 40, 0.1)',
                      }}
                    >
                      <Clock className="w-4 h-4" style={{ color: '#C62828' }} />
                      <span className="text-sm font-medium" style={{ color: '#C62828' }}>
                        {uni.countdown.days} Days {uni.countdown.hours} Hours {uni.countdown.min} Min
                      </span>
                    </div>
                  )}

                  {/* View Details Link */}
                  <Link 
                    href={`/universities/${uni.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                    className="text-sm font-medium transition-colors duration-200 hover:underline flex items-center gap-1"
                    style={{ color: '#0a2b4e' }}
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Universities Button */}
          <div className="text-center">
            <Link 
              href="/universities"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: '#0a2b4e', 
                color: '#ffffff',
              }}
            >
              View All Universities
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================
           3. SERVICES SECTION
           ======================================================================== */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#1e293b' }}
            >
              International Student Admission Services
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SERVICES.map((service, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: 'rgba(10, 43, 78, 0.1)', 
                    color: '#0a2b4e',
                  }}
                >
                  <ServiceIcon name={service.icon} />
                </div>

                {/* Title */}
                <h3 className="font-bold mb-2" style={{ color: '#1e293b' }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm" style={{ color: '#64748b' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Browse More Services Button */}
          <div className="text-center">
            <Link 
              href="/services"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: '#0a2b4e', 
                color: '#ffffff',
              }}
            >
              Browse more Services
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================
           4. TESTIMONIALS SECTION WITH TABS
           ======================================================================== */}
      <section className="py-16" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div 
              className="flex rounded-lg p-1"
              style={{ 
                backgroundColor: '#e2e8f0',
              }}
            >
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'partners' 
                    ? 'shadow-md' 
                    : ''
                }`}
                style={{ 
                  backgroundColor: activeTab === 'partners' ? '#ffffff' : 'transparent',
                  color: activeTab === 'partners' ? '#0a2b4e' : '#64748b',
                }}
              >
                What Our Partners Are Saying
              </button>
              <button
                onClick={() => setActiveTab('learners')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'learners' 
                    ? 'shadow-md' 
                    : ''
                }`}
                style={{ 
                  backgroundColor: activeTab === 'learners' ? '#ffffff' : 'transparent',
                  color: activeTab === 'learners' ? '#0a2b4e' : '#64748b',
                }}
              >
                What Our Learners Are Saying
              </button>
            </div>
          </div>

          {/* Partners Testimonials */}
          {activeTab === 'partners' && (
            <div className="grid md:grid-cols-3 gap-6">
              {PARTNER_TESTIMONIALS.map((testimonial, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 mb-4" style={{ color: '#0a2b4e', opacity: 0.3 }} />

                  {/* Quote */}
                  <p className="italic mb-4" style={{ color: '#64748b' }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: '#0a2b4e',
                        color: '#ffffff',
                      }}
                    >
                      <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold" style={{ color: '#1e293b' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-xs" style={{ color: '#64748b' }}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Learners Testimonials */}
          {activeTab === 'learners' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEARNER_TESTIMONIALS.map((testimonial, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 mb-4" style={{ color: '#C62828', opacity: 0.3 }} />

                  {/* Quote */}
                  <p className="italic mb-4" style={{ color: '#64748b' }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(198, 40, 40, 0.1)',
                        color: '#C62828',
                      }}
                    >
                      <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold" style={{ color: '#1e293b' }}>
                        {testimonial.name}
                      </h4>
                      <p className="text-xs" style={{ color: '#C62828' }}>
                        {testimonial.university}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================
           5. LATEST UPDATES SECTION
           ======================================================================== */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#1e293b' }}
            >
              Latest Updates
            </h2>
          </div>

          {/* Updates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LATEST_UPDATES.map((update, index) => (
              <div 
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                }}
              >
                {/* Thumbnail Placeholder */}
                <div 
                  className="h-40 relative"
                  style={{ backgroundColor: '#f1f5f9' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-12 h-12" style={{ color: '#cbd5e1' }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm mb-2" style={{ color: '#C62828' }}>
                    {update.date}
                  </p>
                  <h3 className="font-bold mb-3" style={{ color: '#1e293b', fontSize: '1rem' }}>
                    {update.title}
                  </h3>
                  <Link 
                    href="#"
                    className="text-sm font-medium transition-colors duration-200 hover:underline"
                    style={{ color: '#0a2b4e' }}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
           6. ACTIVITY GALLERY SECTION
           ======================================================================== */}
      <section className="py-16" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#1e293b' }}
            >
              Activity Gallery
            </h2>
          </div>

          {/* Gallery Grid - Using horizontal scroll for carousel effect */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {GALLERY_ITEMS.map((item, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-80 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg snap-center"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                }}
              >
                {/* Image Placeholder */}
                <div 
                  className="h-48 relative"
                  style={{ backgroundColor: '#f1f5f9' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-12 h-12" style={{ color: '#cbd5e1' }} />
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4">
                  <h3 className="font-medium" style={{ color: '#1e293b', fontSize: '0.875rem' }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
