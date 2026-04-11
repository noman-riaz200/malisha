// =============================================================================
// app/(public)/universities/[slug]/page.tsx
// =============================================================================
import type { Metadata } from 'next';
import { notFound }  from 'next/navigation';
import Link          from 'next/link';
import { connectDB } from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import { Program }    from '@/lib/db/models/Program';
import { IntakeCountdown } from '@/components/university/IntakeCountdown';
import ApplyBeforeDeadlineButton from '@/components/ApplyBeforeDeadlineButton';
import ClientApplyButton from '@/components/ClientApplyButton';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const uni = await University.findBySlug(slug);
    if (!uni) return { title: 'University Not Found' };
    return {
      title: `${(uni as any).name} — EduPro`,
      description: `Apply to ${(uni as any).name}. ${(uni as any).description?.slice(0, 140)}`,
      openGraph: { title: (uni as any).name, images: [(uni as any).bannerImage] },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'University' };
  }
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const unis = await University.find({ isActive: true }).select('slug').lean();
    return (unis as any[]).map(u => ({ slug: u.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEGREE_ORDER = ['bachelor', 'master', 'phd', 'foundation', 'language'];
const DEGREE_LABELS: Record<string, string> = {
  bachelor: "Bachelor's", master: "Master's", phd: 'PhD',
  foundation: 'Foundation', language: 'Language',
};
const MEDIUM_LABELS: Record<string, string> = { english: 'English', chinese: 'Chinese' };

export default async function UniversityDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    await connectDB();

    const [uni, programs] = await Promise.all([
      University.findBySlug(slug),
      Program.find({}).lean(),
    ]);

    if (!uni) notFound();

    const u = uni as any;
    const uniPrograms = (programs as any[])
      .filter(p => p.universityId.toString() === u._id.toString() && p.isActive)
      .sort((a, b) => DEGREE_ORDER.indexOf(a.degreeLevel) - DEGREE_ORDER.indexOf(b.degreeLevel));

  const nextIntake = u.intakes
    ?.filter((i: any) => new Date(i.deadline) > new Date())
    .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero banner - banner as background image on container */}
      <div className="relative h-[85vh] min-h-[600px] overflow-hidden" style={{ backgroundImage: u.bannerImage ? `url(${u.bannerImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {u.bannerImage ? (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
        )}

        {/* Back link */}
        <div className="absolute top-24 left-6 md:left-12 z-10">
          <Link href="/universities" className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors">
            ← All Universities
          </Link>
        </div>

        {/* Full screen logo */}
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
          <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl flex items-center justify-center p-6">
            {u.logo && u.logo.trim() !== ""
              ? <img src={u.logo} alt={u.name} className="w-full h-full object-contain p-4" />
              : <span className="font-bold text-6xl md:text-7xl text-white drop-shadow-lg">{u.name[0]}</span>
            }
          </div>
        </div>

        {/* University info overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-slate-900/90 to-transparent">
          <div className="flex items-end gap-5">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {u.badges?.is211           && <span className="badge-211">211</span>}
                {u.badges?.is985           && <span className="badge-985">985</span>}
                {u.badges?.isDoubleFirstClass && <span className="badge-dfc">Double First Class</span>}
                {u.badges?.cscaRequired    && <span className="badge-csca">CSCA Required</span>}
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white">{u.name}</h1>
              <p className="text-blue-200 text-sm mt-1">
                📍 {u.location?.city || 'N/A'}, {u.location?.province || ''}, {u.location?.country || 'N/A'}
                {u.worldRank && <> · 🌐 World Rank: {u.worldRank}</>}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main content ────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-3">About the University</h2>
              <p className="text-slate-600 leading-relaxed">{u.description}</p>
              {u.website && (
                <a href={u.website} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium mt-4">
                  🌐 Official Website →
                </a>
              )}
            </div>

            {/* Programs */}
            <div className="bg-white rounded-2xl border border-slate-100">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-900 text-lg">
                  Available Programs
                  <span className="ml-2 text-sm font-normal text-slate-400">({uniPrograms.length})</span>
                </h2>
              </div>

              {uniPrograms.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <p>No programs listed yet. Contact us for more information.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {uniPrograms.map((prog: any) => (
                    <div key={prog._id.toString()} className="px-6 py-5 hover:bg-slate-50 transition-colors group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                              {DEGREE_LABELS[prog.degreeLevel]}
                            </span>
                            <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                              {MEDIUM_LABELS[prog.medium]} Taught
                            </span>
                            {prog.scholarshipAvailable && (
                              <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded-full">
                                🏅 Scholarship
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {prog.name}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">{prog.majorCategory} · {prog.duration} years</p>
                          {prog.requirements?.length > 0 && (
                            <p className="text-xs text-slate-400 mt-2">
                              Requires: {prog.requirements.join(' · ')}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-slate-900">${prog.tuitionFeeUSD ? prog.tuitionFeeUSD.toLocaleString() : 'N/A'}<span className="font-normal text-slate-400 text-xs">/yr</span></p>
                          <p className="text-xs text-slate-400 mt-0.5">App fee: ${prog.applicationFeeUSD ? prog.applicationFeeUSD : 'N/A'}</p>
                          <ClientApplyButton 
                            programId={prog._id.toString()}
                            universityId={u._id.toString()}
                            buttonText="Apply Now"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Intake countdown */}
            {nextIntake && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
                <p className="text-blue-200 text-xs font-medium uppercase tracking-wide mb-2">
                  Next Deadline — {nextIntake.season.charAt(0).toUpperCase() + nextIntake.season.slice(1)} {nextIntake.year}
                </p>
                <IntakeCountdown deadline={nextIntake.deadline} />
                <ApplyBeforeDeadlineButton 
                  buttonText="Apply Before Deadline →"
                  studentDashboardUrl={`/student/dashboard/applications/new?university=${u._id}`}
                  className="mt-4 w-full flex items-center justify-center bg-white text-blue-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                />
              </div>
            )}

            {/* Quick facts */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { icon: '🌐', label: 'World Rank',   value: u.worldRank || 'Not ranked' },
                  { icon: '📍', label: 'Location',     value: u.location ? `${u.location.city}, ${u.location.country}` : 'N/A' },
                  { icon: '🎓', label: 'Students',     value: u.studentsEnrolled ? `${u.studentsEnrolled.toLocaleString()}+ enrolled` : 'N/A' },
                  { icon: '📚', label: 'Programs',     value: `${uniPrograms.length} available` },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-3 text-sm">
                    <span className="text-base">{f.icon}</span>
                    <div>
                      <p className="text-xs text-slate-400">{f.label}</p>
                      <p className="font-medium text-slate-700">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need help CTA */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">💬</p>
              <h3 className="font-semibold text-slate-900 mb-1">Need Guidance?</h3>
              <p className="text-sm text-slate-500 mb-4">Get a free consultation from our advisors.</p>
              <Link href="/get-free-consultation" className="btn-primary w-full justify-center text-sm py-2.5">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error loading university:', error);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">University Details</h1>
          <p className="text-slate-600">Unable to load university data. Please try again later.</p>
        </div>
      </div>
    );
  }
}
