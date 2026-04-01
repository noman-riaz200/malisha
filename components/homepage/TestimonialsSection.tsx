'use client';

import React, { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ambr. Dr. Rashid Ali',
    title: 'The Former Ambassador of the Republic of China',
    description: 'To facilitate better services for our students, we have updated our service charge structure to be more transparent and competitive.',
    image: '/images/profile-placeholder.svg',
  },
  {
    id: 2,
    name: 'Linda Chen',
    title: 'Student',
    description: 'The admission service was exceptional. They guided me through every step of the application process and helped me secure a spot at my dream university.',
    image: '/images/profile-placeholder.svg',
  },
  {
    id: 3,
    name: 'Li Yan',
    title: 'Parent',
    description: 'As a parent, I was worried about my child studying abroad. The support and communication from the team made the entire process smooth and stress-free.',
    image: '/images/profile-placeholder.svg',
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    title: 'Education Consultant',
    description: 'Their comprehensive approach to international student services sets them apart. The quality of support and guidance is truly commendable.',
    image: '/images/profile-placeholder.svg',
  },
  {
    id: 5,
    name: 'Mohammed Al-Rashid',
    title: 'Graduate Student',
    description: 'From airport pickup to accommodation, every service was perfectly arranged. I felt welcomed and supported throughout my journey in China.',
    image: '/images/profile-placeholder.svg',
  },
  {
    id: 6,
    name: 'Emily Watson',
    title: 'Academic Advisor',
    description: 'The Chinese language foundation course was instrumental in helping students adapt to their new environment. Highly recommended for all international students.',
    image: '/images/profile-placeholder.svg',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 3 >= TESTIMONIALS.length ? 0 : prevIndex + 3
        );
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get current 3 testimonials to display
  const visibleTestimonials = TESTIMONIALS.slice(currentIndex, currentIndex + 3);
  
  // If we don't have 3 testimonials, wrap around
  const displayTestimonials = visibleTestimonials.length < 3
    ? [...visibleTestimonials, ...TESTIMONIALS.slice(0, 3 - visibleTestimonials.length)]
    : visibleTestimonials;

  return (
<section className="py-20 bg-gray-50" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            What our Partner Saying
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative overflow-hidden">
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${
              isAnimating ? 'opacity-0 transform translate-x-full' : 'opacity-100 transform translate-x-0'
            }`}
          >
            {displayTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${currentIndex}-${index}`}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Profile Section */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-4 border-teal-100">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/profile-placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-teal-600 text-sm font-medium">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.description}"
                </p>

                {/* Quote Icon */}
                <div className="mt-6 flex justify-end">
                  <svg 
                    className="w-10 h-10 text-teal-100" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: Math.ceil(TESTIMONIALS.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index * 3);
                  setIsAnimating(false);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-teal-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
