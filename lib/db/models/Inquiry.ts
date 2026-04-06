import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  source: 'consultation' | 'contact' | 'footer';
  name: string;
  email: string;
  phone?: string;
  role?: 'student' | 'instructor' | 'company';
  organization?: string;
  preferredDatetime?: Date;
  reason?: string;
  interestedMajor?: string;
  interestedDegree?: string;
  lastAcademicResult?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  adminReply?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    source: { 
      type: String, 
      enum: ['consultation', 'contact', 'footer'], 
      required: true 
    },
    name: { type: String, required: true, maxlength: 255 },
    email: { type: String, required: true, maxlength: 255 },
    phone: { type: String, maxlength: 50 },
    role: { 
      type: String, 
      enum: ['student', 'instructor', 'company'] 
    },
    organization: { type: String, maxlength: 255 },
    preferredDatetime: { type: Date },
    reason: { type: String },
    interestedMajor: { type: String, maxlength: 255 },
    interestedDegree: { type: String, maxlength: 100 },
    lastAcademicResult: { type: String, maxlength: 255 },
    status: { 
      type: String, 
      enum: ['new', 'contacted', 'converted', 'closed'], 
      default: 'new' 
    },
    adminReply: { type: String },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
InquirySchema.index({ status: 1 });
InquirySchema.index({ createdAt: -1 });

// Create and export the model
const InquiryModel = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

// Export Inquiry with the old API interface for compatibility
export const Inquiry = {
  // find() - supports both old API and chainable query API
  find(conditions: any = {}, options: { limit?: number; offset?: number } = {}): any {
    // If called without options (chainable API), return chainable query
    if (!options.limit && !options.offset) {
      const query = InquiryModel.find(conditions);
      return {
        populate(field: string, select?: string) {
          if (typeof field === 'object') {
            this.query = this.query.populate(field);
          } else {
            this.query = this.query.populate(field, select);
          }
          return this;
        },
        query,
        sort(sortObj: any) {
          this.query = this.query.sort(sortObj);
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
    }
    
    // Old API with options
    let query = InquiryModel.find(conditions);
    if (options.offset) query = query.skip(options.offset);
    if (options.limit) query = query.limit(options.limit);
    return query.sort({ createdAt: -1 });
  },

  async findById(id: string | number): Promise<any> {
    return InquiryModel.findById(id);
  },

  async findByIdAndUpdate(id: string | number, data: any, options?: any): Promise<any> {
    return (InquiryModel as any).findByIdAndUpdate(id, data, options);
  },

  async create(data: Partial<IInquiry>): Promise<IInquiry> {
    const inquiry = new InquiryModel({
      source: data.source,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      organization: data.organization,
      preferredDatetime: data.preferredDatetime,
      reason: data.reason,
      interestedMajor: data.interestedMajor,
      interestedDegree: data.interestedDegree,
      lastAcademicResult: data.lastAcademicResult,
    });
    return inquiry.save();
  },

  async countDocuments(query: any = {}): Promise<number> {
    return InquiryModel.countDocuments(query);
  },

  async count(query: any = {}): Promise<number> {
    return this.countDocuments(query);
  },

  async update(id: string | number, data: Partial<IInquiry>): Promise<IInquiry | null> {
    const updateData: any = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.adminReply !== undefined) updateData.adminReply = data.adminReply;
    if (data.repliedAt !== undefined) updateData.repliedAt = data.repliedAt;
    if (data.status === 'contacted' && !data.repliedAt) {
      updateData.repliedAt = new Date();
    }
    
    return InquiryModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  },

  async delete(id: string | number): Promise<boolean> {
    await InquiryModel.findByIdAndDelete(id);
    return true;
  },
};

export default InquiryModel;