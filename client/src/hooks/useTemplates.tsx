import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { templateService } from "../services/template.service";
import type {
  ITemplate,
  ITemplateCreate,
  ITemplateUpdate,
} from "../types/templates.interfaces";

interface ITemplatesContext {
  templates: ITemplate[];
  isLoadingTemplates: boolean;
  isLoadingSubmitTemplate: boolean;

  handleCreateTemplate: (template: ITemplateCreate) => void;
  handleUpdateTemplate: (template: ITemplate) => void;
  handleDeleteTemplate: (id: string) => void;
}

const TemplatesContext = createContext<ITemplatesContext>(
  {} as ITemplatesContext,
);

export const TemplateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const [isLoadingSubmitTemplate, setIsLoadingSubmitTemplate] =
    useState<boolean>(false);

  const fetchAll = useCallback(async () => {
    setIsLoadingTemplates(true);
    try {
      const data = await templateService.listAll();
      console.log(data);
      setTemplates(data);
    } catch (error) {
      console.error("Erro ao carregar a lista de templates:", error);
    } finally {
      setIsLoadingTemplates(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function handleCreateTemplate(template: ITemplateCreate) {
    throw new Error("Function not implemented.");
  }

  async function handleUpdateTemplate(data: ITemplateUpdate) {
    throw new Error("Function not implemented.");
  }

  async function handleDeleteTemplate(id: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <TemplatesContext.Provider
      value={{
        templates,
        isLoadingTemplates,
        isLoadingSubmitTemplate,
        handleCreateTemplate,
        handleUpdateTemplate,
        handleDeleteTemplate,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};

export const useTemplates = () => {
  const context = useContext(TemplatesContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
