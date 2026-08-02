import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb, getMongoClient } from "./mongodb";

const authDb = await getDb();
const authClient = await getMongoClient();

function getBaseAuthOptions({ allowSignUp = false } = {}) {
  return {
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(authDb, {
      client: authClient
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: !allowSignUp,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5
      }
    },
    advanced: {
      database: {
        generateId: false
      },
      cookies: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      }
    },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 10
    },
    experimental: {
      joins: true
    },
    plugins: [nextCookies()]
  };
}

export const auth = betterAuth(getBaseAuthOptions());
export const bootstrapAuth = betterAuth(getBaseAuthOptions({ allowSignUp: true }));
