import mongoose from "mongoose"

const uri = `mongodb+srv://sayan:Sayantan@123@sayantan.zc13y.mongodb.net/Sayantan?retryWrites=true&w=majority`

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