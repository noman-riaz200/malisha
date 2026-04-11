import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://malisha:malisha123@malisha0.44r94mh.mongodb.net/?appName=malisha0';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  isEmailVerified: Boolean,
}, { timestamps: true });

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected!');
    
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    const existing = await User.findOne({ email: 'admin@malisha.com' });
    if (existing) {
      console.log('Admin user already exists');
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
    
    console.log('Admin created:', admin.email);
  } catch (e: any) {
    console.error('Error:', e.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();
