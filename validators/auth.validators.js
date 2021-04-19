const Joi = require("joi");

const SignUp_Schema = Joi.object({
    username : Joi
    .string()
    .required(),

    email: Joi
    .string()
    .required()
    .email(),
    
    password : Joi
    .string()
    .required()
    .min(7)
})

const Login_Schema = Joi.object({

    email: Joi
    .string()
    .required()
    .email(),
    
    password : Joi
    .string()
    .required()
    .min(7)
})


module.exports = { SignUp_Schema, Login_Schema }