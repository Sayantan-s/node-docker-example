const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors')

const authRoute = require('./routes/auth.route')

require('dotenv').config();
require('./helper/init_mongodb');

const app = express();
const PORT = process.env.PORT || 5000

const middlewares = [
    morgan('dev'),
    express.urlencoded({ extended : true }),
    express.json()
]

app.use(middlewares);

app.use(authRoute); 

app.use((req,res,next) => {
    const error = createError.NotFound(`Page not found!`);
    next(error);
})

app.use((err,req,res,next) => {
    res
    .status(err.status || 500)
    .send({
        error : {   
            status: err.status || 500,
            message : err.message
        }
    })
})

app.listen(PORT,_ => console.log('Server is running on port 3000'));