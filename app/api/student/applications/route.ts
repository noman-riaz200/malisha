// =============================================================================
// app/api/student/applications/route.ts — Student Application Tracking
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Application } from '@/lib/db/models/Application';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    await connectDB();

    const applications = await Application.find({ studentId: userId })
      .populate('programId', 'name degreeLevel medium duration tuitionFeeUSD applicationFeeUSD')
      .populate('universityId', 'name location')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}