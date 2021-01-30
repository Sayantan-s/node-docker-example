const path = require('path');

const express = require('express');

const { product } = require('./admin');

const router = express.Router();
let i = 1;

router.get('/',(req,res,next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));
    res
    .status(200)
    .render('index',{ title : 'Home',path:req.url,product });
    console.log(product);
})

module.exports = router;