import { db } from '@/utils/db.server';
import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  pages: {
    signIn: '/login',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const user = await db.users.findFirst({
          where: {
            email: profile.email,
          },
        });

        return {
          id: user?.id ?? 'guest',
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          roles: user?.roles,
        };
      },
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.users.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
          randomKey: 'Hey cool',
        };
      },
    }),
  ],
  callbacks: {
    signIn: async ({ profile }) => {
      const user = await db.users.findFirst({
        where: {
          email: profile.email,
        },
      });
      const roles = user?.roles?.split(',');
      if (roles?.includes('5')) {
        return true;
      } else {
        return false;
      }
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          roles: token.roles,
          id: token.id,
        },
      };
    },

    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          roles: user.roles,
          id: user.id,
        };
      }
      return token;
    },
  },
};
