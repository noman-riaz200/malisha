// =============================================================================
// app/api/inquiries/[id]/reply/route.ts — Reply to inquiry
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Inquiry } from '@/lib/db/models/models';
import { z } from 'zod';

const replySchema = z.object({
  reply: z.string().min(1, 'Reply message is required'),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['admin', 'super_admin'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const parsed = replySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();

    const inquiry = await Inquiry.findByIdAndUpdate(
      params.id,
      {
        $set: {
          adminReply: parsed.data.reply,
          repliedAt: new Date(),
          status: 'contacted',
        },
      },
      { new: true }
    );

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('Error replying to inquiry:', error);
    return NextResponse.json({ error: 'Failed to reply to inquiry' }, { status: 500 });
  }
}
