// =============================================================================
// app/dashboard/profile/page.tsx — Student Profile Management
// =============================================================================
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import { notFound, redirect } from 'next/navigation';
import { ProfileForm } from './ProfileForm';

export const metadata = { title: 'My Profile — EduPro' };
export const dynamic = 'force-dynamic';

async function getUser(userId: string) {
  await connectDB();
  const user = await User.findById(userId)
    .select('-password -emailVerifyToken -passwordResetToken')
    .lean();
  return user;
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/login');
  
  const userId = (session.user as any).id;
  const user = await getUser(userId);
  
  if (!user) {
    notFound();
  }

  return (
    <div className="container-vz">
      <div className="mb-5">
        <h1 className="display-font fw-bold mb-2" style={{ fontSize: '2rem', color: '#1e293b' }}>
          My Profile
        </h1>
        <p style={{ color: '#64748b' }}>Manage your personal information and account settings.</p>
      </div>

      <div className="row g-4">
        {/* Profile Information */}
        <div className="col-lg-8">
          <div className="bg-white rounded-4 p-4" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="fw-semibold mb-4" style={{ color: '#1e293b' }}>Personal Information</h2>
            <ProfileForm user={user} />
          </div>
        </div>

        {/* Account Summary */}
        <div className="col-lg-4">
          <div className="bg-white rounded-4 p-4 mb-4" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="fw-semibold mb-4" style={{ color: '#1e293b' }}>Account</h2>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem', backgroundColor: 'var(--vz-primary)', color: 'white', fontSize: '1.5rem', fontWeight: 600 }}>
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div>
                <p className="fw-semibold mb-0" style={{ color: '#1e293b' }}>{user.firstName} {user.lastName}</p>
                <p className="mb-0" style={{ color: '#64748b', fontSize: '0.875rem' }}>{user.email}</p>
              </div>
            </div>
            
            <div className="border-top pt-4" style={{ borderColor: '#e2e8f0' }}>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#64748b' }}>Role</span>
                <span className="badge bg-primary text-capitalize">{user.role}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#64748b' }}>Email Verified</span>
                <span className={`badge ${user.isEmailVerified ? 'bg-success' : 'bg-warning'}`}>
                  {user.isEmailVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ color: '#64748b' }}>Member Since</span>
                <span style={{ color: '#1e293b' }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-4 p-4" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="fw-semibold mb-4" style={{ color: '#1e293b' }}>Security</h2>
            <div className="d-grid gap-2">
              <a href="/student/dashboard/profile/change-password" className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-key me-2"></i>Change Password
              </a>
              <button className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-shield-lock me-2"></i>Two-Factor Auth
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
