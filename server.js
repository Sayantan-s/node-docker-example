//const http = require('http');

const path = require('path');

const admin = require('./routes/admin');
const shop = require('./routes/shop');
const root = require('./utils/path');

const express = require('express');
const bodyParser = require('body-parser');
//const hbs = require('express-handlebars');
const ejs = require('ejs');

const app = express();

//app.engine('handlebars',hbs());
//app.set('view engine','pug');
//app.set('view engine','handlebars');
app.set('view engine','ejs')
//app.set('views','template/views')

app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static('styles'));

app.use('/admin',admin);

app.use(shop);

app.use((req,res) => {
    res
    .status(404)
    .render('404',{
        title : req.url,
        path: req.url,
        ErrorCss : true,
        FormCss : false
    })
    //.sendFile(path.join(root,'views','404.html'));
})

//const server = http.createServer(app);

/*server.listen(3000,'localhost',(req,res) => {
    console.log('running')
});*/

app.listen(8000);

