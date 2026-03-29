import { Router } from "express";
import { TemplateController } from "../controllers/template.controller.js";

const router = Router();
const templateController = new TemplateController();

router.post("/", templateController.create);
router.get("/", templateController.list);
router.get("/:id", templateController.findById);
router.put("/:id", templateController.update);
router.delete("/:id", templateController.delete);

export default router;
