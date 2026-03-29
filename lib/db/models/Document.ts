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
  async find(applicationId: string | number): Promise<IAppDocument[]> {
    return AppDocumentModel.find({ applicationId: new Types.ObjectId(String(applicationId)) });
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

export type { IAppDocument };
export default AppDocumentModel;