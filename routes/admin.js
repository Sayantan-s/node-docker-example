const express = require('express');

const { getAddProducts,postAddProducts } = require('../controllers/product') 

const router = express.Router();

router.get('/add-item',getAddProducts);
 
router.post('/add-item',postAddProducts);

 
module.exports = router;
