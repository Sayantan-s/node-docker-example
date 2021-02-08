FROM node:latest

WORKDIR /ecom

COPY package.json /ecom

RUN npm install

COPY . /ecom

EXPOSE 8000

CMD ["npm","start"]