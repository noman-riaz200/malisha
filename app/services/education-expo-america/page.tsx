'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function EducationExpoAmericaPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div 
        className="py-5 position-relative"
        style={{ 
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
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
                Education Expo in America
              </h1>
              <p className="lead text-white-50">
                Explore opportunities to study at top American universities
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="display-1 text-white-50">
                <i className="bi bi-globe-americas"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h2 className="text-white fw-bold mb-4">About Education Expo in America</h2>
              <p className="text-white-50 mb-4">
                Our Education Expo in America provides a unique opportunity for international students to connect 
                directly with admissions representatives from top American universities. Whether you're looking 
                for undergraduate, graduate, or specialized programs, our expos cover a wide range of academic disciplines.
              </p>
              
              <h3 className="text-white fw-bold mt-4 mb-3">What You'll Get</h3>
              <div className="row g-3">
                {[
                  'Direct access to university admissions officers',
                  'On-the-spot admission decisions',
                  'Scholarship and financial aid information',
                  'Visa guidance and application tips',
                  'Post-expo support services'
                ].map((item, index) => (
                  <div key={index} className="col-12">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{ width: '24px', height: '24px' }}>
                        <i className="bi bi-check text-white small"></i>
                      </div>
                      <span className="text-white-50">{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-white fw-bold mt-4 mb-3">Participating Universities</h3>
              <p className="text-white-50 mb-3">
                Our expos feature representatives from over 100+ American universities including:
              </p>
              <div className="d-flex flex-wrap gap-2">
                {['Harvard University', 'MIT', 'Stanford', 'Yale', 'Princeton', 'Columbia', 'UCLA', 'NYU'].map((uni) => (
                  <span key={uni} className="badge bg-secondary bg-opacity-25 text-white px-3 py-2">
                    {uni}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="text-white fw-bold mb-4">Event Details</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar-event text-primary me-3 fs-5"></i>
                  <div>
                    <small className="text-white-50">Next Event</small>
                    <div className="text-white fw-bold">September 2024</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-geo-alt text-danger me-3 fs-5"></i>
                  <div>
                    <small className="text-white-50">Locations</small>
                    <div className="text-white fw-bold">New York, Los Angeles, Chicago</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-people text-success me-3 fs-5"></i>
                  <div>
                    <small className="text-white-50">Expected Attendees</small>
                    <div className="text-white fw-bold">5000+ Students</div>
                  </div>
                </div>
              </div>

              <Link 
                href="/get-free-consultation"
                className="btn w-100 py-3 fw-bold"
                style={{ 
                  backgroundColor: '#8b5cf6', 
                  color: 'white',
                  borderRadius: '8px'
                }}
              >
                Register Now
              </Link>
            </div>

            <div className="card border-0 p-4 mt-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h4 className="text-white fw-bold mb-3">Need More Information?</h4>
              <p className="text-white-50 small mb-3">
                Contact our team for detailed information about upcoming events and registration.
              </p>
              <Link 
                href="/contact"
                className="btn w-100 py-2 fw-bold"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  borderRadius: '8px'
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-5 p-5 text-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: '16px' }}>
          <h2 className="text-white fw-bold mb-3">Ready to Study in America?</h2>
          <p className="text-white-50 mb-4">
            Join thousands of students who have found their dream university through our education expos.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link 
              href="/get-free-consultation"
              className="btn px-4 py-2 fw-bold"
              style={{ 
                backgroundColor: '#8b5cf6', 
                color: 'white',
                borderRadius: '8px'
              }}
            >
              Get Free Consultation
            </Link>
            <Link 
              href="/universities"
              className="btn px-4 py-2 fw-bold"
              style={{ 
                backgroundColor: 'transparent', 
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px'
              }}
            >
              Browse Universities
            </Link>
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