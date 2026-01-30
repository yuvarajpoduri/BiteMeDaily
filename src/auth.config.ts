import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Protected routes
      const isProtectedRoute = 
        nextUrl.pathname.startsWith('/home') || 
        nextUrl.pathname.startsWith('/stories') || 
        nextUrl.pathname.startsWith('/saved');
      
      const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup';

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      } else if (isAuthRoute) {
        if (isLoggedIn) {
           return Response.redirect(new URL('/home', nextUrl));
        }
      }
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token }: any) {
      return token;
    }
  },
  providers: [], 
} satisfies NextAuthConfig;
