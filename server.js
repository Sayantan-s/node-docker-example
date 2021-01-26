//const http = require('http');

const express = require('express');

const app = express();

let i = 1;

app.use((req,res,next) => {
    console.log(`Hello middleware-${i}`);
    i++;
    next();
})


app.use('/urbui',(req,res) => {
    res.write(`<h1>Laude laag gaye</h1>`);
    res.end();
})

app.use('/',(req,res,next) => {
    res.send('<h1>Hello Motherfuckers!</h1>')
    console.log(`Hello middleware-${i}`);
})

//const server = http.createServer(app);

/*server.listen(3000,'localhost',(req,res) => {
    console.log('running')
});*/

app.listen(3000,'localhost');

