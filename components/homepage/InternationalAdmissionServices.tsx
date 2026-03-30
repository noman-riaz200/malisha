

'use client';

import React from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    id: 1,
    title: 'Service Charges',
    description: 'To facilitate better services for our students, we have updated our service charge.',
    image: '/images/Sozhou.jpg',
    link: '/services/service-charges',
  },
  {
    id: 2,
    title: 'Admission Service',
    description: 'Comprehensive admission assistance for international students applying to Chinese universities.',
    image: '/images/admission-service-image.png',
    link: '/services/admission-service',
  },
  {
    id: 3,
    title: 'Chinese Language and Foundation Course',
    description: 'Build a strong foundation in Chinese language and academic preparation.',
    image: '/images/chinese-language-image.png',
    link: '/services/chinese-language-foundation-course',
  },
  {
    id: 4,
    title: 'Education Expo in China',
    description: 'Connect with top Chinese universities at our exclusive education expos.',
    image: '/images/education-expo-china-image.png',
    link: '/services/education-expo-china',
  },
  {
    id: 5,
    title: 'Education Expo in Overseas',
    description: 'Explore global education opportunities at our international education expos.',
    image: '/images/education-expo-overseas-image.png',
    link: '/services/education-expo-overseas',
  },
  {
    id: 6,
    title: 'Airport Pickup Service',
    description: 'Convenient airport pickup service for new international students arriving in China.',
    image: '/images/airport-pickup-image.png',
    link: '/services/airport-pickup-service',
  },
];

export function InternationalAdmissionServices() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            International Student Admission Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore Our Comprehensive Services
          </p>
        </div>

        {/* Services Grid - 2 rows of 3 cards each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                {/* Service Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-teal-600 mb-3 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse More Services Button */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Browse More Services
          </Link>
        </div>
      </div>
    </section>
  );
}
