const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000

app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('styles'));


app.get('/',(req,res) => {
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req.url
    })
})

//api.openweathermap.org/data/2.5/weather?q=kolkata&appid=23241c693dde77dee1381e703ea69f89
//apikey=23241c693dde77dee1381e703ea69f89

app.listen(PORT,() => {
    console.log(`I am listening to port ${PORT}`)
})