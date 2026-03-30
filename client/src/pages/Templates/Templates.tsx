import { Button, Card, Flex, List, Skeleton, Modal } from "antd";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import { useTemplates } from "../../hooks/useTemplates";
import { FilePlusIcon, TrashIcon } from "@phosphor-icons/react";
import "./Template.css";

import { useState } from "react";
import TemplateForm from "./Form/TemplateForm";

const Templates = () => {
  const { templates, isLoadingTemplates } = useTemplates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const showDeleteConfirm = (id: string) => {
    modal.confirm({
      title: "Tem certeza que deseja excluir?",
      content: "Essa ação não poderá ser desfeita.",
      okText: "Sim, excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        handleDeleteTemplate(id);
      },
    });
  };

  return (
    <Flex flex={1} vertical className="tempolate-page-container">
      {contextHolder}
      <PageHeader
        title="Templates"
        subtitle="Registre os seus template que poderão ser usados nas suas candidaturas"
      />
      <Flex flex={1} vertical>
        <List
          itemLayout="vertical"
          dataSource={isLoadingTemplates ? [{}, {}] : templates}
          renderItem={(item) => (
            <List.Item>
              {isLoadingTemplates ? (
                <SkeletonCard />
              ) : (
                <Card
                  styles={{
                    body: {
                      padding: "12px 16px",
                      backgroundColor: "transparent",
                    },
                  }}
                  className="template-list-item"
                >
                  <Flex
                    className=""
                    flex={1}
                    justify="space-between"
                    align="center"
                  >
                    <p>{item.title}</p>
                    <Flex gap={8}>
                      <Button
                        type="text"
                        onClick={() => showDeleteConfirm(item.id)}
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              )}
            </List.Item>
          )}
        />
      </Flex>

      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="new-template-button"
      >
        <FilePlusIcon size={20} />
      </Button>

      <Modal
        title="Novo Template"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <TemplateForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </Flex>
  );
};

export default Templates;

export const SkeletonCard = () => (
  <Skeleton.Input
    active
    style={{ width: "60%", marginBottom: 16 }}
    size="large"
  />
);
