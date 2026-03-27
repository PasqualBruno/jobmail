const getGreeting = (): string => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  });

  const hour = parseInt(formatter.format(new Date()));

  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const generateJobEmail = (jobName: string): string => {
  const greeting = getGreeting();

  // Usamos uma estrutura sem indentação na string para o e-mail ir alinhado à esquerda
  return `Olá, ${greeting.toLowerCase()}.

Me chamo Bruno Pasqual e estou enviando meu currículo para participar do processo seletivo para a vaga de **${jobName}**. Possuo experiência prévia na área, tendo atuado como:

**Desenvolvedor Front-End (Júnior) — AGX Software**
React, TypeScript, MongoDB, Node, Antd
*mar/2025 - atual*
Resumo: Evolução de um CRM financeiro white-label e estruturação do Design System interno da empresa.

**Desenvolvedor Full Stack (Estágio) — Fazsoft Solutions**
C#, ASP.NET, TypeScript, React, Bootstrap, CSS, MySQL, MongoDB, REST API
*fev/2024 - mar/2025*
Resumo: Manutenção de sistemas ERP e desenvolvimento de ponta a ponta de microsserviços web e APIs RESTful.

**Desenvolvedor Front-End (Voluntário) — Flowon**
TypeScript, JavaScript, React, CSS, Tailwind
*ago/2023 - fev/2024*
Resumo: Criação de um sistema de gerenciamento de eventos corporativos com credenciamento instantâneo via QR Code.

Fico à disposição para maiores esclarecimentos.

Obrigado pela atenção.
**Bruno Henrique Pasqual**`.trim();
};