const express = require('express');
const { verifyAccess } = require('../helper/jwt_helper');

const router = express.Router();


router.get('/',verifyAccess,async(req,res,next) => {
    try{
        res
        .status(200)
        .send({ message : "Hello from home" })
    }
    catch(err){
        next(err);
    }
})

module.exports = router