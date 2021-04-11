import mongoose from 'mongoose'
import validator from 'validator';

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name : {
        type : String,
        required : [true,`Please provide a name!`],
    },
    email : {
        type : String,
        required : [true,"Please provide an email!"],
        lowercase : true,
        validate : [ validator.isEmail,"Please provide a valid email!" ]
    },
    password : {
        type : String,
        required : [true,"Please provide a valid password"],
        minlength : [6, "The password should be atleast 6 characters long!"],
        maxlength: 10
    }
})

export default mongoose.model('User',UserModel)