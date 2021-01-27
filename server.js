//const http = require('http');

const admin = require('./routes/admin');
const shop = require('./routes/shop');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));


app.use('/admin',admin);

app.use(shop);

app.use((_,res) => {
    res
    .status(404)
    .send(`<h1>OOPS PAGE NOT FOUND!</h1>`)
})

//const server = http.createServer(app);

/*server.listen(3000,'localhost',(req,res) => {
    console.log('running')
});*/

app.listen(3000,'localhost');

