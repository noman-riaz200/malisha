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

// Indexes
ApplicationSchema.index({ studentId: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ universityId: 1 });
ApplicationSchema.index({ createdAt: -1 });

// Lazy model getter
let ApplicationModelPromise: Promise<Model<IApplication>> | null = null;

async function getApplicationModel(): Promise<Model<IApplication>> {
  await connectDB();
  if (!ApplicationModelPromise) {
    ApplicationModelPromise = Promise.resolve(
      (mongoose.models.Application as Model<IApplication>) || mongoose.model<IApplication>('Application', ApplicationSchema)
    );
  }
  return ApplicationModelPromise;
}

export { getApplicationModel };

// Default export for backward compat
// Fixed lazy loading - use await getApplicationModel()

// Helper function to transform MongoDB result to API-compatible format
function transformApp(app: IApplication | null): any {
  if (!app) return null;
  return {
    ...app.toObject(),
    _id: app._id,
    id: app._id.toString(),
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
  };
}

// Query builder class for chainable operations
class ApplicationQuery {
  private query: any;
  private filter: any = {};
  
  constructor(studentId?: string) {
    if (studentId) {
      this.filter.studentId = new Types.ObjectId(studentId);
    }
    this.query = getApplicationModel().then(model => model.find(this.filter));
  }
  
  populate(field: string, select?: string): this {
    this.query = this.query.populate(field, select);
    return this;
  }
  
  sort(sortObj: any): this {
    this.query = this.query.sort(sortObj);
    return this;
  }
  
  limit(n: number): this {
    this.query = this.query.limit(n);
    return this;
  }
  
  lean(): this {
    this.query = this.query.lean();
    return this;
  }
  
  async then(resolve: (value: any[]) => void, reject: (reason: any) => void): Promise<void> {
    try {
      const results = await this.query;
      resolve(results);
    } catch (e) {
      reject(e);
    }
  }
  
  // Support for await
  async exec(): Promise<any[]> {
    return this.query;
  }
}

// Export Application with the old API interface for compatibility
export const Application = {
  find(conditions: { studentId?: string; universityId?: string; status?: string } = {}, options: { limit?: number; offset?: number; sort?: string } = {}): any {
    const filter: any = {};
    if (conditions.studentId) filter.studentId = new Types.ObjectId(conditions.studentId);
    if (conditions.universityId) filter.universityId = new Types.ObjectId(conditions.universityId);
    if (conditions.status) filter.status = conditions.status;
    
    const sortObj: any = {};
    if (options.sort) {
      const parts = options.sort.split(' ');
      sortObj[parts[0]] = parts[1] === 'DESC' ? -1 : 1;
    } else {
      sortObj.updatedAt = -1;
    }
    
(await getApplicationModel()).find(filter).sort(sortObj);
    if (options.offset) query = query.skip(options.offset);
    if (options.limit) query = query.limit(options.limit);
    
    // Return chainable query object
    return {
      query,
      populate(field: string, select?: string) {
        if (typeof field === 'object') {
          // Handle object-based populate
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
        return this.query.then((apps: any) => apps.map(transformApp)).then(resolve).catch(reject);
      },
      exec() {
        return this.query.then((apps: any) => apps.map(transformApp));
      }
    };
  },

  // findById returns a query with populate capability for the API
  findById(id: string | number): any {
const query = (await getApplicationModel()).findById(id);
    return {
      query,
      populate(field: string, select?: string) {
        if (typeof field === 'object') {
          this.query = this.query.populate(field);
        } else {
          this.query = this.query.populate(field, select);
        }
        return this;
      },
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
      then(resolve: (value: any) => void, reject: (reason: any) => void) {
        return this.query.then((app: any) => app ? transformApp(app) : null).then(resolve).catch(reject);
      },
      exec() {
        return this.query.then((app: any) => app ? transformApp(app) : null);
      }
    };
  },

  async findOne(query: any): Promise<any> {
    const filter: any = {};
    if (query.studentId) filter.studentId = new Types.ObjectId(query.studentId);
    if (query._id) filter._id = new Types.ObjectId(query._id);
    if (query.id) filter._id = new Types.ObjectId(query.id);
    
    const app = await getApplicationModel().then(model => model.findOne(filter));
    return transformApp(app);
  },

  async create(data: Partial<IApplication>): Promise<any> {
    const model = await getApplicationModel();
    const app = new model({
      studentId: data.studentId,
      programId: data.programId,
      universityId: data.universityId,
      status: data.status || 'draft',
      personal: data.personal,
      education: data.education,
      language: data.language,
      currentStep: data.currentStep || 1,
    });
    const created = await app.save();
    return transformApp(created);
  },

  async update(id: string | number, data: Partial<IApplication>): Promise<any> {
    const updateData: any = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.personal !== undefined) updateData.personal = data.personal;
    if (data.education !== undefined) updateData.education = data.education;
    if (data.language !== undefined) updateData.language = data.language;
    if (data.paymentStatus !== undefined) updateData.paymentStatus = data.paymentStatus;
    if (data.paymentId !== undefined) updateData.paymentId = data.paymentId;
    if (data.submittedAt !== undefined) updateData.submittedAt = data.submittedAt;
    if (data.currentStep !== undefined) updateData.currentStep = data.currentStep;
    if (data.reviewedBy !== undefined) updateData.reviewedBy = data.reviewedBy;
    if (data.reviewedAt !== undefined) updateData.reviewedAt = data.reviewedAt;
    if (data.decisionNote !== undefined) updateData.decisionNote = data.decisionNote;
    if (data.adminNotes !== undefined) updateData.adminNotes = data.adminNotes;

    const model = await getApplicationModel();
    const updated = await model.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return transformApp(updated);
  },

async findByIdAndUpdate(id: string, data: any, options?: any): Promise<any> {
    const model = await getApplicationModel();
    const updated = await (model as any).findByIdAndUpdate(id, data, options || { new: true });
    return updated ? transformApp(updated) : null;
  },

  countDocuments(conditions: { studentId?: string; status?: string } = {}): any {
    const filter: any = {};
    if (conditions.studentId) filter.studentId = new Types.ObjectId(conditions.studentId);
    if (conditions.status) filter.status = conditions.status;
    
    const model = await getApplicationModel();
    const query = model.countDocuments(filter);
    
    return {
      query,
      then(resolve: (value: number) => void, reject: (reason: any) => void) {
        return this.query.then(resolve).catch(reject);
      },
      exec() {
        return this.query;
      }
    };
  },

  async count(conditions: any = {}): Promise<number> {
    return this.countDocuments(conditions as any).exec();
  },

  async deleteById(id: string | number): Promise<boolean> {
    const model = await getApplicationModel();
    await model.findByIdAndDelete(id);
    return true;
  },

  async aggregate(pipeline: any[]): Promise<any> {
    const model = await getApplicationModel();
    return model.aggregate(pipeline);
  }
};


