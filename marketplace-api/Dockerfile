# Etapa 1 - dependências
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Gera build da aplicação
RUN npm run build

# Etapa 2 - imagem final
FROM node:20-alpine

WORKDIR /app

# Copia apenas node_modules e build prontos
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Expõe a porta
EXPOSE 3000

# Executa migrations no start (garante DB atualizado) e inicia app
CMD npx prisma migrate deploy && node dist/main

