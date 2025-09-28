# Marketplace Frontend

Aplicação **frontend** de um marketplace, desenvolvida em **Next.js**, que consome a API [marketplace-api](https://github.com/ux-software/marketplace-api).

---

## Design (Figma)

O layout da aplicação está disponível no Figma:  
https://www.figma.com/design/rET9F2CeUEJdiVN7JRu993/E-commerce---capputeeno?node-id=680-6614&t=wo64paVjkGeR7JVR-0

---

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, TypeScript
- **Estilização:** Styled-components
- **Autenticação:** JWT
- **Infraestrutura:** Docker e Docker Compose

---

## Estrutura do Projeto

- **marketplace** → Frontend (Next.js)
- **marketplace-api** → Backend (API REST)

---

## Configuração de Ambiente

### Backend (`marketplace-api`)

Criar um arquivo `.env`:

```
cd marketplace-api
echo "seu-env-aqui" > .env
cd ..
```

```env
# Database
DATABASE_URL="postgresql://postgres:docker@db:5432/marketplace_db"

# JWT
JWT_SECRET="seu-jwt-secret-aqui"
JWT_EXPIRES_IN="7d"

# Application
PORT=3000
NODE_ENV="development"
BASE_URL="http://localhost:3000"
```

### Frontend (marketplace)

Criar um arquivo `.env`:

```
cd marketplace
echo "seu-env-aqui" > .env
cd ..
```

```env
# Application
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Como Executar o Projeto

### Instalar dependências

```
cd marketplace

npm install

cd ..

cd marketplace-api

npm install

cd ..

```

### Build da aplicação

```
docker compose up -d --build
```

### Parar aplicação

```
docker compose down
```

### Inicar a aplicação após build

```
docker compose up -d
```
