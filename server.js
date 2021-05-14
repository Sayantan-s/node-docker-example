const express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config')
const homeroute = require('./routes/home.route')
const authroute = require('./routes/auth.route')
const ejs = require('ejs')
const {errorHandler, pageNotFound} = require('./middleware/handle_error')


require('./helpers/init_mongodb')


const app = express()

app.set('view engine', 'ejs')

const middlewares = [ 
    morgan('dev'),
    express.static('frontend'),
    express.urlencoded({ extended : true }),
    express.json()
]

app.use(middlewares) 

app.use(homeroute);
app.use('/auth',authroute);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(PORT,_=> console.log(`Live on port ${PORT || 5000}`))