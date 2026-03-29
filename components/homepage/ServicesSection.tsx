'use client';
// =============================================================================
// components/homepage/ServicesSection.tsx
// Services section with 6 services displayed in grid layout
// =============================================================================

import { useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    id: 1,
    title: 'Service Charges',
    description: 'To facilitate better services for our students, we have updated our service charge.',
    image: '/images/Sozhou.jpg',
    link: '/services/service-charges',
  },
  {
    id: 2,
    title: 'Admission Service',
    description: 'Admission Service',
    image: '/images/admission-service-image.png',
    link: '/services/admission-service',
  },
  {
    id: 3,
    title: 'Chinese Language and Foundation Course',
    description: 'Chinese Language and Foundation Course',
    image: '/images/chinese-language-image.png',
    link: '/services/chinese-language-foundation-course',
  },
  {
    id: 4,
    title: 'Education Expo in China',
    description: 'Education Expo in China',
    image: '/images/education-expo-china-image.png',
    link: '/services/education-expo-china',
  },
  {
    id: 5,
    title: 'Education Expo in Overseas',
    description: 'Education Expo in Overseas',
    image: '/images/education-expo-overseas-image.png',
    link: '/services/education-expo-overseas',
  },
  {
    id: 6,
    title: 'Airport Pickup Service',
    description: 'Airport Pickup Service',
    image: '/images/airport-pickup-image.png',
    link: '/services/airport-pickup-service',
  },
];

const PARTNERS_TESTIMONIALS = [
  {
    name: 'Ambr. Dr. Rashid Ali',
    title: 'The Former Ambassador of the Republic of China',
    description: 'To facilitate better services for our students, we have updated our...',
    image: '/images/profile-placeholder.svg',
  },
  {
    name: 'Linda Chen',
    title: 'Student',
    description: 'To facilitate better services for our students, we have updated our...',
    image: '/images/profile-placeholder.svg',
  },
  {
    name: 'Li Yan',
    title: 'Parent',
    description: 'To facilitate better services for our students, we have updated our...',
    image: '/images/profile-placeholder.svg',
  },
];

const LATEST_UPDATES = [
  {
    id: 1,
    title: 'Scholarship Opportunities for International Students 2024',
    date: 'March 15, 2024',
    excerpt: 'Discover the latest scholarship programs available for international students studying in China...',
    image: '/images/Sozhou.jpg',
  },
  {
    id: 2,
    title: 'New University Partnerships Announced',
    date: 'March 10, 2024',
    excerpt: 'We are excited to announce new partnerships with top Chinese universities...',
    image: '/images/Shanghai Jiao Tong.jpg',
  },
  {
    id: 3,
    title: 'Education Expo 2024: Registration Now Open',
    date: 'March 5, 2024',
    excerpt: 'Join us at the biggest education expo in Asia and explore your future...',
    image: '/images/NINGBO.png',
  },
  {
    id: 4,
    title: 'Student Success Stories: From Application to Graduation',
    date: 'February 28, 2024',
    excerpt: 'Read inspiring stories from our students who achieved their dreams in China...',
    image: '/images/Wuhan.jpg',
  },
];

export function ServicesSection() {
  const [selectedUpdate, setSelectedUpdate] = useState(LATEST_UPDATES[0]);

  return (
    <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
      <div className="container py-4">
        {/* Services Section */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-5">
            <h3 
              className="fw-bold"
              style={{ color: '#1e293b', fontSize: '1.5rem' }}
            >
              International Student Admission Services
            </h3>
            <p 
              className="mb-0 mt-2"
              style={{ color: '#64748b', fontSize: '1.1rem' }}
            >
              Explore Our Comprehensive Services
            </p>
          </div>

          {/* Services Grid - 3 columns (3 services per row) */}
          <div className="row g-4 justify-content-center">
            {SERVICES.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6 col-sm-12">
                <Link href={service.link} style={{ textDecoration: 'none' }}>
                  <div 
                    className="card h-100 border-0"
                    style={{ 
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                    }}
                  >
                    {/* Service Image */}
                    <div 
                      style={{
                        width: '100%',
                        height: '180px',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img 
                        src={service.image} 
                        alt={service.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    
                    {/* Service Content */}
                    <div className="p-4">
                      <h5 
                        className="fw-bold mb-2"
                        style={{ color: '#0d9488', fontSize: '1.1rem' }}
                      >
                        {service.title}
                      </h5>
                      <p 
                        className="mb-0"
                        style={{ color: '#64748b', fontSize: '0.95rem' }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Browse More Services Button */}
          <div className="text-center mt-5">
            <a 
              href="/services"
              className="btn btn-lg px-5 py-3"
              style={{
                backgroundColor: '#0d9488',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
            >
              Browse More Services
            </a>
          </div>
        </div>

        {/* Testimonials Section - Below Services */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-4">
            <h3 
              className="fw-bold"
              style={{ color: '#1e293b', fontSize: '1.5rem' }}
            >
              Testimonials
            </h3>
            <p 
              className="mb-0"
              style={{ color: '#64748b', fontSize: '1.1rem' }}
            >
              What Our Partners Are Saying
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="row g-4 justify-content-center">
            {PARTNERS_TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div 
                  className="card h-100 border-0 p-4"
                  style={{ 
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="text-center mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="rounded-circle mb-3"
                      style={{ 
                        width: '80px', 
                        height: '80px',
                        objectFit: 'cover',
                        border: '3px solid #0d9488',
                      }}
                    />
                    <h5 
                      className="fw-bold mb-1"
                      style={{ color: '#1e293b' }}
                    >
                      {testimonial.name}
                    </h5>
                    <p 
                      className="small mb-2"
                      style={{ color: '#0d9488' }}
                    >
                      {testimonial.title}
                    </p>
                  </div>
                  <p 
                    className="mb-0 text-center"
                    style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}
                  >
                    "{testimonial.description}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Updates Section */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-4">
            <h3 
              className="fw-bold"
              style={{ color: '#1e293b', fontSize: '1.5rem' }}
            >
              Latest Updates
            </h3>
            <p 
              className="mb-0"
              style={{ color: '#64748b', fontSize: '1.1rem' }}
            >
              Stay Updated With Our Latest News
            </p>
          </div>

          {/* Latest Updates Grid - Left: 1 Card, Right: 4 Cards */}
          <div className="row g-4">
            {/* Left Side - Featured Image Card */}
            <div className="col-lg-6">
              <Link href="/blogs" style={{ textDecoration: 'none' }}>
                <div 
                  className="card h-100 border-0"
                  style={{ 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{ height: '400px', overflow: 'hidden' }}>
                    <img 
                      src={selectedUpdate.image} 
                      alt={selectedUpdate.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/Sozhou.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#0d9488' }}>
                    <p className="mb-0 text-white small">
                      Click to view all updates →
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Side - 4 Cards Stack */}
            <div className="col-lg-6">
              <div className="d-flex flex-column gap-3">
                {LATEST_UPDATES.map((update) => (
                  <div 
                    key={update.id}
                    onClick={() => setSelectedUpdate(update)}
                    className="card border-0"
                    style={{ 
                      borderRadius: '12px',
                      cursor: 'pointer',
                      backgroundColor: selectedUpdate.id === update.id ? '#f0fdfa' : '#ffffff',
                      borderLeft: selectedUpdate.id === update.id ? '4px solid #0d9488' : '4px solid transparent',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.backgroundColor = '#f0fdfa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      if (selectedUpdate.id !== update.id) {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }
                    }}
                  >
                    <div className="p-3">
                      <p 
                        className="mb-1"
                        style={{ 
                          color: '#0d9488', 
                          fontSize: '0.8rem',
                          fontWeight: '600' 
                        }}
                      >
                        {update.date}
                      </p>
                      <h6 
                        className="mb-2 fw-bold"
                        style={{ 
                          color: '#1e293b', 
                          fontSize: '1rem',
                          lineHeight: '1.4'
                        }}
                      >
                        {update.title}
                      </h6>
                      <p 
                        className="mb-0"
                        style={{ 
                          color: '#64748b', 
                          fontSize: '0.85rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {update.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
