const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = class AuthHelper{

    static create_JWT(userId){
        const secret = process.env.JWT_ACCESS_SECRET;
        const options = { issuer : 'sayantan.com', expiresIn: '30s', audience: '' + userId }
        const payload = { userId }

        const token = jwt.sign(payload,secret,options)

        return token;
    }

    static async hashPassword(password){
        return await bcrypt.hash(password, 12);
    }

    static async validatePassword(hashedPassword,password){
        return await bcrypt.compare(password,hashedPassword);
    }
}