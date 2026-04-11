import React, { Suspense } from 'react';

import { connectDB } from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import { HeroSection } from '@/components/homepage/HeroSection';
import { UniversityCardHomepage } from '@/components/homepage/UniversityCardHomepage';
import { FindUniversitySection } from '@/components/homepage/FindUniversitySection';
import { StudentAdmissionServicesSection } from '@/components/homepage/StudentAdmissionServicesSection';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';
import { LatestUpdatesSection } from '@/components/homepage/LatestUpdatesSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLatestUniversities() {
  await connectDB();
  
  const universities = await University.find({ isActive: true })
    .sort({ studentsEnrolled: -1 })
    .limit(8)
    .lean();
  
  return universities.map((uni: any) => ({
    ...uni,
    _id: uni._id.toString(),
  }));
}

function transformUniversityToCardData(uni: any) {
  const badges: string[] = [];
  if (uni.badges?.is211) badges.push('211 Projects');
  if (uni.badges?.is985) badges.push('985 Projects');
  if (uni.badges?.isDoubleFirstClass) badges.push('Double First Class');

  return {
    name: uni.name,
    rank: uni.worldRank || 'Not Ranked',
    location: `${uni.locationObj?.city || uni.location || 'N/A'}, ${uni.locationObj?.country || 'China'}`,
    students: `${(uni.studentsEnrolled || 0).toLocaleString()}+ Students Enrolled`,
    badges,
    countdown: null,
    image: uni.logo,
    slug: uni.slug,
  };
}

export default async function Homepage() {
  const universities = await getLatestUniversities();
  const cardData = universities.map(transformUniversityToCardData);
  return (
    <>
      <HeroSection />

      {/* Featured Universities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Discover China&apos;s World Class Universities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore top-ranked institutions with our comprehensive admission services
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((uni: any, index: number) => (
            <UniversityCardHomepage key={uni.slug || index} {...uni} />
          ))}
        </div>
      </div>

      {/* Find University Section */}
      <FindUniversitySection />

      {/* International Student Admission Services */}
      <StudentAdmissionServicesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Latest Update */}
      <LatestUpdatesSection />

    </>
  );
}

