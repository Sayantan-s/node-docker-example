const rootDir = require("../utils/path");

const fs = require("fs");
const path = require("path");

//const products = [];

const file = path.join(
    path.dirname(process.mainModule.filename),
    'db',
    'data.json'
)



module.exports = class Product {
    constructor(name){
        this.title = name;
    }
    saveToShow(){
        //products.push(this)
        fs.readFile(file,(err,data) => {
            let products = [];
            if(!err){
                products = JSON.parse(data);
                //console.log(products);
            }
            products.push(this);
            console.log(products);
            fs.writeFile(file,JSON.stringify(products),err => {
                console.log(err);
            }) 
        })
        console.log(this);
    }

    static fetcher(func){
        fs.readFile(file,(err,data) => {
            if(err){
                return func([]);
            }
            return func(JSON.parse(data));
        })
       // return products
    }
}