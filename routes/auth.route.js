const express = require('express');
const createHttpError = require('http-errors');
const User = require('../models/User.Model');
const router = express.Router();

router.post('/register',async(req,res,next) => {
    try{
        const { email, password, name  } = req.body;
        if(!email || !password) throw createHttpError.BadRequest()
        const userExists = await User.exists({ email });
        if(userExists) throw createHttpError.Conflict(`${name}, you are already registered!`);
        const newUser = await User.create({ name, password, email })
        return res
        .status(201)
        .send(newUser);
    }
    catch(err){
        next(err)
    }
})

module.exports = router