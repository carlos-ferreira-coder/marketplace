# 1. Imagem base leve
FROM node:20-alpine

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copiar apenas arquivos de dependências
COPY package.json package-lock.json ./

# 4. Instalar dependências de produção
RUN npm install --production

# 5. Copiar todo o projeto
COPY . .

# 6. Gerar Prisma Client
RUN npx prisma generate

# 7. Build do Next.js (ou Node.js)
RUN npm run build

# 8. Expor porta da aplicação
EXPOSE 3000

# 9. Comando de start: rodar migrations e iniciar app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
