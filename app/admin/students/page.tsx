// =============================================================================
// app/admin/students/page.tsx — Student Management (Bootstrap + Red Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import { StudentsList } from './StudentsList';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Students — Admin' };

interface PageProps {
  searchParams: { search?: string; page?: string; status?: string };
}

async function getStudents(params: PageProps['searchParams']) {
  await connectDB();
  const page = Math.max(1, parseInt(params.page || '1'));
  const limit = 20;
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = { role: 'student' };
  
  if (params.search) {
    filter.$or = [
      { firstName: { $regex: params.search, $options: 'i' } },
      { lastName: { $regex: params.search, $options: 'i' } },
      { email: { $regex: params.search, $options: 'i' } },
    ];
  }

  const [students, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(filter),
  ]);

  return { students, total, page, pages: Math.ceil(total / limit) };
}

export default async function AdminStudentsPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session) redirect('/login');
  if (!['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }

  const { students, total, page, pages } = await getStudents(searchParams);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="admin-page-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 className="display-font fw-bold mb-1" style={{ fontSize: '1.75rem', color: 'white' }}>Students</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{total} registered students</p>
          </div>
          <div className="bg-white bg-opacity-25 rounded-3 px-3 py-2" style={{ fontSize: '0.75rem', color: 'white' }}>
            <span className="me-2">●</span>
            Live data · {formatDate()}
          </div>
        </div>
      </div>

      <StudentsList 
        students={students} 
        pagination={{ page, pages, total }}
        currentSearch={searchParams.search || ''}
      />
    </div>
  );
}
