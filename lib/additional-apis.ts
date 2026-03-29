// =============================================================================
// app/api/auth/forgot-password/route.ts
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import { emailService } from '@/lib/services/emailService';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() });

  // Always return success to avoid user enumeration
  if (!user) return NextResponse.json({ message: 'If registered, a reset link was sent.' });

  const token   = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await User.findByIdAndUpdate(user._id, {
    passwordResetToken:   token,
    passwordResetExpires: expires,
  });

  await emailService.sendPasswordReset(user.email, token);

  return NextResponse.json({ message: 'If registered, a reset link was sent.' });
}

// =============================================================================
// app/api/auth/reset-password/route.ts
// =============================================================================
import bcrypt from 'bcryptjs';

export async function POST_resetPassword(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password || password.length < 8) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({
    passwordResetToken:   token,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json({ error: 'Token invalid or expired' }, { status: 400 });
  }

  user.password             = password; // pre-save hook will hash
  user.passwordResetToken   = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return NextResponse.json({ message: 'Password reset successfully. You can now log in.' });
}

// =============================================================================
// app/api/applications/[id]/notes/route.ts — Admin notes
// =============================================================================
import { auth } from '@/lib/auth/config';
import { Application } from '@/lib/db/models/models';

export async function POST_addNote(req: NextRequest, id: string) {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { note } = await req.json();
  if (!note?.trim()) return NextResponse.json({ error: 'Note is required' }, { status: 400 });

  await connectDB();
  const app = await Application.findByIdAndUpdate(
    id,
    { $push: { adminNotes: { note: note.trim(), addedBy: (session.user as any).id, addedAt: new Date() } } },
    { new: true }
  );

  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: app });
}

// =============================================================================
// app/api/admin/students/route.ts — Student management
// =============================================================================
export async function GET_students(req: NextRequest) {
  const session = await auth();
  if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await connectDB();
  const { searchParams } = req.nextUrl;
  const page  = parseInt(searchParams.get('page')  || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search');

  const filter: Record<string, any> = { role: 'student' };
  if (search) {
    filter['$or'] = [
      { firstName: new RegExp(search, 'i') },
      { lastName:  new RegExp(search, 'i') },
      { email:     new RegExp(search, 'i') },
    ];
  }

  const [students, total] = await Promise.all([
    User.find(filter)
      .select('-password -emailVerifyToken -passwordResetToken')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(filter),
  ]);

  return NextResponse.json({ success: true, data: { students, total, page, pages: Math.ceil(total / limit) } });
}

// =============================================================================
// lib/rateLimit.ts — Simple in-memory rate limiter (use Upstash in production)
// =============================================================================
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now  = Date.now();
  const entry = requestCounts.get(key);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }

  if (entry.count >= limit) return false; // blocked

  entry.count++;
  return true; // allowed
}

// Usage in a route handler:
// const ip = req.headers.get('x-forwarded-for') || 'unknown';
// if (!rateLimit(`login:${ip}`, 5, 60_000)) {
//   return NextResponse.json({ error: 'Too many attempts. Try again in 1 minute.' }, { status: 429 });
// }

// =============================================================================
// hooks/useApplicationForm.ts — Custom hook for form state management
// =============================================================================
'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  personal:  Record<string, any>;
  education: any[];
  language:  Record<string, any>;
  documents: Array<{ type: string; url: string; key: string }>;
}

export function useApplicationForm(programId: string, universityId: string) {
  const router  = useRouter();
  const [step,   setStep]   = useState(1);
  const [appId,  setAppId]  = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');
  const [data,   setData]   = useState<FormData>({
    personal: {}, education: [], language: {}, documents: [],
  });

  const save = useCallback(async (patch: Partial<FormData>, submit = false) => {
    setSaving(true);
    setError('');
    try {
      const merged = { ...data, ...patch };
      setData(merged);

      const res = await fetch(appId ? `/api/applications/${appId}` : '/api/applications', {
        method:  appId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ programId, universityId, data: merged, submit, currentStep: step }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Save failed');
      if (!appId && json.data?._id) setAppId(json.data._id);

      return json;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setSaving(false);
    }
  }, [data, appId, programId, universityId, step]);

  const nextStep = useCallback(async (stepData: Partial<FormData>) => {
    await save(stepData);
    setStep(s => Math.min(s + 1, 4));
  }, [save]);

  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);

  const submit = useCallback(async () => {
    await save({}, true);
    router.push('/dashboard/applications?submitted=1');
  }, [save, router]);

  return { step, data, appId, saving, error, nextStep, prevStep, submit };
}

interface UniversityFilters {
  search?: string;
  city?: string;
  intake?: string;
  is211?: boolean;
  page?: number;
}

export function useUniversities(filters: UniversityFilters = {}) {
  const [universities, setUniversities] = useState<any[]>([]);
  const [total,  setTotal]  = useState(0);
  const [pages,  setPages]  = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.city)   params.set('city',   filters.city);
    if (filters.intake) params.set('intake', filters.intake);
    if (filters.is211)  params.set('is211',  '1');
    if (filters.page)   params.set('page',   filters.page.toString());

    setLoading(true);
    fetch(`/api/universities?${params}`)
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          setUniversities(json.data.universities);
          setTotal(json.data.total);
          setPages(json.data.pages);
        } else {
          setError(json.error);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { universities, total, pages, loading, error };
}
