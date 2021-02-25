const http = require('http');
require("dotenv").config

const host = 'localhost';
const PORT = process.env.NODE_PORT

console.log(PORT)

http.createServer((req,res) => {
    if(req.url === "/"){
        res.statusCode = 200
        res.setHeader('Content-type','application/json')
        res.end(JSON.stringify({ name : process.env.USER }));
    }
})
.listen(3000,host,() => {
    console.log('Hello honey')
})