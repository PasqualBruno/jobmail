import type {
  ITemplate,
  ITemplateCreate,
  ITemplateUpdate,
} from "../types/templates.interfaces";
import { BaseRepository } from "./base.repository";

class TemplateRepository extends BaseRepository {
  private readonly route = "/templates";

  async findAll(): Promise<ITemplate[]> {
    const { data } = await this.api.get<ITemplate[]>(this.route);
    return data;
  }

  async create(template: ITemplateCreate): Promise<ITemplate> {
    const { data } = await this.api.post<ITemplate>(this.route, template);
    return data;
  }

  async update(id: string, template: ITemplateUpdate): Promise<ITemplate> {
    const { data } = await this.api.patch<ITemplate>(
      `${this.route}/${id}`,
      template,
    );
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`${this.route}/${id}`);
  }
}

export const templateRepository = new TemplateRepository();
