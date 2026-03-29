export interface CreateTemplateDTO {
  title: string;
  content: string;
}

export type UpdatetemplateDTO = Partial<CreateTemplateDTO>;
