import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);


const mongoURI = process.env.MONGO_AUTH_DB
if (!mongoURI) {
    throw new Error("Better auth mongodb var is not valid")
}
const client = new MongoClient(mongoURI);
const db = client.db("fakeUser_01");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: "Reset Your Password",
                html: `
                <h2>If you haven't requested password reset then please ignore this email </h2>
                Click the link to reset your password: ${url}
                `
            })
        }
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Hello World',
                text: `
                <h1>Congrats on sending your <strong>first email</strong>!</h1>
                <p>Click the link to verify your email: ${url}</p> 
                `
            });
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 7 * 24 * 3600 // 7 day
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