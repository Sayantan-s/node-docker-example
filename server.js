//const http = require('http');

const path = require('path');

const admin = require('./routes/admin');
const shop = require('./routes/shop');
const root = require('./utils/path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','pug');
app.set('views','template/views')

app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static('styles'));

app.use('/admin',admin.routes);

app.use(shop);

app.use((_,res) => {
    res
    .status(404)
    .render('404')
    //.sendFile(path.join(root,'views','404.html'));
})

//const server = http.createServer(app);

/*server.listen(3000,'localhost',(req,res) => {
    console.log('running')
});*/

app.listen(8000);

