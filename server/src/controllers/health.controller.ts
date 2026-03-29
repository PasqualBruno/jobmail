import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export class HealthController {
  async check(req: Request, res: Response) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return res.json({
        status: "ok",
        message: "Servidor e Banco de dados operantes!",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Erro ao conectar no banco.",
      });
    }
  }
}
