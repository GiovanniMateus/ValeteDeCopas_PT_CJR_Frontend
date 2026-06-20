# Stock.io — Front-end

Front-end da plataforma Stock.io, construído em **Next.js** (App Router) com **TypeScript** e **Tailwind CSS**.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- O [back-end do projeto](#) rodando localmente (veja o README do back para instruções)

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

## Configuração do `.env`

Crie um arquivo chamado `.env` na raiz do projeto com a seguinte variável:

```env
# URL onde o back-end (API) está rodando
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### O que essa variável faz

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_API_URL` | Endereço base da API do back-end. É usada em todas as chamadas feitas pelo front (`services/api.ts` e em componentes que montam URLs de imagens, como `resolveImageUrl`). O prefixo `NEXT_PUBLIC_` é obrigatório no Next.js para que a variável fique disponível no navegador (client-side), não só no servidor. |

> **Importante:** sem essa variável configurada, o front não consegue se comunicar com o back e nenhuma página que busca dados (produtos, lojas, login, etc.) vai funcionar.

## Rodando o projeto em desenvolvimento

Com o back-end já rodando (porta `3001`), inicie o front:

```bash
npm run dev
```

O site estará disponível em **http://localhost:3000**.

