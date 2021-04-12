import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs'
import nodeMailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const Transorter = nodeMailer.createTransport(sendgridTransport({
    auth : {
        api_key : process.env.SENDGRID_API_KEY
    }
}))

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

UserModel.post('save', async function(){
    Transorter.sendMail({
        to : this.email,
        from : 'sayantans.it2018@nsec.ac.in',
        subject: 'Signup successfull',
        html : `<h1>${this.name}, you signed up successfully,Fucckk yeah!</h1>`
    })
})


export default mongoose.model('User',UserModel)