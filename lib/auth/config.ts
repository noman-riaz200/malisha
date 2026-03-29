import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          console.error('[Auth] Validation failed:', parsed.error);
          return null;
        }

        // Dynamic import to avoid mongoose in Edge runtime
        const mongooseModule = await import('@/lib/db/mongoose');
        const connectDB = mongooseModule.default;
        const { User } = await import('@/lib/db/models/User');
        
        await connectDB();
        
        console.log('[Auth] Searching for email:', parsed.data.email);
        
        // Query user from MongoDB
        const user = await User.findByEmail(parsed.data.email);
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
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id              = user.id;
        token.role            = (user as any).role;
        token.isEmailVerified = (user as any).isEmailVerified;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id              = token.id as string;
      session.user.role            = token.role as string;
      session.user.isEmailVerified = token.isEmailVerified as boolean;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
});
