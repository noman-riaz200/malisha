import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/malisha';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  isEmailVerified: Boolean,
}, { timestamps: true });

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected!');
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    const existing = await User.findOne({ email: 'admin@malisha.com' });
    if (existing) {
      console.log('Admin user already exists:', existing.email, 'Role:', existing.role);
      return;
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@malisha.com',
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true,
    });
    
    console.log('Admin created successfully:', admin.email, 'Role:', admin.role);
  } catch (e: any) {
    console.error('Error:', e.message);
    if (e.message.includes('IP') || e.message.includes('whitelist')) {
      console.log('\n>>> ACTION REQUIRED: Add your server IP to MongoDB Atlas whitelist <<<');
      console.log('>>> Current IP: 4.240.39.195 <<<');
    }
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();