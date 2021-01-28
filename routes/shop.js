const path = require('path');

const express = require('express');

const router = express.Router();
let i = 1;

router.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','index.html'))
    console.log(`Hello middleware-${i}`);
})

module.exports = router;