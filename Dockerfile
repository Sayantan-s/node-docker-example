FROM node

WORKDIR /ecom

COPY package.json /ecom

RUN npm install

COPY . /ecom

EXPOSE 80

CMD ["npm","start"]