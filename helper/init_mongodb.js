const mongoose = require('mongoose');

const uri = process.env.DB_URI;

(async() => {
   try{
        const connection = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify : true,
            useCreateIndex : true    
        })

        await connection;

        console.log('Mongoose connected to DB');
   }
   catch(err) {  console.log(err) };
})()

mongoose.connection.on('connected',() => {
    console.log('mongodDB connected')
})

mongoose.connection.on('error',error => {
    console.log(error.message)
})

mongoose.connection.on('disconnected',_ => {
    console.log('Mongoose is disconnected');
})

process.on('SIGINT',async()=> {
    await mongoose.connection.close();
    process.exit(0);
})