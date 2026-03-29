'use client';
// =============================================================================
// app/about/page.tsx
// About page - Company information, mission, vision, and team
// =============================================================================

import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)',
          minHeight: '60vh',
          marginTop: '76px'
        }}
      >
        <div className="container text-center text-white py-5">
          <h1 className="display-3 fw-bold mb-4">About Malisha Edu</h1>
          <p className="lead mb-4" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Your trusted partner in pursuing quality education in China. We connect ambitious students with world-class universities.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/contact" className="btn btn-primary btn-lg px-4">
              Contact Us
            </Link>
            <Link href="/universities" className="btn btn-outline-light btn-lg px-4">
              View Universities
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-4 h-100 rounded-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="mb-3">
                  <span className="fs-1">🎯</span>
                </div>
                <h2 className="h3 fw-bold mb-3 text-dark">Our Mission</h2>
                <p className="text-secondary mb-0">
                  To bridge the gap between international students and Chinese universities by providing comprehensive guidance, 
                  transparent information, and personalized support throughout the admission journey. We strive to make 
                  quality education accessible to every aspiring student.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 h-100 rounded-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="mb-3">
                  <span className="fs-1">🌟</span>
                </div>
                <h2 className="h3 fw-bold mb-3 text-dark">Our Vision</h2>
                <p className="text-secondary mb-0">
                  To become the most trusted and reliable education consultancy for students seeking to study in China, 
                  recognized for our integrity, expertise, and commitment to student success. We envision a world where 
                  every student has access to quality education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Why Choose Us</h2>
          <div className="row g-4">
            {[
              {
                icon: '🎓',
                title: 'Expert Guidance',
                description: 'Our team consists of education experts with years of experience in Chinese university admissions.'
              },
              {
                icon: '🤝',
                title: 'Direct Partnerships',
                description: 'We have direct relationships with top Chinese universities, ensuring smooth admission processes.'
              },
              {
                icon: '📚',
                title: 'Comprehensive Support',
                description: 'From application to enrollment, we provide end-to-end support for your education journey.'
              },
              {
                icon: '💰',
                title: 'Scholarship Assistance',
                description: 'We help students find and apply for scholarships to make education more affordable.'
              },
              {
                icon: '🌍',
                title: 'Global Network',
                description: 'Our presence in multiple countries allows us to serve students from around the world.'
              },
              {
                icon: '⭐',
                title: 'Proven Track Record',
                description: 'Thousands of successful admissions to top Chinese universities over the years.'
              }
            ].map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                  <div className="fs-1 mb-3">{item.icon}</div>
                  <h3 className="h5 fw-bold mb-2 text-dark">{item.title}</h3>
                  <p className="text-secondary mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Our Services</h2>
          <div className="row g-4">
            {[
              {
                title: 'University Selection',
                description: 'We help you choose the right university based on your academic background and career goals.',
                icon: 'bi-building'
              },
              {
                title: 'Application Assistance',
                description: 'Complete guidance through the entire application process, including document preparation.',
                icon: 'bi-file-earmark-check'
              },
              {
                title: 'Visa Support',
                description: 'Expert assistance with visa application and interview preparation.',
                icon: 'bi-passport'
              },
              {
                title: 'Pre-Departure Briefing',
                description: 'Comprehensive orientation about living and studying in China.',
                icon: 'bi-airplane'
              }
            ].map((service, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="p-4 text-center h-100 rounded-4" style={{ backgroundColor: '#f8fafc' }}>
                  <i className={`bi ${service.icon} fs-1 mb-3 d-block text-primary`}></i>
                  <h3 className="h5 fw-bold mb-2 text-dark">{service.title}</h3>
                  <p className="text-secondary small mb-0">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { number: '5000+', label: 'Students Placed' },
              { number: '100+', label: 'Partner Universities' },
              { number: '95%', label: 'Success Rate' },
              { number: '30+', label: 'Countries Served' }
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="py-3">
                  <h3 className="display-4 fw-bold mb-2">{stat.number}</h3>
                  <p className="mb-0 opacity-75">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Our Team</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: 'Dr. Sarah Chen',
                role: 'Founder & CEO',
                description: 'PhD in Education Management with 15+ years of experience in international education.'
              },
              {
                name: 'Michael Wang',
                role: 'Director of Admissions',
                description: 'Former admissions officer at top Chinese universities with extensive network.'
              },
              {
                name: 'Emily Johnson',
                role: 'Student Services Lead',
                description: 'Specializes in guiding students through the entire admission process.'
              }
            ].map((member, index) => (
              <div key={index} className="col-md-4">
                <div className="p-4 text-center bg-white rounded-4 shadow-sm">
                  <div 
                    className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      backgroundColor: '#e2e8f0',
                      fontSize: '3rem'
                    }}
                  >
                    👤
                  </div>
                  <h3 className="h5 fw-bold mb-1 text-dark">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-secondary small mb-0">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: '#f0f4f8' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3 text-dark">Ready to Start Your Journey?</h2>
          <p className="text-secondary mb-4">Let us help you achieve your dreams of studying in China.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/contact" className="btn btn-primary btn-lg px-4">
              Get Free Consultation
            </Link>
            <Link href="/universities" className="btn btn-outline-primary btn-lg px-4">
              Explore Universities
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}