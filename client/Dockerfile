FROM node:latest
WORKDIR /client
COPY package.json
ENV NODE_ENV=${NODE_ENV}
RUN npm install
ENTRYPOINT ["npm","start"]
COPY . .
