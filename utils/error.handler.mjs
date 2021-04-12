export default (err) => {
    const  error = {}
    if(err.code === 11000){
        error.email = 'The email is already registered!'
        return error;
    }
    if(err.message.includes('User validation failed:')){
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message           
        })
    }
    return error;
}