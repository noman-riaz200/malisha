// types/next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id:               string;
      name:             string;
      email:            string;
      role:             string;
      isEmailVerified:  boolean;
    };
  }
  interface User {
    role:            string;
    isEmailVerified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id:               string;
    role:             string;
    isEmailVerified:  boolean;
  }
}

// types/index.ts — shared application types
export type Role = 'student' | 'admin' | 'super_admin';
export type AppStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type DegreeLevel = 'bachelor' | 'master' | 'phd' | 'foundation' | 'language';
export type Medium = 'english' | 'chinese';
export type InquiryStatus = 'new' | 'contacted' | 'converted' | 'closed';

export interface ApiResponse<T> {
  success: boolean;
  data?:   T;
  error?:  string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data:  T[];
  total: number;
  page:  number;
  pages: number;
}

export interface UniversityBadges {
  is211:              boolean;
  is985:              boolean;
  isDoubleFirstClass: boolean;
  cscaRequired:       boolean;
}

export interface UniversityIntake {
  season:   'march' | 'september';
  year:     number;
  deadline: string;
}

export interface UniversityLocation {
  city:     string;
  province: string;
  country:  string;
}

export interface AdminNote {
  note:     string;
  addedBy:  string;
  addedAt:  string;
}

export interface AnalyticsData {
  totalStudents:      number;
  totalApplications:  number;
  statusCounts:       Record<string, number>;
  recentApplications: any[];
  totalRevenue:       number;
}
