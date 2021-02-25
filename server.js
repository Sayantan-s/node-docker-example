const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');


const Tweet = require("./model/Tweet.model");
const index = require('./routes/index')

const app = express();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static('static'));


app.use(index);

app.use((req,res) => {
    res
    .status(404)
    .render(`404`,{
        responseText : 404,
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

