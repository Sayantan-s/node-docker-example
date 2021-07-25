const crypto = require('crypto')

let processTime = [];
let pendingFuncions = [];
let OS_TASKS = []

function shouldContinue(){
    return processTime.length || pendingFuncions.length || OS_TASKS.length; 
}

const start = Date.now()

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', data => {
    console.log(Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', data => {
    console.log("B", Date.now() - start);
})

//while(shouldContinue()){ console.log(1)}