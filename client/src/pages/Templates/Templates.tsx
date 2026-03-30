import PageHeader from "../../components/common/PageHeader/PageHeader";
import { useTemplates } from "../../hooks/useTemplates";

const Templates = () => {
  const { templates } = useTemplates();

  console.log(templates);

  return (
    <div>
      <PageHeader
        title="Templates"
        subtitle="Registre os seus template que poderão ser usados nas suas candidaturas"
      />
    </div>
  );
};

export default Templates;
