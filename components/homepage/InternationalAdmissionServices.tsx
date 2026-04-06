'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SERVICES = [
  {
    id: 1,
    service: 'Service1',
    title: 'Application Guidance',
    description: 'Get expert assistance with your university application process, from document preparation to submission and tracking.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
  },
  {
    id: 2,
    service: 'Service2',
    title: 'Visa Support',
    description: 'Complete guidance for student visa applications, including interview preparation and documentation review.',
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=400&h=250&fit=crop',
  },
  {
    id: 3,
    service: 'Service3',
    title: 'Accommodation',
    description: 'Find safe and comfortable housing options near your university with our trusted partner network.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop',
  },
  {
    id: 4,
    service: 'Service4',
    title: 'Airport Pickup',
    description: 'Pre-arranged airport transfer services to ensure a smooth arrival at your destination city.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop',
  },
  {
    id: 5,
    service: 'Service5',
    title: 'Orientation Program',
    description: 'Comprehensive orientation to help you adapt to the new environment, culture, and academic system.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
  },
  {
    id: 6,
    service: 'Service6',
    title: 'Career Services',
    description: 'Resume building, interview coaching, and job placement assistance for international students.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop',
  },
];

export function InternationalAdmissionServices() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            International Student Admission Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((item) => (
            <Link
              key={item.id}
              href="/services"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-blue-600 mb-1">{item.service}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}