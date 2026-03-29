import {
  BriefcaseIcon,
  CopyIcon,
  FileTextIcon,
  PaperPlaneTiltIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import type { MenuProps } from "antd";

export const menuItems: MenuProps["items"] = [
  {
    key: "/applications",
    label: "Aplicações",
    icon: <PaperPlaneTiltIcon size={20} weight="regular" />,
  },
  {
    key: "/templates",
    label: "Templates",
    icon: <CopyIcon size={20} weight="regular" />,
  },
  {
    key: "/resumes",
    label: "Currículos",
    icon: <FileTextIcon size={20} weight="regular" />,
  },
  {
    key: "/experience",
    label: "Experiência Profissional",
    icon: <BriefcaseIcon size={20} weight="regular" />,
  },

  {
    key: "/logout",
    label: "Sair do Sistema",
    icon: <SignOutIcon size={20} weight="regular" />,
    danger: true,
  },
];
