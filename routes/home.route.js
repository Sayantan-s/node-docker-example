const express = require('express');

const router = express.Router();


router.get('/',async(req,res,next) => {
    try{
        const [ _, authToken ] = req.headers['authorization'].split(' ')
        console.log(authToken)
        res
        .status(200)
        .send({ message : "Hello from home" })
    }
    catch(err){
        next(err);
    }
})

module.exports = router