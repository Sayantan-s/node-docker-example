const path = require('path');

const express = require('express');

const { getProducts } = require('../controllers/product');

const router = express.Router();
let i = 1;

router.get('/',getProducts)

module.exports = router;