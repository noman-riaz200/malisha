// =============================================================================
// app/api/admin/overview/route.ts — Admin Dashboard Overview Stats
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import { Application } from '@/lib/db/models/Application';
import { Payment } from '@/lib/db/models/Payment';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    // Get stats
    const [totalStudents, pendingApplications, totalRevenue] = await Promise.all([
      User.count({ role: 'student' }),
      Application.count({ status: 'submitted' }),
      Payment.aggregate([
        { $match: { status: 'succeeded' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    const revenue = totalRevenue[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        pendingApplications,
        totalRevenue: revenue,
      },
    });
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}