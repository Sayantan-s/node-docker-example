const express = require('express');
const morgan = require('morgan');
const cluster = require('cluster');


if(cluster.isMaster){
    cluster.fork();
}
else{
    const app = express();

    const middlewares = [
        morgan('dev')
    ]

    app.use(middlewares);

    function x(duration){
        const start = Date.now();
        while(Date.now() - start < duration){}
    }

    app.get('/',(req,res) => {
        x(5000)
        res.end('<h1> Hello </h1>');
    })

    app.listen(8000, _ => console.log("live 3000"))
}