import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  description?: string;
  shortDesc?: string;
  image?: string;
  color?: string;
  icon?: string;
  location?: string;
  address?: string;
  href?: string;
  tags?: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, lowercase: true, maxlength: 255 },
    description: { type: String },
    shortDesc: { type: String, maxlength: 255 },
    image: { type: String, maxlength: 500 },
    color: { type: String, maxlength: 20 },
    icon: { type: String, maxlength: 50 },
    location: { type: String, maxlength: 100 },
    address: { type: String, maxlength: 255 },
    href: { type: String, maxlength: 255 },
    tags: [{ type: String, maxlength: 50 }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ isActive: 1 });
ServiceSchema.index({ order: 1 });

const ServiceModel = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export const Service = {
  async find(query: any = {}): Promise<any[]> {
    return ServiceModel.find(query).sort({ order: 1 }).lean();
  },

  async findActive(): Promise<any[]> {
    return ServiceModel.find({ isActive: true }).sort({ order: 1 }).lean();
  },

  async findById(id: string): Promise<any | null> {
    return ServiceModel.findById(id).lean();
  },

  async findBySlug(slug: string): Promise<any | null> {
    return ServiceModel.findOne({ slug, isActive: true }).lean();
  },

  async create(data: Partial<IService>): Promise<IService> {
    const service = new ServiceModel(data);
    return service.save();
  },

  async update(id: string, data: Partial<IService>): Promise<IService | null> {
    return ServiceModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  },

  async delete(id: string): Promise<IService | null> {
    return ServiceModel.findByIdAndDelete(id);
  },

  async count(filter?: any): Promise<number> {
    return ServiceModel.countDocuments(filter || { isActive: true });
  },
};

export default ServiceModel;