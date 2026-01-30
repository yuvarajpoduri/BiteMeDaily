import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;
        
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) return null;

        try {
          await dbConnect();
          const user = await User.findOne({ email });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            };
          }
        } catch (error) {
          console.error('Auth error:', error);
        }

        console.log('Invalid credentials');
        return null; 
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
