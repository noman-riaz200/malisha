'use client';
// =============================================================================
// app/gallery/page.tsx
// Gallery page showcasing university campuses, events, and student activities
// =============================================================================

import { useState } from 'react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/images/Shanghai Jiao Tong.jpg',
    alt: 'Shanghai Jiao Tong University',
    category: 'Universities',
    title: 'Shanghai Jiao Tong University',
    description: 'One of China\'s oldest and most prestigious universities',
  },
  {
    id: 2,
    src: '/images/NINGBO.png',
    alt: 'Ningbo City',
    category: 'Cities',
    title: 'Ningbo City',
    description: 'A beautiful coastal city in Zhejiang Province',
  },
  {
    id: 3,
    src: '/images/Wuhan.jpg',
    alt: 'Wuhan City',
    category: 'Cities',
    title: 'Wuhan City',
    description: 'The capital of Hubei Province with rich history',
  },
  {
    id: 4,
    src: '/images/CHANGZHOU.jpg',
    alt: 'Changzhou City',
    category: 'Cities',
    title: 'Changzhou City',
    description: 'A modern city in the Yangtze River Delta',
  },
  {
    id: 5,
    src: '/images/QINGHAI PROVINCE.jpg',
    alt: 'Qinghai Province',
    category: 'Nature',
    title: 'Qinghai Province',
    description: 'Stunning plateau landscapes and natural beauty',
  },
  {
    id: 6,
    src: '/images/YANGZHOU.jpg',
    alt: 'Yangzhou City',
    category: 'Cities',
    title: 'Yangzhou City',
    description: 'A historic city known for its gardens and canals',
  },
  {
    id: 7,
    src: '/images/XINXIANG.jpg',
    alt: 'Xinxiang City',
    category: 'Cities',
    title: 'Xinxiang City',
    description: 'A city in Henan Province with ancient heritage',
  },
  {
    id: 8,
    src: '/images/Suzhou.jpg',
    alt: 'Suzhou City',
    category: 'Cities',
    title: 'Suzhou City',
    description: 'Famous for its classical gardens and silk',
  },
  {
    id: 9,
    src: '/images/banner.png',
    alt: 'Education Expo',
    category: 'Events',
    title: 'Education Expo',
    description: 'Annual education exhibition and fair',
  },
  {
    id: 10,
    src: '/images/Shanghai Jiao Tong.jpg',
    alt: 'Campus Life',
    category: 'Campus',
    title: 'Campus Life',
    description: 'Vibrant student life on Chinese campuses',
  },
  {
    id: 11,
    src: '/images/NINGBO.png',
    alt: 'Student Activities',
    category: 'Students',
    title: 'Student Activities',
    description: 'International students participating in cultural events',
  },
  {
    id: 12,
    src: '/images/Wuhan.jpg',
    alt: 'Graduation Ceremony',
    category: 'Events',
    title: 'Graduation Ceremony',
    description: 'Celebrating student achievements',
  },
];

const CATEGORIES = ['All', 'Universities', 'Cities', 'Nature', 'Events', 'Campus', 'Students'];

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5"
        style={{ 
          backgroundColor: '#0d2137',
          marginTop: '80px',
          paddingTop: '60px',
          paddingBottom: '60px',
          backgroundImage: 'linear-gradient(135deg, #0d2137 0%, #1a3a5c 100%)',
        }}
      >
        <div className="container py-4">
          <div className="text-center">
            <h1 
              className="fw-bold mb-3"
              style={{ color: '#ffffff', fontSize: '2.5rem' }}
            >
              Photo Gallery
            </h1>
            <p 
              className="mb-0 mx-auto"
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '600px' }}
            >
              Explore our collection of photos showcasing Chinese universities, cities, events, and student life
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-4">
          {/* Category Filter */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="btn px-4 py-2"
                style={{
                  backgroundColor: activeCategory === category ? '#f97316' : '#ffffff',
                  color: activeCategory === category ? '#ffffff' : '#1e293b',
                  border: activeCategory === category ? 'none' : '1px solid #e2e8f0',
                  borderRadius: '25px',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === category ? '0 4px 15px rgba(249, 115, 22, 0.3)' : 'none',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="row g-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                <div 
                  className="card border-0 h-100"
                  style={{ 
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onClick={() => setSelectedImage(item)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Image */}
                  <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/banner.png';
                      }}
                    />
                    {/* Overlay */}
                    <div 
                      className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <i className="bi bi-zoom-in text-white fs-2"></i>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span 
                        className="px-2 py-1"
                        style={{ 
                          backgroundColor: '#f97316', 
                          color: '#ffffff',
                          fontSize: '0.7rem',
                          borderRadius: '4px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    
                    <h5 
                      className="fw-bold mb-2"
                      style={{ 
                        color: '#1e293b', 
                        fontSize: '1.1rem',
                      }}
                    >
                      {item.title}
                    </h5>
                    
                    <p 
                      className="mb-0"
                      style={{ 
                        color: '#64748b', 
                        fontSize: '0.85rem',
                        lineHeight: '1.5'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-images fs-1" style={{ color: '#cbd5e1' }}></i>
              <p className="mt-3" style={{ color: '#64748b' }}>
                No photos found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-4">
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-4 mb-md-0">
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                }}
              >
                <h2 className="fw-bold mb-1" style={{ color: '#f97316', fontSize: '2.5rem' }}>50+</h2>
                <p className="mb-0" style={{ color: '#64748b', fontSize: '0.9rem' }}>Partner Universities</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4 mb-md-0">
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                }}
              >
                <h2 className="fw-bold mb-1" style={{ color: '#f97316', fontSize: '2.5rem' }}>5000+</h2>
                <p className="mb-0" style={{ color: '#64748b', fontSize: '0.9rem' }}>Students Placed</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                }}
              >
                <h2 className="fw-bold mb-1" style={{ color: '#f97316', fontSize: '2.5rem' }}>100+</h2>
                <p className="mb-0" style={{ color: '#64748b', fontSize: '0.9rem' }}>Events Organized</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                }}
              >
                <h2 className="fw-bold mb-1" style={{ color: '#f97316', fontSize: '2.5rem' }}>20+</h2>
                <p className="mb-0" style={{ color: '#64748b', fontSize: '0.9rem' }}>Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="position-fixed w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            top: 0,
            left: 0,
          }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="btn position-absolute"
            style={{
              top: '20px',
              right: '20px',
              color: '#ffffff',
              fontSize: '2rem',
              zIndex: 10000,
            }}
            onClick={() => setSelectedImage(null)}
          >
            <i className="bi bi-x-lg"></i>
          </button>

          {/* Image Container */}
          <div 
            className="text-center px-4"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                borderRadius: '12px',
                objectFit: 'contain',
              }}
            />
            <div className="mt-4">
              <span 
                className="px-3 py-1 d-inline-block mb-2"
                style={{ 
                  backgroundColor: '#f97316', 
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                {selectedImage.category}
              </span>
              <h3 className="fw-bold mb-2" style={{ color: '#ffffff' }}>
                {selectedImage.title}
              </h3>
              <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {selectedImage.description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className="btn position-absolute"
            style={{
              left: '20px',
              color: '#ffffff',
              fontSize: '2rem',
            }}
            onClick={() => {
              const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
              setSelectedImage(filteredItems[prevIndex]);
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn position-absolute"
            style={{
              right: '20px',
              color: '#ffffff',
              fontSize: '2rem',
            }}
            onClick={() => {
              const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
              const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(filteredItems[nextIndex]);
            }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: '#f97316' }}>
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-2" style={{ color: '#ffffff' }}>
                Ready to Explore Chinese Universities?
              </h2>
              <p className="mb-0" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Let us help you find the perfect university and program for your future
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a 
                href="/universities"
                className="btn px-4 py-3"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#f97316',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Browse Universities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .gallery-item:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
