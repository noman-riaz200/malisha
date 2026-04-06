// =============================================================================
// app/api/payments/stripe/create-payment-intent/route.ts
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db/mongoose';
import { Payment } from '@/lib/db/models/models';
import { Application } from '@/lib/db/models/models';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

const createPaymentSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const parsed = createPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();

    // Get application details
    const application = await Application.findById(parsed.data.applicationId)
      .populate('programId');

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.studentId.toString() !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get application fee from program
    const program = application.programId as any;
    const amount = program.applicationFeeUSD || 50; // Default to $50 if not set

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        applicationId: parsed.data.applicationId,
        userId: userId,
      },
    });

    // Create payment record
    const payment = await Payment.create({
      studentId: userId,
      applicationId: parsed.data.applicationId,
      amount: amount,
      currency: 'usd',
      provider: 'stripe',
      providerPaymentId: paymentIntent.id,
      providerSessionId: paymentIntent.client_secret ?? undefined,
      status: 'pending',
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
      amount: amount,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
