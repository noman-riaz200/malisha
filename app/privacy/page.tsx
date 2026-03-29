'use client';
// =============================================================================
// app/privacy/page.tsx
// Privacy Policy page
// =============================================================================

export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
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
          <h1 className="display-3 fw-bold mb-4">Privacy Policy</h1>
          <p className="lead mb-0" style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Your privacy is important to us. This policy explains how we collect and use your information.
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
                  <h2 className="h4 fw-bold mb-3 text-dark">1. Information We Collect</h2>
                  <p className="text-secondary">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="text-secondary ps-4">
                    <li>Personal information (name, email, phone number)</li>
                    <li>Academic background and education history</li>
                    <li>Passport and identification information</li>
                    <li>Application materials and documents</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">2. How We Use Your Information</h2>
                  <p className="text-secondary">
                    We use the information we collect to:
                  </p>
                  <ul className="text-secondary ps-4">
                    <li>Process your application to universities</li>
                    <li>Communicate with you about programs and services</li>
                    <li>Provide educational counseling and support</li>
                    <li>Improve our services and user experience</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">3. Information Sharing</h2>
                  <p className="text-secondary">
                    We may share your information with:
                  </p>
                  <ul className="text-secondary ps-4">
                    <li>Chinese universities and educational institutions</li>
                    <li>Government agencies (for visa and immigration purposes)</li>
                    <li>Service providers who assist in our operations</li>
                    <li>Legal and regulatory authorities when required</li>
                  </ul>
                  <p className="text-secondary mt-3">
                    We do not sell or rent your personal information to third parties for marketing purposes.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">4. Data Security</h2>
                  <p className="text-secondary">
                    We implement appropriate technical and organizational measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                    over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">5. Data Retention</h2>
                  <p className="text-secondary">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                    privacy policy, unless a longer retention period is required by law. You may request deletion of 
                    your data at any time by contacting us.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">6. Your Rights</h2>
                  <p className="text-secondary">
                    You have the right to:
                  </p>
                  <ul className="text-secondary ps-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your data</li>
                    <li>Request data portability</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">7. Cookies and Tracking</h2>
                  <p className="text-secondary">
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience. 
                    You can control cookies through your browser settings. Disabling cookies may affect the functionality 
                    of some parts of our website.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="h4 fw-bold mb-3 text-dark">8. Changes to This Policy</h2>
                  <p className="text-secondary">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting 
                    the new policy on this page and updating the "last updated" date at the top of this policy.
                  </p>
                </div>

                <div className="mb-0">
                  <h2 className="h4 fw-bold mb-3 text-dark">9. Contact Us</h2>
                  <p className="text-secondary">
                    If you have any questions about this privacy policy or our data practices, please contact us at 
                    support@malishaedu.com or through our contact page.
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