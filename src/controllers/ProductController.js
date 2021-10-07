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
              resultProduct[i].src = []
              for (var j = 0; j < resultImage.length; j++) {
                if (resultProduct[i].id_product == resultImage[j].id_product) {
                  resultProduct[i].src.push(resultImage[j].src);
                }
              }
            }
            return res.render('product', {data: resultProduct})
          }
        })
      }
    })
  }

  addProduct(req, res) {
    return res.render('addproduct')
  }

  editProduct(req, res) {
    Product.DetailProduct(req.con, req.params.id_product, (err, result) => {
      if (err) return res.redirect('/product')
      if (result[0]) {
        result[0].src = [];
        result[0].size = []
        result[0].brand = []
        result[0].category = []
        result[0].seasion = []
        Product.ListImageProduct(req.con, req.params.id_product, (err, resultImage) => {
          if (err) return res.redirect('/product')
          if (resultImage) {
            for (let i in resultImage) {
              result[0].src.push(resultImage[i].src)
            }
            Product.SizeProduct(req.con, req.params.id_product, (err, resultSize) => {
              result[0].size = resultSize;
              Product.ListOption(req.con, 'seasion', (err, resultSeasion) => {
                result[0].seasion = resultSeasion;
                Product.ListOption(req.con, 'brand', (err, resultBrand) => {
                  result[0].brand = resultBrand;
                  Product.ListOption(req.con, 'category', (err, resultCategory) => {
                    result[0].category = resultCategory;
                    // res.send(result[0]);
                    res.render('editproduct', {data: result[0]})
                  })
                })
              })
            })
          }
        })
      }
    })
  }

  addProductFinal(req, res) {
    var fileName = req.files.map(function (item, index) {
      return `uploads/` + item.filename;
    })
    var src = []
    for (let i in fileName) {
      src.push([12, fileName[i], 'product']);
    }
    if (req.body.id_brand || req.body.id_style || req.body.id_category){
      return res.redirect('add-product')
    }
    Product.AddProduct(req.con, req.body, (err, result) => {
      if (err) return res.send('<h1>ERROR</h1>')
      if (result) {
        var values = []
        for (let i in req.body.size) {
          values.push([result.insertId, req.body.size[i], Number.parseInt(req.body.qnt[i])]);
        }
        Product.AddSizeProduct(req.con, values, (errSize, resultSize) => {
          if (errSize) return res.send('<h1>ERROR</h1>')
          if (resultSize) {
            var src = []
            for (let i in fileName) {
              src.push([result.insertId, fileName[i], 'product']);
            }
            Product.AddImageProduct(req.con, src, (errSrc, resultSrc) => {
              if (errSrc) return res.send(errSrc)
              if (resultSrc) res.redirect('/product')

            })
          }
        })
      }
    })
  }

  editProductFinal(req, res) {
    var fileName = req.files.map(function (item, index) {
      return `uploads/` + item.filename;
    })
    var data = req.body;
    data.id_product = req.params.id_product;
    data.listImgRemove = data.listImgRemove.split(",");
    data.srcImg = fileName;
    data.size = []
    for (let i in req.body.keyInfoProduct) {
      data.size.push([Number.parseInt(data.id_product), req.body.keyInfoProduct[i], Number.parseInt(req.body.valueInfoProduct[i])]);
    }
    Product.UpdateProduct(req.con, data, (err, result) => {
      if (err) return res.send(err)
      if (result) {
        Product.DeleteSize(req.con, data, (err, resultSize) => {
          if (err) return res.send(err)
          if (resultSize) {
            Product.AddSizeProduct(req.con, data.size, (err, resultSizeAdd) => {
                if (err) return res.send(err)
                if (resultSizeAdd) {
                  Product.DeleteImage(req.con, data.listImgRemove, (err, resultImageRemove) => {
                    if (err) return res.send(err)
                    if (resultImageRemove) {
                      var src = []
                      for (let i in fileName) {
                        src.push([data.id_product, fileName[i], 'product']);
                      }
                      Product.AddImageProduct(req.con, src, (er, resultImageAdd) => {
                        if (err) return res.send(err)
                        if (resultImageRemove) res.redirect('/product');
                      })
                    }
                  })
                }
              }
            )
          }
        })
      }
    })
  }

  deleteProduct(req, res) {
    Product.DeleteProduct(req.con, req.params.id_product, (err, result) => {
      if (err) return res.send(err)
      Product.DeleteSizeProduct(req.con, req.params.id_product, (err, result) => {
        if (err) return res.send(err)
        Product.DeleteImageProduct(req.con, req.params.id_product, (err, result) => {
          if (err) return res.send(err)
          return res.redirect('/product')
        })
      })
    })

  }

  listBrand(req, res) {
    Product.ListBrand(req.con,(err,result)=>{
      if (result) return res.json(result);
    })
  }

  listCategory(req, res) {
    Product.ListCategory(req.con,(err,result)=>{
      if (result) return res.json(result);
    })
  }

  listStyle(req, res) {
    Product.ListStyle(req.con,(err,result)=>{
      if (result) return res.json(result);
    })
  }
}

module.exports = ProductController;
