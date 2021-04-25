
class CustomError extends Error{
    constructor(message,statusCode){
        this.message = message
        this.status = statusCode
    }

    createError(message, status){
        const customErr = new CustomError(message, status);
        
    }
}