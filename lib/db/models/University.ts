import mongoose, { Document, Schema } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  slug: string;
  description?: string;
  location?: string | {
    city: string;
    province: string;
    country: string;
  };
  locationObj?: {
    city: string;
    province: string;
    country: string;
  };
  type?: string;
  ranking?: number;
  worldRank?: string;
  foundedYear?: number;
  logo?: string;
  coverImage?: string;
  website?: string;
  tuitionRangeMin?: number;
  tuitionRangeMax?: number;
  badges?: {
    is211: boolean;
    is985: boolean;
    isDoubleFirstClass: boolean;
    cscaRequired: boolean;
  };
  studentsEnrolled?: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, lowercase: true, maxlength: 255 },
    description: { type: String },
    location: { type: Schema.Types.Mixed, maxlength: 255 },
    locationObj: { type: Schema.Types.Mixed },
    type: { type: String, maxlength: 100 },
    ranking: { type: Number },
    worldRank: { type: String, maxlength: 50 },
    foundedYear: { type: Number },
    logo: { type: String, maxlength: 500 },
    coverImage: { type: String, maxlength: 500 },
    website: { type: String, maxlength: 255 },
    tuitionRangeMin: { type: Number },
    tuitionRangeMax: { type: Number },
    badges: { type: Schema.Types.Mixed },
    studentsEnrolled: { type: Number },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes
UniversitySchema.index({ slug: 1 });
UniversitySchema.index({ location: 1 });
UniversitySchema.index({ isFeatured: 1 });
UniversitySchema.index({ name: 'text', location: 'text' });

// Create and export the model
const UniversityModel = mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);

// Export University with the old API interface for compatibility
export const University = {
  // find() - supports both old API (with options) and chainable query API (for .sort().lean())
  find(queryStr?: string | object, options: { limit?: number; offset?: number; featured?: boolean } = {}): any {
    // If called as chainable (no args, string, or object), return chainable query
    const isChainable = typeof queryStr === 'object' || queryStr === undefined || (queryStr === '' && !options.limit && !options.offset && !options.featured);
    if (isChainable) {
      const filter = typeof queryStr === 'object' ? queryStr : (queryStr === '' ? { isActive: true } : {});
      const query = UniversityModel.find(filter);
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
        then(resolve: (value: any[]) => void, reject: (reason: any) => void) {
          return this.query.then(resolve).catch(reject);
        },
        exec() {
          return this.query;
        }
      };
    }
    
    // Old API with search string
    const filter: any = { isActive: true };
    if (queryStr) {
      filter.$or = [
        { name: { $regex: queryStr, $options: 'i' } },
        { location: { $regex: queryStr, $options: 'i' } }
      ];
    }
    if (options.featured) {
      filter.isFeatured = true;
    }
    let query = UniversityModel.find(filter).sort({ ranking: 1 });
    if (options.offset) query = query.skip(options.offset);
    if (options.limit) query = query.limit(options.limit);
    return query;
  },

  async findBySlug(slug: string): Promise<IUniversity | null> {
    return UniversityModel.findOne({ slug, isActive: true });
  },

  async findOne(query: any): Promise<IUniversity | null> {
    return UniversityModel.findOne(query);
  },

  async findById(id: string | number): any {
    const query = UniversityModel.findById(id);
    return {
      query,
      lean() {
        this.query = this.query.lean();
        return this;
      },
      select(fields: string) {
        this.query = this.query.select(fields);
        return this;
      },
      then(resolve: (value: any) => void, reject: (reason: any) => void) {
        return this.query.then(resolve).catch(reject);
      },
      exec() {
        return this.query;
      }
    };
  },

  async findByIdLean(id: string | number): Promise<any> {
    return UniversityModel.findById(id).lean();
  },

  async create(data: Partial<IUniversity>): Promise<IUniversity> {
    const university = new UniversityModel({
      name: data.name,
      slug: data.slug,
      description: data.description,
      location: data.location,
      type: data.type,
      ranking: data.ranking,
      foundedYear: data.foundedYear,
      logo: data.logo,
      coverImage: data.coverImage,
      website: data.website,
      tuitionRangeMin: data.tuitionRangeMin,
      tuitionRangeMax: data.tuitionRangeMax,
      isFeatured: data.isFeatured || false,
    });
    return university.save();
  },

  async update(id: string | number, data: Partial<IUniversity>): Promise<IUniversity | null> {
    return UniversityModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  },

  async findByIdAndUpdate(id: string, data: any): Promise<IUniversity | null> {
    return UniversityModel.findByIdAndUpdate(id, data, { new: true });
  },

  async count(): Promise<number> {
    return UniversityModel.countDocuments({ isActive: true });
  },

  async countDocuments(filter?: any): Promise<number> {
    return UniversityModel.countDocuments(filter || { isActive: true });
  },

  async distinct(field: string, filter?: any): Promise<string[]> {
    return UniversityModel.distinct(field, filter || { isActive: true });
  },
};

export default UniversityModel;
