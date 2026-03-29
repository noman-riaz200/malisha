'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AirportPickupServicePage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">Airport Pickup Service</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            We provide convenient airport pickup services for international students arriving in China.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Our Services Include</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ Professional driver pickup</li>
              <li className="mb-2">✓ Flight tracking</li>
              <li className="mb-2">✓ 24/7 availability</li>
              <li className="mb-2">✓ Comfortable vehicles</li>
              <li className="mb-2">✓ Assistance with luggage</li>
              <li className="mb-2">✓ Drop-off at accommodation or university</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Major Airports We Serve</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ Beijing Capital International Airport</li>
              <li className="mb-2">✓ Shanghai Pudong International Airport</li>
              <li className="mb-2">✓ Guangzhou Baiyun International Airport</li>
              <li className="mb-2">✓ Shenzhen Bao'an International Airport</li>
              <li className="mb-2">✓ And many more...</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <Link href="/contact" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
              Book Pickup
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
