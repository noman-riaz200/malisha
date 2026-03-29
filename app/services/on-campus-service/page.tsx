'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function OnCampusServicePage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">On Campus Service</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            We provide comprehensive on-campus support services to help you settle in and succeed in your studies.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Student Support Services</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ Accommodation assistance</li>
              <li className="mb-2">✓ University registration support</li>
              <li className="mb-2">✓ Bank account opening</li>
              <li className="mb-2">✓ Phone SIM card registration</li>
              <li className="mb-2">✓ Medical insurance guidance</li>
              <li className="mb-2">✓ Student visa extension</li>
              <li className="mb-2">✓ Local transportation assistance</li>
              <li className="mb-2">✓ Cultural adaptation support</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Partner Universities</h3>
            <p className="text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>
              We have dedicated support staff at our partner universities across China to assist you throughout your academic journey.
            </p>
          </div>
          
          <div className="mt-4">
            <Link href="/contact" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
              Get Support
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
