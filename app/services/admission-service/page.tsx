'use client';

import Link from 'next/link';

export default function AdmissionServicePage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">Admission Service</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Our professional admission service helps you navigate the application process for Chinese universities.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">What We Offer</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ University selection guidance</li>
              <li className="mb-2">✓ Application document preparation</li>
              <li className="mb-2">✓ Application submission</li>
              <li className="mb-2">✓ Follow-up with universities</li>
              <li className="mb-2">✓ Admission letter tracking</li>
              <li className="mb-2">✓ Visa application assistance</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <Link href="/get-free-consultation" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
              Get Free Consultation
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
