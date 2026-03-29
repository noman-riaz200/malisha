'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function JobBusinessChinaPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">Job & Business in China</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Explore job opportunities and business prospects in China with our comprehensive guidance services.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Job Opportunities</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ Job search assistance</li>
              <li className="mb-2">✓ Resume writing guidance</li>
              <li className="mb-2">✓ Interview preparation</li>
              <li className="mb-2">✓ Work visa assistance</li>
              <li className="mb-2">✓ Industry-specific job placement</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Business Opportunities</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ Business partnership facilitation</li>
              <li className="mb-2">✓ Market entry guidance</li>
              <li className="mb-2">✓ Company registration support</li>
              <li className="mb-2">✓ Investment consultation</li>
              <li className="mb-2">✓ Trade exhibition assistance</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Popular Industries</h3>
            <div className="d-flex flex-wrap gap-2">
              {['Technology', 'Manufacturing', 'E-commerce', 'Education', 'Healthcare', 'Finance', 'Tourism', 'Import/Export'].map((industry) => (
                <span 
                  key={industry}
                  className="px-3 py-1 rounded-pill"
                  style={{ backgroundColor: 'rgba(249,115,22,0.2)', color: '#f97316' }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <Link href="/contact" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
              Get Consultation
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
