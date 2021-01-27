FROM node

WORKDIR /ecom

COPY . /ecom

RUN npm install

EXPOSE 80

CMD ["npm","start"]