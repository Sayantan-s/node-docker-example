const http = require('http');
const fs  = require('fs');

const server = http.createServer((req,res) => {
    //console.log(req.url,req.method);
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./views/index.html',(err,data) => {
        if(err){
            res.end("Found error");
        }
        res.end(data);
    })
    if(req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data',chunk => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', () => {
            const parsed = Buffer.concat(body).toString();
            const message = parsed.split("=")[1];
            if(!fs.existsSync('msg.txt')){
                fs.writeFile('msg.txt',message,(err,data) => {
                   if(err){
                       console.log(err);
                   }
                   console.log(data + "is wrote.")
                })
            }
            else{
                fs.appendFile('msg.txt',`\n ${message}`,(err,data) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(data + "is wrote.")
                })
            }
            console.log(parsed);
        })
       res.statusCode = 302;
       res.setHeader('Location','/');
       return res.end();
    }
})

server.listen(8000,'localhost');

