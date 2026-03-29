// =============================================================================
// scripts/setup-db.ts — Initial database setup for MongoDB
// =============================================================================
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

import connectDB from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';

async function setupDatabase() {
  await connectDB();

  console.log('Setting up MongoDB database...');

  // Create a default admin user if not exists
  const adminEmail = 'admin@edupro.com';
  const existingAdmin = await User.findByEmail(adminEmail);

  if (!existingAdmin) {
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'Admin',
      email: adminEmail,
      password: 'admin123', // Will be hashed by the model's pre-save middleware
      role: 'admin',
      isEmailVerified: true,
    });
    console.log('Admin user created:', admin.email);
  } else {
    console.log('Admin user already exists');
  }

  console.log('Database setup complete!');
}

setupDatabase().catch(console.error);