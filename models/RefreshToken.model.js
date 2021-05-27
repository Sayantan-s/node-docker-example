const { model, Schema } = require('mongoose');

const tokenSchema = new Schema({
    token : {
        type : String,
        unique : true
    }
},{ timestamps : false })

const Refreshtoken = model('tokens', tokenSchema, 'refreshToken');

module.exports = Refreshtoken;