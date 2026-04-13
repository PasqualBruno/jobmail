import type {
  IApiResponse,
  ITemplate,
  ITemplateCreate,
  ITemplateUpdate,
} from "../types/templates.interfaces";
import { BaseRepository } from "./base.repository";

class TemplateRepository extends BaseRepository {
  private readonly route = "/templates";

  async findAll(): Promise<IApiResponse<ITemplate[]>> {
    const { data } = await this.api.get<IApiResponse<ITemplate[]>>(this.route);
    return data;
  }

  async create(template: ITemplateCreate): Promise<IApiResponse<ITemplate>> {
    const { data } = await this.api.post<IApiResponse<ITemplate>>(this.route, template);
    return data;
  }

  async update(id: string, template: ITemplateUpdate): Promise<IApiResponse<ITemplate>> {
    const { data } = await this.api.patch<IApiResponse<ITemplate>>(
      `${this.route}/${id}`,
      template,
    );
    return data;
  }

  async delete(id: string): Promise<IApiResponse<void>> {
    const { data } = await this.api.delete<IApiResponse<void>>(`${this.route}/${id}`);
    return data;
  }
}

export const templateRepository = new TemplateRepository();