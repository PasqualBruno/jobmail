import { PrismaClient, Template } from "@prisma/client";
import { CreateTemplateDTO, UpdatetemplateDTO } from "./template.dto.js";

const prisma = new PrismaClient();

export class TemplateService {
  async create(data: CreateTemplateDTO, userId: string): Promise<Template> {
    return prisma.template.create({ data: { ...data, userId } });
  }

  async findAll(userId: string): Promise<Template[]> {
    return prisma.template.findMany({
      where: { userId },
    });
  }

  async findById(id: string, userId: string): Promise<Template | null> {
    return prisma.template.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: string,
    userId: string,
    data: UpdatetemplateDTO,
  ): Promise<Template | null> {
    const template = await prisma.template.findFirst({ where: { id, userId } });
    if (!template) return null;
    return prisma.template.update({ where: { id }, data });
  }

  async delete(id: string, userId: string): Promise<Template | null> {
    const template = await prisma.template.findFirst({ where: { id, userId } });
    if (!template) return null;
    return prisma.template.delete({ where: { id } });
  }
}
