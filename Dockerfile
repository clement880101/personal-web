FROM node:18.9

WORKDIR /docker

COPY package*.json ./

RUN npm install

RUN npm install -g firebase-tools

COPY . .

EXPOSE 9005

EXPOSE 3000

RUN npm run build

CMD [ "node", "./build/index.html" ]