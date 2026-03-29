'use client';
// =============================================================================
// app/programs/page.tsx
// Programs page - Listing all available academic programs
// =============================================================================

import Link from 'next/link';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

const PROGRAMS = [
  {
    id: 1,
    name: 'Computer Science & Technology',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 45,
    description: 'Study cutting-edge computer science at top Chinese universities with state-of-the-art labs and research facilities.',
    category: 'Engineering',
    tuition: '$2,500 - $5,000/year'
  },
  {
    id: 2,
    name: 'Business Administration (MBA)',
    degree: 'Master',
    duration: '2 Years',
    language: 'English',
    universities: 30,
    description: 'Earn a prestigious MBA degree from AACSB accredited business schools in China.',
    category: 'Business',
    tuition: '$4,000 - $10,000/year'
  },
  {
    id: 3,
    name: 'Medicine (MBBS)',
    degree: 'Bachelor',
    duration: '6 Years',
    language: 'English',
    universities: 25,
    description: 'Study medicine at WHO recognized medical universities in China with extensive clinical training.',
    category: 'Medicine',
    tuition: '$3,000 - $6,000/year'
  },
  {
    id: 4,
    name: 'Engineering (Various Specializations)',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 50,
    description: 'Choose from civil, mechanical, electrical, chemical, and other engineering specializations.',
    category: 'Engineering',
    tuition: '$2,000 - $5,000/year'
  },
  {
    id: 5,
    name: 'Chinese Language & Literature',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'Chinese',
    universities: 40,
    description: 'Immerse yourself in Chinese language and culture at prestigious humanities departments.',
    category: 'Humanities',
    tuition: '$1,500 - $3,000/year'
  },
  {
    id: 6,
    name: 'Economics & Finance',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 35,
    description: 'Study economics and finance at top universities with strong industry connections.',
    category: 'Business',
    tuition: '$2,500 - $5,500/year'
  },
  {
    id: 7,
    name: 'Architecture',
    degree: 'Bachelor/Master',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 20,
    description: 'Learn from renowned architects and designers at top Chinese architecture schools.',
    category: 'Design',
    tuition: '$2,500 - $4,500/year'
  },
  {
    id: 8,
    name: 'Law',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 30,
    description: 'Study Chinese law and international law at prestigious law schools.',
    category: 'Law',
    tuition: '$2,000 - $4,000/year'
  },
  {
    id: 9,
    name: 'Electrical & Electronic Engineering',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 48,
    description: 'Master electrical and electronic engineering with hands-on laboratory experience.',
    category: 'Engineering',
    tuition: '$2,500 - $5,000/year'
  },
  {
    id: 10,
    name: 'Data Science & Artificial Intelligence',
    degree: 'Master/PhD',
    duration: '2-3 Years',
    language: 'English',
    universities: 25,
    description: 'Be part of the AI revolution at cutting-edge research laboratories.',
    category: 'Engineering',
    tuition: '$3,000 - $6,000/year'
  },
  {
    id: 11,
    name: 'Pharmacy & Pharmaceutical Sciences',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 22,
    description: 'Study pharmacy at modern research facilities with industry partnerships.',
    category: 'Medicine',
    tuition: '$2,500 - $4,500/year'
  },
  {
    id: 12,
    name: 'International Relations & Politics',
    degree: 'Bachelor/Master/PhD',
    duration: '4 Years (Bachelor) / 2-3 Years (Master)',
    language: 'English/Chinese',
    universities: 28,
    description: 'Understand global politics and international relations from a Chinese perspective.',
    category: 'Social Sciences',
    tuition: '$2,000 - $4,000/year'
  }
];

const CATEGORIES = ['All', 'Engineering', 'Business', 'Medicine', 'Humanities', 'Design', 'Law', 'Social Sciences'];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = PROGRAMS.filter(program => {
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          <h1 className="display-3 fw-bold mb-4">Academic Programs</h1>
          <p className="lead mb-0" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Explore hundreds of programs at top Chinese universities. Find your perfect course and start your journey today.
          </p>
        </div>
      </section>

      {/* Filters Section */}
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
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="col-lg-6">
                <div className="p-4 h-100 rounded-4 border" style={{ borderColor: '#e2e8f0 !important' }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge" style={{ backgroundColor: '#0d2137' }}>
                      {program.category}
                    </span>
                    <span className="text-muted small">
                      {program.universities} Universities
                    </span>
                  </div>
                  <h3 className="h4 fw-bold mb-2 text-dark">{program.name}</h3>
                  <p className="text-secondary mb-3">{program.description}</p>
                  <div className="row g-2 mb-3 small">
                    <div className="col-6">
                      <i className="bi bi-mortarboard me-2"></i>
                      <span className="text-muted">{program.degree}</span>
                    </div>
                    <div className="col-6">
                      <i className="bi bi-clock me-2"></i>
                      <span className="text-muted">{program.duration}</span>
                    </div>
                    <div className="col-6">
                      <i className="bi bi-translate me-2"></i>
                      <span className="text-muted">{program.language}</span>
                    </div>
                    <div className="col-6">
                      <i className="bi bi-currency-dollar me-2"></i>
                      <span className="text-muted">{program.tuition}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/universities?program=${encodeURIComponent(program.name)}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Universities <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
              <h3 className="h5 text-muted">No programs found</h3>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #1a365d 100%)' }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Need Help Finding the Right Program?</h2>
          <p className="mb-4 opacity-75">Our education experts can help you choose the perfect program based on your background and goals.</p>
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