const Joi = require("joi");


const registerValidator = Joi.object({

    name : Joi.string().required(),

    email : Joi.string().required().lowercase().email(),

    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    confirmPassword : Joi.ref('password')

})

const loginValidator = Joi.object({

    email : Joi.string().email().required().lowercase(),

    password : Joi.string().required()

})

module.exports = { registerValidator, loginValidator }