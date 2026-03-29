'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ServiceChargesPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">Service Charges</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Our service charges are transparent and competitive. We offer various packages to suit your needs.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Basic Package</h3>
            <p className="text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>
              University application, document processing, and basic support
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Premium Package</h3>
            <p className="text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Full admission service including airport pickup, accommodation assistance, and on-campus support
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">VIP Package</h3>
            <p className="text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Complete end-to-end service with personalized consultation and ongoing support throughout your studies
            </p>
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
