const JWT  = require('jsonwebtoken')

module.exports = {
    signAccessToken : userId => {
        return new Promise((resolve,reject)=> {
            const payload = {
                iss : 'http://localhost:3000'
            };
            const secret = process.env.JWT_ACCESS_SECRET;
            const options = { 
                issuer : 'http://localhost:3000',
                audience: '' + userId, 
                expiresIn : '1h' 
            };
            JWT.sign(payload, secret, options,  (err,token) => {
                if(err) reject(err)
                resolve(token)
            })
        })
    }
}