const AuthHelper = require('../helpers/auth_helper');
const { registerValidator, loginValidator } = require('../helpers/validators');
const User = require('../models/User.model');

const router = require('express').Router();

router
.route('/register')
.post(async(req,res,next) =>{
    console.log(req.body)
    try {
        const { error, email, password, name  } = await registerValidator.validateAsync(req.body);
        if(error)
            next(error)
        const userExists = await User.exists({ email });
        if(userExists){
            const err = new Error('You are already registered!');
            err.status = 409;
            return next(err);
        }
        await User.create({ email, password, name });
        return res.status(201).send({
            message: 'Your account has been created!',
            status : 201
        })
    } catch (err) {
        const error = new Error(err.message);
        next(error);
    }
})

router
.route('/login')
.post(async(req,res,next) =>{
    try {
        const { error, email, password } = await loginValidator.validateAsync(req.body);
        if(error)
            next(error);
        const userExists = await User.exists({ email });
        if(!userExists){
            const err = new Error('You are not registerd, please signup!');
            err.status = 401;
            return next(err);
        }
        const isPasswordCorrect = AuthHelper.verifyPassword()
        return res.send({ message: 'Hello login' })    
    } catch (error) {
        const err = new Error(error.message);
        next(err);
    }
})

router
.route('/logout')
.post(async(req,res,next) =>{
    return res.send({ message: 'Hello logout' })
})

module.exports = router