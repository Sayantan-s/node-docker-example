import express from 'express';
import dbConnectMjs from './utils/db.connect.mjs';
import dotEnv from 'dotenv'
import path from 'path'
import sessionsMjs from './utils/sessions.mjs';
import home from './routes/user.mjs';
import auth from './routes/auth.mjs';

const app = express();

dotEnv.config();

const PORT =  process.env.NODE_PORT || 3000

const middlewares = [
    express.urlencoded({ extended : true }),
    express.json(),
    express.static('frontend'),
    sessionsMjs()
]

app.set('views', path.join(path.resolve(path.dirname('')),'views'))
app.set('view engine','ejs')

app.use(middlewares);

app.use((req,res,next) => {
    res.locals.title = 'Author'
    res.locals.isAuthenticated = req.session.isAuthenticated
    next()
})

app.use(home)
app.use(auth)

dbConnectMjs(_ => app.listen(PORT,_ => console.log(`open localhost:${PORT}`)))

