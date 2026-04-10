// =============================================================================
// app/(public)/universities/page.tsx — University Listing with Filters
// =============================================================================
import type { Metadata } from 'next';

import { connectDB } from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import { Pagination } from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Partner Universities — Study in China',
  description: 'Browse 250+ top Chinese universities. Filter by city, ranking, intake, and more.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: {
    search?: string;
    city?: string;
    intake?: string;
    degree?: string;
    scholarship?: string;
    is211?: string;
    is985?: string;
    page?: string;
  };
}

async function getUniversities(params: PageProps['searchParams']) {
  await connectDB();

  const page   = Math.max(1, parseInt(params.page  || '1'));
  const limit  = 12;
  const skip   = (page - 1) * limit;

  const filter: Record<string, any> = { isActive: true };
  if (params.search) {
    filter.$or = [
      { name: { $regex: params.search, $options: 'i' } },
      { location: { $regex: params.search, $options: 'i' } },
    ];
  }
  if (params.city)        filter['location'] = new RegExp(params.city, 'i');
  if (params.intake)      filter['intakes.season'] = params.intake;
  if (params.is211 === '1')  filter['badges.is211'] = true;
  if (params.is985 === '1')  filter['badges.is985'] = true;

  const sortField = params.search ? { ranking: 1 } : { studentsEnrolled: -1 };

  const [universities, total] = await Promise.all([
    University.find(filter)
      .sort(sortField as any)
      .skip(skip)
      .limit(limit)
      .lean(),
    University.countDocuments(filter),
  ]);

  const plainUniversities = universities.map((uni: any) => ({
    ...uni,
    _id: uni._id.toString(),
  }));

  return { universities: plainUniversities, total, page, pages: Math.ceil(total / limit) };
}

function transformUniversityToCardData(uni: any) {
  const nextIntake = (uni.intakes || [])
    ?.filter((i: any) => new Date(i.deadline) > new Date())
    .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0];

  const badges: string[] = [];
  if (uni.badges?.is211) badges.push('211 Projects');
  if (uni.badges?.is985) badges.push('985 Projects');
  if (uni.badges?.isDoubleFirstClass) badges.push('Double First Class');

  let countdown = null;
  if (nextIntake) {
    const diff = new Date(nextIntake.deadline).getTime() - Date.now();
    if (diff > 0) {
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      countdown = { days, hours, min: mins };
    }
  }

  return {
    name: uni.name,
    rank: uni.worldRank || 'Not Ranked',
    location: `${uni.location?.city || 'N/A'}, ${uni.location?.country || 'China'}`,
    students: `${(uni.studentsEnrolled || 0).toLocaleString()}+ Students Enrolled`,
    badges,
    countdown,
    image: uni.bannerImage,
    slug: uni.slug,
  };
}

import { UniversityCardHomepage } from '@/components/homepage/UniversityCardHomepage';

function UniversityCardGridItem({ university }: { university: any }) {
  const cardData = transformUniversityToCardData(university);
  return <UniversityCardHomepage {...cardData} />;
}

export default async function UniversitiesPage({ searchParams }: PageProps) {
  const { universities, total, page, pages } = await getUniversities(searchParams);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '6rem' }}>
      {/* Filters and Results */}
      <div className="container-vz py-5">
        <div className="row g-5">
          {/* Results Grid */}
          <div className="col-12">
            {universities.length > 0 ? (
              <>
                <div className="row g-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {universities.map((uni: any) => (
                    <UniversityCardGridItem key={uni._id.toString()} university={uni} />
                  ))}
                </div>

                {pages > 1 && (
                  <div className="mt-5">
                    <Pagination currentPage={page} totalPages={pages} />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5 bg-white rounded-4" style={{ border: '1px solid #e2e8f0' }}>
                <div 
                  className="rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{ width: '5rem', height: '5rem', backgroundColor: '#f1f5f9' }}
                >
                  <span style={{ fontSize: '2rem' }}>🔍</span>
                </div>
                <h3 className="fw-semibold mb-2" style={{ fontSize: '1.25rem', color: '#1e293b' }}>No universities found</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UniversityGridSkeleton() {
  return (
    <div className="row g-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}>
          <div className="bg-white rounded-4 overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
            <div className="skeleton-vz" style={{ height: '10rem' }} />
            <div className="p-4">
              <div className="skeleton-vz rounded mb-2" style={{ height: '1rem', width: '75%' }} />
              <div className="skeleton-vz rounded" style={{ height: '1rem', width: '50%' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
