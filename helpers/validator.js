const Joi = require("joi");


const registerValidator = Joi.object({
    
    name : Joi.string().required().max(30),

    email : Joi.string().email().required(),

    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    confirm_password : Joi.ref('password')
})

module.exports = { registerValidator }