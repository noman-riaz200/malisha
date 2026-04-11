import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Service } from '@/lib/db/models/Service';
import slugify from 'slugify';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const active = searchParams.get('active');
  
  const services = active === 'true' 
    ? await Service.findActive()
    : await Service.find();
    
  return NextResponse.json({ success: true, data: services });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  await connectDB();

  const slug = slugify(body.title, { lower: true, strict: true });

  const service = await Service.create({
    ...body,
    slug,
  });

  return NextResponse.json({ success: true, data: service }, { status: 201 });
}