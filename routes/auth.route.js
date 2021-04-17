const express = require('express');
const createHttpError = require('http-errors');
const { signAccessToken } = require('../helper/jwt_helper');
const { authSchema,loginSchema } = require('../helper/validation_schema');
const User = require('../models/User.Model');
const router = express.Router();

router.post('/register',async(req,res,next) => {
    try{
        const { email,name } = req.body;
        //if(!email || !password) throw createHttpError.BadRequest();

        const validated = await authSchema.validateAsync(req.body);
        
        const userExists = await User.exists({ email });
        if(userExists) throw createHttpError.Conflict(`${name}, you are already registered!`);
        
        const newUser = await User.create(validated);
        const accessToken = await signAccessToken(newUser._id)
        return res
        .status(201)
        .send({
            ...newUser._doc,
            accessToken
        });
    }
    catch(err){
        console.log(err.isJoi)
        if(err.isJoi) err.status = 422
        next(err)
    }
})


router.post('/login',async(req,res,next) => {
    try{
        const { email,password } = req.body
        const validatedUser = await loginSchema.validateAsync(req.body);

        const user = await User.findOne({ email })
        if(!user) throw createHttpError.NotFound('You are not registered! Please sign in!')

        const isMatched = await user.passwordIsValid(password);
        if(!isMatched) throw createHttpError.Unauthorized('Username/password invalid!')

        const accessToken = await signAccessToken(user._id);

        return res.send({ accessToken })
    }
    catch(err){
        if(err.isJoi) console.log(err.isJoi) //return next(createHttpError.BadRequest('Invalid email/password!'))
        next(err) 
    }
})

module.exports = router


/**
 * Fetches all the template, can also filter template on the basis of certain properties such as status, slug et...
 * @param {*} request
 * @param {*} response
 * @returns
 */