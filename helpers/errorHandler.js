const pageNotFound = (req, res, next) => {
    const error = CustomError.notFound();
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
        super();
        this.status = status;
        this.message = message;
    }

    static userExistence(message, status = 409){
        return new CustomError(status, message)
    }

    static notFound(message="Page not found!", status = 404){
        return new CustomError(status, message)
    }
}


module.exports = { pageNotFound, error_handler, CustomError }