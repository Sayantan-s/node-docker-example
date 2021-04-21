const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = class AuthHelper{

    static sign_JWT(payload, expiry = '60s', secret = process.env.JWT_ACCESS_SECRET){
        const options = { issuer : 'sayantan.com', expiresIn: expiry }
        return jwt.sign(payload,secret,options);

    }
    static async hashPassword(password){
        return await bcrypt.hash(password, 12);
    }

    static async validatePassword(hashedPassword,password){
        return await bcrypt.compare(password,hashedPassword);
    }
}