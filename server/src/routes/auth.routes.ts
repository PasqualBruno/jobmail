import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  },
);

router.get('/me', authMiddleware, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true
      }
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    console.log("Rota /me acessada por:", user.email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

export default router;
