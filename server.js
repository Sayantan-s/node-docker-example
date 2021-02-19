const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Tweet = require("./model/Tweet.model");

const app = express();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static('styles'));
app.use(express.json());

app.get('/',(req,res) => {
    res
    .status(200)
    .render('index',{
        dummyText : "Hello World!"
    })
})

const port  = process.env.ENV_PORT || 3000;

Tweet
.sync()
.then(_ =>{
    app.listen(port,'localhost',_ => {
        console.log('Hi from ' + port);
    })    
})
.catch(err => console.log(err))
