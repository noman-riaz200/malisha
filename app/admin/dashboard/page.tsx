import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { getApplicationModel } from '@/lib/db/models/Application';
import User from '@/lib/db/models/User';
import Payment from '@/lib/db/models/Payment';
import Inquiry from '@/lib/db/models/Inquiry';
import { Metadata } from 'next';
import { TailadminStatsCard } from '@/components/admin/TailadminStatsCard';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { StatusPie } from '@/components/admin/StatusPie';
import { RecentTable } from '@/components/admin/RecentTable';

export const metadata: Metadata = {
  title: 'Dashboard | EduPro Admin',
  description: 'Admin dashboard for managing applications, students, and inquiries',
};

interface DashboardData {
  totalStudents: number;
  totalApplications: number;
  totalPayments: number;
  totalRevenue: number;
  todayRevenue: number;
  totalInquiries: number;
  pendingApplications: number;
  approvedApplications: number;
  recentApplications: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    program: string;
    status: string;
    createdAt: Date;
  }>;
}

async function getDashboardData(): Promise<DashboardData> {
  await connectDB();
  const ApplicationModel = await getApplicationModel();
  
  const [
    totalStudents,
    totalApplications,
    totalPayments,
    totalRevenueResult,
    todayRevenueResult,
    totalInquiries,
    pendingApplications,
    approvedApplications,
    recentApplications
  ] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    ApplicationModel.countDocuments({}),
    Payment.countDocuments({ status: 'succeeded' }),
    Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]),
    Payment.aggregate([
      { 
        $match: { 
          status: 'succeeded',
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]),
    Inquiry.countDocuments({}),
    ApplicationModel.countDocuments({ status: { $in: ['submitted', 'under_review'] } }),
    ApplicationModel.countDocuments({ status: 'approved' }),
    ApplicationModel.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean() as Promise<any[]>
  ]);

  const totalRevenue = totalRevenueResult[0]?.total || 0;
  const todayRevenue = todayRevenueResult[0]?.total || 0;

  return {
    totalStudents,
    totalApplications,
    totalPayments,
    totalRevenue,
    todayRevenue,
    totalInquiries,
    pendingApplications,
    approvedApplications,
    recentApplications: recentApplications.map(app => ({
      _id: app._id?.toString() || '',
      firstName: (app.personal as any)?.firstName || '',
      lastName: (app.personal as any)?.lastName || '',
      email: (app.personal as any)?.email || '',
      program: (app as any).programName || (app as any).program || 'N/A',
      status: app.status || 'pending',
      createdAt: app.createdAt || new Date()
    }))
  };
}

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }

  const data = await getDashboardData();

  // Generate monthly revenue mock data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = months.map((month) => ({
    month,
    revenue: data.totalRevenue * (0.07 + Math.random() * 0.08),
  }));

  const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const DollarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-3xl p-6 lg:p-8 text-white shadow-tailadmin-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-indigo-100">Welcome back! Here's what's happening with your applications today.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-end gap-4 lg:gap-6">
            <div className="text-right">
              <p className="text-indigo-200 text-sm">Total Revenue</p>
              <p className="text-2xl lg:text-3xl font-bold">${data.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <DollarIcon className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <TailadminStatsCard title="Total Students" value={data.totalStudents} change="+12.5%" changeType="positive" icon={<UsersIcon className="w-6 h-6" />} />
        <TailadminStatsCard title="Applications" value={data.totalApplications} change="+28%" changeType="positive" icon={<DocumentIcon className="w-6 h-6" />} />
        <TailadminStatsCard title="Total Revenue" value={data.totalRevenue} prefix="$" change="+15.2%" changeType="positive" icon={<DollarIcon className="w-6 h-6" />} />
        <TailadminStatsCard title="Inquiries" value={data.totalInquiries} change="+8%" changeType="positive" icon={<MessageCircleIcon className="w-6 h-6" />} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyRevenue} />
        <StatusPie 
          pending={data.pendingApplications}
          approved={data.approvedApplications}
          rejected={Math.max(0, data.totalApplications - data.pendingApplications - data.approvedApplications)}
          total={data.totalApplications}
        />
      </div>

      {/* Recent Applications */}
      <RecentTable data={data.recentApplications} />
    </div>
  );
}

