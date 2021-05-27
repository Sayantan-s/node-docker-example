const jwt = require('jsonwebtoken')
const { ACCESS_SECRET } = require('../config')

class JWTService {

    static sign_JWT(payload, expiry = '60s', secret = ACCESS_SECRET){
        return jwt.sign(payload, secret, { expiresIn : expiry })
    }

    static verify_JWT(token, secret = ACCESS_SECRET){
        return jwt.verify(token, secret);
    }

    static create_tokens(jwt){
        
    }
}

module.exports = JWTService

//inset(10% 30.1% 0% 30% round 25vw 25vw 0vw 0vw)