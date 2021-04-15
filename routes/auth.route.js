const express = require('express');
const createHttpError = require('http-errors');
const { authSchema } = require('../helper/validation_schema');
const User = require('../models/User.Model');
const router = express.Router();

router.post('/register',async(req,res,next) => {
    try{
        const { email } = req.body;
        //if(!email || !password) throw createHttpError.BadRequest();

        const validated = await authSchema.validateAsync(req.body);
        
        const userExists = await User.exists({ email });
        if(userExists) throw createHttpError.Conflict(`${name}, you are already registered!`);
        
        const newUser = await User.create(validated)
        return res
        .status(201)
        .send(newUser);
    }
    catch(err){
        console.log(err.isJoi)
        if(err.isJoi) err.status = 422
        next(err)
    }
})

module.exports = router