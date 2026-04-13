import {
  BriefcaseIcon,
  CopyIcon,
  FileTextIcon,
  PaperPlaneTiltIcon,
  SignOutIcon,
} from "@phosphor-icons/react";

import Templates from "../pages/Templates/Templates";
import { TemplateProvider } from "../hooks/useTemplates";
import Resumes from "../pages/Resumes/Resumes";

export type customMenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
  component: React.ReactNode;
};

export const menuItems: customMenuItem[] = [
  {
    key: "/applications",
    label: "Aplicações",
    icon: <PaperPlaneTiltIcon size={20} weight="regular" />,
    component: <div>Aplicações</div>,
  },
  {
    key: "/templates",
    label: "Templates",
    icon: <CopyIcon size={20} weight="regular" />,
    component: (
      <TemplateProvider>
        <Templates />
      </TemplateProvider>
    ),
  },
  {
    key: "/resumes",
    label: "Currículos",
    icon: <FileTextIcon size={20} weight="regular" />,
    component: <Resumes />,
  },
  {
    key: "/experience",
    label: "Experiências",
    icon: <BriefcaseIcon size={20} weight="regular" />,
    component: <div>Experience</div>,
  },

  {
    key: "/logout",
    label: "Sair do Sistema",
    icon: <SignOutIcon size={20} weight="regular" />,
    danger: true,
    component: <div>Logout</div>,
  },
];
