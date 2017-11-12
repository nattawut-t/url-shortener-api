FROM node:8.5.0-alpine

WORKDIR /src

COPY package.json .
COPY yarn.lock .
RUN npm install -g yarn && yarn install

COPY . .

EXPOSE 3001
CMD [ "yarn", "start" ]