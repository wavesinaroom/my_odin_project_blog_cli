FROM node:latest
WORKDIR /server
COPY package.json package.json
RUN npm install
RUN npm install express-async-handler
ENV NODE_ENV=${NODE_ENV}
COPY . .
ENTRYPOINT ["npm","start"]
