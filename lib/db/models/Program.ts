import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProgram extends Document {
  universityId: Types.ObjectId;
  name: string;
  slug: string;
  degreeLevel: 'bachelor' | 'master' | 'phd' | 'foundation' | 'language';
  medium: 'english' | 'chinese';
  majorCategory: string;
  duration: number;
  tuitionFeeUsd: number;
  applicationFeeUsd: number;
  scholarshipAvailable: boolean;
  description?: string;
  requirements?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
    name: { type: String, required: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, lowercase: true, maxlength: 255 },
    degreeLevel: { 
      type: String, 
      enum: ['bachelor', 'master', 'phd', 'foundation', 'language'], 
      required: true 
    },
    medium: { 
      type: String, 
      enum: ['english', 'chinese'], 
      required: true 
    },
    majorCategory: { type: String, required: true, maxlength: 100 },
    duration: { type: Number, required: true },
    tuitionFeeUsd: { type: Number, required: true },
    applicationFeeUsd: { type: Number, default: 50 },
    scholarshipAvailable: { type: Boolean, default: false },
    description: { type: String },
    requirements: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes
ProgramSchema.index({ universityId: 1 });
ProgramSchema.index({ degreeLevel: 1 });
ProgramSchema.index({ medium: 1 });
ProgramSchema.index({ slug: 1 });

// Create and export the model
const ProgramModel = mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);

// Export Program with the old API interface for compatibility
export const Program = {
  async find(conditions: { universityId?: string; degreeLevel?: string; medium?: string } = {}, options: { limit?: number; offset?: number } = {}): Promise<IProgram[]> {
    const filter: any = { isActive: true };
    if (conditions.universityId) filter.universityId = new Types.ObjectId(conditions.universityId);
    if (conditions.degreeLevel) filter.degreeLevel = conditions.degreeLevel;
    if (conditions.medium) filter.medium = conditions.medium;
    
    let query = ProgramModel.find(filter).sort({ tuitionFeeUsd: 1 });
    if (options.offset) query = query.skip(options.offset);
    if (options.limit) query = query.limit(options.limit);
    return query;
  },

  async findBySlug(slug: string): Promise<IProgram | null> {
    return ProgramModel.findOne({ slug, isActive: true });
  },

  async findById(id: string | number): Promise<IProgram | null> {
    return ProgramModel.findById(id);
  },

  async findByUniversity(universityId: string | number): Promise<IProgram[]> {
    return ProgramModel.find({ 
      universityId: new Types.ObjectId(String(universityId)), 
      isActive: true 
    });
  },

  async create(data: Partial<IProgram>): Promise<IProgram> {
    const program = new ProgramModel({
      universityId: data.universityId,
      name: data.name,
      slug: data.slug,
      degreeLevel: data.degreeLevel,
      medium: data.medium,
      majorCategory: data.majorCategory,
      duration: data.duration,
      tuitionFeeUsd: data.tuitionFeeUsd,
      applicationFeeUsd: data.applicationFeeUsd || 50,
      scholarshipAvailable: data.scholarshipAvailable || false,
      description: data.description,
      requirements: data.requirements,
    });
    return program.save();
  },

  async update(id: string | number, data: Partial<IProgram>): Promise<IProgram | null> {
    return ProgramModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  },
};

export type { IProgram };
export default ProgramModel;