const Product = require('../models/Product');

/**
 * Class PRODUCT Controller
 */
class ProductController {

  listProduct(req, res) {
    Product.ListProduct(req.con, (err, resultProduct) => {
      if (err) return res.send('<h1>ERROR</h1>')
      if (resultProduct) {
        Product.ListImage(req.con, (err, resultImage) => {
          if (err) return res.send('<h1>ERROR</h1>')
          if (resultImage) {
            for (var i = 0; i < resultProduct.length; i++) {
              resultProduct[i].src=[]
              for (var j = 0; j < resultImage.length; j++) {
                if (resultProduct[i].id_product == resultImage[j].id_product) {
                  resultProduct[i].src.push(resultImage[j].src);
                }
              }
            }
            return res.render('product',{data:resultProduct})
          }
        })
      }
    })
  }

  addProduct(req, res) {
    return res.render('addproduct')
  }

  editProduct(req, res) {
    Product.DetailProduct(req.con,req.params.id_product,(err,result)=>{
      if (err) return res.json({api:{
          error_code: 400,
          message: 'failed',
          err: err,
        }})
      if (result[0]){
        result[0].src =[];
        result[0].keyInfoProduct= [
          "a",
          "b",
          "c",
          "d"
        ]
        result[0].valueInfoProduct= [
          "aaa",
          "bbb",
          "ccc",
          "ddd"
        ]
        Product.ListImageProduct(req.con,req.params.id_product,(err,resultImage)=>{
          if (err) return res.json({api:{
              error_code: 400,
              message: 'failed',
              err: err,
            }})
          if (resultImage){
            for (let i in resultImage){
              result[0].src.push(resultImage[i].src)
            }
            // res.json(result[0])
            res.render('editproduct',{data:result[0]})
          }
        })
      }
    })
  }

  addProductFinal(req, res) {
    try {
      upload(req, res, function (err) {
        if (err) {
          res.render('upload');
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      var fileName = req.files.map(function (item, index) {
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
      upload(req, res, function (err) {
        if (err) {
          res.render('upload');
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      var fileName = req.files.map(function (item, index) {
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
