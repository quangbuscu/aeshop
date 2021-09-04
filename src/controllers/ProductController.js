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
        res.render('addproduct')
    }

    editProduct(req, res) {
        var data = {
            maneProduct: "1",
            priceProduct: "1",
            saleProduct: "1",
            categoryProduct: "2",
            typeProduct: "2",
            desProduct: "as",
            keyInfoProduct: [
                "a",
                "b",
                "c",
                "d"
            ],
            valueInfoProduct: [
                "aaa",
                "bbb",
                "ccc",
                "ddd"
            ],
            srcImg: [
                "uploads/1630697457122.png",
                "uploads/1630697457130.png",
                "uploads/1630697457143.png",
                "uploads/1630697457228.png",
                "uploads/1630697457232.png"
            ]
        }
        res.render('editproduct', { layout: false, data: data });
    }

    addProductFinal(req, res) {
        try {
            upload(req, res, function(err) {
                if (err) {
                    res.render('upload');
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            var fileName = req.files.map(function(item, index) {
                return `uploads/` + item.filename;
            })
            console.log(req.body)
            var data = req.body;
            data.srcImg = fileName;
            res.send(data);
        }
    }

    editProductFinal(req, res) {
        try {
            upload(req, res, function(err) {
                if (err) {
                    res.render('upload');
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            var fileName = req.files.map(function(item, index) {
                return `uploads/` + item.filename;
            })
            var data = req.body;
            var listRemove = data.listImgRemove.split(",");
            data.listImgRemove = listRemove;
            data.srcImg = fileName;
            res.send(data);
        }
    }
}

module.exports = ProductController;