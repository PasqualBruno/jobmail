import { useState } from "react";
import {
  Flex,
  Upload,
  Button,
  Typography,
  Empty,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import PageHeader from "../../components/common/PageHeader/PageHeader";

const { Text } = Typography;

interface ResumeData {
  id: string;
  name: string;
  file: UploadFile;
}

const Resumes = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = (values: { name: string; upload: any }) => {
    if (resumes.length >= 3) {
      message.error("Você só pode enviar até 3 currículos.");
      return;
    }

    const file = values.upload[0];

    const newResume: ResumeData = {
      id: crypto.randomUUID(),
      name: values.name,
      file: file,
    };

    setResumes([...resumes, newResume]);
    message.success("Currículo adicionado com sucesso!");
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleRemove = (idToRemove: string) => {
    setResumes(resumes.filter((resume) => resume.id !== idToRemove));
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Flex vertical flex={1} gap="large">
      <PageHeader
        title="Currículos"
        subtitle="Adicione até 3 currículos para se candidatar a diferentes perfis de vagas"
      />

      {resumes.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Text>
              Você ainda não possui currículos cadastrados. Faça o upload do seu
              primeiro documento para começar a se candidatar!
            </Text>
          }
        >
          <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
            Adicionar Currículo
          </Button>
        </Empty>
      ) : (
        <Flex vertical gap="middle" style={{ maxWidth: 600 }}>
          {resumes.map((resume) => (
            <Flex
              key={resume.id}
              justify="space-between"
              align="center"
              style={{
                padding: "12px",
                border: "1px solid #d9d9d9",
                borderRadius: "8px",
              }}
            >
              <Flex vertical>
                <Text strong>{resume.name}</Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {resume.file.name}
                </Text>
              </Flex>
              <Button danger onClick={() => handleRemove(resume.id)}>
                Remover
              </Button>
            </Flex>
          ))}

          {resumes.length < 3 && (
            <Button
              icon={<PlusOutlined />}
              onClick={showModal}
              style={{ width: "fit-content" }}
            >
              Adicionar outro currículo
            </Button>
          )}
        </Flex>
      )}

      <Modal
        title="Novo Currículo"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Nome do Currículo"
            rules={[
              {
                required: true,
                message: "Por favor, insira um nome para o currículo",
              },
            ]}
          >
            <Input placeholder="Ex: Desenvolvedor Front-end Sênior" />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Arquivo PDF"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Por favor, faça o upload de um arquivo",
              },
            ]}
          >
            <Upload beforeUpload={() => false} maxCount={1} accept=".pdf">
              <Button icon={<UploadOutlined />}>Selecionar Arquivo</Button>
            </Upload>
          </Form.Item>

          <Flex justify="flex-end" gap="small">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Flex>
        </Form>
      </Modal>
    </Flex>
  );
};

export default Resumes;
