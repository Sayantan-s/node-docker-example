const AuthHelper = require('../helpers/auth_helper');
const { CustomError } = require('../helpers/errorHandler');
const JWTService = require('../helpers/JWT_service');
const { registerValidator, loginValidator } = require('../helpers/validators');
const User = require('../models/User.model');

const router = require('express').Router();

router
.route('/register')
.post(async(req,res,next) =>{
    try {
        const { error, email, password, name  } = await registerValidator.validateAsync(req.body);
        if(error)
            next(error)
        const userExists = await User.exists({ email });
        if(userExists){
            const err = CustomError.userExistence('There is already someone using this email!');
            return next(err);
        }
        const user = await User.create({ email, password, name });

        const accessToken = await JWTService.sign_JWT({ id : user._id, role : user.role })

        return res.status(201).send({
            accessToken,
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
            const err = CustomError.userExistence('You are not registered, please signup!',401);
            return next(err);
        }

        const user = await User.findOne({ email }).select('email password role').lean()

        const isPasswordCorrect = await AuthHelper.verifyPassword(password, user.password);

        if(!isPasswordCorrect){
            const error = CustomError.userExistence('Invalid email or password!',400);
            next(error)  
        }

        const accessToken = await JWTService.sign_JWT({ id : user._id, role : user.role })

        return res.send({ accessToken })    
        
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