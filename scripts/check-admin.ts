// Debug script to check admin user
import connectDB from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';

async function checkAdmin() {
  await connectDB();
  
  const admin = await User.findOne({ email: 'admin@malisha.com' });
  if (!admin) {
    console.log('Admin user NOT found!');
    return;
  }
  
  console.log('Admin found:', admin.email, '| Role:', admin.role);
  console.log('Password hash:', admin.password.substring(0, 30) + '...');
  
  // Test password
  const valid = await admin.comparePassword('admin123');
  console.log('Password "admin123" valid:', valid);
  
  // Test wrong password
  const invalid = await admin.comparePassword('wrong');
  console.log('Password "wrong" valid:', invalid);
}

checkAdmin().catch(console.error);