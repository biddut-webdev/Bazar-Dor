
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";



const mongoUrl = process.env.BETTER_AUTH_MONGODB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_MONGODB_URL is missing");
}

const client = new MongoClient(mongoUrl);

const db = client.db("Bazar-Dor");


export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      disableImplicitLinking: false,
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-theta-five.vercel.app",
  ],
});
