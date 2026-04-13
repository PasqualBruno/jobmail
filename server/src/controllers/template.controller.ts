import { Request, Response } from "express";
import { TemplateService } from "../services/template/template.service.js";

const templateService = new TemplateService();

export class TemplateController {
  async create(req: Request, res: Response) {
    try {
      const { title, content } = req.body;

      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      if (!title || !content) {
        return res.status(400).json({ error: "Campos obrigatorios ausentes" });
      }

      const template = await templateService.create(
        { title, content },
        req.user.id,
      );

      return res
        .status(201)
        .json({ data: template, message: "Template criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar template" });
    }
  }
  async list(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      const data = await templateService.findAll(req.user.id);
      return res
        .status(200)
        .json({ data, message: "Templates listados com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar templates" });
    }
  }
  async findById(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      const template = await templateService.findById(
        String(String(req.params.id)),
        req.user.id,
      );

      if (!template) {
        return res.status(404).json({ message: "Template nao encontrado" });
      }

      return res
        .status(200)
        .json({ template, message: "Template listado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar template" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      const template = await templateService.update(
        String(req.params.id),
        req.user.id,
        req.body,
      );

      if (!template) {
        return res.status(404).json({ error: "Template não encontrado" });
      }

      return res
        .status(200)
        .json({ data: template, message: "Template atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar template" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      const template = await templateService.delete(
        String(req.params.id),
        req.user.id,
      );

      if (!template) {
        return res.status(404).json({ error: "Template nao encontrado" });
      }

      return res.status(200).json({ message: "Template deletado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar template" });
    }
  }
}
