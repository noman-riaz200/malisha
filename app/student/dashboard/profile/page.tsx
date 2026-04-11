// =============================================================================
// app/dashboard/profile/page.tsx — Student Profile Management
// =============================================================================
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import mongoose from 'mongoose';
import { notFound, redirect } from 'next/navigation';
import { ProfileForm } from './ProfileForm';

export const metadata = { title: 'My Profile — EduPro' };
export const dynamic = 'force-dynamic';

async function getUser(userId: string) {
  await connectDB();
  const UserModel = mongoose.models.User || mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  const user = await UserModel.findById(userId)
    .select('-password -emailVerifyToken -passwordResetToken')
    .lean();
  if (!user) return null;
  return JSON.parse(JSON.stringify(user));
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-6">Personal Information</h2>
            <ProfileForm user={user} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-6">Account</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white text-xl font-semibold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Role</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email Verified</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {user.isEmailVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Member Since</span>
                <span className="text-slate-900">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-6">Security</h2>
            <div className="space-y-2">
              <a href="/student/dashboard/profile/change-password" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l7-7a6 6 0 017.743-5.743L17 11a2 2 0 012 2z" /></svg>
                Change Password
              </a>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Two-Factor Auth
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
