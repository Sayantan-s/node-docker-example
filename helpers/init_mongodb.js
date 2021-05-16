const mongoose = require('mongoose');
const { DB_URI } = require('../config');

const dbase = mongoose.connection

mongoose.connect(DB_URI,{
    useNewUrlParser : true,
    useFindAndModify : true,
    useUnifiedTopology : true,
    useCreateIndex : true
})

dbase.on('connected',_ => {
    console.log(`connected to db...`)
})

dbase.on('error', err => {
    console.log(err)
})

dbase.on('disconnected',_ => {
    console.log(`Disconnected from db`)
})

process.on('SIGINT', async () => {
    await dbase.close();
    console.log('Bye dev...')
    process.exit(0);
})