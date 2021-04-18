const express = require("express");
const morgan = require("morgan");
require('dotenv').config();


const dbConnect = require('./helpers/init_mongodb');
const authRoutes = require('./routes/auth.route');
const homeRoutes = require('./routes/home.route');


const app = express();


const middlewares = [
    express.urlencoded({ extended : true }),
    express.json(),
    express.static('static'),
    morgan('dev'),
]
const port  = process.env.ENV_PORT || 3000;


app.use(middlewares); 

app.use(authRoutes);
app.use(homeRoutes)

app.use((req,res,next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error)
})

app.use((err,req,res,next) => {
    const errStatus = err.status || 500;
    return res
    .status(errStatus)
    .send({
        status : errStatus,
        message : err.message
    })
})


dbConnect(() => {
    app.listen(port,_ => console.log(`live on ${port}`))
})