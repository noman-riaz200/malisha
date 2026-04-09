// scripts/create-admin-malisha.ts — Create specific admin user
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

import connectDB from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';

async function createAdmin() {
  await connectDB();

  const adminEmail = 'admin@malisha.com';
  const adminPassword = 'admin123';
  
  console.log('Creating/updating Malisha admin user...');

  let admin = await User.findByEmail(adminEmail);
  
  if (admin) {
    console.log('Admin exists, updating...');
    admin.role = 'admin';
    admin.isEmailVerified = true;
    admin.firstName = 'Malisha';
    admin.lastName = 'Admin';
    // Password re-hash if needed via pre-save
    admin.password = adminPassword; 
    admin = await admin.save();
  } else {
    admin = await User.create({
      firstName: 'Malisha',
      lastName: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      isEmailVerified: true,
    });
    console.log('New admin created:', admin.email);
  }

  console.log('Admin setup complete! Email:', adminEmail, 'Password: admin123');
}

createAdmin().catch(console.error);

