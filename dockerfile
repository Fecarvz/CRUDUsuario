# Base image com Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação para o container
COPY . .

# Expõe a porta que o servidor usará
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
