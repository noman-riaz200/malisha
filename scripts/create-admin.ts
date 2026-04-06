// =============================================================================
// scripts/create-admin.ts — Create an admin user in MongoDB
// =============================================================================
import connectDB from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  await connectDB();

  const adminData = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@malisha.com',
    password: 'admin123',
    role: 'admin' as const,
    isEmailVerified: true,
  };

  // Check if admin already exists
  const existingAdmin = await User.findByEmail(adminData.email);
  if (existingAdmin) {
    console.log('Admin user already exists!');
    return;
  }

  const admin = await User.create(adminData);
  console.log('Admin user created successfully!');
  console.log('Email:', adminData.email);
  console.log('Password: admin123');
}

createAdmin().catch(console.error);