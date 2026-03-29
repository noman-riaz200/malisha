// =============================================================================
// app/api/documents/upload/route.ts — Upload document
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { connectDB } from '@/lib/db/mongoose';
import { AppDocument } from '@/lib/db/models/models';
import { nanoid } from 'nanoid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const docType = formData.get('docType') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!docType) {
      return NextResponse.json({ error: 'Document type is required' }, { status: 400 });
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Allowed: PDF, JPG, PNG, DOC' }, { status: 400 });
    }

    await connectDB();

    // Generate unique filename
    const ext = file.name.split('.').pop();
    const key = `documents/${userId}/${nanoid()}.${ext}`;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    });

    await s3Client.send(command);

    const fileUrl = `${process.env.AWS_S3_BUCKET_URL}/${key}`;

    // Save document record
    const document = await AppDocument.create({
      uploadedBy: userId,
      docType,
      fileUrl,
      s3Key: key,
      originalFilename: file.name,
      mimeType: file.type,
      fileSize: file.size,
    });

    return NextResponse.json({ 
      success: true, 
      document,
      message: 'Document uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 });
  }
}
