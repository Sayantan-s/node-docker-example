const { ValidationError } = require('joi')

const pageNotFound = (req, res, next) => {
    const error = new Error('Page not found!');
    error.status = 404;
    next(error);
}

const errorHandler = (err, req, res, next) =>{

    const status = err.status || 500;

    if(err instanceof ValidationError){
        status = 422;
        err.message = 'username/password is incorrect'
    }

    return res
    .status(status)
    .send({
        status,
        message: err.message
    })
}

module.exports = { errorHandler, pageNotFound };