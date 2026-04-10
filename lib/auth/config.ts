import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

const loginSchema = z.object({
  email:    z.string().email(),
  password:  z.string().min(1),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          console.error('[Auth] Validation failed:', parsed.error);
          return null;
        }

        let dbConnectionError = false;
        
        try {
          const mongooseModule = await import('@/lib/db/mongoose');
          const connectDB = mongooseModule.connectDB;
          const isConnected = mongooseModule.isConnected;
          const { User } = await import('@/lib/db/models/User');
          
          const dbConnected = await isConnected();
          if (!dbConnected) {
            console.log('[Auth] Database not connected, establishing connection...');
            await connectDB();
          }
          
          const connectionOk = await isConnected();
          if (!connectionOk) {
            console.error('[Auth] Database connection failed');
            dbConnectionError = true;
            throw new Error('DATABASE_CONNECTION_FAILED');
          }
          
          console.log('[Auth] Searching for email:', parsed.data.email);
          console.log('[Auth] Connection established');
          
          // Query user from MongoDB
          const user = await User.findByEmail(parsed.data.email);
          console.log('[Auth] User query completed, result:', user ? 'found' : 'not found');
          console.log('[Auth] User found:', user ? 'yes' : 'no', user?.email, user?.role);
          
          if (!user) {
            console.log('[Auth] No user found with email');
            return null;
          }

          // Compare password
          console.log('[Auth] Comparing password...');
          const valid = await user.comparePassword(parsed.data.password);
          console.log('[Auth] Password valid:', valid);
          
          if (!valid) {
            console.log('[Auth] Password invalid');
            return null;
          }

          console.log('[Auth] Login successful for:', user.email);
          return {
            id:               user._id?.toString() || '',
            email:            user.email,
            name:             `${user.firstName} ${user.lastName}`,
            role:             user.role || 'student',
            isEmailVerified:  user.isEmailVerified || false,
          };
        } catch (error: any) {
          console.error('[Auth] Error during authorization:', error?.message || error);
          
          if (error?.message === 'DATABASE_CONNECTION_FAILED') {
            throw new Error('Database connection failed. Please check your MongoDB configuration and IP whitelist.');
          }
          
          if (error?.name === 'MongooseServerSelectionError' || error?.message?.includes('connect')) {
            throw new Error('Cannot connect to MongoDB. Please verify your MONGODB_URI and ensure your IP is whitelisted in MongoDB Atlas.');
          }
          
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id              = user.id;
        token.role            = (user as any).role;
        token.isEmailVerified = (user as any).isEmailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id              = token.id as string;
        session.user.role            = token.role as string;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
};

// Helper function to get session in server components/API routes
export async function auth() {
  return await getServerSession(authOptions);
}
