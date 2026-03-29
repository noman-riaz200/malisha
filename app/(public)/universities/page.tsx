// =============================================================================
// app/(public)/universities/page.tsx — University Listing with Filters
// =============================================================================
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { connectDB } from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import { UniversityCard } from '@/components/university/UniversityCard';
import { UniversityFilters } from '@/components/university/UniversityFilters';
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

  return { universities, total, page, pages: Math.ceil(total / limit) };
}

async function getCities() {
  await connectDB();
  return University.distinct('location.city', { isActive: true });
}

export default async function UniversitiesPage({ searchParams }: PageProps) {
  const [{ universities, total, page, pages }, cities] = await Promise.all([
    getUniversities(searchParams),
    getCities(),
  ]);

  const hasFilters = !!(searchParams.search || searchParams.city || searchParams.intake ||
                        searchParams.is211 || searchParams.is985);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '6rem' }}>
      {/* Page header */}
      <div className="bg-white py-4" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div className="container-vz">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
            <div>
              <p className="text-uppercase fw-semibold mb-1" style={{ color: 'var(--vz-primary)', fontSize: '0.875rem', letterSpacing: '0.05em' }}>Partner Network</p>
              <h1 className="display-font fw-bold" style={{ fontSize: '2.5rem', color: '#1e293b' }}>
                Chinese Universities
              </h1>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                {total > 0 ? (
                  <><span className="fw-semibold" style={{ color: '#334155' }}>{total}</span> universities {hasFilters ? 'matching your filters' : 'in our network'}</>
                ) : (
                  'No universities match your search'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-vz py-5">
        <div className="row g-5">
          {/* Sidebar filters */}
          <div className="col-lg-3">
            <UniversityFilters cities={cities} currentFilters={searchParams} />
          </div>

          {/* Results */}
          <div className="col-lg-9">
            {universities.length > 0 ? (
              <>
                <Suspense fallback={<UniversityGridSkeleton />}>
                  <div className="row g-4">
                    {universities.map((uni: any) => (
                      <div key={uni._id.toString()} className="col-md-6 col-xl-4">
                        <UniversityCard university={uni} />
                      </div>
                    ))}
                  </div>
                </Suspense>

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
    <div className="row g-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="col-md-6 col-xl-4">
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
