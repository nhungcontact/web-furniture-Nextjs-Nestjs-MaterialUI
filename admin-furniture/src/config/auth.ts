import { User, WithToken } from "@/types/user";
import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const log = (action: string, message: string, data?: unknown) => {
  console.log(
    `🛡️  - ${new Date().toLocaleString()} - NextAuth: [${action}] ${message}`,
    data ?? "",
  );
};

const authOptions: AuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: appConfig.GOOGLE_ID,
    //   clientSecret: appConfig.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        log("authorize", `${credentials?.email} | ${req.headers?.["user-agent"]}`);

        try {
          const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // If no error and we have user data, return it
          if (!user.message) {
            return user;
          } else {
            throw new Error(user.message);
          }
        } catch (error) {
          log("authorize", "Error during authentication", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { refreshToken, accessToken, userType } = user as unknown as User &
          WithToken;
        token = {
          ...token,
          refreshToken,
          accessToken,
          userType,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🚀 ~ file: auth.ts:98 ~ session ~ token:", token);
      const { accessToken, userType } = token;
      session.user = {
        accessToken,
        userType,
      } as never;
      return session;
    },
  },
};

export default authOptions;
