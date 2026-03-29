// =============================================================================
// app/api/users/route.ts — Create new user (Registration)
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import { z } from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName:  z.string().min(1).max(50),
  email:     z.string().email(),
  password:  z.string().min(8),
  phone:     z.string().optional(),
  nationality: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, phone, nationality } = parsed.data;

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user (password will be hashed by the model's pre-save middleware)
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // The model's pre-save middleware will hash this
      phone,
      nationality,
      role: 'student',
      isEmailVerified: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        data: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API/Users/POST] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}