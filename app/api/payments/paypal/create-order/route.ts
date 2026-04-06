// =============================================================================
// app/api/payments/paypal/create-order/route.ts — PayPal Order Creation
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { connectDB } from '@/lib/db/mongoose';
import { Payment } from '@/lib/db/models/models';
import { Application } from '@/lib/db/models/models';
import { z } from 'zod';

const createOrderSchema = z.object({
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
    const parsed = createOrderSchema.safeParse(body);

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
    const amount = program.applicationFeeUSD || 50;

    // In production, integrate with PayPal SDK
    // For now, return mock order ID
    const paypalOrderId = `PAYPAL-${Date.now()}`;

    // Create payment record
    const payment = await Payment.create({
      studentId: userId,
      applicationId: parsed.data.applicationId,
      amount: amount,
      currency: 'usd',
      provider: 'paypal',
      providerPaymentId: paypalOrderId,
      status: 'pending',
    });

    return NextResponse.json({
      orderId: paypalOrderId,
      paymentId: payment._id,
      amount: amount,
      approvalUrl: `https://www.sandbox.paypal.com/checkoutnow?token=${paypalOrderId}`,
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
  }
}