const mongoose = require('mongoose');
const { DB_URI } = require('../config');

const db = mongoose.connection

mongoose.connect(DB_URI,{
    useFindAndModify : true,
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex : true
})

db.on('error',error => console.log(error))

db.once('connected',_ => {
    console.log('Connected to mongodb....')
});

db.on('disconnected',_=> console.log('disconnected from mongodb...'));

process.on('SIGINT',async() => {
    await db.close();
    console.log('Bye developer...')
    process.exit(0);
})

