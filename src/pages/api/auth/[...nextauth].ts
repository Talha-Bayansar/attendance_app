import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import type { Role } from "@prisma/client";

type CustomSession = {
  expires: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    role?: Role;
    organisationId?: string;
  };
};

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      const customSession: CustomSession = session;
      if (customSession.user) {
        customSession.user.id = user.id;
        customSession.user.role = user["role"];
        customSession.user.organisationId = user["organisationId"];
      }
      return customSession;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
