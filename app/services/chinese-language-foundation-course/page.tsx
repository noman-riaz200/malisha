'use client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ChineseLanguageFoundationCoursePage() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#0d2137', paddingTop: '80px' }}>
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/services" className="text-decoration-none" style={{ color: '#f97316' }}>
            ← Back to Services
          </Link>
        </div>
        
        <h1 className="display-4 fw-bold text-white mb-4">Chinese Language and Foundation Course</h1>
        
        <div className="card border-0 p-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
          <p className="text-light" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Prepare for your studies in China with our comprehensive Chinese language and foundation courses.
          </p>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Language Programs</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ HSK 1-6 preparation courses</li>
              <li className="mb-2">✓ Spoken Chinese (Mandarin)</li>
              <li className="mb-2">✓ Business Chinese</li>
              <li className="mb-2">✓ Medical Chinese</li>
              <li className="mb-2">✓ Technical Chinese</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="h4 fw-bold text-white mb-3">Foundation Programs</h3>
            <ul className="text-light" style={{ color: 'rgba(255,255,255,0.7)', listStyle: 'none', padding: 0 }}>
              <li className="mb-2">✓ Science Foundation</li>
              <li className="mb-2">✓ Engineering Foundation</li>
              <li className="mb-2">✓ Business Foundation</li>
              <li className="mb-2">✓ Medicine Foundation</li>
            </ul>
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
