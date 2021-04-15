const Joi = require('@hapi/joi')

const authSchema = Joi.object({

    name : Joi
    .string()
    .required(),

    email : Joi
    .string()
    .email()
    .lowercase()
    .required(),

    password : Joi
    .string()
    .min(7)
    .required()
})

module.exports = { authSchema }