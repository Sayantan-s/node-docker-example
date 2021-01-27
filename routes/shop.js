const express = require('express');

const router = express.Router();
let i = 1;

router.get('/',(req,res,next) => {
    res.send('<h1>Hello Motherfuckers!</h1>')
    console.log(`Hello middleware-${i}`);
})

module.exports = router;