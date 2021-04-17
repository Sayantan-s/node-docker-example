const createHttpError = require('http-errors');
const JWT  = require('jsonwebtoken')

module.exports = {
    signAccessToken : userId => {
        return new Promise((resolve,reject)=> {
            const payload = {};
            const secret = process.env.JWT_ACCESS_SECRET;
            const options = { 
                issuer : 'http://localhost:3000',
                audience: '' + userId, 
                expiresIn : '50s' 
            };
            JWT.sign(payload, secret, options,  (err,token) => {
                if(err) reject(err)
                resolve(token)
            })
        })
    },

    verifyAccess: (req, res, next) => {
        const [_, authToken  ] = req.headers['authorization'].split(' ');
        if (!authToken) return next(createHttpError.Unauthorized('Invalid email/password'))
        JWT.verify(authToken, process.env.JWT_ACCESS_SECRET,(err,payload) => {
            if(err) {
               const message  = err instanceof JWT.JsonWebTokenError ? 'Unauthorized user' : err.message;
               return next(createHttpError.Unauthorized(message))
            }
            req.payload = payload;
            next();
        })
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve,reject)=> {
            const payload = {};
            const secret = process.env.JWT_REFRESH_TOKEN;
            const options = { 
                issuer : 'http://localhost:3000',
                audience: '' + userId, 
                expiresIn : '1hr' 
            };
            JWT.sign(payload, secret, options,  (err,token) => {
                if(err) reject(err)
                resolve(token)
            })
        })
    }
}