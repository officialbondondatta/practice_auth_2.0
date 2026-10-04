import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const mongoURI = process.env.MONGO_AUTH_DB
if (!mongoURI) {
    throw new Error("Better auth mongodb var is not valid")
}
const client = new MongoClient(mongoURI);
const db = client.db("fakeUser_01");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.BETTER_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.BETTER_GOOGLE_CLIENT_SECRET as string
        }
    },
    database: mongodbAdapter(db, {
        client,
    }),
});