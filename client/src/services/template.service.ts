import { templateRepository } from "../repositories/template.repository";
import type {
  ITemplate,
  ITemplateCreate,
  ITemplateUpdate,
} from "../types/templates.interfaces";

class TemplateService {
  // 1. Busca a lista completa
  async listAll(): Promise<ITemplate[]> {
    return await templateRepository.findAll();
  }

  // 2. Busca um único template por ID
  //   async getById(id: string): Promise<ITemplate> {
  //     return await templateRepository(id);
  //   }

  // 3. Cria um novo registro
  async save(data: ITemplateCreate): Promise<ITemplate> {
    return await templateRepository.create(data);
  }

  // 4. Atualiza um registro existente
  async update(id: string, data: ITemplateUpdate): Promise<ITemplate> {
    return await templateRepository.update(id, data);
  }

  // 5. Deleta um registro
  async remove(id: string): Promise<void> {
    return await templateRepository.delete(id);
  }
}

// Exporta uma instância única para o projeto todo usar
export const templateService = new TemplateService();
