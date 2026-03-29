'use client';
// =============================================================================
// app/guide/page.tsx
// Guide page - Comprehensive guide for international students
// =============================================================================

import Link from 'next/link';

export const dynamic = 'force-dynamic';

const GUIDE_SECTIONS = [
  {
    title: 'Before You Apply',
    icon: 'bi-clipboard-check',
    items: [
      { title: 'Choose Your Program', description: 'Research programs that match your academic background and career goals.' },
      { title: 'Check Eligibility', description: 'Review admission requirements including language proficiency and academic records.' },
      { title: 'Prepare Documents', description: 'Gather necessary documents: passport, transcripts, recommendation letters, and study plan.' },
      { title: 'Find Scholarships', description: 'Explore scholarship opportunities to help fund your education.' }
    ]
  },
  {
    title: 'The Application Process',
    icon: 'bi-file-earmark-text',
    items: [
      { title: 'Submit Application', description: 'Apply through the university portal or through our platform for assistance.' },
      { title: 'Track Status', description: 'Monitor your application status through the university portal.' },
      { title: 'Receive Offer', description: 'Once accepted, you will receive an official admission letter.' },
      { title: 'Accept Offer', description: 'Confirm your acceptance and pay any required deposits.' }
    ]
  },
  {
    title: 'Visa & Travel',
    icon: 'bi-passport',
    items: [
      { title: 'Apply for Visa', description: 'Apply for X1 student visa at your local Chinese embassy/consulate.' },
      { title: 'Prepare Documents', description: 'Gather JW201/202 form, admission letter, and other required documents.' },
      { title: 'Book Flight', description: 'Book your flight to China. Universities usually offer airport pickup.' },
      { title: 'Arrival Prep', description: 'Prepare for arrival: currency, electronics, and essential items.' }
    ]
  },
  {
    title: 'After Arrival',
    icon: 'bi-airplane-arrival',
    items: [
      { title: 'Airport Pickup', description: 'Most universities provide free airport pickup for new students.' },
      { title: 'Register at University', description: 'Complete enrollment and registration at your university.' },
      { title: 'Residence Permit', description: 'Apply for a residence permit within 30 days of arrival.' },
      { title: 'Bank Account', description: 'Open a local bank account for convenient financial management.' }
    ]
  }
];

const QUICK_LINKS = [
  { title: 'Universities', href: '/universities', icon: 'bi-building' },
  { title: 'Programs', href: '/programs', icon: 'bi-book' },
  { title: 'Scholarships', href: '/scholarships', icon: 'bi-trophy' },
  { title: 'Contact', href: '/contact', icon: 'bi-chat-dots' }
];

export default function GuidePage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)',
          minHeight: '50vh',
          marginTop: '76px'
        }}
      >
        <div className="container text-center text-white py-5">
          <h1 className="display-3 fw-bold mb-4">Student Guide</h1>
          <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Your complete guide to studying in China, from application to graduation.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="row g-3">
            {QUICK_LINKS.map((link, index) => (
              <div key={index} className="col-6 col-md-3">
                <Link 
                  href={link.href}
                  className="d-flex align-items-center p-3 rounded-3 text-decoration-none"
                  style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
                >
                  <i className={`bi ${link.icon} fs-4 text-primary me-3`}></i>
                  <span className="fw-medium text-dark">{link.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {GUIDE_SECTIONS.map((section, index) => (
              <div key={index} className="col-lg-6">
                <div className="p-4 h-100 rounded-4" style={{ backgroundColor: '#f8fafc' }}>
                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: '#0d2137'
                      }}
                    >
                      <i className={`bi ${section.icon} fs-4 text-white`}></i>
                    </div>
                    <h2 className="h4 fw-bold mb-0 text-dark">{section.title}</h2>
                  </div>
                  <div className="row g-3">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="col-12">
                        <h3 className="h6 fw-bold mb-1 text-dark">{item.title}</h3>
                        <p className="small text-secondary mb-0">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Application Timeline</h2>
          <div className="timeline">
            {[
              { month: '6-9 months before', title: 'Research & Prepare', description: 'Research universities, programs, and prepare documents.' },
              { month: '4-6 months before', title: 'Submit Application', description: 'Apply to universities and scholarship programs.' },
              { month: '2-4 months before', title: 'Receive Offer', description: 'Receive admission letter and accept your offer.' },
              { month: '1-2 months before', title: 'Apply for Visa', description: 'Apply for student visa and book flight.' },
              { month: '1 week before', title: 'Travel to China', description: 'Arrive in China and prepare for university orientation.' }
            ].map((item, index) => (
              <div key={index} className="d-flex mb-4">
                <div className="me-4">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      backgroundColor: '#0d2137',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="pb-4">
                  <p className="small text-primary fw-bold mb-1">{item.month}</p>
                  <h3 className="h5 fw-bold mb-1 text-dark">{item.title}</h3>
                  <p className="text-secondary mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Required Documents</h2>
          <div className="row g-4">
            {[
              { title: 'Passport', description: 'Valid for at least 6 months with blank pages', icon: 'bi-passport' },
              { title: 'Academic Records', description: 'Transcripts and certificates from previous education', icon: 'bi-file-earmark-text' },
              { title: 'Language Certificate', description: 'HSK for Chinese programs or TOEFL/IELTS for English', icon: 'bi-translate' },
              { title: 'Photos', description: 'Passport-size photos (white background)', icon: 'bi-camera' },
              { title: 'Study Plan', description: 'Personal statement explaining your study goals', icon: 'bi-pen' },
              { title: 'Recommendation', description: 'Letters from teachers or professors', icon: 'bi-envelope' }
            ].map((doc, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="p-4 text-center h-100 rounded-4" style={{ backgroundColor: '#f8fafc' }}>
                  <i className={`bi ${doc.icon} fs-2 text-primary mb-3 d-block`}></i>
                  <h3 className="h5 fw-bold mb-2 text-dark">{doc.title}</h3>
                  <p className="text-secondary small mb-0">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Need Personalized Guidance?</h2>
          <p className="mb-4 opacity-75">Our education consultants can help you navigate every step.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/get-free-consultation" className="btn btn-light btn-lg px-4">
              Get Free Consultation
            </Link>
            <Link href="/contact" className="btn btn-outline-light btn-lg px-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}