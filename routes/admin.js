const path = require('path');

const express = require('express');

const root = require('../utils/path');

const router = express.Router();

router.get('/add-item',(req,res) => {
    res.sendFile(path.join(root,'views','add-product.html'));
 })
 
 router.post('/item',(req,res) => {
     console.log(req.body);
     res.redirect('/');
 })

 
 module.exports = router;