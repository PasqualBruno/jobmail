import cors from "cors";
import express from "express";
import passport from "passport";
import "./config/passport.js";
import { HealthController } from "./controllers/health.controller.js";
import authRoutes from "./routes/auth.routes.js";
import templateRoutes from "./routes/template.routes.js";

const app = express();
const healthController = new HealthController();

// Middlewares
app.set("trust proxy", 1);
app.use(express.json());
app.use(passport.initialize());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Rotas
app.use("/auth", authRoutes);
app.use("/templates", templateRoutes);

app.get("/health", (req, res) => healthController.check(req, res));

export { app };
