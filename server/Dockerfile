FROM node:latest
WORKDIR /server
COPY package.json package.json
RUN npm install
ENV NODE_ENV=${NODE_ENV}
COPY . .
ENTRYPOINT ["npm","start"]
