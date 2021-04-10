import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Student = new Schema({
    name : {
        type : String,
        required : true
    },
    univRoll : {
        type : Number,
        required : true
    },
    year : {
        currentYear : {
            type : Number,
            required : true
        },
        gradYear : {
            type : Number,
            required :true
        }
    },
}) 

export default mongoose.model('Student',Student)