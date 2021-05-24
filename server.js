const express = require('express');
const morgan = require('morgan');


const { PORT } = require('./config');
const homeRouter = require('./routes/home.route');
const authRouter = require('./routes/auth.route');

const { pageNotFound, error_handler } = require('./helpers/errorHandler')

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

app.use(pageNotFound);
app.use(error_handler)


app.listen(PORT,_ => console.log(`live on localhost:${PORT || 5000}`));