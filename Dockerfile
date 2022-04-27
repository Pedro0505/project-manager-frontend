FROM cypress/base:16.14.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

CMD [ "npm", "run", "dev" ]