// =============================================================================
// app/api/payments/stripe/webhook/route.ts — Stripe Webhook Handler
// =============================================================================
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/lib/db/mongoose';
import { Payment } from '@/lib/db/models/models';
import { Application } from '@/lib/db/models/models';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    await connectDB();

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update payment status
        await Payment.findOneAndUpdate(
          { providerPaymentId: paymentIntent.id },
          {
            $set: {
              status: 'succeeded',
              receiptUrl: paymentIntent.receipt_url,
            },
          }
        );

        // Update application payment status
        const payment = await Payment.findOne({ providerPaymentId: paymentIntent.id });
        if (payment && payment.applicationId) {
          await Application.findByIdAndUpdate(payment.applicationId, {
            $set: {
              paymentStatus: 'paid',
              paymentId: paymentIntent.id,
              status: 'submitted',
              submittedAt: new Date(),
            },
          });
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        await Payment.findOneAndUpdate(
          { providerPaymentId: paymentIntent.id },
          { $set: { status: 'failed' } }
        );
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        
        await Payment.findOneAndUpdate(
          { providerPaymentId: charge.payment_intent as string },
          {
            $set: {
              status: 'refunded',
              refundId: charge.id,
              refundedAt: new Date(),
            },
          }
        );
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
