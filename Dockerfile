    FROM node:12

    WORKDIR /app

    COPY package.json .

    RUN npm i

    COPY . .

    EXPOSE 5000

    CMD ["node", "app.js"]