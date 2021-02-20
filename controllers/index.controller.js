const Tweet = require("../model/Tweet.model");

exports.getIndex = (req,res) => {
   Tweet
   .findAll()
   .then(tweets => {
       console.log(tweets);
        res
        .status(200)
        .render('index',{
            dummyText : "Hello World!",
            tweets
        })
   })
   .catch(err => console.log(err))
}

exports.getTweet = (req,res) => {
    Tweet
    .findAll()
    .then(tweet => {
        console.log(tweet)
         res
         .status(200)
         .json({
             dummyText : "Hello World!",
             tweet
         })
    })
    .catch(err => console.log(err));
 }
 
exports.getTweetById = (req,res) => {
    
    console.log(req.params)

    const { id } = req.params;

    Tweet
    .findAll({
        where : {
            username : id
        }
    })
    .then(tweet => {
        res
        .status(200)
        .render('dynamic/tweet',{
            responseText : "YOOO",
            tweet : tweet[0]
        })
    })
    .catch(err => {
        console.log(err);
    })

}


exports.postTweet = (req,res) => {
    console.log(req.body);
    const { name,username,img,status } = req.body;
    Tweet
    .create({
        verified : false,
        name : name,
        username: username,
        img : img,
        statusText : status
    })
    .then(res => console.log("Tweeted"))
    .catch(err => console.log(err));
}