import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import prisma from "./db";
import { Resend } from "resend";
import { VerificationEmail } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true, // auto login when signup
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        magicLink({
            expiresIn: 300,
            disableSignUp: false,
            // TODO: Add rate limiting
            async sendMagicLink({ email, url }) {
                await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: email,
                    subject: "Drip | Verify Email",
                    react: VerificationEmail({ email, url }),
                });
            },
        }),
    ],
    rateLimit: {
        enabled: true,
        window: 10, // time window in seconds
        max: 100, // max requests in the window
    },
});
