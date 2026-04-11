'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Service {
  _id: string;
  title: string;
  description?: string;
  shortDesc?: string;
  image?: string;
  icon?: string;
  isActive: boolean;
  order: number;
}

export default function OurServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services?active=true')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setServices(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const features = loading && services.length === 0 ? [
    {
      icon: 'bi-mortarboard-fill',
      title: 'University Admission',
      description: 'Complete guidance for admission to top Chinese universities with expert counseling and document preparation.',
    },
    {
      icon: 'bi-file-earmark-text-fill',
      title: 'Document Processing',
      description: 'Professional assistance with application documents, translations, and verification procedures.',
    },
    {
      icon: 'bi-person-check-fill',
      title: 'Visa Assistance',
      description: 'Step-by-step guidance through the Chinese visa application process for student visas.',
    },
    {
      icon: 'bi-airplane-engines-fill',
      title: 'Airport Pickup',
      description: 'Reliable airport pickup service for students arriving in China.',
    },
    {
      icon: 'bi-house-fill',
      title: 'Accommodation',
      description: 'Help with finding suitable accommodation near your university.',
    },
    {
      icon: 'bi-people-fill',
      title: 'On-Campus Support',
      description: 'Ongoing support services once you arrive at your university.',
    },
  ] : services.map(s => ({
    icon: s.icon || 'bi-gear-fill',
    title: s.title,
    description: s.shortDesc || s.description || '',
  }));

  const processSteps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We discuss your academic goals and preferences to recommend suitable universities.',
    },
    {
      number: '02',
      title: 'University Selection',
      description: 'Choose from our partner universities based on your requirements and budget.',
    },
    {
      number: '03',
      title: 'Application Process',
      description: 'We help prepare and submit all required documents for your application.',
    },
    {
      number: '04',
      title: 'Offer Letter',
      description: 'Receive your admission letter and visa invitation from the university.',
    },
    {
      number: '05',
      title: 'Visa Processing',
      description: 'Complete visa application with our expert guidance and support.',
    },
    {
      number: '06',
      title: 'Pre-Departure',
      description: 'Get orientation about China, accommodation, and airport pickup arrangements.',
    },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="mb-4">
                <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
                  ← Back to Services
                </Link>
              </div>
              <h1 className="display-3 fw-bold text-white mb-4">
                Our <span style={{ color: '#f97316' }}>Services</span>
              </h1>
              <p className="lead mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Comprehensive support for international students seeking quality education in China. From application to arrival, we are with you every step of the way.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link 
                  href="/get-free-consultation" 
                  className="btn px-4 py-3 fw-bold"
                  style={{ backgroundColor: '#f97316', color: '#ffffff', borderRadius: '50px' }}
                >
                  Get Free Consultation
                </Link>
                <Link 
                  href="/contact" 
                  className="btn px-4 py-3 fw-bold"
                  style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50px' }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="position-relative" style={{ height: '400px' }}>
                <Image
                  src="/images/banner.png"
                  alt="Our Services"
                  fill
                  className="object-fit-cover"
                  style={{ borderRadius: '20px' }}
                />
                <div 
                  className="position-absolute d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: 'rgba(249,115,22,0.9)',
                    borderRadius: '20px',
                    padding: '2rem',
                    bottom: '-20px',
                    right: '-20px',
                    maxWidth: '250px'
                  }}
                >
                  <div className="text-white text-center">
                    <div className="display-4 fw-bold">10+</div>
                    <div className="small">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="row text-center">
            {[
              { number: '5000+', label: 'Students Placed' },
              { number: '100+', label: 'Partner Universities' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3 mb-4 mb-md-0">
                <div className="display-5 fw-bold" style={{ color: '#f97316' }}>{stat.number}</div>
                <div className="text-white-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Features */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white mb-3">What We Offer</h2>
            <p className="text-white-50">Comprehensive services tailored to your needs</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 border-0 p-4"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {services.length > 0 && services[index]?.image ? (
                    <div className="position-relative mb-4" style={{ height: '150px', borderRadius: '12px', overflow: 'hidden' }}>
                      <Image 
                        src={services[index].image} 
                        alt={feature.title}
                        fill
                        className="object-fit-cover"
                      />
                    </div>
                  ) : (
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mb-4"
                      style={{ 
                        width: '70px', 
                        height: '70px', 
                        backgroundColor: '#f97316' 
                      }}
                    >
                      <i className={`bi ${feature.icon} fs-3 text-white`}></i>
                    </div>
                  )}
                  <h4 className="fw-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-white-50 mb-0">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-5" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white mb-3">Our Process</h2>
            <p className="text-white-50">Simple steps to your dream education</p>
          </div>
          <div className="row g-4">
            {processSteps.map((step, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="d-flex gap-3">
                  <div 
                    className="flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: '#f97316', 
                      borderRadius: '12px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#fff'
                    }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-2">{step.title}</h5>
                    <p className="text-white-50 mb-0 small">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div 
            className="card border-0 p-5 text-center"
            style={{ 
              backgroundColor: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
            }}
          >
            <h2 className="display-5 fw-bold text-white mb-3">Ready to Start?</h2>
            <p className="text-white mb-4" style={{ opacity: 0.9 }}>
              Get in touch with our team for a free consultation about your study plans in China.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link 
                href="/get-free-consultation" 
                className="btn px-4 py-3 fw-bold"
                style={{ backgroundColor: '#ffffff', color: '#f97316', borderRadius: '50px' }}
              >
                Get Free Consultation
              </Link>
              <Link 
                href="/contact" 
                className="btn px-4 py-3 fw-bold"
                style={{ backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ffffff', borderRadius: '50px' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}