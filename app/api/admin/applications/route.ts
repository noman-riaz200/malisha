// =============================================================================
// app/api/admin/applications/route.ts — Admin Application Management
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Application } from '@/lib/db/models/Application';
import { User } from '@/lib/db/models/User';
import { z } from 'zod';

const updateStatusSchema = z.object({
  applicationId: z.string(),
  status: z.enum(['under_review', 'approved', 'rejected']),
  decisionNote: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const applications = await Application.find({})
      .populate('studentId', 'firstName lastName email')
      .populate('programId', 'name')
      .populate('universityId', 'name')
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

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();

    const { applicationId, status, decisionNote } = parsed.data;

    const application = await Application.findById(applicationId);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    await Application.update(applicationId, {
      status,
      reviewedBy: (session.user as any).id,
      reviewedAt: new Date(),
      decisionNote,
    });

    // Send email notification (optional, can be implemented later)

    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}