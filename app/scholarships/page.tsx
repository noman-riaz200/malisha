'use client';
// =============================================================================
// app/scholarships/page.tsx
// Scholarships page - List of available scholarships for international students
// =============================================================================

import Link from 'next/link';
import { useState } from 'react';
import ClientApplyButton from '@/components/ClientApplyButton';

export const dynamic = 'force-dynamic';

const SCHOLARSHIPS = [
  {
    id: 1,
    name: 'Chinese Government Scholarship (CGS)',
    provider: 'Chinese Government',
    level: 'Full Scholarship',
    coverage: ['Tuition', 'Accommodation', 'Living Allowance', 'Medical Insurance'],
    amount: '$5,000 - $10,000/year',
    eligibility: 'International students with excellent academic records',
    deadline: 'April 30, 2025',
    requirements: ['Academic transcripts', 'Passport copy', 'Study plan', 'Recommendation letters'],
    category: 'Government'
  },
  {
    id: 2,
    name: 'Confucius Institute Scholarship',
    provider: 'Confucius Institute Headquarters',
    level: 'Full Scholarship',
    coverage: ['Tuition', 'Accommodation', 'Living Allowance', 'Books'],
    amount: '$4,000 - $8,000/year',
    eligibility: 'Students applying for Chinese language programs',
    deadline: 'March 31, 2025',
    requirements: ['HSK scores', 'Academic transcripts', 'Personal statement'],
    category: 'Language'
  },
  {
    id: 3,
    name: 'Beijing Government Scholarship',
    provider: 'Beijing Municipal Government',
    level: 'Partial Scholarship',
    coverage: ['Tuition', 'Accommodation'],
    amount: '$3,000 - $5,000/year',
    eligibility: 'Students applying to Beijing universities',
    deadline: 'May 15, 2025',
    requirements: ['Application form', 'Academic records', 'ID photo'],
    category: 'Local Government'
  },
  {
    id: 4,
    name: 'Shanghai City Government Scholarship',
    provider: 'Shanghai Municipal Government',
    level: 'Full & Partial',
    coverage: ['Tuition', 'Living Allowance'],
    amount: '$4,000 - $8,000/year',
    eligibility: 'Undergraduate and graduate students',
    deadline: 'April 15, 2025',
    requirements: ['Passport', 'Academic transcripts', 'Medical exam'],
    category: 'Local Government'
  },
  {
    id: 5,
    name: 'Zhejiang Provincial Scholarship',
    provider: 'Zhejiang Province',
    level: 'Full Scholarship',
    coverage: ['Tuition', 'Accommodation', 'Monthly stipend'],
    amount: '$5,000 - $7,000/year',
    eligibility: 'Students applying to Zhejiang universities',
    deadline: 'May 1, 2025',
    requirements: ['Application letter', 'Transcripts', 'Police clearance'],
    category: 'Local Government'
  },
  {
    id: 6,
    name: 'University Presidential Scholarship',
    provider: 'Various Universities',
    level: 'Full & Partial',
    coverage: ['Tuition Discount', 'Accommodation'],
    amount: '$2,000 - $10,000/year',
    eligibility: 'High-achieving international students',
    deadline: 'Varies by university',
    requirements: ['Academic excellence', 'Additional criteria per university'],
    category: 'University'
  },
  {
    id: 7,
    name: 'Belt and Road Scholarship',
    provider: 'Chinese Government',
    level: 'Full Scholarship',
    coverage: ['Tuition', 'Accommodation', 'Living Allowance', 'Travel'],
    amount: '$8,000 - $12,000/year',
    eligibility: 'Students from Belt and Road countries',
    deadline: 'March 31, 2025',
    requirements: ['Country eligibility', 'Academic records', 'Nominations'],
    category: 'Government'
  },
  {
    id: 8,
    name: 'Asian Youth Scholarship',
    provider: 'Asia Development Bank',
    level: 'Partial Scholarship',
    coverage: ['Tuition', 'Living Allowance'],
    amount: '$3,000 - $5,000/year',
    eligible: 'Undergraduate students from Asian countries',
    deadline: 'June 1, 2025',
    requirements: ['Financial need', 'Academic potential', 'Community involvement'],
    category: 'International'
  }
];

const SCHOLARSHIP_TYPES = ['All', 'Government', 'University', 'Local Government', 'Language', 'International'];

export default function ScholarshipsPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScholarships = SCHOLARSHIPS.filter(scholarship => {
    const matchesType = selectedType === 'All' || scholarship.category === selectedType;
    const matchesSearch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 position-relative d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)',
          minHeight: '50vh',
          marginTop: '76px'
        }}
      >
        <div className="container text-center text-white py-5">
          <h1 className="display-3 fw-bold mb-4">Scholarships</h1>
          <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Discover scholarship opportunities to fund your education in China. 
            We help students find and apply for financial aid.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {SCHOLARSHIP_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships List */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="col-lg-6">
                <div className="p-4 h-100 rounded-4 border" style={{ borderColor: '#e2e8f0 !important' }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge" style={{ backgroundColor: '#0d2137' }}>
                      {scholarship.category}
                    </span>
                    <span className="badge bg-success">{scholarship.level}</span>
                  </div>
                  <h3 className="h4 fw-bold mb-2 text-dark">{scholarship.name}</h3>
                  <p className="text-muted small mb-3">{scholarship.provider}</p>
                  <p className="text-secondary mb-3">{scholarship.eligibility}</p>
                  
                  <div className="mb-3">
                    <p className="small fw-bold text-dark mb-1">Coverage:</p>
                    <div className="d-flex flex-wrap gap-1">
                      {scholarship.coverage.map((item, idx) => (
                        <span key={idx} className="badge bg-light text-dark">{item}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="row g-2 mb-3 small">
                    <div className="col-6">
                      <i className="bi bi-currency-dollar me-2 text-primary"></i>
                      <span className="text-muted">{scholarship.amount}</span>
                    </div>
                    <div className="col-6">
                      <i className="bi bi-calendar me-2 text-primary"></i>
                      <span className="text-muted">Deadline: {scholarship.deadline}</span>
                    </div>
                  </div>
                  
                  <ClientApplyButton 
                    buttonText="Apply Now"
                    className="btn btn-sm btn-outline-primary"
                  />
                </div>
              </div>
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-trophy fs-1 text-muted mb-3 d-block"></i>
              <h3 className="h5 text-muted">No scholarships found</h3>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">How to Apply for Scholarships</h2>
          <div className="row g-4">
            {[
              { step: '1', title: 'Research', description: 'Explore our scholarship listings and find ones matching your profile.', icon: 'bi-search' },
              { step: '2', title: 'Prepare', description: 'Gather required documents including transcripts, passport, and recommendation letters.', icon: 'bi-file-earmark-check' },
              { step: '3', title: 'Apply', description: 'Submit your application through our platform or directly to the scholarship provider.', icon: 'bi-send' },
              { step: '4', title: 'Follow Up', description: 'Track your application status and respond to any additional requirements.', icon: 'bi-clock-history' }
            ].map((item, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center h-100 p-4">
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      backgroundColor: '#0d2137',
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.step}
                  </div>
                  <i className={`bi ${item.icon} fs-3 d-block mb-2 text-primary`}></i>
                  <h3 className="h5 fw-bold mb-2 text-dark">{item.title}</h3>
                  <p className="text-secondary small mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Need Help Finding Scholarships?</h2>
          <p className="mb-4 opacity-75">Our team can help you identify the best scholarships for your profile.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/get-free-consultation" className="btn btn-light btn-lg px-4">
              Get Free Consultation
            </Link>
            <Link href="/contact" className="btn btn-outline-light btn-lg px-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}