'use client';
// =============================================================================
// app/services/accommodation/page.tsx
// Accommodation Service page
// =============================================================================

import Link from 'next/link';

const ACCOMMODATION_TYPES = [
  {
    title: 'On-Campus Dormitory',
    description: 'University-managed dormitories on campus',
    price: '$150 - $300/month',
    features: ['Shared rooms', 'Common areas', 'Meal plans available', 'Laundry facilities']
  },
  {
    title: 'Off-Campus Apartment',
    description: 'Private apartments near universities',
    price: '$300 - $600/month',
    features: ['Private studio/1BR', 'Kitchen facilities', 'Full amenities', 'Flexible lease']
  },
  {
    title: 'Homestay',
    description: 'Live with a local Chinese family',
    price: '$250 - $400/month',
    features: ['Private room', 'Meals included', 'Cultural immersion', 'Language practice']
  },
  {
    title: 'Student Hostel',
    description: 'Budget-friendly shared accommodation',
    price: '$100 - $200/month',
    features: ['Shared rooms', 'Basic amenities', 'Social areas', 'Study spaces']
  }
];

const CITIES = [
  { name: 'Beijing', avgRent: '$400-800' },
  { name: 'Shanghai', avgRent: '$350-700' },
  { name: 'Hangzhou', avgRent: '$250-500' },
  { name: 'Chengdu', avgRent: '$200-400' },
  { name: 'Xi\'an', avgRent: '$180-350' },
  { name: 'Nanjing', avgRent: '$200-400' }
];

export const dynamic = 'force-dynamic';

export default function AccommodationPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div 
        className="py-5 position-relative"
        style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
                Accommodation Service
              </h1>
              <p className="lead text-white-50">
                Find the perfect place to stay during your studies in China
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="display-1 text-white-50">
                <i className="bi bi-house-heart"></i>
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
            <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h2 className="text-white fw-bold mb-4">How We Help</h2>
              <div className="row g-3 mb-4">
                {[
                  'Personalized housing matching',
                  'Virtual property tours',
                  'Lease negotiation assistance',
                  'Move-in coordination',
                  'Ongoing support',
                  'Emergency assistance'
                ].map((feature, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="text-white-50">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-white fw-bold mt-4 mb-3">Accommodation Types</h3>
              <div className="row g-3">
                {ACCOMMODATION_TYPES.map((type, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="p-3 rounded-3 h-100" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <h4 className="text-white h6 mb-1">{type.title}</h4>
                      <p className="text-white-50 small mb-2">{type.description}</p>
                      <p className="text-primary fw-bold mb-2">{type.price}</p>
                      <div className="d-flex flex-wrap gap-1">
                        {type.features.map((f, i) => (
                          <span key={i} className="badge bg-white bg-opacity-10 text-white-50 small">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="text-white fw-bold mb-3">Average Rent by City</h3>
              {CITIES.map((city, idx) => (
                <div key={idx} className="d-flex justify-content-between py-2" style={{ borderBottom: idx < CITIES.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <span className="text-white-50">{city.name}</span>
                  <span className="text-white fw-bold">{city.avgRent}</span>
                </div>
              ))}
            </div>

            <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="text-white fw-bold mb-3">Need Help?</h3>
              <p className="text-white-50 small mb-4">
                Our housing team can help you find the perfect accommodation.
              </p>
              <Link href="/get-free-consultation" className="btn w-100" style={{ backgroundColor: '#10b981', color: 'white' }}>
                Get Housing Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}