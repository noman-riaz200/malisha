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

// Create and export the model
const PaymentModel = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

// Helper to convert string to ObjectId
function toObjectId(id: string | Types.ObjectId | undefined): Types.ObjectId | undefined {
  if (!id) return undefined;
  if (id instanceof Types.ObjectId) return id;
  try {
    return new Types.ObjectId(id);
  } catch {
    return undefined;
  }
}

// Export Payment with the old API interface for compatibility
export const Payment = {
  find(conditions: { studentId?: string; applicationId?: string; status?: string } = {}, options: { limit?: number } = {}): any {
    const filter: any = {};
    if (conditions.studentId) filter.studentId = new Types.ObjectId(conditions.studentId);
    if (conditions.applicationId) filter.applicationId = new Types.ObjectId(conditions.applicationId);
    if (conditions.status) filter.status = conditions.status;
    
    let query = PaymentModel.find(filter).sort({ createdAt: -1 });
    if (options.limit) query = query.limit(options.limit);
    
    // Return chainable query object
    return {
      query,
      populate(field: string, select?: string) {
        if (typeof field === 'object') {
          // Handle object-based populate like { path: 'applicationId', populate: { path: 'universityId' } }
          this.query = this.query.populate(field);
        } else {
          this.query = this.query.populate(field, select);
        }
        return this;
      },
      sort(sortArg: any) {
        this.query = this.query.sort(sortArg);
        return this;
      },
      skip(n: number) {
        this.query = this.query.skip(n);
        return this;
      },
      limit(n: number) {
        this.query = this.query.limit(n);
        return this;
      },
      lean() {
        this.query = this.query.lean();
        return this;
      },
      then(resolve: (value: any[]) => void, reject: (reason: any) => void) {
        return this.query.then(resolve).catch(reject);
      },
      exec() {
        return this.query;
      }
    };
  },

  async findById(id: string | number): Promise<IPayment | null> {
    return PaymentModel.findById(id);
  },

  async findByProviderPaymentId(providerPaymentId: string): Promise<IPayment | null> {
    return PaymentModel.findOne({ providerPaymentId });
  },

  async findOne(query: any): Promise<IPayment | null> {
    if (query.providerPaymentId) {
      return this.findByProviderPaymentId(query.providerPaymentId);
    }
    const payments = await this.find(query, { limit: 1 });
    return payments[0] || null;
  },

  async findOneAndUpdate(query: any, updateData: any): Promise<IPayment | null> {
    return PaymentModel.findOneAndUpdate(query, updateData, { new: true });
  },

  async create(data: Partial<IPayment> & { studentId: string; applicationId?: string }): Promise<IPayment> {
    const payment = new PaymentModel({
      studentId: toObjectId(data.studentId)!,
      applicationId: toObjectId(data.applicationId),
      amount: data.amount,
      currency: data.currency || 'usd',
      provider: data.provider,
      providerPaymentId: data.providerPaymentId,
      providerSessionId: data.providerSessionId,
      status: data.status || 'pending',
      metadata: data.metadata,
      webhookVerified: data.webhookVerified || false,
    });
    return payment.save();
  },

  async update(id: string | number, data: Partial<IPayment>): Promise<IPayment | null> {
    const updateData: any = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.webhookVerified !== undefined) updateData.webhookVerified = data.webhookVerified;
    if (data.refundId) updateData.refundId = data.refundId;
    if (data.refundedAt) updateData.refundedAt = data.refundedAt;
    
    return PaymentModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  },

  aggregate(pipeline: any[]): any {
    return PaymentModel.aggregate(pipeline);
  },

  async countDocuments(conditions: any = {}): Promise<number> {
    return PaymentModel.countDocuments(conditions);
  }
};

export default PaymentModel;