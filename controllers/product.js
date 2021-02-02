//const products = [];

const Prods = require('../models/Product');
const path = require('../utils/path');

exports.getAddProducts = (req,res) => {
    //res.sendFile(path.join(root,'views','add-product.html'));
    res
    .status(200)
    .render('product',{ 
        title : 'add-item',
        path : '/admin/add-item',
        ErrorCss : false,
        FormCss : true
    });
 }

 exports.postAddProducts = (req,res) => {
    //console.log(req.body);
    const Product = new Prods(req.body.item);
    Product.saveToShow();
    //products.push({...req.body});
    res.redirect('/');
}

exports.getProducts = (req,res,next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));
    Prods.fetcher(pr => {
        res
        .status(200)
        .render('index',{  
            title : 'Home',
            path: req.url,
            product: pr,
            ErrorCss : false,
            FormCss : false 
        });
    });
   //console.log(products);
}
