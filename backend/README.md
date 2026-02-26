# Backend - WRE EPI

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Knex](https://img.shields.io/badge/Knex-000000?style=for-the-badge)](http://knexjs.org/)

Resumo do backend da aplicação de e-commerce (API REST) construída com Node.js, Express e Knex/Postgres.

## Funcionalidades principais
- Autenticação JWT (login / validação de token)
- CRUD de usuários (cadastro, atualização, recuperação)
- Reset de senha via e‑mail (nodemailer)
- Gestão de produtos (inserir/editar/excluir/listar/buscar)
- Upload/associação de imagens de produto (tabela `product_images`)
- Categorias de produtos
- Carrinho de compras (itens do carrinho)
- Pedidos e itens de pedido (criação, listagem por cliente, alteração de status)
- Integrações de pagamento: Asaas (criação de cliente), PayPal (captura de pedidos), PagSeguro (exemplos de pagamentos)
- Integração com serviços de frete (arquivo `frenet.js` para integração)
- Webhooks (ponto de entrada em `webHooks.js`)

## Tecnologias e bibliotecas chave
- Node.js + Express
- Knex (migrations / queries)
- PostgreSQL (driver `pg`)
- `jwt-simple` / `jsonwebtoken` (tokens)
- `bcrypt` (hash de senhas)
- `joi` (validação de payloads)
- `axios` (requisições externas)
- `nodemailer` (envio de e‑mails)
- `passport` (autenticação/configuração carregada via `consign`)

## Estrutura importante (pasta `backend`)
- `index.js` - ponto de entrada (usa `consign` para carregar módulos)
- `knexfile.js` - configuração do Knex (usa `db` do `.env`)
- `api/` - controllers/rotas: `auth.js`, `user.js`, `product.js`, `cart.js`, `order.js`, `pagseguro.js`, `paypal.js`, `asaas.js`, `webHooks.js`, etc.
- `config/` - configurações de DB, middlewares, passport e rotas
- `migrations/` - migrations do banco de dados (Knex)

## Variáveis de ambiente (.env)
O projeto tem um arquivo de exemplo em `backend/.env copy`. Crie um arquivo `backend/.env` ou adapte conforme sua estratégia de deploy com as seguintes chaves mínimas:

- `authSecret` - segredo para assinar tokens JWT
- `asaasPaymentApiKey` - chave da API Asaas (sandbox/produção)
- `payPalPaymentApiKey` - (opcional) chave PayPal
- `CLIENT_ID` - client id PayPal
- `CLIENT_SECRET` - client secret PayPal
- `frenetToken` - token Frete (se usar serviço de frete)
- `emailAuth` - objeto com `user` e `pass` para o nodemailer (ex.: Gmail)
- `db` - objeto com `database`, `user`, `password` (usado em `knexfile.js`)

Exemplo de `.env` (não commite credenciais):

```js
module.exports = {
  authSecret: 'seu-segredo-aqui',
  asaasPaymentApiKey: 'asaas_key',
  payPalPaymentApiKey: 'paypal_key',
  CLIENT_ID: 'paypal_client_id',
  CLIENT_SECRET: 'paypal_client_secret',
  frenetToken: 'token_frenet',
  emailAuth: { user: 'seu@email.com', pass: 'senha' },
  db: { database: 'nome_db', user: 'postgres', password: 'senha' }
}
```

## Banco de dados e Migrations
O projeto usa `knex` com Postgres. As migrations estão em `backend/migrations/`.

Rodar migrations (na pasta `backend`):

```bash
npx knex migrate:latest --knexfile knexfile.js
```

## Scripts e execução
Instalar dependências e rodar em desenvolvimento (na pasta `backend`):

```bash
npm install
npm run start
```

O servidor expõe a API na porta `80` (conforme `index.js`). Para alterar a porta, edite `index.js`.

## Endpoints principais (resumo)
- Autenticação
  - POST `/signin` — login (body: `email`, `password`)
  - POST `/validateToken` — valida token JWT

- Usuários
  - POST `/users` — cadastrar usuário
  - GET `/users` — listar usuários
  - GET `/users/:id` — obter usuário por id
  - POST `/users/reset-password` — solicitar reset de senha (envia email)
  - POST `/users/reset-password/:token` — confirmar troca de senha

- Produtos
  - POST `/products` — criar/editar produto (imagens tratadas em `product_images`)
  - GET `/products` — listar produtos
  - GET `/products/:id` — detalhes do produto + imagens
  - DELETE `/products/:id` — excluir produto
  - GET `/products/search?q=` — busca com paginação

- Carrinho
  - POST `/cart` — adicionar/atualizar item do carrinho
  - DELETE `/cart` — remover item (body: `client_id`, `product_id`)
  - GET `/cart/:client_id` — listar itens do carrinho do cliente

- Pedidos
  - POST `/orders` / endpoints via `/paypal` e `/pagseguro` — criar pedido/registrar pagamento
  - GET `/orders/:client_id` — listar pedidos do cliente
  - PATCH `/orders/status` — alterar status do pedido

- Pagamentos / Integrações
  - `/paypal/*` — captura de pedidos e integração com PayPal (`backend/api/paypal.js`)
  - `/pagseguro/*` — exemplos de pagamentos com PagSeguro (`backend/api/pagseguro.js`)
  - `/asaas/*` — criação de cliente Asaas (`backend/api/user.js` usa `createNewAsaasClient`)
  - Webhooks: `/webhooks` (`backend/api/webHooks.js`)

## Observações e recomendações
- Nunca commite segredos (`.env`) no repositório.
- Verifique e atualize as chamadas de API de pagamento (`pagseguro.js`) para usar variáveis de ambiente em vez de chaves hardcoded.
- Para deploy em produção, considere usar uma porta diferente e configurar um proxy reverso (Nginx) e SSL.
- Posso gerar um `.env.example` se desejar.
