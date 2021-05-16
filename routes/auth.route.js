const { registerValidator } = require('../helpers/validators');
const User = require('../models/User.model');

const router = require('express').Router();

router
.route('/register')
.post(async(req,res,next) =>{
    console.log(req.body)
    try {
        const { error, email, password  } = await registerValidator.validateAsync(req.body);
        if(error)
            next(error)
        const userExists = await User.exists({ email });
        if(userExists){
            const err = new Error('You are already registered!');
            err.status = 409;
            return next(err);
        }
        await User.create(req.body);
        return res.send({ message: email })
    } catch (err) {
        const error = new Error(err.message);
        next(error);
    }
})

router
.route('/login')
.post(async(req,res,next) =>{
    return res.send({ message: 'Hello login' })
})

router
.route('/logout')
.post(async(req,res,next) =>{
    return res.send({ message: 'Hello logout' })
})

module.exports = router