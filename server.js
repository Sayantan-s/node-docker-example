const express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config')
const path = require('path')
const homeroute = require('./routes/home.route')
const authroute = require('./routes/auth.route')


require('./helpers/init_mongodb')


const app = express()

const middlewares = [
    morgan('dev'),
    express.urlencoded({ extended : true }),
    express.json(),
    express.static('frontend')
]

app.use(middlewares)

app.use(homeroute)
app.use('/auth',authroute)

app.listen(_=> console.log(`Live on port ${PORT || 5000}`))