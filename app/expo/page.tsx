'use client';
// =============================================================================
// app/expo/page.tsx
// Education Expo Hub page - Main landing for all education expos
// =============================================================================

import Link from 'next/link';

export const dynamic = 'force-dynamic';

const EXPO_EVENTS = [
  {
    id: 'america',
    title: 'Education Expo in America',
    subtitle: 'Explore US University Opportunities',
    description: 'Connect with top American universities and discover your path to studying in the USA.',
    color: '#8b5cf6',
    icon: 'bi-globe-americas',
    href: '/services/education-expo-america',
    features: [
      'Meet admissions officers from 50+ US universities',
      'Get instant admission offers on the spot',
      'Learn about scholarships and financial aid',
      'One-on-one counseling sessions'
    ]
  },
  {
    id: 'china',
    title: 'Education Expo in China',
    subtitle: 'Study in the World\'s Fastest Growing Economy',
    description: 'Discover opportunities at China\'s top universities with our comprehensive education expos.',
    color: '#ef4444',
    icon: 'bi-building',
    href: '/services/education-expo-china',
    features: [
      'Direct admission to 100+ Chinese universities',
      'Scholarship opportunities up to 100%',
      'English-taught programs available',
      'Post-expo application support'
    ]
  },
  {
    id: 'overseas',
    title: 'Education Expo Overseas',
    subtitle: 'Global Education Opportunities',
    description: 'Explore study opportunities in various countries around the world.',
    color: '#3b82f6',
    icon: 'bi-globe2',
    href: '/services/education-expo-overseas',
    features: [
      'Universities from UK, Canada, Australia, and more',
      'Explore diverse academic programs',
      'Meet international admissions teams',
      'Learn about visa requirements'
    ]
  }
];

const PAST_EXPOS = [
  { year: '2024', location: 'New York, USA', attendees: '2,500+', universities: '80+' },
  { year: '2024', location: 'Beijing, China', attendees: '5,000+', universities: '150+' },
  { year: '2023', location: 'London, UK', attendees: '3,000+', universities: '100+' },
  { year: '2023', location: 'Shanghai, China', attendees: '4,500+', universities: '120+' }
];

export const dynamic = 'force-dynamic';

export default function ExpoPage() {
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
          <h1 className="display-3 fw-bold mb-4">Education Expos</h1>
          <p className="lead mb-4" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Join our education expos and connect directly with top universities from around the world. 
            Get instant admission offers, scholarships, and kickstart your international education journey.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="#expos" className="btn btn-primary btn-lg px-4">
              View Upcoming Expos
            </Link>
            <Link href="/get-free-consultation" className="btn btn-outline-light btn-lg px-4">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-4 text-white" style={{ backgroundColor: '#0d2137' }}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <h3 className="fw-bold text-primary mb-1">15,000+</h3>
              <p className="small mb-0 opacity-75">Students Served</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold text-primary mb-1">350+</h3>
              <p className="small mb-0 opacity-75">Universities Participated</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold text-primary mb-1">50+</h3>
              <p className="small mb-0 opacity-75">Cities Covered</p>
            </div>
            <div className="col-6 col-md-3">
              <h3 className="fw-bold text-primary mb-1">$2M+</h3>
              <p className="small mb-0 opacity-75">Scholarships Awarded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Expos */}
      <section id="expos" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Upcoming Education Expos</h2>
          <div className="row g-4">
            {EXPO_EVENTS.map((expo) => (
              <div key={expo.id} className="col-lg-4">
                <div className="h-100 p-4 rounded-4" style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  <div 
                    className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: `${expo.color}15`
                    }}
                  >
                    <i className={`bi ${expo.icon} fs-3`} style={{ color: expo.color }}></i>
                  </div>
                  <h3 className="h4 fw-bold mb-1 text-dark">{expo.title}</h3>
                  <p className="text-muted small mb-3">{expo.subtitle}</p>
                  <p className="text-secondary mb-4">{expo.description}</p>
                  <ul className="list-unstyled mb-4">
                    {expo.features.map((feature, idx) => (
                      <li key={idx} className="d-flex align-items-center mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span className="small text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={expo.href}
                    className="btn w-100"
                    style={{ backgroundColor: expo.color, color: 'white' }}
                  >
                    Learn More <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Expos */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">Our Past Expos</h2>
          <div className="row g-4">
            {PAST_EXPOS.map((expo, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge" style={{ backgroundColor: '#0d2137' }}>{expo.year}</span>
                    <i className="bi bi-geo-alt-fill text-muted"></i>
                  </div>
                  <h3 className="h5 fw-bold mb-2 text-dark">{expo.location}</h3>
                  <div className="d-flex justify-content-between pt-3 border-top">
                    <div>
                      <p className="small text-muted mb-0">Attendees</p>
                      <p className="fw-bold mb-0 text-dark">{expo.attendees}</p>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Universities</p>
                      <p className="fw-bold mb-0 text-dark">{expo.universities}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">How Our Expos Work</h2>
          <div className="row g-4">
            {[
              { step: '1', title: 'Register Online', description: 'Sign up for free and select your preferred expo event.', icon: 'bi-person-plus' },
              { step: '2', title: 'Prepare Documents', description: 'Bring your academic transcripts and documents for quick processing.', icon: 'bi-file-earmark-check' },
              { step: '3', title: 'Meet Universities', description: 'Connect with admissions officers from top universities.', icon: 'bi-people' },
              { step: '4', title: 'Get Admission', description: 'Receive admission offers and scholarships on the spot.', icon: 'bi-trophy' }
            ].map((item, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center h-100 p-4">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      backgroundColor: '#0d2137',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.step}
                  </div>
                  <i className={`bi ${item.icon} fs-2 d-block mb-2 text-primary`}></i>
                  <h3 className="h5 fw-bold mb-2 text-dark">{item.title}</h3>
                  <p className="text-secondary small mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">What Students Say</h2>
          <div className="row g-4">
            {[
              {
                name: 'Ahmed Khan',
                country: 'Pakistan',
                quote: 'I got admission to Shanghai Jiao Tong University at the expo! The process was incredibly smooth.',
                university: 'Shanghai Jiao Tong University'
              },
              {
                name: 'Maria Garcia',
                country: 'Mexico',
                quote: 'The education expo helped me find my dream program. I received a scholarship worth $10,000!',
                university: 'Beijing University'
              },
              {
                name: 'John Smith',
                country: 'USA',
                quote: 'Amazing experience! Met with 15 universities in one day and found the perfect program for me.',
                university: 'Zhejiang University'
              }
            ].map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: '#e2e8f0',
                        fontSize: '1.25rem'
                      }}
                    >
                      👤
                    </div>
                    <div>
                      <h4 className="h6 fw-bold mb-0 text-dark">{testimonial.name}</h4>
                      <p className="small text-muted mb-0">{testimonial.country}</p>
                    </div>
                  </div>
                  <p className="text-secondary mb-3">"{testimonial.quote}"</p>
                  <p className="small fw-bold text-primary mb-0">→ {testimonial.university}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Attend an Expo?</h2>
          <p className="mb-4 opacity-75">Register now and take the first step towards your international education.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link href="/get-free-consultation" className="btn btn-light btn-lg px-4">
              Register for Expo
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