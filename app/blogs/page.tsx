'use client';
// =============================================================================
// app/blogs/page.tsx
// Blog listing page showing all latest updates and news
// =============================================================================

import Link from 'next/link';

export const dynamic = 'force-dynamic';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Scholarship Opportunities for International Students 2024',
    date: 'March 15, 2024',
    author: 'Edupro Team',
    excerpt: 'Discover the latest scholarship programs available for international students studying in China. We have compiled a comprehensive list of opportunities...',
    content: 'Discover the latest scholarship programs available for international students studying in China. We have compiled a comprehensive list of opportunities including full tuition waivers, accommodation allowances, and monthly stipends. These scholarships are available for undergraduate, graduate, and doctoral programs across various fields of study.',
    image: '/images/Sozhou.jpg',
    category: 'Scholarship',
  },
  {
    id: 2,
    title: 'New University Partnerships Announced',
    date: 'March 10, 2024',
    author: 'Edupro Team',
    excerpt: 'We are excited to announce new partnerships with top Chinese universities, expanding our network to provide more opportunities for students...',
    content: 'We are excited to announce new partnerships with top Chinese universities, expanding our network to provide more opportunities for students. This year, we have added 15 new universities to our partnership program, including several top-ranked institutions in engineering, medicine, and business.',
    image: '/images/Shanghai Jiao Tong.jpg',
    category: 'Partnership',
  },
  {
    id: 3,
    title: 'Education Expo 2024: Registration Now Open',
    date: 'March 5, 2024',
    author: 'Edupro Team',
    excerpt: 'Join us at the biggest education expo in Asia and explore your future study opportunities. Meet university representatives from over 100 institutions...',
    content: 'Join us at the biggest education expo in Asia and explore your future study opportunities. Meet university representatives from over 100 institutions, attend live seminars about application processes, and get on-the-spot admissions decisions.',
    image: '/images/NINGBO.png',
    category: 'Event',
  },
  {
    id: 4,
    title: 'Student Success Stories: From Application to Graduation',
    date: 'February 28, 2024',
    author: 'Edupro Team',
    excerpt: 'Read inspiring stories from our students who achieved their dreams in China. From application to graduation, follow their journey...',
    content: 'Read inspiring stories from our students who achieved their dreams in China. From application to graduation, follow their journey and learn how they overcame challenges to succeed in their chosen fields.',
    image: '/images/Wuhan.jpg',
    category: 'Success Story',
  },
  {
    id: 5,
    title: 'Complete Guide to Student Visa Application',
    date: 'February 20, 2024',
    author: 'Edupro Team',
    excerpt: 'A comprehensive guide to applying for a Chinese student visa. Learn about the required documents, interview tips, and common mistakes to avoid...',
    content: 'A comprehensive guide to applying for a Chinese student visa. Learn about the required documents, interview tips, and common mistakes to avoid. This guide covers everything from initial application to visa approval.',
    image: '/images/CHANGZHOU.jpg',
    category: 'Guide',
  },
  {
    id: 6,
    title: 'Top 10 Universities in China for Engineering',
    date: 'February 15, 2024',
    author: 'Edupro Team',
    excerpt: 'Discover the best Chinese universities for engineering studies. Our ranking includes detailed information about programs, faculty, and research opportunities...',
    content: 'Discover the best Chinese universities for engineering studies. Our ranking includes detailed information about programs, faculty, and research opportunities. From civil engineering to computer science, find the perfect program for your career goals.',
    image: '/images/QINGHAI PROVINCE.jpg',
    category: 'Ranking',
  },
];

export default function BlogsPage() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5"
        style={{ 
          backgroundColor: '#0d9488',
          paddingTop: '100px'
        }}
      >
        <div className="container py-4">
          <div className="text-center">
            <h1 
              className="fw-bold mb-3"
              style={{ color: '#ffffff', fontSize: '2.5rem' }}
            >
              Latest Updates & Blogs
            </h1>
            <p 
              className="mb-0"
              style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}
            >
              Stay informed with the latest news, tips, and stories from Edupro
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-4">
          <div className="row g-4">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <div 
                  className="card h-100 border-0"
                  style={{ 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Post Image */}
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/Sozhou.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span 
                        className="px-2 py-1"
                        style={{ 
                          backgroundColor: '#0d9488', 
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}
                      >
                        {post.category}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {post.date}
                      </span>
                    </div>
                    
                    <h5 
                      className="fw-bold mb-2"
                      style={{ 
                        color: '#1e293b', 
                        fontSize: '1.1rem',
                        lineHeight: '1.4'
                      }}
                    >
                      {post.title}
                    </h5>
                    
                    <p 
                      className="mb-3"
                      style={{ 
                        color: '#64748b', 
                        fontSize: '0.9rem',
                        lineHeight: '1.6'
                      }}
                    >
                      {post.excerpt}
                    </p>
                    
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle me-2"
                        style={{
                          width: '30px',
                          height: '30px',
                          backgroundColor: '#e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748b',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}
                      >
                        {post.author.charAt(0)}
                      </div>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {post.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-5">
            <button 
              className="btn btn-lg px-5 py-3"
              style={{
                backgroundColor: '#0d9488',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div 
            className="p-5 text-center"
            style={{ 
              backgroundColor: '#f0fdfa',
              borderRadius: '16px',
              border: '1px solid #0d9488'
            }}
          >
            <h3 className="fw-bold mb-3" style={{ color: '#1e293b' }}>
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4" style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>
              Get the latest updates, news, and tips delivered directly to your inbox.
            </p>
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="form-control py-3"
                    style={{ 
                      borderRadius: '8px 0 0 8px',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                  <button 
                    className="btn px-4"
                    style={{
                      backgroundColor: '#0d9488',
                      color: '#ffffff',
                      borderRadius: '0 8px 8px 0',
                      fontWeight: '600'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
