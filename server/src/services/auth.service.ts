import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export class AuthService {
  generateToken(user: { id: string; email: string }) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }
}
