import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'admin' | 'super_admin';
  isEmailVerified: boolean;
  phone?: string;
  nationality?: string;
  dateOfBirth?: Date;
  passportNumber?: string;
  profilePhoto?: string;
  addressStreet?: string;
  addressCity?: string;
  addressCountry?: string;
  addressPostalCode?: string;
  emailVerifyToken?: string;
  passwordResetToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, maxlength: 255 },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['student', 'admin', 'super_admin'], default: 'student' },
    isEmailVerified: { type: Boolean, default: false },
    phone: { type: String, maxlength: 50 },
    nationality: { type: String, maxlength: 100 },
    dateOfBirth: { type: Date },
    passportNumber: { type: String, maxlength: 50 },
    profilePhoto: { type: String, maxlength: 500 },
    addressStreet: { type: String, maxlength: 255 },
    addressCity: { type: String, maxlength: 100 },
    addressCountry: { type: String, maxlength: 100 },
    addressPostalCode: { type: String, maxlength: 20 },
    emailVerifyToken: { type: String, maxlength: 255, select: false },
    passwordResetToken: { type: String, maxlength: 255, select: false },
  },
  { timestamps: true }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Create and export the model
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// Export User with the old API interface for compatibility
export const User = {
  async findOne(conditions: { email?: string; id?: string }): Promise<IUser | null> {
    const query: any = {};
    if (conditions.email) query.email = conditions.email;
    if (conditions.id) query._id = conditions.id;
    return UserModel.findOne(query).select('+password') as Promise<IUser | null>;
  },

  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role || 'student',
      phone: data.phone,
      nationality: data.nationality,
      isEmailVerified: data.isEmailVerified,
      dateOfBirth: data.dateOfBirth,
      passportNumber: data.passportNumber,
      profilePhoto: data.profilePhoto,
      addressStreet: data.addressStreet,
      addressCity: data.addressCity,
      addressCountry: data.addressCountry,
      addressPostalCode: data.addressPostalCode,
    });
    return user.save();
  },

  async findById(id: string | number): Promise<IUser | null> {
    return UserModel.findById(id) as Promise<IUser | null>;
  },

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).select('+password') as Promise<IUser | null>;
  },

  async update(id: string | number, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, { $set: data }, { new: true }) as Promise<IUser | null>;
  },

  async count(conditions: { role?: string } = {}): Promise<number> {
    return UserModel.countDocuments(conditions as any);
  },

  async countDocuments(conditions: any = {}): Promise<number> {
    return UserModel.countDocuments(conditions);
  },

  // find() - supports both old API and chainable query API
  find(conditions: any = {}, options: { limit?: number; offset?: number } = {}): any {
    // If called without options (chainable API), return chainable query
    if (typeof conditions !== 'string' && !options.limit && !options.offset) {
      const query = UserModel.find(conditions as any);
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
        select(fields: string) {
          this.query = this.query.select(fields);
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
    let query = UserModel.find(conditions as any);
    if (options.offset) query = query.skip(options.offset);
    if (options.limit) query = query.limit(options.limit);
    return query;
  },
};

export type { IUser };
export default UserModel;
