import { Router } from "express";
import passport from "passport";

import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
const authController = new AuthController();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.send"],
    accessType: "offline",
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback,
);

router.get("/me", authMiddleware, authController.me);

export default router;
