// ============================================================
// lib/utils.ts — API helpers & auth guard
// ============================================================
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
export function err(message: string, status = 400, details?: any) {
  return NextResponse.json({ success: false, error: message, details }, { status });
}
export async function requireAuth(allowedRoles?: string[]) {
  const session = await auth();
  if (!session) return { error: err('Unauthorized', 401) };
  if (allowedRoles && !allowedRoles.includes((session.user as any).role)) {
    return { error: err('Forbidden', 403) };
  }
  return { session };
}

// ============================================================
// lib/validations/authSchemas.ts
// ============================================================
import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50).trim(),
  lastName:  z.string().min(2).max(50).trim(),
  email:     z.string().email().toLowerCase(),
  password:  z.string().min(8).max(128)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain a number'),
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const resetPasswordSchema = z.object({
  token:           z.string().min(64),
  password:        z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match', path: ['confirmPassword'],
});

// ============================================================
// lib/validations/universitySchemas.ts
// ============================================================
export const universitySchema = z.object({
  name:        z.string().min(3).max(200),
  description: z.string().min(20),
  worldRank:   z.string().optional(),
  location: z.object({
    city:     z.string().min(2),
    province: z.string().min(2),
    country:  z.string().default('China'),
  }),
  badges: z.object({
    is211:              z.boolean().default(false),
    is985:              z.boolean().default(false),
    isDoubleFirstClass: z.boolean().default(false),
    cscaRequired:       z.boolean().default(false),
  }).optional(),
  studentsEnrolled: z.number().int().min(0).optional(),
  website:          z.string().url().optional(),
  intakes: z.array(z.object({
    season:   z.enum(['march', 'september']),
    year:     z.number().int().min(2025),
    deadline: z.string().datetime(),
  })).optional(),
});

export const programSchema = z.object({
  universityId:         z.string().min(24).max(24),
  name:                 z.string().min(3),
  degreeLevel:          z.enum(['bachelor', 'master', 'phd', 'foundation', 'language']),
  medium:               z.enum(['english', 'chinese']),
  majorCategory:        z.string().min(2),
  duration:             z.number().int().min(1).max(10),
  tuitionFeeUSD:        z.number().min(0),
  applicationFeeUSD:    z.number().min(0).default(50),
  scholarshipAvailable: z.boolean().default(false),
  description:          z.string().min(20),
  requirements:         z.array(z.string()).optional(),
});

// ============================================================
// lib/stripe.ts
// ============================================================
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// ============================================================
// lib/services/emailService.ts
// ============================================================
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM   = process.env.EMAIL_FROM!;
const APP    = process.env.NEXT_PUBLIC_APP_URL!;

export const emailService = {
  async sendVerification(email: string, token: string) {
    await resend.emails.send({
      from: FROM, to: email,
      subject: 'Verify your EduPro account',
      html: `<p>Click <a href="${APP}/verify?token=${token}">here</a> to verify your email (expires 24h).</p>`,
    });
  },
  async sendPasswordReset(email: string, token: string) {
    await resend.emails.send({
      from: FROM, to: email,
      subject: 'Reset your EduPro password',
      html: `<p>Click <a href="${APP}/reset-password?token=${token}">here</a> to reset your password (expires 1h).</p>`,
    });
  },
  async sendApplicationStatusUpdate(email: string, status: string, note?: string) {
    const msgs: Record<string, string> = {
      under_review: 'is now under review',
      approved:     'has been APPROVED 🎉',
      rejected:     'has been rejected',
    };
    await resend.emails.send({
      from: FROM, to: email,
      subject: `Application Update — ${status.replace('_', ' ').toUpperCase()}`,
      html: `<h2>Application Status Update</h2>
             <p>Your application ${msgs[status] || status}.</p>
             ${note ? `<p><strong>Advisor note:</strong> ${note}</p>` : ''}
             <p><a href="${APP}/dashboard/applications">View your application →</a></p>`,
    });
  },
};

// ============================================================
// app/api/users/route.ts — Registration
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import crypto from 'crypto';

export async function POST_register(req: NextRequest) {
  try {
    const body   = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return err('Validation failed', 400, parsed.error.flatten());

    await connectDB();
    const exists = await User.findOne({ email: parsed.data.email });
    if (exists) return err('Email already registered', 409);

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      ...parsed.data,
      emailVerifyToken:    verifyToken,
      emailVerifyExpires:  new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await emailService.sendVerification(user.email, verifyToken);

    return ok({ message: 'Registration successful. Check your email.', userId: user._id }, 201);
  } catch (e: any) {
    console.error('[REGISTER]', e);
    return err('Internal server error', 500);
  }
}

// ============================================================
// app/api/universities/route.ts
// ============================================================
import { University } from '@/lib/db/models/University';
import slugify from 'slugify';

export async function GET_universities(req: NextRequest) {
  await connectDB();
  const sp     = req.nextUrl.searchParams;
  const page   = parseInt(sp.get('page')  || '1');
  const limit  = parseInt(sp.get('limit') || '12');
  const skip   = (page - 1) * limit;

  const filter: Record<string, any> = { isActive: true };
  if (sp.get('city'))   filter['location.city'] = new RegExp(sp.get('city')!, 'i');
  if (sp.get('search')) filter['$text'] = { $search: sp.get('search')! };
  if (sp.get('intake')) filter['intakes.season'] = sp.get('intake');

  const [universities, total] = await Promise.all([
    University.find(filter).skip(skip).limit(limit).sort({ studentsEnrolled: -1 }),
    University.countDocuments(filter),
  ]);

  return ok({ universities, total, page, pages: Math.ceil(total / limit) });
}

export async function POST_university(req: NextRequest) {
  const { error } = await requireAuth(['admin', 'super_admin']);
  if (error) return error;

  const body   = await req.json();
  const parsed = universitySchema.safeParse(body);
  if (!parsed.success) return err('Validation failed', 400, parsed.error.flatten());

  await connectDB();
  const slug       = slugify(parsed.data.name, { lower: true, strict: true });
  const university = await University.create({ ...parsed.data, slug });
  return ok(university, 201);
}

// ============================================================
// app/api/applications/route.ts
// ============================================================
import { Application } from '@/lib/db/models/models';

export async function GET_applications(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  await connectDB();
  const sp     = req.nextUrl.searchParams;
  const filter: Record<string, any> = {};

  if ((session!.user as any).role === 'student') {
    filter.studentId = (session!.user as any).id;
  } else {
    if (sp.get('status'))       filter.status       = sp.get('status');
    if (sp.get('universityId')) filter.universityId = sp.get('universityId');
  }

  const applications = await Application
    .find(filter)
    .populate('programId',    'name degreeLevel medium applicationFeeUSD')
    .populate('universityId', 'name slug logo')
    .populate('studentId',    'firstName lastName email')
    .sort({ updatedAt: -1 });

  return ok(applications);
}

export async function POST_application(req: NextRequest) {
  const { error, session } = await requireAuth(['student']);
  if (error) return error;

  const body = await req.json();
  await connectDB();

  const application = await Application.create({
    studentId:    (session!.user as any).id,
    programId:    body.programId,
    universityId: body.universityId,
    status:       body.submit ? 'submitted' : 'draft',
    personal:     body.data?.personal,
    education:    body.data?.education,
    language:     body.data?.language,
    currentStep:  body.currentStep || 1,
    submittedAt:  body.submit ? new Date() : undefined,
  });

  return ok(application, 201);
}

// ============================================================
// app/api/applications/[id]/status/route.ts
// ============================================================
export async function PATCH_appStatus(req: NextRequest, id: string) {
  const { error, session } = await requireAuth(['admin', 'super_admin']);
  if (error) return error;

  const { status, note } = await req.json();
  const VALID = ['under_review', 'approved', 'rejected'];
  if (!VALID.includes(status)) return err('Invalid status value');

  await connectDB();
  const app = await Application.findByIdAndUpdate(
    id,
    {
      status,
      reviewedBy:   (session!.user as any).id,
      reviewedAt:   new Date(),
      decisionNote: note,
      $push: { adminNotes: { note, addedBy: (session!.user as any).id, addedAt: new Date() } },
    },
    { new: true }
  ).populate('studentId', 'firstName lastName email');

  if (!app) return err('Application not found', 404);

  await emailService.sendApplicationStatusUpdate(
    (app.studentId as any).email, status, note
  );

  return ok(app);
}

// ============================================================
// app/api/upload/route.ts — S3 Presigned URL
// ============================================================
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';
import path from 'path';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_MB = 10;

export async function POST_upload(req: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  const { fileName, fileType, fileSize, applicationId, docType } = await req.json();

  if (!ALLOWED_TYPES.includes(fileType)) return err('File type not allowed');
  if (fileSize > MAX_MB * 1024 * 1024) return err(`Max file size is ${MAX_MB}MB`);

  const ext = path.extname(fileName);
  const key = `uploads/${(session!.user as any).id}/${applicationId || 'misc'}/${nanoid()}${ext}`;

  const command = new PutObjectCommand({
    Bucket:               process.env.AWS_S3_BUCKET!,
    Key:                  key,
    ContentType:          fileType,
    ServerSideEncryption: 'AES256',
    Metadata: {
      uploadedBy:    (session!.user as any).id,
      applicationId: applicationId || '',
      docType:       docType || 'other',
    },
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return ok({
    presignedUrl,
    fileUrl: `${process.env.AWS_S3_BUCKET_URL}/${key}`,
    key,
  });
}

// ============================================================
// app/api/payments/stripe/route.ts
// ============================================================
import { Payment } from '@/lib/db/models/models';

export async function POST_stripeCheckout(req: NextRequest) {
  const { error, session } = await requireAuth(['student']);
  if (error) return error;

  const { applicationId } = await req.json();
  await connectDB();

  const application = await Application
    .findById(applicationId)
    .populate('programId',    'applicationFeeUSD name')
    .populate('universityId', 'name');

  if (!application) return err('Application not found', 404);
  if (application.studentId.toString() !== (session!.user as any).id) return err('Forbidden', 403);
  if (application.paymentStatus === 'paid') return err('Already paid');

  const amount = (application.programId as any).applicationFeeUSD * 100;

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode:                 'payment',
    customer_email:       session!.user.email!,
    line_items: [{
      price_data: {
        currency:     'usd',
        product_data: {
          name:        `Application Fee — ${(application.universityId as any).name}`,
          description: (application.programId as any).name,
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    metadata: {
      applicationId,
      studentId: (session!.user as any).id,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?success=1&app=${applicationId}`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}?cancelled=1`,
  });

  await Payment.create({
    studentId:         (session!.user as any).id,
    applicationId,
    amount:            amount / 100,
    currency:          'usd',
    provider:          'stripe',
    providerPaymentId: checkoutSession.id,
    providerSessionId: checkoutSession.id,
    status:            'pending',
  });

  return ok({ url: checkoutSession.url });
}

// ============================================================
// app/api/payments/webhook/stripe/route.ts
// ============================================================
export async function POST_stripeWebhook(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  await connectDB();

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object;
      await Promise.all([
        Payment.findOneAndUpdate(
          { providerSessionId: s.id },
          { status: 'succeeded', webhookVerified: true }
        ),
        Application.findByIdAndUpdate(s.metadata.applicationId, {
          paymentStatus: 'paid',
          paymentId:     s.payment_intent,
        }),
      ]);
      break;
    }
    case 'charge.refunded': {
      const charge = event.data.object;
      await Payment.findOneAndUpdate(
        { providerPaymentId: charge.payment_intent },
        { status: 'refunded', refundId: charge.refunds.data[0]?.id, refundedAt: new Date() }
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}

// ============================================================
// app/api/inquiries/route.ts
// ============================================================
import { Inquiry } from '@/lib/db/models/models';
import { z } from 'zod';

const inquirySchema = z.object({
  source:            z.enum(['consultation', 'contact', 'footer']),
  name:              z.string().min(2),
  email:             z.string().email(),
  phone:             z.string().optional(),
  role:              z.enum(['student', 'instructor', 'company']).optional(),
  organization:      z.string().optional(),
  reason:            z.string().optional(),
  interestedMajor:   z.string().optional(),
  interestedDegree:  z.string().optional(),
  lastAcademicResult:z.string().optional(),
});

export async function POST_inquiry(req: NextRequest) {
  const body   = await req.json();
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return err('Validation failed', 400, parsed.error.flatten());

  await connectDB();
  const inquiry = await Inquiry.create(parsed.data);
  return ok({ message: 'Inquiry submitted successfully', id: inquiry._id }, 201);
}

export async function GET_inquiries(req: NextRequest) {
  const { error } = await requireAuth(['admin', 'super_admin']);
  if (error) return error;

  await connectDB();
  const sp     = req.nextUrl.searchParams;
  const filter: Record<string, any> = {};
  if (sp.get('status')) filter.status = sp.get('status');
  if (sp.get('source')) filter.source = sp.get('source');

  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
  return ok(inquiries);
}

// ============================================================
// app/api/admin/analytics/route.ts
// ============================================================
export async function GET_analytics(req: NextRequest) {
  const { error } = await requireAuth(['admin', 'super_admin']);
  if (error) return error;

  await connectDB();
  const [totalStudents, totalApplications, statusCounts, recentApps, revenueData] =
    await Promise.all([
      User.countDocuments({ role: 'student' }),
      Application.countDocuments(),
      Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Application.find()
        .sort({ createdAt: -1 }).limit(10)
        .populate('studentId',    'firstName lastName email')
        .populate('universityId', 'name'),
      Payment.aggregate([
        { $match: { status: 'succeeded' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

  return ok({
    totalStudents,
    totalApplications,
    statusCounts: Object.fromEntries(statusCounts.map((s: any) => [s._id, s.count])),
    recentApplications: recentApps,
    totalRevenue: revenueData[0]?.total || 0,
  });
}
