// =============================================================================
// app/api/admin/payments/route.ts — Admin Payment Tracking
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Payment } from '@/lib/db/models/Payment';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const payments = await Payment.find({})
      .populate('studentId', 'firstName lastName email')
      .populate('applicationId', 'status')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}