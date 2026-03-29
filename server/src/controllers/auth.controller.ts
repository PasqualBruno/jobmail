import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class AuthController {
  async googleCallback(req: Request, res: Response) {
    const user = req.user as any;
    const token = authService.generateToken(user);

    return res.redirect(
      `${process.env.FRONTEND_URL}/auth-success?token=${token}`,
    );
  }

  async me(req: any, res: Response) {
    try {
      const user = await authService.getUserById(req.userId);

      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar dados" });
    }
  }
}

export default new AuthController();
