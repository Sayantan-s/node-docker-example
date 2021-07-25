const express = require('express');
const morgan = require('morgan');

const app = express();

const middlewares = [
    morgan('dev')
]

app.use(middlewares);

app.get('/',(req,res) => {
    (function (duration){
        const start = Date.now();
        while(Date.now() - start < duration){}
    })(5000)
    res.end('<h1> Hello </h1>');
})

app.listen(3000, _ => console.log("live 3000"))