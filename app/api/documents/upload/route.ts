// =============================================================================
// app/api/documents/upload/route.ts — Upload document
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { connectDB } from '@/lib/db/mongoose';
import { AppDocument } from '@/lib/db/models/models';
import { devDocuments } from '@/lib/dev-storage';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';
const hasValidS3Creds = !isDev && process.env.AWS_ACCESS_KEY_ID && 
  process.env.AWS_ACCESS_KEY_ID !== 'placeholder' && 
  process.env.AWS_SECRET_ACCESS_KEY && 
  process.env.AWS_SECRET_ACCESS_KEY !== 'placeholder' &&
  process.env.AWS_S3_BUCKET &&
  process.env.AWS_S3_BUCKET !== 'placeholder';

const useLocalStorage = isDev || !hasValidS3Creds;
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

if (useLocalStorage && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const s3Client = useLocalStorage ? null : new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = useLocalStorage ? 'dev-user' : (session?.user as any)?.id;
    
    if (!useLocalStorage && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const docType = formData.get('docType') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!docType) {
      return NextResponse.json({ error: 'Document type is required' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Allowed: PDF, JPG, PNG, DOC' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'bin';
    const nanoidStr = nanoid();
    let fileUrl: string;
    let s3Key: string;

    if (useLocalStorage) {
      const filename = `${nanoidStr}.${ext}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, Buffer.from(await file.arrayBuffer()));
      fileUrl = `/uploads/${filename}`;
      s3Key = filename;
    } else {
      s3Key = `documents/${userId}/${nanoidStr}.${ext}`;
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: s3Key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
      });
      await s3Client!.send(command);
      fileUrl = `${process.env.AWS_S3_BUCKET_URL}/${s3Key}`;
    }

    let document = null;
    if (useLocalStorage) {
      document = {
        _id: nanoidStr,
        uploadedBy: userId,
        docType,
        fileUrl,
        s3Key,
        originalFilename: file.name,
        mimeType: file.type,
        fileSize: file.size,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      devDocuments.set(nanoidStr, document);
    } else {
      await connectDB();
      document = await AppDocument.create({
        uploadedBy: userId,
        docType: docType as 'passport' | 'academic_cert' | 'transcript' | 'photo' | 'english_cert' | 'other',
        fileUrl,
        s3Key,
        originalFilename: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });
    }

    return NextResponse.json({ 
      success: true, 
      document,
      message: 'Document uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to upload document', details: errorMessage }, { status: 500 });
  }
}
