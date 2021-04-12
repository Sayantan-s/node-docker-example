import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name : {
        type : String,
        required : [true,`Please provide a name!`],
    },
    email : {
        type : String,
        unique: true,
        required : [true,"Please provide an email!"],
        lowercase : true,
        validate : [ validator.isEmail,"Please provide a valid email!" ]
    },
    password : {
        type : String,
        required : [true,"Please provide a password"],
        minlength : [6, "The password should be atleast 6 characters long!"],
        maxlength: [10,"The password should not be more than 10 characters!"]
    }
})

UserModel.pre('save',async function(next){
    const salt  = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

export default mongoose.model('User',UserModel)