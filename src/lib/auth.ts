import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectToDB } from './db';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

// Extend the Session type for TypeScript
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }
        
        await connectToDB();
        
        // In a real app, you would fetch the user from your database
        // This is a simple check for the site owner
        if (credentials.email !== 'harrisonkimdev@gmail.com') {
          throw new Error('Invalid credentials');
        }
        
        // In a real app, you would securely store and verify passwords
        // This is a placeholder for demo purposes
        const isAdmin = credentials.email === 'harrisonkimdev@gmail.com' && 
                         credentials.password === process.env.ADMIN_PASSWORD;
                         
        if (!isAdmin) {
          throw new Error('Invalid credentials');
        }
        
        return {
          id: '1',
          email: credentials.email,
          name: 'Harrison Kim',
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
}; 