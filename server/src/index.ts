import "dotenv/config";
import express from "express";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors';
import { prisma } from "./lib/prisma.js";


const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use(cors({
  origin: process.env.FRONTEND_URL
}))

const PORT = process.env.PORT || 3001;

app.use("/auth", authRoutes);

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", message: "Servidor e Banco de dados operantes!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Erro ao conectar no banco." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 JobMail Back-end rodando em http://localhost:${PORT}`);
});
