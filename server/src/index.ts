import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

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
