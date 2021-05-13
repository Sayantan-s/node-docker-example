const express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config')
const homeroute = require('./routes/home.route')
const authroute = require('./routes/auth.route')
const ejs = require('ejs')


require('./helpers/init_mongodb')


const app = express()

app.set('view engine', 'ejs')

const middlewares = [
    morgan('dev'),
    express.urlencoded({ extended : true }),
    express.json(),
    express.static('frontend')
]

app.use(middlewares)

app.use(homeroute)
app.use('/auth',authroute)

app.listen(PORT,_=> console.log(`Live on port ${PORT || 5000}`)) 