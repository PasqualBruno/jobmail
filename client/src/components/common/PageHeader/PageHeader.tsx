import { QuestionIcon } from "@phosphor-icons/react";
import { Flex, Tooltip, Typography } from "antd";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  tooltip?: string;
};

const PageHeader = ({ title, subtitle, tooltip }: PageHeaderProps) => {
  return (
    <Flex vertical>
      <Flex>
        <Typography.Title>{title}</Typography.Title>
        {tooltip && (
          <Tooltip title={tooltip} placement="right">
            <QuestionIcon />
          </Tooltip>
        )}
      </Flex>
      {subtitle && (
        <Typography.Text type="secondary">{subtitle}</Typography.Text>
      )}
    </Flex>
  );
};

export default PageHeader;
