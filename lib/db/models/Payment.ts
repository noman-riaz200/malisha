import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPayment extends Document {
  studentId: Types.ObjectId | string;
  applicationId?: Types.ObjectId | string;
  amount: number;
  currency: string;
  provider: 'stripe' | 'paypal';
  providerPaymentId: string;
  providerSessionId?: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  metadata?: Record<string, any>;
  webhookVerified: boolean;
  refundId?: string;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    provider: { 
      type: String, 
      enum: ['stripe', 'paypal'], 
      required: true 
    },
    providerPaymentId: { type: String, required: true, unique: true },
    providerSessionId: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'succeeded', 'failed', 'refunded'], 
      default: 'pending' 
    },
    metadata: { type: Schema.Types.Mixed },
    webhookVerified: { type: Boolean, default: false },
    refundId: { type: String },
    refundedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
PaymentSchema.index({ studentId: 1 });
PaymentSchema.index({ providerPaymentId: 1 });

export const Payment = 
  mongoose.models.Payment || 
  mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;