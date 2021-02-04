const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config;

const Home = require('./routes/home');
const Weather = require('./routes/api');

console.log(process.env.API_KEY);


const app = express();

const PORT = 5000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('static'));

app.use(Home);
app.use('/api',Weather);


//api.openweathermap.org/data/2.5/weather?q=kolkata&appid=23241c693dde77dee1381e703ea69f89
//api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//apikey=23241c693dde77dee1381e703ea69f89

app.listen(PORT,() => {
    console.log(`I am listening to port ${PORT}`)
})