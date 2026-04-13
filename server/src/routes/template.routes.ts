import { Router } from "express";
import { TemplateController } from "../controllers/template.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
const templateController = new TemplateController();

router.post("/", authMiddleware, templateController.create);
router.get("/", authMiddleware, templateController.list);
router.get("/:id", authMiddleware, templateController.findById);
router.patch("/:id", authMiddleware, templateController.update);
router.delete("/:id", authMiddleware, templateController.delete);

export default router;
