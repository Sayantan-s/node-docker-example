const express = require('express');
const morgan = require('morgan');

const app = express();

const middlewares = [
    morgan('dev')
]

app.use(middlewares);

app.get('/',(req,res) => {
    res.end('<h1> Hello </h1>');
})

app.listen(3000, _ => console.log("live 3000"))