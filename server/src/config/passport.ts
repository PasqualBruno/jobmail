import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.send"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log({ profile });

      try {
        const user = await prisma.user.upsert({
          where: { googleId: profile.id },
          update: {
            accessToken,
            refreshToken,
            avatarUrl: profile.photos?.[0].value,
          },
          create: {
            googleId: profile.id,
            email: profile.emails?.[0].value!,
            name: profile.displayName,
            avatarUrl: profile.photos?.[0].value,
            accessToken,
            refreshToken,
          },
        });
        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    },
  ),
);
