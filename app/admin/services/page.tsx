import { connectDB } from '@/lib/db/mongoose';
import { Service } from '@/lib/db/models/Service';
import Link from 'next/link';
import Image from 'next/image';
import { EditServiceButton } from '@/components/admin/EditServiceButton';
import { DeleteServiceButton } from '@/components/admin/DeleteServiceButton';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Services — Admin' };

export default async function AdminServicesPage() {
  await connectDB();
  const services = await Service.find();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="admin-page-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="flex items-center justify-end flex-wrap gap-3">
          <div className="flex-1">
            <h1 className="font-bold mb-1 text-white text-2xl">Services</h1>
            <p className="text-white/80 text-sm">{services.length} services available</p>
          </div>
          <Link href="/admin/services/new" 
            className="px-4 py-2 rounded-lg font-semibold bg-white text-red-700 border-2 border-white shadow-md hover:bg-gray-50">
            <i className="bi bi-plus-lg me-2"></i>
            Add Service
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
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>SERVICE</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>DESCRIPTION</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>IMAGE</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>ORDER</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>STATUS</th>
                  <th className="px-4 py-3 fw-semibold text-dark" style={{ fontSize: '0.75rem' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5 text-muted">No services found. Add your first service!</td>
                  </tr>
                ) : services.map((service: any) => (
                  <tr key={service._id.toString()} className="border-bottom cursor-pointer" style={{ transition: 'all 0.2s' }}>
                    {/* Service */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-2 overflow-hidden d-flex align-items-center justify-content-center bg-light" 
                          style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                          {service.image ? (
                            <Image src={service.image} alt="" width={36} height={36} className="object-contain p-1" style={{ maxWidth: '100%' }} />
                          ) : (
                            <span className="fw-bold" style={{ fontSize: '1rem', color: '#dc2626' }}>{service.title[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="fw-medium mb-0" style={{ color: '#1e293b', fontSize: '0.9rem' }}>{service.title}</p>
                          <p className="mb-0 text-muted" style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{service.slug}</p>
                        </div>
                      </div>
                    </td>
                    {/* Description */}
                    <td className="px-4 py-3">
                      <span className="d-inline-block" style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {service.shortDesc || service.description || '—'}
                      </span>
                    </td>
                    {/* Image */}
                    <td className="px-4 py-3">
                      {service.image ? (
                        <div className="rounded-2 overflow-hidden" style={{ width: '50px', height: '50px', position: 'relative' }}>
                          <Image src={service.image} alt="" fill className="object-cover" style={{ maxWidth: '100%' }} />
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>—</span>
                      )}
                    </td>
                    {/* Order */}
                    <td className="px-4 py-3">
                      <span className="fw-semibold" style={{ color: '#dc2626', fontSize: '0.85rem' }}>{service.order || 0}</span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-pill fw-semibold`} style={{ 
                        fontSize: '0.75rem',
                        backgroundColor: service.isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                        color: service.isActive ? '#22c55e' : '#64748b'
                      }}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <EditServiceButton id={service._id.toString()} name={service.title} />
                        <DeleteServiceButton id={service._id.toString()} name={service.title} />
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