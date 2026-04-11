// =============================================================================
// app/api/documents/route.ts — Get and list documents
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { AppDocument } from '@/lib/db/models/models';
import { devDocuments } from '@/lib/dev-storage';

const isDev = process.env.NODE_ENV === 'development';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userId = isDev ? 'dev-user' : (session?.user as any)?.id;

    if (!session && !isDev) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isDev) {
      const docs = Array.from(devDocuments.values()).filter(
        (doc) => doc.uploadedBy === userId
      );
      return NextResponse.json({ documents: docs });
    }

    await connectDB();
    const documents = await AppDocument.find({ uploadedBy: userId }, { sort: { createdAt: -1 } });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
