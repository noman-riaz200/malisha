// Test login flow
import connectDB from '@/lib/db/mongoose';
import { User } from '@/lib/db/models/User';

async function testLogin() {
  await connectDB();
  
  const email = 'admin@malisha.com';
  const password = 'admin123';
  
  console.log('[Test] Searching for email:', email);
  const user = await User.findByEmail(email);
  console.log('[Test] User found:', user ? 'yes' : 'no');
  
  if (!user) {
    console.log('[Test] FAIL: No user found');
    return;
  }
  
  console.log('[Test] User details:', {
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  });
  
  const valid = await user.comparePassword(password);
  console.log('[Test] Password valid:', valid);
  
  if (valid) {
    console.log('[Test] SUCCESS: Login would succeed');
  } else {
    console.log('[Test] FAIL: Password invalid');
  }
}

testLogin().catch(console.error).finally(() => process.exit(0));