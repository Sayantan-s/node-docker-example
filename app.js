const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000

app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('styles'));


app.get('/',(req,res) => {
    res
    .status(200)
    .render('index',{
        routeName : 'Home',
        path : req.url
    })
})


app.listen(PORT,() => {
    console.log(`I am listening to port ${PORT}`)
})