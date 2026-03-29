'use client';
// =============================================================================
// app/terms/page.tsx
// Terms of Service page
// =============================================================================

export const dynamic = 'force-dynamic';

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)',
          minHeight: '40vh',
          marginTop: '76px'
        }}
      >
        <div className="container text-center text-white py-5">
          <h1 className="display-3 fw-bold mb-4">Terms of Service</h1>
          <p className="lead mb-0" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Please read our terms of service carefully before using our website.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-4 bg-white rounded-4 shadow-sm">
                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">1. Acceptance of Terms</h2>
                  <p className="text-secondary">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by these terms, please do not use this service.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">2. Use License</h2>
                  <p className="text-secondary">
                    Permission is granted to temporarily use this website for personal, non-commercial transitory viewing only. 
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="text-secondary ps-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or public display</li>
                    <li>Transfer the materials to another person</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">3. Disclaimer</h2>
                  <p className="text-secondary">
                    The materials on this website are provided "as is". We make no warranties, expressed or implied, 
                    and hereby disclaim and negate all other warranties, including without limitation, implied warranties 
                    or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual 
                    property or other violation of rights.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">4. Limitations</h2>
                  <p className="text-secondary">
                    In no event shall Malisha Edu or its suppliers be liable for any damages (including, without limitation, 
                    damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                    to use the materials on our website.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">5. Accuracy of Materials</h2>
                  <p className="text-secondary">
                    The materials appearing on our website could include technical, typographical, or photographic errors. 
                    We do not warrant that any of the materials on its website are accurate, complete, or current. We may 
                    make changes to the materials contained on its website at any time without notice.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">6. Links</h2>
                  <p className="text-secondary">
                    Malisha Edu has not reviewed all of the sites linked to its website and is not responsible for the contents 
                    of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of 
                    any such linked website is at the user's own risk.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">7. Modifications</h2>
                  <p className="text-secondary">
                    We may revise these terms of service for its website at any time without notice. By using this website 
                    you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>

                <div className="mb-0">
                  <h2 className="h4 fw-bold mb-3 text-dark">8. Governing Law</h2>
                  <p className="text-secondary">
                    These terms and conditions are governed by and construed in accordance with the laws of China 
                    and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}