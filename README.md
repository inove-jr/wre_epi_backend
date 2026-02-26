
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Knex](https://img.shields.io/badge/Knex-000000?style=for-the-badge)](http://knexjs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![Vuex](https://img.shields.io/badge/Vuex-3FB27F?style=for-the-badge&logo=vue.js)](https://vuex.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-6255F7?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

# WRE EPI — Projeto Fullstack

Este repositório contém o frontend (Vue 3 + Capacitor) e o backend (Node.js + Express + Knex/Postgres) do projeto WRE EPI — uma aplicação de e‑commerce.

## Conteúdo
- Backend: documentação e instruções detalhadas em [backend/README.md](backend/README.md)
- Frontend: documentação e instruções detalhadas em [frontend/README.md](frontend/README.md)

## Visão Geral
- Backend: API REST que gerencia usuários, produtos, categorias, carrinho, pedidos e integrações de pagamento (PayPal, PagSeguro, Asaas). Está em `backend/`.
- Frontend: SPA Vue.js que consome a API e oferece fluxo de compra, checkout e integração com dispositivos móveis via Capacitor. Está em `frontend/`.

## Como começar
1. Leia os READMEs específicos nas pastas `backend` e `frontend`.
2. Configure variáveis de ambiente no backend (`backend/.env`) antes de rodar migrations.
3. Ajuste `frontend/src/global.js` para apontar `baseApiUrl` para o endereço do backend.

## Contato
Se quiser, posso gerar um `backend/.env.example`, verificar as migrations, ou ajudar a rodar o projeto localmente.
