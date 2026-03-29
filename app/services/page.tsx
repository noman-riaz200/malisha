'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const services = [
  { 
    id: 1,
    title: 'International Student Admission Services', 
    description: 'Comprehensive admission assistance for international students seeking to study at top Chinese universities. We guide you through the entire application process.',
    shortDesc: 'Professional admission assistance for Chinese universities',
    href: '/services/admission-service',
    image: '/images/banner.png',
    color: '#f97316',
    icon: 'bi-mortarboard-fill',
    location: 'China',
    address: 'No.1158, Ave.2, Qiantang Dist.',
    tags: ['Admission', 'Support']
  },
  { 
    id: 4,
    title: 'Education Expo in China', 
    description: 'Join our education expos across China and meet representatives from top Chinese universities. Get direct admission offers and scholarships.',
    shortDesc: 'Meet top Chinese university representatives',
    href: '/services/education-expo-china',
    image: '/images/Shanghai Jiao Tong.jpg',
    color: '#3b82f6',
    icon: 'bi-geo-alt-fill',
    location: 'China',
    address: 'No.1158, Ave.2, Qiantang Dist.',
    tags: ['Education Expo', 'China']
  },
  { 
    id: 5,
    title: 'Education Expo in America', 
    description: 'Attend our education expos in America and explore opportunities to study in the USA. Connect with American university admissions teams.',
    shortDesc: 'Explore US university opportunities',
    href: '/services/education-expo-america',
    image: '/images/NINGBO.png',
    color: '#8b5cf6',
    icon: 'bi-globe-americas',
    location: 'America',
    address: 'No.1158, Ave.2, Qiantang Dist.',
    tags: ['Education Expo', 'USA']
  },
  { 
    id: 6,
    title: 'Education Expo in Overseas', 
    description: 'Join our international education expos and discover study opportunities around the world. Connect with universities from various countries.',
    shortDesc: 'Global education opportunities worldwide',
    href: '/services/education-expo-overseas',
    image: '/images/Wuhan.jpg',
    color: '#10b981',
    icon: 'bi-globe',
    location: 'Worldwide',
    address: 'No.1158, Ave.2, Qiantang Dist.',
    tags: ['Education Expo', 'Global']
  },
  { 
    id: 7,
    title: 'Airport Pickup Service', 
    description: 'We provide convenient airport pickup services for international students arriving in China. Safe and reliable transportation to your destination.',
    shortDesc: 'Safe airport pickup for international students',
    href: '/services/airport-pickup-service',
    image: '/images/Wuhan.jpg',
    color: '#ec4899',
    icon: 'bi-car-front-fill',
    location: 'China',
    address: 'No.1158, Ave.2, Qiantang Dist.',
    tags: ['Pickup', 'Airport']
  },
  { 
    id: 8,
    title: 'Airport Pickup Service', 
    description: 'We provide convenient airport pickup services for international students arriving in China. Safe and reliable transportation to your destination.',
    shortDesc: 'Safe airport pickup for international students',
    href: '/services/airport-pickup-service',
    image: '/images/CHANGZHOU.jpg',
    color: '#06b6d4',
    icon: 'bi-car-front-fill',
    location: 'China',
    address: 'No.1158, Ave.2, Qiantang Dist.',
    tags: ['Pickup', 'Airport']
  },
];

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const pathname = usePathname();

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8fafc', paddingTop: '80px' }}>
      <div className="container py-5">
        {/* Section Title */}
        <div className="text-center mb-5">
          <h2 
            className="fw-bold"
            style={{ color: '#1e293b', fontSize: '2rem' }}
          >
            Our Services
          </h2>
          <p className="lead text-muted mt-2">
            Comprehensive support for your educational journey in China
          </p>
        </div>

        {/* Service Cards - University Card Style */}
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={service.id} className="col-lg-3 col-md-6">
              <Link href={service.href} className="text-decoration-none">
                <div 
                  className="card h-100 border-0"
                  style={{ 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Service Image */}
                  <div 
                    className="position-relative"
                    style={{ height: '200px', overflow: 'hidden' }}
                  >
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-fit-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={index < 4}
                      style={{ objectFit: 'cover' }}
                      quality={80}
                    />
                    {/* Dark overlay */}
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    />
                    {/* Icon overlay */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className="text-center text-white">
                        <i className={`bi ${service.icon} display-4`}></i>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    {/* Learn More Button & Service ID */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span 
                        className="badge px-3 py-2"
                        style={{ 
                          backgroundColor: service.color, 
                          color: '#ffffff',
                          fontWeight: '600',
                        }}
                      >
                        LEARN MORE
                      </span>
                      <span 
                        className="small"
                        style={{ color: '#64748b' }}
                      >
                        Service {service.id}
                      </span>
                    </div>

                    {/* Service Name */}
                    <h5 
                      className="card-title fw-bold mb-3"
                      style={{ color: '#1e293b', fontSize: '1.1rem' }}
                    >
                      {service.title}
                    </h5>

                    {/* Tags */}
                    <div className="mb-3">
                      {service.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="badge me-1 mb-1"
                          style={{ 
                            backgroundColor: '#e2e8f0', 
                            color: '#475569',
                            fontWeight: '500',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Location Info */}
                    <p 
                      className="small mb-1"
                      style={{ color: '#64748b' }}
                    >
                      {service.location}
                    </p>
                    <p 
                      className="small mb-0"
                      style={{ color: '#64748b' }}
                    >
                      {service.address}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Services Section */}
        <div className="mt-5 pt-5">
          <h2 className="fw-bold text-center mb-4" style={{ color: '#1e293b' }}>Additional Services</h2>
          <div className="row g-4 justify-content-center">
            {[
              { title: 'Service Charges', href: '/services/service-charges', icon: 'bi-currency-dollar', color: '#6b7280', description: 'View our transparent service pricing' },
              { title: 'Chinese Language Course', href: '/services/chinese-language-foundation-course', icon: 'bi-translate', color: '#ef4444', description: 'Learn Chinese language fundamentals' },
              { title: 'On Campus Service', href: '/services/on-campus-service', icon: 'bi-building', color: '#14b8a6', description: 'Comprehensive on-campus support services' },
              { title: 'Job & Business in China', href: '/services/job-business-china', icon: 'bi-briefcase', color: '#f97316', description: 'Career opportunities in China' },
            ].map((service) => (
              <div key={service.title} className="col-12 col-md-6 col-lg-3">
                <Link href={service.href} className="text-decoration-none">
                  <div 
                    className="card h-100 border-0 p-4 text-center"
                    style={{ 
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${service.color}40`;
                      e.currentTarget.style.backgroundColor = `${service.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        backgroundColor: `${service.color}20`,
                      }}
                    >
                      <i className={`bi ${service.icon} fs-4`} style={{ color: service.color }}></i>
                    </div>
                    <h5 className="text-dark mb-2">{service.title}</h5>
                    <p className="small mb-3" style={{ color: '#64748b' }}>{service.description}</p>
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: service.color,
                        color: '#ffffff'
                      }}
                    >
                      Learn More <i className="bi bi-arrow-right ms-1"></i>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
