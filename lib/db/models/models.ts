// MongoDB Models - Main entry point
import { 
  User, 
  University, 
  Program, 
  Application, 
  AppDocument, 
  Payment, 
  Inquiry 
} from './index';

// Type exports
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
export type DocumentType = 'passport' | 'academic_cert' | 'transcript' | 'photo' | 'english_cert' | 'other';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded';
export type InquiryStatus = 'new' | 'contacted' | 'converted' | 'closed';

// Export all models
export {
  User,
  University,
  Program,
  Application,
  AppDocument,
  Payment,
  Inquiry
};
