const express = require('express');

const { getWeatherData } = require('../controllers/getControllers')

const router = express.Router();


router.get('/weather',getWeatherData);


module.exports = router;