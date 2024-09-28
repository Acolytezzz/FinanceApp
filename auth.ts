import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const config = {
  runtime: 'nodejs',
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide an email and password");
        }

        const { default: connectDB } = await import("@/lib/db");
        const { default: User } = await import("@/models/Users");

        await connectDB();

        const existingUser = await User.findOne({ email }).select("+password");

        if (!existingUser) {
          throw new CredentialsSignin("User does not exist");
        }

        if (!existingUser.password) {
          throw new CredentialsSignin("Password is not defined");
        }

        const checkPassword = await compare(password, existingUser.password);

        if (!checkPassword) {
          throw new CredentialsSignin("Incorrect password");
        }

        const userData = {
          id: existingUser._id.toString(), // Ensure id is a string
          name: existingUser.name,
          email: existingUser.email,
        }; // Add this log

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    signIn: async ({ account }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
