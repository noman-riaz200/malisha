'use client';
// =============================================================================
// app/services/visa/page.tsx
// Visa Service page
// =============================================================================

import Link from 'next/link';

export const dynamic = 'force-dynamic';

const VISA_TYPES = [
  {
    type: 'X1 Visa',
    purpose: 'Long-term study (more than 180 days)',
    validity: 'Up to 5 years',
    requirement: 'Admission letter + JW201/202 form'
  },
  {
    type: 'X2 Visa',
    purpose: 'Short-term study (less than 180 days)',
    validity: 'Up to 1 year',
    requirement: 'Admission letter from university'
  }
];

const SERVICES = [
  {
    title: 'Visa Consultation',
    description: 'Expert guidance on visa requirements and documentation',
    price: '$50',
    icon: 'bi-chat-dots'
  },
  {
    title: 'Document Preparation',
    description: 'Assistance with filling forms and compiling documents',
    price: '$100',
    icon: 'bi-file-earmark-check'
  },
  {
    title: 'Interview Coaching',
    description: 'Mock interviews and preparation for visa interview',
    price: '$80',
    icon: 'bi-person-badge'
  },
  {
    title: 'Full Service Package',
    description: 'Complete visa application assistance from start to finish',
    price: '$250',
    icon: 'bi-briefcase'
  }
];

export default function VisaPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div 
        className="py-5 position-relative"
        style={{ 
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav className="mb-3">
                <Link href="/services" className="text-white-50 text-decoration-none">
                  <i className="bi bi-arrow-left me-2"></i>Back to Services
                </Link>
              </nav>
              <h1 className="display-3 fw-bold text-white mb-3">
                Visa Service
              </h1>
              <p className="lead text-white-50">
                Expert assistance with your Chinese student visa application
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="display-1 text-white-50">
                <i className="bi bi-passport-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="card border-0 p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h2 className="text-white fw-bold mb-4">Student Visa Types</h2>
              {VISA_TYPES.map((visa, idx) => (
                <div key={idx} className="p-3 rounded-3 mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <h3 className="text-white h5 mb-2">{visa.type}</h3>
                  <p className="text-white-50 mb-2">{visa.purpose}</p>
                  <div className="row">
                    <div className="col-6">
                      <span className="text-white-50 small">Validity:</span>
                      <span className="text-white ms-2">{visa.validity}</span>
                    </div>
                    <div className="col-6">
                      <span className="text-white-50 small">Required:</span>
                      <span className="text-white ms-2">{visa.requirement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h2 className="text-white fw-bold mb-4">Required Documents</h2>
              <div className="row g-3">
                {[
                  'Valid passport (6+ months)',
                  'Visa application form',
                  'Admission letter',
                  'JW201/202 form',
                  'Photo (white background)',
                  'Financial proof',
                  'Health certificate',
                  'Police clearance'
                ].map((doc, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="text-white-50">{doc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="text-white fw-bold mb-4">Our Visa Services</h3>
              {SERVICES.map((service, idx) => (
                <div key={idx} className="mb-3 pb-3" style={{ borderBottom: idx < SERVICES.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div className="d-flex align-items-start">
                    <i className={`bi ${service.icon} text-primary fs-4 me-3`}></i>
                    <div>
                      <h4 className="text-white h6 mb-1">{service.title}</h4>
                      <p className="text-white-50 small mb-1">{service.description}</p>
                      <p className="text-primary fw-bold mb-0">{service.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="text-white fw-bold mb-3">Need Visa Help?</h3>
              <p className="text-white-50 small mb-4">
                Get expert help with your visa application.
              </p>
              <Link href="/get-free-consultation" className="btn w-100" style={{ backgroundColor: '#f97316', color: 'white' }}>
                Get Visa Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}