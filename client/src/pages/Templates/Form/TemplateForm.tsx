import { Button, Flex, Form, Input } from "antd";
import TiptapEditor from "../../../components/common/TiptapEditor/TiptapEditor";
import type { ITemplateCreate } from "../../../types/templates.interfaces";
import { useTemplates } from "../../../hooks/useTemplates";
import { useEffect, useState } from "react";

interface TemplateFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateForm = ({ setIsModalOpen }: TemplateFormProps) => {
  const { handleCreateTemplate, isLoadingSubmitTemplate } = useTemplates();
  const [form] = Form.useForm();

  const values = Form.useWatch([], form);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsFormValid(true))
      .catch(() => setIsFormValid(false));
  }, [values, form]);

  async function handleSubmit(values: ITemplateCreate) {
    if (!isFormValid) return;
    handleCreateTemplate(values);
    setIsModalOpen(false);
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        rules={[
          { required: true, message: "O título é obrigatório" },
          { min: 5, message: "O título deve ter pelo menos 5 caracteres" },
        ]}
        required
        name="title"
        label="Título"
      >
        <Input placeholder="Título" />
      </Form.Item>
      <Form.Item
        required
        name="content"
        label="Conteúdo"
        tooltip="Conteúdo do template que será colocado no corpo do seu email"
        rules={[{ required: true, message: "O conteúdo é obrigatório" }]}
      >
        <TiptapEditor charcount={50} />
      </Form.Item>

      <Flex flex={1} gap={8} justify="end">
        <Button
          onClick={() => setIsModalOpen(false)}
          type="default"
          loading={isLoadingSubmitTemplate}
        >
          Cancelar
        </Button>
        <Button
          disabled={!isFormValid}
          type="primary"
          htmlType="submit"
          loading={isLoadingSubmitTemplate}
        >
          Salvar
        </Button>
      </Flex>
    </Form>
  );
};

export default TemplateForm;
