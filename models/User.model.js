const { model, Schema } = require('mongoose');
const AuthHelper = require('../helpers/auth_helper');


const UserSchema = new Schema({
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
        required : true,
    },

    confirmPassword : String,
    role : {
        type : String,
        required : true,
        default : 'customer'
    }

}, { timestamps : true })

UserSchema.pre('save',async function(next){
    this.password = await AuthHelper.hashPassword(this.password);
    next();
})

const User = model('users', UserSchema, 'user');

module.exports = User