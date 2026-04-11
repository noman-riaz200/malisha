import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { University } from '@/lib/db/models/University';
import slugify from 'slugify';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  await connectDB();

  const { bannerImage, ...rest } = body;
  const slug = slugify(body.name, { lower: true, strict: true });

  const university = await University.create({
    ...rest,
    slug,
    isActive: true,
    coverImage: bannerImage,
  });

  return NextResponse.json({ success: true, data: university }, { status: 201 });
}