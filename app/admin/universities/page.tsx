// =============================================================================
// app/admin/universities/page.tsx — Universities Management (Bootstrap + Red Theme)
// =============================================================================
import { connectDB }  from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import Link           from 'next/link';
import Image          from 'next/image';
import { DeleteUniversityButton } from '@/components/admin/DeleteUniversityButton';
import { EditUniversityButton } from '@/components/admin/EditUniversityButton';

export const dynamic  = 'force-dynamic';
export const metadata = { title: 'Universities — Admin' };

export default async function AdminUniversitiesPage() {
  await connectDB();
  const universities = await University.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="admin-page-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="flex items-center justify-end flex-wrap gap-3">
          <div className="flex-1">
            <h1 className="font-bold mb-1 text-white text-2xl">Universities</h1>
            <p className="text-white/80 text-sm">{universities.length} universities in the network</p>
          </div>
          <Link href="/admin/universities/new" 
            className="px-4 py-2 rounded-lg font-semibold bg-white text-red-700 border-2 border-white shadow-md hover:bg-gray-50">
            <i className="bi bi-plus-lg me-2"></i>
            Add University
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="admin-card">
        <div className="p-0">
          <div className="w-100">
            <table className="table table-hover mb-0 w-100" style={{ width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>UNIVERSITY</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>LOCATION</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>RANK</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>BADGES</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STUDENTS</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STATUS</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((uni: any) => (
                  <tr key={uni._id.toString()} className="border-bottom" style={{ transition: 'all 0.2s' }}>
                    {/* University */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-2 overflow-hidden d-flex align-items-center justify-content-center bg-light" 
                          style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          {uni.logo ? (
                            <Image src={uni.logo} alt="" width={36} height={36} className="object-contain p-1" />
                          ) : (
                            <span className="fw-bold" style={{ fontSize: '1rem', color: '#dc2626' }}>{uni.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.9rem' }}>{uni.name}</p>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{uni.slug}</p>
                        </div>
                      </div>
                    </td>
                    {/* Location */}
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{uni.location?.city}, {uni.location?.province}</span>
                    </td>
                    {/* Rank */}
                    <td className="px-4 py-3">
                      <span className="fw-semibold" style={{ color: '#dc2626', fontSize: '0.85rem' }}>{uni.worldRank || '—'}</span>
                    </td>
                    {/* Badges */}
                    <td className="px-4 py-3">
                      <div className="d-flex gap-1 flex-wrap">
                        {uni.badges?.is211 && (
                          <span className="badge fw-semibold px-2 py-1" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontSize: '0.7rem', borderRadius: '4px' }}>211</span>
                        )}
                        {uni.badges?.is985 && (
                          <span className="badge fw-semibold px-2 py-1" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontSize: '0.7rem', borderRadius: '4px' }}>985</span>
                        )}
                        {uni.badges?.isDoubleFirstClass && (
                          <span className="badge fw-semibold px-2 py-1" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', fontSize: '0.7rem', borderRadius: '4px' }}>DFC</span>
                        )}
                      </div>
                    </td>
                    {/* Students */}
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{uni.studentsEnrolled?.toLocaleString()}</span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-pill fw-semibold`} style={{ 
                        fontSize: '0.75rem',
                        backgroundColor: uni.isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                        color: uni.isActive ? '#22c55e' : '#64748b'
                      }}>
                        {uni.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <Link href={`/universities/${uni.slug}`} target="_blank"
                          className="btn btn-sm" style={{ color: '#64748b', border: '1px solid #e2e8f0', fontSize: '0.75rem' }}>
                          <i className="bi bi-eye"></i>
                        </Link>
                        <EditUniversityButton id={uni._id.toString()} name={uni.name} />
                        <DeleteUniversityButton id={uni._id.toString()} name={uni.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
