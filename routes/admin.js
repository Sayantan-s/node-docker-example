const path = require('path');

const express = require('express');

const root = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-item',(req,res) => {
    //res.sendFile(path.join(root,'views','add-product.html'));
    res
    .status(200)
    .render('product',{ title : 'add-item',path : '/admin/add-item' });
 })
 
 router.post('/add-item',(req,res) => {
     console.log(req.body);
     products.push({...req.body});
     res.redirect('/');
 })

 
 exports.routes = router;
 exports.product = products;

