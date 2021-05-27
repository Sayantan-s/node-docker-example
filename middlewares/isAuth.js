const { CustomError } = require("../helpers/errorHandler");
const JWTService = require("../helpers/JWT_service");

const isAuthenticated = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        const err = CustomError.userExistence('Unauthorized', 401);
        return next(err)
    }
    const token = authHeader.split(' ')[1];

    const { id, role } = await JWTService.verify_JWT(token);

    req.user = { id, role };

    next();
}

module.exports = isAuthenticated;