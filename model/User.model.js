const { Schema, models, model } = require('mongoose');
const AuthHelper = require('../helpers/auth_helper');

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase: true,
        unique: true
    },
    password : {
        type : String,
        required : true,
        minlength: 7,
    }
},{ timestamps : true })

UserSchema.pre('save', async function(next){
    this.password = await AuthHelper.hashPassword(this.password);
    next();
})

const User = models.User || model('user',UserSchema);

module.exports = User;