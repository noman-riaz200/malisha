// =============================================================================
// app/api/admin/create-admin/route.ts — Create admin user (for setup)
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin: { email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error('[API/Admin/Create] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}