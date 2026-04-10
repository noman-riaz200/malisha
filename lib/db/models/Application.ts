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

let ApplicationModel: Model<IApplication> | null = null;

async function getApplicationModel(): Promise<Model<IApplication>> {
  await connectDB();
  if (!ApplicationModel) {
    ApplicationModel = (mongoose.models.Application as Model<IApplication>) || mongoose.model<IApplication>('Application', ApplicationSchema);
  }
  return ApplicationModel;
}

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

export const Application = {
  find(conditions: any = {}, options: any = {}): any {
    return getApplicationModel().then((model) => {
      const filter: any = {};
      if (conditions.studentId) filter.studentId = new Types.ObjectId(conditions.studentId);
      if (conditions.universityId) filter.universityId = new Types.ObjectId(conditions.universityId);
      if (conditions.status) filter.status = conditions.status;
      
      let q: any = model.find(filter).sort({ updatedAt: -1 });
      if (options.offset) q = q.skip(options.offset);
      if (options.limit) q = q.limit(options.limit);
      
      const chain = {
        _query: q,
        get query() { return this._query; },
        populate(field: string, select?: string) {
          if (typeof field === 'object') {
            this._query = this._query.populate(field);
          } else {
            this._query = this._query.populate(field, select);
          }
          return chain;
        },
        sort(sortArg: any) {
          this._query = this._query.sort(sortArg);
          return chain;
        },
        skip(n: number) {
          this._query = this._query.skip(n);
          return chain;
        },
        limit(n: number) {
          this._query = this._query.limit(n);
          return chain;
        },
        lean() {
          this._query = this._query.lean();
          return chain;
        },
        then(resolve: any, reject: any) {
          return this._query.then((apps: any) => apps.map(transformApp)).then(resolve).catch(reject);
        },
        exec() {
          return this._query.then((apps: any) => apps.map(transformApp));
        }
      };
      return chain;
    });
  },

  findById(id: string | number): any {
    return getApplicationModel().then((model) => {
      const q: any = model.findById(id);
      
      const chain: any = {
        _query: q,
        get query() { return this._query; },
        populate(field: string, select?: string) {
          if (typeof field === 'object') {
            this._query = this._query.populate(field);
          } else {
            this._query = this._query.populate(field, select);
          }
          return chain;
        },
        sort(sortObj: any) {
          this._query = this._query.sort(sortObj);
          return chain;
        },
        skip(n: number) {
          this._query = this._query.skip(n);
          return chain;
        },
        limit(n: number) {
          this._query = this._query.limit(n);
          return chain;
        },
        lean() {
          this._query = this._query.lean();
          return chain;
        },
        then(resolve: any, reject: any) {
          return this._query.then((app: any) => app ? transformApp(app) : null).then(resolve).catch(reject);
        },
        exec() {
          return this._query.then((app: any) => app ? transformApp(app) : null);
        }
      };
      return chain;
    });
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

  async countDocuments(conditions: any = {}): Promise<number> {
    const model = await getApplicationModel();
    const filter: any = {};
    if (conditions.studentId) filter.studentId = new Types.ObjectId(conditions.studentId);
    if (conditions.status) filter.status = conditions.status;
    
    return model.countDocuments(filter);
  },

  async count(conditions: any = {}): Promise<number> {
    const model = await getApplicationModel();
    const filter: any = {};
    if (conditions.studentId) filter.studentId = new Types.ObjectId(conditions.studentId);
    if (conditions.status) filter.status = conditions.status;
    
    return model.countDocuments(filter);
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

export { getApplicationModel };
export default Application;