// =============================================================================
// app/api/documents/[id]/route.ts — Delete a document
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { AppDocument } from '@/lib/db/models/models';
import { devDocuments } from '@/lib/dev-storage';

const isDev = process.env.NODE_ENV === 'development';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: docId } = await params;
    const session = await auth();
    const userId = isDev ? 'dev-user' : (session?.user as any)?.id;
    
    if (!session && !isDev) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isDev) {
      const doc = devDocuments.get(docId);
      if (!doc) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }
      devDocuments.delete(docId);
      return NextResponse.json({ success: true, message: 'Document deleted' });
    }

    await connectDB();

    const document = await AppDocument.findOne({ _id: docId, uploadedBy: userId });
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    await AppDocument.delete(docId);

    return NextResponse.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}