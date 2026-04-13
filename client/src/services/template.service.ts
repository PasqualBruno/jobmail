import { templateRepository } from "../repositories/template.repository";
import type {
  IApiResponse,
  ITemplate,
  ITemplateCreate,
  ITemplateUpdate,
} from "../types/templates.interfaces";

class TemplateService {
  async listAll(): Promise<IApiResponse<ITemplate[]>> {
    return await templateRepository.findAll();
  }

  async create(data: ITemplateCreate): Promise<IApiResponse<ITemplate>> {
    return await templateRepository.create(data);
  }

  async update(id: string, data: ITemplateUpdate): Promise<IApiResponse<ITemplate>> {
    return await templateRepository.update(id, data);
  }

  async remove(id: string): Promise<IApiResponse<void>> {
    return await templateRepository.delete(id);
  }
}

export const templateService = new TemplateService();