import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

const uri = process.env.DB_URI

export default async(callback) => {

   try{
        const connection = await mongoose.connect(uri,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useFindAndModify : true
        })

        await connection;

        return callback(); 
   }
   catch(err){
       console.log(err)
   }
} 