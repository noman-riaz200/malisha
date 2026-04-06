import { NextRequest, NextResponse } from 'next/server';
import { auth }      from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { User }      from '@/lib/db/models/User';
import { z }         from 'zod';

const updateSchema = z.object({
  firstName:     z.string().min(1).max(50).optional(),
  lastName:      z.string().min(1).max(50).optional(),
  phone:         z.string().optional(),
  nationality:   z.string().optional(),
  passportNumber:z.string().optional(),
  address: z.object({
    street:     z.string(),
    city:       z.string(),
    country:    z.string(),
    postalCode: z.string(),
  }).optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const targetId = id;
  const isOwner  = (session.user as any).id === targetId;
  const isAdmin  = ['admin', 'super_admin'].includes((session.user as any).role);
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await connectDB();
  const user = await User.findById(targetId)
    .select('-password -emailVerifyToken -passwordResetToken')
    .lean();

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: user });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const isOwner = (session.user as any).id === id;
  const isAdmin = ['admin', 'super_admin'].includes((session.user as any).role);
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body   = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const updated = await User.findByIdAndUpdate(
    id,
    parsed.data,
  ).select('-password -emailVerifyToken -passwordResetToken');

  if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: updated });
}