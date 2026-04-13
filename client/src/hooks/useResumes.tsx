import { useState, useCallback } from "react";
import { message } from "antd";

export interface IResume {
  id: string;
  name: string;
  fileUrl: string;
}

export const useResumes = () => {
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await resumeService.getAll();
      setResumes(response.data);
    } catch (error) {
      message.error("Erro ao carregar os currículos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createResume = useCallback(async (name: string, file: File) => {
    setIsLoading(true);
    try {
      const { signedUrl, path } = await resumeService.getUploadUrl(file.name);

      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      const response = await resumeService.create({ name, path });

      setResumes((prev) => [...prev, response.data]);
      message.success("Currículo salvo com sucesso!");
    } catch (error) {
      message.error("Erro ao salvar o currículo.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteResume = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await resumeService.delete(id);
      setResumes((prev) => prev.filter((resume) => resume.id !== id));
      message.success("Currículo removido com sucesso!");
    } catch (error) {
      message.error("Erro ao remover o currículo.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    resumes,
    isLoading,
    fetchResumes,
    createResume,
    deleteResume,
  };
};
