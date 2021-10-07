const express = require("express");
const router = express.Router();
const multer = require('multer');
const Auth = require('../middleware/Auth');

var storage = multer.diskStorage({
    destination: './src/public/uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + ".png");
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            return cb("File phải là ảnh", false);
        } else {
            cb(null, true);
        }
    }
})

/**
 * Routing for Auth
 */
const ProductController = require("../controllers/ProductController");
const controller = new ProductController();

router.get("/",(req, res) => controller.listProduct(req, res));

router.get("/add-product", (req, res) => controller.addProduct(req, res));

router.get("/edit-product/:id_product", (req, res) => controller.editProduct(req, res));

router.post("/add-product", upload.array('pictureProduct', 30), (req, res) => controller.addProductFinal(req, res));

router.post("/edit-product/:id_product", upload.array('pictureProduct', 30), (req, res) => controller.editProductFinal(req, res));

router.post("/delete-product/:id_product", (req, res) => controller.deleteProduct(req, res));

router.get("/brand",(req, res) => controller.listBrand(req, res));

router.get("/category",(req, res) => controller.listCategory(req, res));

router.get("/style",(req, res) => controller.listStyle(req, res));

module.exports = router;
