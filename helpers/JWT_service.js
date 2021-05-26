const jwt = require('jsonwebtoken')
const { ACCESS_SECRET } = require('../config')

class JWTService {

    static sign_JWT(payload, expiry = '60s', secret = ACCESS_SECRET){
        return jwt.sign(payload, secret, { expiresIn : expiry })
    }
}

module.exports = JWTService