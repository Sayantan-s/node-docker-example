const { model,Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    }
})

UserSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    console.log('Your password has been hashed!');
    next();
})

UserSchema.methods.passwordIsValid = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }   
    catch(err){
        throw err;
    } 
}

module.exports = model('user',UserSchema);