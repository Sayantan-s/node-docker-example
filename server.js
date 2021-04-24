const express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config')
const path = require('path')
const homeroute = require('./routes/home.route')


require('./helpers/init_mongodb')


const app = express()


app.set('views')
app.set('view engine', 'ejs')

const middlewares = [
    morgan('dev'),
    express.urlencoded({ extended : true }),
    express.static('frontend')
]

app.use(middlewares)

app.use(homeroute)

app.listen(_=> console.log(`Live on port ${PORT || 5000}`))