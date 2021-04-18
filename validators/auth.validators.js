const Joi = require("joi");

const Login_Schema = Joi.object({
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

module.exports = { Login_Schema }