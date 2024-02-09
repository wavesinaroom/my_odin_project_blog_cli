FROM node:latest
WORKDIR /client
COPY package.json package.json 
RUN npm install
RUN npm install -g .
COPY . .
