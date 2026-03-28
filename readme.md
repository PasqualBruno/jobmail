🚀 JobMail - MonorepoEste projeto consiste em um sistema de automação de e-mails para vagas, dividido em um Back-end (Node.js/Prisma) e um Front-end (React).🛠️ Pré-requisitosAntes de começar, você vai precisar ter instalado:Node.js (Recomendado v20 ou superior)NPM ou YarnUm banco de dados PostgreSQL (Recomendado: Supabase)🏁 Clonando e IniciandoSiga os passos abaixo para rodar o projeto localmente:1. Clone o repositórioBashgit clone https://github.com/seu-usuario/jobmail.git
cd jobmail 2. Instalação Automática (Recomendado)Se você configurou o script de setup na raiz, basta rodar:Bashnpm run setup
Este comando instalará as dependências da raiz, do servidor, do cliente e gerará o Prisma Client automaticamente.3. Configuração Manual (Caso o passo acima falhe)Raiz do Projeto:Bashnpm install # Instala o Husky e dependências globais
Configuração do Servidor:Bashcd server
npm install
npx prisma generate
Nota: Crie um arquivo .env dentro da pasta /server com a sua DATABASE_URL.Configuração do Cliente:Bashcd ../client
npm install
📡 Rodando o ProjetoPara iniciar o desenvolvimento, abra dois terminais:Terminal 1 (Back-end):Bashcd server
npm run dev
Terminal 2 (Front-end):Bashcd client
npm run dev
🛡️ Qualidade de Código (Husky)Este projeto utiliza Husky para garantir que nenhum código com erro de TypeScript seja commitado.Ao tentar fazer um git commit, o script tsc --noEmit será executado na pasta /server.Se houver erros (como imports sem .js ou erros de tipo), o commit será bloqueado até que você corrija.📦 Scripts Disponíveis (Raiz)ComandoDescriçãonpm run setupInstala tudo e gera o Prisma Client em um comando.npm run dev:serverInicia o servidor Node.js.npm run dev:clientInicia o projeto React.🚀 Deploy no HerokuPara o deploy do servidor funcionar corretamente:Certifique-se de que a variável APP_BASE=server está nas Config Vars.Adicione os Buildpacks na ordem: heroku-buildpack-monorepo seguido de heroku/nodejs.Verifique se o Procfile está dentro da pasta /server.
