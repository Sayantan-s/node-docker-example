const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = class AuthHelper{

    constructor(){
        this.access_secret = process.env.JWT_ACCESS_SECRET;
        this.refresh_secret = process.env.JWT_REFRESH_SECRET
    }

    create_access_JWT(userId){
        const options = { issuer : 'sayantan.com', expiresIn: '1hr', audience: '' + userId }
        const payload = { }

        const token = jwt.sign(payload,this.access_secret,options);

        return token;
    }

    verify_access_JWT(token){
        return jwt.verify(token, this.access_secret);
    }

    create_refresh_JWT(userId){
        const options = { issuer : 'sayantan.com', expiresIn: '1yr', audience: '' + userId }
        const payload = { userId }

        const token = jwt.sign(payload,this.refresh_secret,options);

        return token;
    }

    verify_refresh_JWT(token){
        return jwt.verify(token, this.refresh_secret);
    }

    static async hashPassword(password){
        return await bcrypt.hash(password, 12);
    }

    static async validatePassword(hashedPassword,password){
        return await bcrypt.compare(password,hashedPassword);
    }
}