import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ITemplate,
  ITemplateCreate,
  ITemplateUpdate,
} from "../types/templates.interfaces";
import { templateService } from "../services/template.service";
import { Modal, message } from "antd";

interface ITemplatesContext {
  templates: ITemplate[];
  isLoadingTemplates: boolean;
  isLoadingSubmitTemplate: boolean;

  handleCreateTemplate: (template: ITemplateCreate) => void;
  handleUpdateTemplate: (data: ITemplateUpdate, templateId: string) => void;
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
  const [modal, contextHolder] = Modal.useModal();

  const fetchAll = useCallback(async () => {
    setIsLoadingTemplates(true);
    try {
      const response = await templateService.listAll();
      console.log(response);
      setTemplates(response.data);
    } catch (error) {
      console.error("Erro ao carregar a lista de templates:", error);
    } finally {
      setIsLoadingTemplates(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCreateTemplate = useCallback(
    async (template: ITemplateCreate) => {
      try {
        setIsLoadingSubmitTemplate(true);
        const response = await templateService.create(template);
        setTemplates((templates) => [...templates, response.data]);
        message.success(response.message);
      } catch (error) {
        console.error("Erro ao criar template:", error);
        message.error("Erro ao criar template");
      } finally {
        setIsLoadingSubmitTemplate(false);
      }
    },
    [],
  );

  const handleUpdateTemplate = useCallback(
    async (data: ITemplateUpdate, templateId: string) => {
      try {
        setIsLoadingSubmitTemplate(true);
        const response = await templateService.update(templateId, data);

        setTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template.id === templateId ? response.data : template,
          ),
        );

        message.success(response.message);
      } catch (error) {
        console.error("Erro ao atualizar template:", error);
        message.error("Erro ao atualizar template");
      } finally {
        setIsLoadingSubmitTemplate(false);
      }
    },
    [],
  );

  const handleDeleteTemplate = useCallback(async (id: string) => {
    try {
      setIsLoadingSubmitTemplate(true);
      const response = await templateService.remove(id);
      setTemplates((templates) =>
        templates.filter((template) => template.id !== id),
      );
      message.success(response.message);
    } catch (error) {
      console.error("Erro ao deletar template:", error);
      message.error("Erro ao deletar template");
    } finally {
      setIsLoadingSubmitTemplate(false);
    }
  }, []);

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
