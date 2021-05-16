const express = require('express');
const morgan = require('morgan');


const { PORT } = require('./config');
const homeRouter = require('./routes/home.route');
const authRouter = require('./routes/auth.route');

require('./helpers/init_mongodb');

const app = express();

const midddlewares = [
    express.urlencoded({ extended : false, limit : '50mb' }),
    express.json(),
    morgan('dev')
]

app.use(midddlewares)
 
app.use(homeRouter)
app.use('/auth',authRouter)


app.listen(PORT,_ => console.log(`live on localhost:${PORT || 5000}`));