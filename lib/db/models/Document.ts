import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IAppDocument extends Document {
  applicationId: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  docType: 'passport' | 'academic_cert' | 'transcript' | 'photo' | 'english_cert' | 'other';
  fileUrl: string;
  s3Key: string;
  originalFilename?: string;
  mimeType?: string;
  fileSize?: number;
  createdAt: Date;
}

const AppDocumentSchema = new Schema<IAppDocument>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    docType: { 
      type: String, 
      enum: ['passport', 'academic_cert', 'transcript', 'photo', 'english_cert', 'other'], 
      required: true 
    },
    fileUrl: { type: String, required: true, maxlength: 500 },
    s3Key: { type: String, required: true, maxlength: 500 },
    originalFilename: { type: String, maxlength: 255 },
    mimeType: { type: String, maxlength: 100 },
    fileSize: { type: Number },
  },
  { timestamps: true }
);

// Index
AppDocumentSchema.index({ applicationId: 1 });

// Create and export the model
const AppDocumentModel = mongoose.models.AppDocument || mongoose.model<IAppDocument>('AppDocument', AppDocumentSchema);

// Export AppDocument with the old API interface for compatibility
export const AppDocument = {
  find(filter?: object, options?: { sort?: any; limit?: number; skip?: number }): any {
    const query = AppDocumentModel.find(filter || {});
    return {
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
  },

  async findById(id: string | number): Promise<IAppDocument | null> {
    return AppDocumentModel.findById(id);
  },

  async create(data: Partial<IAppDocument>): Promise<IAppDocument> {
    const doc = new AppDocumentModel({
      applicationId: data.applicationId,
      uploadedBy: data.uploadedBy,
      docType: data.docType,
      fileUrl: data.fileUrl,
      s3Key: data.s3Key,
      originalFilename: data.originalFilename,
      mimeType: data.mimeType,
      fileSize: data.fileSize,
    });
    return doc.save();
  },

  async delete(id: string | number): Promise<boolean> {
    await AppDocumentModel.findByIdAndDelete(id);
    return true;
  },
};

export default AppDocumentModel;