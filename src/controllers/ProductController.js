const Product = require('../models/Product');
const jwt = require('jsonwebtoken');


// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class ProductController {
    listProduct(req, res) {
        // Product.getProduct(req.con, req.body.username, (err, result) => {
        //     try {
        //         res.render('product',{data: result});
        //     } catch (error) {
        //         res.send('Lỗi');
        //     }
        // })

        if (req.cookies.token) {
            res.render('product')
        }
    }

    addProduct(req, res) {
        res.render('addproduct',{layout:false})
    }

    addProductFinal(req, res) {
        try {
            upload(req, res, function (err) {
                if (err) {
                    res.render('upload');
                }
            })
        }catch(err) {
            console.log(err)
        }finally{
            var fileName = req.files.map(function (item,index){
                return `uploads/`+item.filename;
            })
            console.log(req.body)
            var data = req.body;
            data.src = fileName;
            res.send(data);
        }
    }
}

module.exports = ProductController;
