import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'

MongoDBStore(session)

const store = new MongoDBStore({
    uri : process.env.DB_URI,
    collection : 'session'
})

export default () => {
    return session({
        secret : process.env.SECRET_COOKIE_KEY,
        resave : false,
        saveUninitialized : false,
        store
    })
}

