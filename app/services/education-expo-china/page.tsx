'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function EducationExpoChinaPage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">Education Expo in China</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Join our education expos across China to explore opportunities and meet university representatives.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Upcoming Expos</h3>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: 'rgba(249,115,22,0.1)', borderRadius: '8px' }}>
                  <h5 className="fw-bold text-white">Beijing Education Expo</h5>
                  <p className="mb-0 text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>March 2026</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: 'rgba(249,115,22,0.1)', borderRadius: '8px' }}>
                  <h5 className="fw-bold text-white">Shanghai Education Fair</h5>
                  <p className="mb-0 text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>April 2026</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: 'rgba(249,115,22,0.1)', borderRadius: '8px' }}>
                  <h5 className="fw-bold text-white">Guangzhou Education Expo</h5>
                  <p className="mb-0 text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>May 2026</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="p-3" style={{ backgroundColor: 'rgba(249,115,22,0.1)', borderRadius: '8px' }}>
                  <h5 className="fw-bold text-white">Shenzhen Education Fair</h5>
                  <p className="mb-0 text-light" style={{ color: 'rgba(255,255,255,0.7)' }}>June 2026</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Link href="/contact" className="btn rounded-pill px-4 py-2" style={{ backgroundColor: '#f97316', color: '#ffffff' }}>
              Register Now
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
