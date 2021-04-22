const { Schema, model } = require('mongoose');

const refreshToken = new Schema({
    refresh_token : { 
        type : String,
        unique : true
     }
})

const RefreshToken = model('RefreshToken', refreshToken, 'reftoken');

module.exports = RefreshToken;