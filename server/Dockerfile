FROM node:latest
WORKDIR /server
COPY package.json
RUN npm install
ENTRYPOINT ["npm","start"]
COPY . .
