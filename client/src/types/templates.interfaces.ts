export interface ITemplate {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITemplateCreate {
  title: string;
  content: string;
}

export type ITemplateUpdate = Partial<ITemplateCreate>;

export interface ITemplateDelete {
  id: string;
}



export interface IApiResponse<T> {
  message: string;
  data: T; 
}

