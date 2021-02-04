const fetch = require('node-fetch');
require('dotenv').config;

exports.getHome = ((req,res) => {
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req.url
    })
})

exports.getWeatherData = (async(req,res) => {
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=23241c693dde77dee1381e703ea69f89`;
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    res
    .status(200)
    .json(data);
})
