import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        maxlength: 10
    }
})

export default mongoose.model('User',UserModel)