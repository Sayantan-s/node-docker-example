const mongoose = require('mongoose');

const uri = process.env.DB_URI

module.exports = async(callback) => {
   try{
        await mongoose.connect(uri,{
            useCreateIndex : true,
            useFindAndModify : true, 
            useUnifiedTopology : true,
            useNewUrlParser : true
        })

        console.log("Connected to Mongodb through mongoose!")

        return callback()
   }
   catch(err){
        console.log(err)
   }

}

