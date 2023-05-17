# Maros Bednar
# stage 1 building the code
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD ["node", "index.js"]