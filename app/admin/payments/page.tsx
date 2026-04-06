// =============================================================================
// app/admin/payments/page.tsx — Payment Management (Bootstrap + Red Theme)
// =============================================================================
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db/mongoose';
import { Payment } from '@/lib/db/models/models';
import { formatDate } from '@/lib/utils';
import { PaymentsList } from './PaymentsList';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Payments — Admin' };

interface PageProps {
  searchParams: { status?: string; page?: string; search?: string };
}

async function getPayments(params: PageProps['searchParams']) {
  await connectDB();
  const page = Math.max(1, parseInt(params.page || '1'));
  const limit = 20;
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = {};
  if (params.status && params.status !== 'all') {
    filter.status = params.status;
  }

  const [payments, total] = await Promise.all([
    Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('studentId', 'firstName lastName email')
      .populate({
        path: 'applicationId',
        populate: { path: 'universityId', select: 'name' }
      })
      .lean(),
    Payment.countDocuments(filter),
  ]);

  return { payments, total, page, pages: Math.ceil(total / limit) };
}

export default async function AdminPaymentsPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session) redirect('/login');
  if (!['admin', 'super_admin'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }

  const { payments, total, page, pages } = await getPayments(searchParams);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="admin-page-header mb-4" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 className="display-font fw-bold mb-1" style={{ fontSize: '1.75rem', color: 'white' }}>Payments</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{total} total transactions</p>
          </div>
          <div className="bg-white bg-opacity-25 rounded-3 px-3 py-2" style={{ fontSize: '0.75rem', color: 'white' }}>
            <span className="me-2">●</span>
            Live data · {formatDate()}
          </div>
        </div>
      </div>

      <PaymentsList 
        payments={payments}
        pagination={{ page, pages, total }}
        currentStatus={searchParams.status || 'all'}
      />
    </div>
  );
}
