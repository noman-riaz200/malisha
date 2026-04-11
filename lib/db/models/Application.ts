import mongoose, { Document, Schema, Types, Model } from 'mongoose';
import connectDB from '../mongoose';

export interface IApplication extends Document {
  studentId: Types.ObjectId;
  programId: Types.ObjectId;
  universityId: Types.ObjectId;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  personal?: Record<string, any>;
  education?: Record<string, any>;
  language?: Record<string, any>;
  adminNotes?: Record<string, any>;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  decisionNote?: string;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  paymentId?: string;
  submittedAt?: Date;
  currentStep: number;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    status: { 
      type: String, 
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'], 
      default: 'draft' 
    },
    personal: { type: Schema.Types.Mixed },
    education: { type: Schema.Types.Mixed },
    language: { type: Schema.Types.Mixed },
    adminNotes: { type: Schema.Types.Mixed },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    decisionNote: { type: String },
    paymentStatus: { 
      type: String, 
      enum: ['unpaid', 'paid', 'refunded'], 
      default: 'unpaid' 
    },
    paymentId: { type: String },
    submittedAt: { type: Date },
    currentStep: { type: Number, default: 1 },
  },
  { timestamps: true }
);

ApplicationSchema.index({ studentId: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ universityId: 1 });
ApplicationSchema.index({ createdAt: -1 });

await connectDB();

export const Application = 
  (mongoose.models.Application as Model<IApplication>) || 
  mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;