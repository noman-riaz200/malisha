// =============================================================================
// app/api/users/[id]/route.ts — Get & Update user profile
// =============================================================================
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
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Students can only get their own profile; admins can get anyone's
  const targetId = params.id;
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
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const isOwner = (session.user as any).id === params.id;
  const isAdmin = ['admin', 'super_admin'].includes((session.user as any).role);
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body   = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const updated = await User.findByIdAndUpdate(
    params.id,
    { $set: parsed.data },
    { new: true, runValidators: true }
  ).select('-password -emailVerifyToken -passwordResetToken');

  if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: updated });
}


// =============================================================================
// app/api/universities/[id]/route.ts — GET, PUT, DELETE single university
// =============================================================================
import { University } from '@/lib/db/models/University';
import slugify from 'slugify';

export async function GET_uni(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const uni = await University.findById(params.id).lean();
  if (!uni) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: uni });
}

export async function PUT_uni(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  await connectDB();

  // Regenerate slug if name changed
  if (body.name) body.slug = slugify(body.name, { lower: true, strict: true });

  const updated = await University.findByIdAndUpdate(params.id, { $set: body }, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE_uni(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await connectDB();
  // Soft delete — just set isActive = false
  const updated = await University.findByIdAndUpdate(params.id, { isActive: false }, { new: true });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, message: 'University deactivated' });
}


// =============================================================================
// app/api/applications/[id]/route.ts — GET and PATCH single application
// =============================================================================
import { Application } from '@/lib/db/models/models';

export async function GET_app(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const app = await Application.findById(params.id)
    .populate('studentId',    'firstName lastName email phone')
    .populate('universityId', 'name logo location')
    .populate('programId',    'name degreeLevel medium applicationFeeUSD tuitionFeeUSD')
    .populate('documents')
    .lean();

  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const isOwner = (app as any).studentId._id.toString() === (session.user as any).id;
  const isAdmin = ['admin', 'super_admin'].includes((session.user as any).role);
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  return NextResponse.json({ success: true, data: app });
}

export async function PATCH_app(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const app = await Application.findById(params.id);
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const isOwner = app.studentId.toString() === (session.user as any).id;
  if (!isOwner) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  // Can only edit drafts
  if (app.status !== 'draft') {
    return NextResponse.json({ error: 'Cannot edit a submitted application' }, { status: 400 });
  }

  const body = await req.json();
  Object.assign(app, {
    ...(body.data?.personal  && { personal:    body.data.personal  }),
    ...(body.data?.education && { education:   body.data.education }),
    ...(body.data?.language  && { language:    body.data.language  }),
    ...(body.currentStep     && { currentStep: body.currentStep    }),
    ...(body.submit && {
      status:      'submitted',
      submittedAt: new Date(),
    }),
  });

  await app.save();
  return NextResponse.json({ success: true, data: app });
}


// =============================================================================
// app/api/applications/[id]/documents/route.ts — Attach document to application
// =============================================================================
import { AppDocument } from '@/lib/db/models/models';

export async function POST_doc(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { docType, fileUrl, s3Key, originalFilename, mimeType, fileSize } = await req.json();

  await connectDB();
  const app = await Application.findById(params.id);
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (app.studentId.toString() !== (session.user as any).id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const doc = await AppDocument.create({
    applicationId: params.id,
    uploadedBy:    (session.user as any).id,
    docType, fileUrl, s3Key, originalFilename, mimeType, fileSize,
  });

  // Link to application
  await Application.findByIdAndUpdate(params.id, { $addToSet: { documents: doc._id } });

  return NextResponse.json({ success: true, data: doc }, { status: 201 });
}
