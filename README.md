# Expense Tracker Frontend

Aplicação frontend para controle financeiro pessoal, construída com Next.js, React, TypeScript e Tailwind CSS. O projeto organiza autenticação, dashboard, cadastro de usuário e integração com API em uma interface responsiva voltada para uso no navegador e no mobile.

## Visão Geral

O sistema permite:

- acessar a aplicação com login;
- visualizar um dashboard com saldo, receitas e despesas;
- listar transações agrupadas por período;
- criar, editar e excluir transações;
- navegar entre as principais áreas da interface com uma experiência mobile-first.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Axios
- Lucide React
- Radix UI
- React Hook Form

## Como executar

Pré-requisitos:

- Node.js instalado;
- npm disponível no ambiente.

Instalação:

1. Instale as dependências.
2. Inicie o servidor de desenvolvimento.

## Scripts

- npm run dev: inicia o ambiente de desenvolvimento.
- npm run build: gera o build de produção.
- npm run start: executa a aplicação em produção.
- npm run lint: executa a checagem de lint.

## Estrutura do Projeto

- src/app: rotas e layout global do App Router.
- src/components: componentes de login, dashboard, registro e UI compartilhada.
- src/services: integração com a API.
- src/global.d.ts: declarações globais necessárias para o projeto.

## API

A aplicação consome uma API externa para autenticação e transações. Se a API estiver indisponível, o login e o carregamento das transações podem falhar.

## Observações

- O projeto foi migrado para Next.js e não depende mais de Vite.
- A estilização global é carregada a partir do App Router com Tailwind CSS.
- O dashboard é renderizado como client component por usar estado, efeitos e navegação interna.

## Preview
<img width="1866" height="997" alt="image" src="https://github.com/user-attachments/assets/022d5afa-b419-4343-abcb-c7f9ef7afde2" />
