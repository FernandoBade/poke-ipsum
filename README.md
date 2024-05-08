<div align="center">
  <img src="https://wakatime.com/badge/user/64a9cc47-9ca3-482a-8ae7-c3fe04fe0e14/project/018e59cd-e4f6-43ce-b901-c36d9c1cc4cf.svg" alt="fernandbade" />
  <img src="https://komarev.com/ghpvc/?username=fernandbade&label=project%20views&color=0e75b6&style=flat" alt="fernandbade" />
</div>

![pokeipsum](https://github.com/FernandoBade/poke-ipsum/assets/89167737/f5a7ee87-1109-4d96-a207-c9a87618aa4c)

## **[us-EN]** Poké Ipsum - Your design journey, one Pokémon at a time!

> Visit Online version [here](https://poke-ipsum.vercel.app).

[Poké Ipsum](https://poke-ipsum.vercel.app) is a study project aimed at gaining a better understanding of both the .NET Core framework and Next.js, which later evolved into studies of Node.js, resulting in three different server versions.

With [Poké Ipsum](https://poke-ipsum.vercel.app), users can generate text similar to the famous Lorem Ipsum but using Pokémon names. Users can choose which Pokémon generations and types they want to include in their content, along with three different creation modes: paragraph, sentence, and word, as well as the desired quantity of content.

### Technologies Used:

#### Frontend (Next.js/Serverless) and Backend (Node.js):

- @headlessui/react@1.7.18
- @heroicons/react@2.1.3
- autoprefixer@10.0.1
- bootstrap@5.3.3
- dotenv@16.4.5
- next@14.1.4
- react@18
- react-bootstrap@2.9.0-beta.1
- react-dom@18
- react-helmet@6.1.0
- react-icons@5.1.0
- react-share@5.1.0
- postcss@8
- tailwindcss@3.3.0

#### Backend (Dotnet Core):

- Microsoft.AspNetCore.OpenApi@8.0.3
- Newtonsoft.Json@13.0.3
- Swashbuckle.AspNetCore@6.4.0

---

### Installation Instructions:

#### Prerequisites:
1. .NET Core SDK: Make sure you have the .NET Core SDK installed on your machine. [Download .NET Core SDK](https://dotnet.microsoft.com/download);
2. Node.js: Required to handle npm commands. [Download Node.js](https://nodejs.org/en/download);
3. Visual Studio Code (Recommended): For editing and running the project smoothly. [Download VS Code](https://code.visualstudio.com/download);
4. Clone the Repository: `git clone https://github.com/FernandoBade/poke-ipsum`

---

#### Direct Next.js Version (main and latest version):

The direct Next.js version simplifies the process and offers a smoother user experience, specifically designed for serverless deployment on Vercel. To use it:

1. Access the **/web** folder.
2. Install dependencies by running `npm install`.
3. Start the project by running `npm start`.

---

#### Node.js Server Version:

The Node.js Server version offers flexibility and speed for users. Follow the steps below:

1. Navigate to the **"server_nodejs"** folder.
2. Install dependencies by running `npm install`.
3. Start the server with `npm start`.
4. Start the frontend by running `npm run dev-frontend` within the **/web** folder.

---

#### .NET Core Version:

The .NET Core version offers a robust and efficient approach to running Poké Ipsum. To get started, follow these steps:

1. Navigate to the .NET Core Project Directory and fing the "/web" folder: `cd web`

2. Install all dependecies and start individually frontend and backend:
- `npm install`
- `npm run dev-backend`
- `npm run dev-frontend`

3. Additional Configuration:
Uncomment necessary parts in `/utils/pokeipsumAPI_dotnetcore_node.js` for full functionality, and make sure to use the configuration file `package-dotnetcore.json`.
---
&nbsp;

## **[pt-BR]** Poké Ipsum - Sua jornada de design, um Pokémon de cada vez!

> Visit a versão online [aqui](https://poke-ipsum.vercel.app).

[Poké Ipsum](https://poke-ipsum.vercel.app) é um projeto de estudo destinado a obter uma melhor compreensão tanto do framework .NET Core quanto do Next.js, que posteriormente evoluiu para estudos também do Node.js, resultando em três versões diferentes de servidor.

Com o [Poké Ipsum](https://poke-ipsum.vercel.app), os usuários podem gerar texto semelhante ao famoso Lorem Ipsum, mas usando nomes de Pokémon. Os usuários podem escolher quais gerações e tipos de Pokémon desejam incluir em seu conteúdo, juntamente com três modos diferentes de criação: parágrafo, frase e palavra, bem como a quantidade desejada de conteúdo.

### Tecnologias Utilizadas:

#### Frontend (Next.js/Serverless) e Backend (Node.js):

- @headlessui/react@1.7.18
- @heroicons/react@2.1.3
- autoprefixer@10.0.1
- bootstrap@5.3.3
- dotenv@16.4.5
- next@14.1.4
- react@18
- react-bootstrap@2.9.0-beta.1
- react-dom@18
- react-helmet@6.1.0
- react-icons@5.1.0
- react-share@5.1.0
- postcss@8
- tailwindcss@3.3.0

#### Backend (Dotnet Core):

- Microsoft.AspNetCore.OpenApi@8.0.3
- Newtonsoft.Json@13.0.3
- Swashbuckle.AspNetCore@6.4.0

---

### Instruções de Instalação:

#### Pré-requisitos:
1. .NET Core SDK: Certifique-se de ter o .NET Core SDK instalado em sua máquina. [Baixar .NET Core SDK](https://dotnet.microsoft.com/download);
2. Node.js: Necessário para lidar com comandos npm. [Baixar Node.js](https://nodejs.org/en/download);
3. Visual Studio Code (Recomendado): Para editar e executar o projeto com facilidade. [Baixar VS Code](https://code.visualstudio.com/download);
4. Clonar o Repositório: `git clone https://github.com/FernandoBade/poke-ipsum`

---

#### Versão Direta do Next.js (principal e mais recente):

A versão direta do Next.js simplifica o processo e oferece uma experiência de usuário mais fluida, especialmente projetada para implantação sem servidor na Vercel. Para utilizá-la:

1. Acesse a pasta **/web**.
2. Instale as dependências executando `npm install`.
3. Inicie o projeto executando `npm start`.

---

#### Versão do Servidor Node.js:

A versão do Servidor Node.js oferece flexibilidade e velocidade para os usuários. Siga as etapas abaixo:

1. Acesse a pasta **server_nodejs**.
2. Instale as dependências executando `npm install`.
3. Inicie o servidor com `npm start`.
4. Inicie o frontend executando `npm run dev-frontend` dentro da pasta **/web**.

---

#### Versão Dotnet Core:
A versão .NET Core oferece uma abordagem robusta e eficiente para executar o Poké Ipsum. Para começar, siga estes passos:

1. Navegue até o Diretório do Projeto .NET Core e encontre a pasta "/web": `cd web`
2. Instale todas as dependências e inicie individualmente o frontend e o backend:
`npm install`
`npm run dev-backend`
`npm run dev-frontend`
3. Configuração Adicional: Descomente as partes necessárias em `/utils/pokeipsumAPI_dotnetcore_node.js` para a funcionalidade completa, e certifique-se de usar o arquivo de configuração `package-dotnetcore.json`.
---
