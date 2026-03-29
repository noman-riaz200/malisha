'use client';
// =============================================================================
// app/services/airport-pickup/page.tsx
// Airport Pickup Service page
// =============================================================================

import Link from 'next/link';

const CITIES = [
  { name: 'Beijing', airports: 'PEK, PKX', price: '$80' },
  { name: 'Shanghai', airports: 'PVG, SHA', price: '$70' },
  { name: 'Guangzhou', airports: 'CAN', price: '$60' },
  { name: 'Shenzhen', airports: 'SZX', price: '$60' },
  { name: 'Chengdu', airports: 'CTU', price: '$55' },
  { name: 'Hangzhou', airports: 'HGH', price: '$50' }
];

const SERVICES = [
  {
    title: 'Curbside Pickup',
    description: 'Driver meets you at the airport entrance with a name sign',
    icon: 'bi-person-check',
    price: 'From $50'
  },
  {
    title: 'Full Service Pickup',
    description: 'Includes luggage assistance and welcome package',
    icon: 'bi-briefcase',
    price: 'From $70'
  },
  {
    title: 'VIP Priority Pickup',
    description: 'Fast-track service with dedicated staff assistance',
    icon: 'bi-star',
    price: 'From $100'
  },
  {
    title: 'Group Transfer',
    description: 'Van service for families or groups up to 6 people',
    icon: 'bi-people',
    price: 'From $120'
  }
];

export const dynamic = 'force-dynamic';

export default function AirportPickupPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div 
        className="py-5 position-relative"
        style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                Airport Pickup Service
              </h1>
              <p className="lead text-white-50">
                Stress-free airport transfers to your university or accommodation in China
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="display-1 text-white-50">
                <i className="bi bi-airplane-engines"></i>
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
              <h2 className="text-white fw-bold mb-4">Why Book Airport Pickup?</h2>
              <div className="row g-3 mb-4">
                {[
                  'Meet & greet with name sign',
                  'Professional English-speaking drivers',
                  'Fixed prices, no hidden fees',
                  '24/7 customer support',
                  'Flight monitoring for delays',
                  'Luggage assistance included'
                ].map((feature, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="text-white-50">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-white fw-bold mt-4 mb-3">How It Works</h3>
              <div className="row g-3 mb-4">
                {[
                  { step: '1', title: 'Book Online', desc: 'Select your pickup city and service type' },
                  { step: '2', title: 'Confirm Details', desc: 'Provide flight info and accommodation address' },
                  { step: '3', title: 'Meet Driver', desc: 'Driver awaits you at arrivals with name sign' },
                  { step: '4', title: 'Safe Journey', desc: 'Comfortable transfer to your destination' }
                ].map((item, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="d-flex">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                        style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold' }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <p className="text-white fw-bold mb-0">{item.title}</p>
                        <p className="text-white-50 small mb-0">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-white fw-bold mt-4 mb-3">Available in Major Cities</h3>
              <div className="row g-3">
                {CITIES.map((city, idx) => (
                  <div key={idx} className="col-md-4">
                    <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <h4 className="text-white h6 mb-1">{city.name}</h4>
                      <p className="text-white-50 small mb-1">{city.airports}</p>
                      <p className="text-primary fw-bold mb-0">From {city.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="text-white fw-bold mb-4">Service Types</h3>
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
              <h3 className="text-white fw-bold mb-3">Book Now</h3>
              <p className="text-white-50 small mb-4">
                Fill out our consultation form and we'll arrange your airport pickup.
              </p>
              <Link href="/get-free-consultation" className="btn w-100" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                Request Pickup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}