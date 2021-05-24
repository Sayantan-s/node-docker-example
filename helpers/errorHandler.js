const pageNotFound = (req, res, next) => {
    const error = new Error('Page not found!');
    error.status = 404;
    next(error)
}

const error_handler = (err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).send({
        message : err.message || 'Internal Server Error!',
        status
    })
}

class CustomError extends Error{
    constructor(status = 500, message){
        this.status = status;
        this.message = message;
    }

    static alreadyExists(message){
        return new CustomError(409, message)
    }
}


module.exports = { pageNotFound, error_handler, CustomError }