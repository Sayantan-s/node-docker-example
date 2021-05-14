const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    confirm_password : {
        type : String,
        required : true
    }
},{ timestamps : true })

const User = model('users', userSchema, 'user');

module.exports = User;