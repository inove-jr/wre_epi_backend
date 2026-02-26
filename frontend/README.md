# wre_epi

## Project setup
```
npm install
```

# Frontend - WRE EPI (Vue 3 + Capacitor)

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![Vuex](https://img.shields.io/badge/Vuex-3FB27F?style=for-the-badge&logo=vue.js)](https://vuex.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-6255F7?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

Frontend do projeto de e‑commerce construído com Vue 3, Vuex e Capacitor (suporte Android). A comunicação com a API usa `axios` e a base da API é definida em `src/global.js` na constante `baseApiUrl` (por padrão `http://localhost:80`).

## Funcionalidades principais
- Páginas de listagem e busca de produtos
- Carrinho de compras e resumo do pedido
- Fluxo de checkout com múltiplas formas de pagamento (cartão, boleto, PIX — integrações via backend)
- Autenticação e persistência de sessão via `localStorage`
- Uso de Vuex para estado global

## Tecnologias e dependências
- Vue 3
- Vuex
- Vue Router
- Axios
- Capacitor (para empacotar como app Android)
- Bibliotecas auxiliares: `vueperslides`, `v-credit-card`, `vue-cookies` etc.

## Estrutura importante
- `src/global.js` — configuração central (contém `baseApiUrl` e `userKey`)
- `src/components/` — componentes reutilizáveis (forms de pagamento, carrossel, etc.)
- `src/views/` — telas da aplicação
- `public/` — assets públicos

## Configurar a URL da API
Por padrão a aplicação aponta para `http://localhost:80`. Para alterar a URL da API edite `src/global.js` e atualize `baseApiUrl`.

Exemplo (modificar para seu backend):

```js
export const baseApiUrl = 'http://seu-backend:porta'
```

## Scripts
Na pasta `frontend`:

```bash
npm install
npm run serve   # modo desenvolvimento
npm run build   # build de produção
```

## Build para Android (Capacitor)
Instale dependências, gere o build da web e sincronize com Capacitor:

```bash
npm run build
npx cap sync android
npx cap open android
```

## Observações e recomendações
- Verifique `src/global.js` para garantir que `baseApiUrl` aponte para o backend correto.
- Não armazene tokens sensíveis em localStorage sem avaliar a segurança do ambiente.
- Se for usar em produção, ajuste CORS no backend e configure HTTPS/SSL.
