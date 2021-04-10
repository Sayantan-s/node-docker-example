import session from 'express-session'
import connectMongo from 'connect-mongodb-session'

const MongoDbStore = connectMongo(session)

const store = new MongoDbStore({
    uri : process.env.DB_URI,
    collection : 'session'
})

export default () => {
    return session({
        resave : false,
        saveUninitialized : false,
        secret: process.env.SECRET_COOKIE_KEY,
        store
    })
}
