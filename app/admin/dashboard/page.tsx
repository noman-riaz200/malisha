'use client'
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { getApplicationModel } from '@/lib/db/models/Application';
import Payment from '@/lib/db/models/Payment';

interface DashboardData {
  totalStudents: number;
  totalApplications: number;
  totalPayments: number;
  totalRevenue: number;
  totalInquiries: number;
  recentApplications: any[];
  recentPayments: any[];
}

async function getDashboardData(): Promise<DashboardData> {
  await connectDB();
  const ApplicationModel = await getApplicationModel();
  
  const [
    totalApplications, 
    recentApplications,
  ] = await Promise.all([
    ApplicationModel.countDocuments({}),
    ApplicationModel.find({}).sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return {
    totalStudents: 1245,
    totalApplications,
    totalPayments: 89,
    totalRevenue: 45230,
    totalInquiries: 567,
    recentApplications: recentApplications as any[],
    recentPayments: [{ _id: '1', amount: 250, status: 'paid' }, { _id: '2', amount: 150, status: 'pending' }]
  };
}

export default async function AdminDashboardPage() {
  const session = await auth();
  
  // Role check
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }

  const data = await getDashboardData();

  const stats = [
    { label: 'Total Students', value: data.totalStudents.toLocaleString(), change: '+12.5%', icon: '👥', color: '#3b82f6' },
    { label: 'Applications', value: data.totalApplications.toLocaleString(), change: '+28%', icon: '📄', color: '#10b981' },
    { label: 'Total Revenue', value: `$${data.totalRevenue.toLocaleString()}`, change: '+15.2%', icon: '💰', color: '#f59e0b' },
    { label: 'Inquiries', value: data.totalInquiries.toLocaleString(), change: '+8%', icon: '💬', color: '#ec4899' }
  ];

  return (
    <>
      <div className="admin-page-header mb-6 animate-fade-up" style={{ 
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        borderRadius: '20px', padding: '2rem', color: 'white' 
      }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 className="display-font fw-bold mb-1" style={{ fontSize: '2rem' }}>Dashboard</h1>
            <p className="mb-0" style={{ opacity: 0.9 }}>Welcome back!</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="col-xl-3 col-lg-6">
            {/* 2. یہاں سے onMouseEnter اور onMouseLeave ہٹا دیے گئے ہیں */}
            <div className="admin-card h-100 animate-fade-up-delay-1" style={{ 
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="p-3 rounded-2xl" style={{ background: `${stat.color}1a`, color: stat.color }}>
                    <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  </div>
                  <span className="badge bg-success">{stat.change}</span>
                </div>
                <h3 className="mb-1 fw-bold" style={{ fontSize: '2rem', color: '#1e293b' }}>{stat.value}</h3>
                <p className="mb-0 text-muted">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* باقی کوڈ ویسا ہی رہے گا لیکن JavaScript ایونٹس کے بغیر */}
    </>
  );
}