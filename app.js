const express = require('express');
const morgan = require('morgan');
const cluster = require('cluster');
const crypto = require('crypto')

const app = express();

const middlewares = [
    morgan('dev')
]

app.use(middlewares);

function x(duration){
    const start = Date.now();
    while(Date.now() - start < duration){}
}

app.get('/',(req,res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', data => {
        console.log(data)
        res.end('<h1> Hello </h1>');
    })
})

app.get('/quick',(req,res) => {
    res.end('<h1> I am fast </h1>');
})

console.log(require('os').userInfo().username)

app.listen(6000, _ => console.log("live 8000"))